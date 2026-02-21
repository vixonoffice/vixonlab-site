import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageSEO } from '@/hooks/usePageSEO';
import { PageTransition } from '@/components/PageTransition';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Mail, Phone, Clock, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const WHATSAPP_NUMBER = '40758840269';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Required').max(100),
  email: z.string().trim().email('Invalid email').max(255),
  phone: z.string().max(20).optional(),
  projectType: z.string().min(1, 'Required'),
  budget: z.string().min(1, 'Required'),
  details: z.string().trim().min(1, 'Required').max(2000),
});

const Contact = () => {
  const { t, language } = useLanguage();
  usePageSEO({ title: t('contact.badge'), description: t('contact.subtitle') });

  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: '', budget: '', details: '' });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const buildWhatsAppUrl = () => {
    const lines = [
      language === 'ro' ? 'Salut VixonLab!' : 'Hi VixonLab!',
      '',
      `${t('contact.name')}: ${form.name}`,
      `${t('contact.email')}: ${form.email}`,
      form.phone ? `${t('contact.phone')}: ${form.phone}` : '',
      `${t('contact.projectType')}: ${form.projectType}`,
      `${t('contact.budget')}: ${form.budget}`,
      '',
      `${t('contact.details')}:`,
      form.details,
    ].filter(Boolean);

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      setStatus('success');
      return;
    }
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus('loading');

    // Save to Supabase
    await supabase.from('contact_submissions').insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      project_type: form.projectType,
      budget: form.budget,
      details: form.details,
    });

    // Open WhatsApp with the message
    window.open(buildWhatsAppUrl(), '_blank');

    setStatus('success');
    setForm({ name: '', email: '', phone: '', projectType: '', budget: '', details: '' });
  };

  const projectTypes = t('contact.projectTypes').split('|');
  const budgets = t('contact.budgets').split('|');

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors";

  return (
    <PageTransition>
      <section className="section-padding pt-32 pb-16">
        <div className="mx-auto max-w-content">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 mb-6">
            <span className="text-sm text-primary-light">{t('contact.badge')}</span>
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">{t('contact.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{t('contact.subtitle')}</p>
        </div>
      </section>

      <SectionWrapper className="!pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form — 3/5 */}
          <div className="lg:col-span-3">
            <ScrollReveal>
              <div className="glass-card p-6 md:p-8">
                <h2 className="font-heading font-semibold text-xl text-foreground mb-6">{t('contact.formTitle')}</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1.5 block">{t('contact.name')}</label>
                      <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                      {errors.name && <p className="text-xs text-accent mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1.5 block">{t('contact.email')}</label>
                      <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                      {errors.email && <p className="text-xs text-accent mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  {/* Honeypot field - hidden from real users */}
                  <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">{t('contact.phone')}</label>
                    <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1.5 block">{t('contact.projectType')}</label>
                      <Select value={form.projectType} onValueChange={(val) => setForm({ ...form, projectType: val })}>
                        <SelectTrigger className="w-full bg-white/5 border-white/10 rounded-xl px-4 py-3 h-auto text-sm text-foreground focus:border-primary/50">
                          <SelectValue placeholder={t('contact.selectPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-white/10 z-50">
                          {projectTypes.map((pt) => <SelectItem key={pt} value={pt}>{pt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.projectType && <p className="text-xs text-accent mt-1">{errors.projectType}</p>}
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1.5 block">{t('contact.budget')}</label>
                      <Select value={form.budget} onValueChange={(val) => setForm({ ...form, budget: val })}>
                        <SelectTrigger className="w-full bg-white/5 border-white/10 rounded-xl px-4 py-3 h-auto text-sm text-foreground focus:border-primary/50">
                          <SelectValue placeholder={t('contact.selectPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-white/10 z-50">
                          {budgets.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {errors.budget && <p className="text-xs text-accent mt-1">{errors.budget}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">{t('contact.details')}</label>
                    <textarea className={`${inputClass} min-h-[120px]`} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
                    {errors.details && <p className="text-xs text-accent mt-1">{errors.details}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-3.5 rounded-2xl text-lg transition-all disabled:opacity-60"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {status === 'loading' ? '...' : t('contact.submit')}
                  </button>
                  {status === 'success' && <p className="text-sm text-primary-light text-center">{t('contact.success')}</p>}
                  {status === 'error' && <p className="text-sm text-accent text-center">{t('contact.error')}</p>}
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Info — 2/5 */}
          <div className="lg:col-span-2 space-y-6">
            <ScrollReveal>
              <div className="glass-card p-6">
                <h3 className="font-heading font-semibold text-foreground mb-4">{t('contact.infoTitle')}</h3>
                <div className="space-y-4">
                  <a href="mailto:vixonoffice@gmail.com" className="flex items-center gap-3 group">
                    <Mail className="w-5 h-5 text-primary-light shrink-0" />
                    <span className="text-sm text-muted-foreground group-hover:text-primary-light transition-colors">{t('contact.emailAddress')}</span>
                  </a>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                    <Phone className="w-5 h-5 text-primary-light shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm text-muted-foreground group-hover:text-primary-light transition-colors block">{t('contact.phoneNumber')}</span>
                      <span className="text-xs text-muted-foreground">{t('contact.whatsapp')}</span>
                    </div>
                  </a>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary-light shrink-0" />
                    <span className="text-sm text-muted-foreground">{t('contact.schedule')}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="dot-green" />
                  <h3 className="font-heading font-semibold text-foreground">{t('contact.fastResponse')}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t('contact.fastResponseDesc')}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
};

export default Contact;
