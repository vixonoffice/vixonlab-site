// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import handler from '../../api/chat';

let ipCounter = 0;

function chatRequest(body: unknown) {
  return new Request('https://vixonlab.ro/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://vixonlab.ro',
      // fiecare test are alt IP ca sa nu loveasca limita de cereri
      'x-forwarded-for': `10.0.0.${++ipCounter}`,
    },
    body: JSON.stringify(body),
  });
}

const msg = (role: string, text: string) => ({ role, parts: [{ text }] });

describe('api/chat history validation', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    process.env.GEMINI_API_KEY = 'test-key';
    fetchMock.mockReset();
    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: 'salut' }] } }] }), { status: 200 }),
    );
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const sentContents = () => JSON.parse(fetchMock.mock.calls[0][1].body).contents as Array<{ role: string; parts: { text: string }[] }>;

  it('accepts a normal conversation and appends the new message', async () => {
    const res = await handler(chatRequest({ message: 'Buna', history: [msg('model', 'Salut!'), msg('user', 'Ce preturi aveti?')] }));
    expect(res.status).toBe(200);
    const contents = sentContents();
    expect(contents.map((c) => c.role)).toEqual(['model', 'user', 'user']);
  });

  it.each(['system', 'function', 'assistant', 'USER', ''])('rejects role "%s" with 400', async (role) => {
    const res = await handler(chatRequest({ message: 'Buna', history: [msg(role, 'x')] }));
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects malformed history entries', async () => {
    for (const history of ['nope', [null], [{ role: 'user' }], [{ role: 'user', parts: [{ inlineData: {} }] }], [{ role: 'user', parts: 'x' }]]) {
      const res = await handler(chatRequest({ message: 'Buna', history }));
      expect(res.status).toBe(400);
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('keeps only the last 12 messages', async () => {
    const history = Array.from({ length: 30 }, (_, i) => msg(i % 2 ? 'model' : 'user', `m${i}`));
    const res = await handler(chatRequest({ message: 'Buna', history }));
    expect(res.status).toBe(200);
    const contents = sentContents();
    expect(contents.length).toBe(12 + 1);
    expect(contents[0].parts[0].text).toBe('m18');
  });

  it('truncates each message to 2000 characters', async () => {
    const res = await handler(chatRequest({ message: 'Buna', history: [msg('user', 'a'.repeat(5000))] }));
    expect(res.status).toBe(200);
    expect(sentContents()[0].parts[0].text.length).toBe(2000);
  });

  it('drops the oldest messages once the total passes 8000 characters', async () => {
    const history = Array.from({ length: 12 }, (_, i) => msg(i % 2 ? 'model' : 'user', `${i}`.padEnd(2000, 'x')));
    const res = await handler(chatRequest({ message: 'Buna', history }));
    expect(res.status).toBe(200);
    const contents = sentContents();
    const historyPart = contents.slice(0, -1);
    expect(historyPart.reduce((n, c) => n + c.parts[0].text.length, 0)).toBeLessThanOrEqual(8000);
    expect(historyPart.length).toBe(4);
    // the newest messages survive
    expect(historyPart[historyPart.length - 1].parts[0].text.startsWith('11')).toBe(true);
  });

  it('drops extra fields and non-text parts (only role + text reach Gemini)', async () => {
    const res = await handler(chatRequest({ message: 'Buna', history: [{ role: 'user', parts: [{ text: 'a', extra: 1 }], foo: 'bar' }] }));
    expect(res.status).toBe(200);
    expect(sentContents()[0]).toEqual({ role: 'user', parts: [{ text: 'a' }] });
  });

  it('still requires a string message of at most 500 characters', async () => {
    expect((await handler(chatRequest({ message: 123 }))).status).toBe(400);
    expect((await handler(chatRequest({ message: '  ' }))).status).toBe(400);
    expect((await handler(chatRequest({ message: 'x'.repeat(501) }))).status).toBe(400);
  });
});
