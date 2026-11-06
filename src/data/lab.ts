// Sectiunea "Open-source & lab" din portofoliu.
// href "#" = placeholder: se inlocuieste cu linkul real (repo / demo) cand e gata.
import type { LabProjectRow } from './types';

export const GITHUB_URL = 'https://github.com/vixonoffice';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/iulian-vladutoiu-bb9660449/';

export const LAB_PROJECTS: LabProjectRow[] = [
  {
    id: 'gsap-motion-lab',
    title: 'GSAP Motion Lab',
    kind_ro: 'Open-source',
    kind_en: 'Open source',
    description_ro: 'Efecte de scroll, text care apare pe rânduri și tranziții între pagini, făcute cu GSAP.',
    description_en: 'Scroll effects, line-by-line text reveals and page transitions, built with GSAP.',
    href: '#',
  },
  {
    id: 'ai-site-assistant',
    title: 'AI Site Assistant',
    kind_ro: 'Open-source',
    kind_en: 'Open source',
    description_ro: 'Chatbot care se montează pe orice site și răspunde din conținutul acelui site.',
    description_en: 'A chatbot widget you can drop on any site that answers from that site’s own content.',
    href: '#',
  },
  {
    id: 'boutique-hotel-concept',
    title: 'Boutique Hotel concept',
    kind_ro: 'Concept',
    kind_en: 'Concept',
    description_ro: 'Concept de site pentru un hotel boutique, construit în jurul video-ului și al tipografiei mari.',
    description_en: 'Concept website for a boutique hotel, built around video and large typography.',
    href: '#',
  },
  {
    id: 'saas-launch-concept',
    title: 'SaaS launch concept',
    kind_ro: 'Concept',
    kind_en: 'Concept',
    description_ro: 'Concept de pagină de lansare pentru un produs SaaS.',
    description_en: 'Concept launch page for a SaaS product.',
    href: '#',
  },
  {
    id: 'frontul-de-fier',
    title: 'Frontul de Fier',
    kind_ro: 'Joc în browser',
    kind_en: 'Browser game',
    description_ro: 'Joc de strategie în timp real, în browser, în spiritul clasicelor RTS. Făcut cu Three.js și TypeScript.',
    description_en: 'A real-time strategy game in the browser, in the spirit of classic RTS games. Built with Three.js and TypeScript.',
    href: 'https://frontul-de-fier.vercel.app',
  },
  {
    id: 'n8n-automation-templates',
    title: 'n8n automation templates',
    kind_ro: 'Open-source',
    kind_en: 'Open source',
    description_ro: 'Șabloane de automatizare: lead din formular, în CRM, răspuns AI, notificare.',
    description_en: 'Automation templates: lead from a form to a CRM, an AI reply, a notification.',
    href: 'https://github.com/vixonoffice/n8n-automation-templates',
  },
];
