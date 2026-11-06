import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, act, cleanup } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { LANG_STORAGE_KEY } from '@/lib/i18n';

function setNavigator(language: string, userAgent = 'Mozilla/5.0 Chrome/120') {
  Object.defineProperty(window.navigator, 'language', { value: language, configurable: true });
  Object.defineProperty(window.navigator, 'userAgent', { value: userAgent, configurable: true });
}

function Probe() {
  const { pathname } = useLocation();
  const { language, setLanguage } = useLanguage();
  usePageSEO({ title: 'Test', description: 'Test description' });
  return (
    <div>
      <span data-testid="path">{pathname}</span>
      <span data-testid="lang">{language}</span>
      <button onClick={() => setLanguage('ro')}>to-ro</button>
      <button onClick={() => setLanguage('en')}>to-en</button>
    </div>
  );
}

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider>
        <Probe />
      </LanguageProvider>
    </MemoryRouter>,
  );
}

describe('language detection in the app', () => {
  beforeEach(() => {
    window.localStorage.clear();
    setNavigator('en-US');
  });
  afterEach(cleanup);

  it('redirects a non-Romanian browser from "/" to /en once and remembers it', () => {
    renderAt('/');
    expect(screen.getByTestId('path').textContent).toBe('/en');
    expect(screen.getByTestId('lang').textContent).toBe('en');
    expect(window.localStorage.getItem(LANG_STORAGE_KEY)).toBe('en');
  });

  it('keeps a Romanian browser on "/"', () => {
    setNavigator('ro-RO');
    renderAt('/');
    expect(screen.getByTestId('path').textContent).toBe('/');
    expect(screen.getByTestId('lang').textContent).toBe('ro');
    expect(window.localStorage.getItem(LANG_STORAGE_KEY)).toBeNull();
  });

  it('does not redirect Googlebot', () => {
    setNavigator('en-US', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
    renderAt('/');
    expect(screen.getByTestId('path').textContent).toBe('/');
  });

  it('does not touch deep links', () => {
    renderAt('/pricing');
    expect(screen.getByTestId('path').textContent).toBe('/pricing');
    expect(screen.getByTestId('lang').textContent).toBe('ro');
  });

  it('lets the RO/EN selector override the detection, and stays on RO afterwards', () => {
    renderAt('/');
    expect(screen.getByTestId('path').textContent).toBe('/en');
    act(() => screen.getByText('to-ro').click());
    expect(screen.getByTestId('path').textContent).toBe('/');
    expect(screen.getByTestId('lang').textContent).toBe('ro');
    expect(window.localStorage.getItem(LANG_STORAGE_KEY)).toBe('ro');
  });

  it('switches to the equivalent page when changing language', () => {
    setNavigator('ro-RO');
    renderAt('/pricing');
    act(() => screen.getByText('to-en').click());
    expect(screen.getByTestId('path').textContent).toBe('/en/pricing');
  });

  it('sets <html lang>, canonical and hreflang from the route', () => {
    setNavigator('ro-RO');
    renderAt('/en/pricing');
    expect(document.documentElement.lang).toBe('en');
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://vixonlab.ro/en/pricing');
    const alternates = Array.from(document.head.querySelectorAll('link[rel="alternate"][hreflang]')).map((el) => [
      el.getAttribute('hreflang'),
      el.getAttribute('href'),
    ]);
    expect(alternates).toEqual([
      ['ro', 'https://vixonlab.ro/pricing'],
      ['en', 'https://vixonlab.ro/en/pricing'],
      ['x-default', 'https://vixonlab.ro/en/pricing'],
    ]);
    expect(document.head.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe('en_US');
  });
});
