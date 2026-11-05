// Generat din exportul bazei de date vechi (2026-11-05). De acum se editeaza direct aici, nu mai exista baza de date.
import type { StatRow, TechRow } from './types';

export const STATS: StatRow[] = [
  {
    id: 'cf4ac99c-eb92-4e28-8dba-ad4d6418ff47',
    sort_order: 1,
    value: '50+',
    label_ro: 'Proiecte livrate',
    label_en: 'Projects delivered',
  },
  {
    id: '3ab1427a-d5c4-4664-bd06-5bd945116719',
    sort_order: 2,
    value: '99%',
    label_ro: 'Clienți mulțumiți',
    label_en: 'Happy clients',
  },
  {
    id: 'f7059537-e110-456e-bf0a-ff650ae7efa4',
    sort_order: 3,
    value: '3+',
    label_ro: 'Ani experiență',
    label_en: 'Years experience',
  },
  {
    id: '1106cacd-3874-4bec-9af2-a80f3078e69c',
    sort_order: 4,
    value: '24h',
    label_ro: 'Timp de răspuns',
    label_en: 'Response time',
  },
];

export const TECH_STACK: TechRow[] = [
  {
    id: '8116528d-037a-4f91-af48-6f7330be0459',
    name: 'Next.js',
    sort_order: 1,
  },
  {
    id: '436b7021-4ab0-4207-b3ca-5e6c8be73ba2',
    name: 'React',
    sort_order: 2,
  },
  {
    id: '43074d67-5e59-46ed-a026-8aba2f18a3f0',
    name: 'TypeScript',
    sort_order: 3,
  },
  {
    id: '5a8ee85c-4313-4756-86da-638d69e3c91c',
    name: 'Tailwind CSS',
    sort_order: 4,
  },
  {
    id: 'dbc4801c-fc34-4090-8da2-1172afca6d9f',
    name: 'Node.js',
    sort_order: 5,
  },
  {
    id: '0b1b327f-6cce-4f8e-a90d-acf5f1446837',
    name: 'PostgreSQL',
    sort_order: 6,
  },
  {
    id: '700ad5e4-3405-447e-a906-47426648f343',
    name: 'Figma',
    sort_order: 7,
  },
  {
    id: '438d7fac-4c1f-4170-8989-76d1628ca5e9',
    name: 'Vercel',
    sort_order: 8,
  },
];
