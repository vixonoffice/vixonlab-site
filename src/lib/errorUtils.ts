export function getUserFriendlyError(error: any): string {
  const errorMap: Record<string, string> = {
    '23505': 'Acest element există deja.',
    '23503': 'Nu se poate șterge — există referințe asociate.',
    '42501': 'Nu ai permisiunea necesară.',
    '42P01': 'Tabelul nu a fost găsit.',
    'PGRST301': 'Eroare de autorizare.',
    'PGRST204': 'Niciun rezultat găsit.',
  };

  const code = error?.code || '';
  const message = error?.message || '';

  for (const [key, friendlyMsg] of Object.entries(errorMap)) {
    if (code.includes(key) || message.includes(key)) return friendlyMsg;
  }

  console.error('Database error:', error);
  return 'A apărut o eroare. Te rugăm să încerci din nou.';
}
