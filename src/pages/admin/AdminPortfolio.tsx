import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { getUserFriendlyError } from '@/lib/errorUtils';
import { Plus, Trash2, Save } from 'lucide-react';
import type { CaseStudyData } from '@/hooks/useSupabaseData';

interface PortfolioProject {
  id: string;
  sort_order: number;
  category: string;
  title: string;
  subtitle_ro: string;
  subtitle_en: string;
  description_ro: string;
  description_en: string;
  tags: string[];
  image_url: string | null;
  live_url: string | null;
  slug: string | null;
  case_study: CaseStudyData | null;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const emptyCaseStudy: CaseStudyData = {
  price: '',
  duration: '',
  durationEn: '',
  year: '',
  challenge: '',
  challengeEn: '',
  solution: '',
  solutionEn: '',
  process: '',
  processEn: '',
  results: [],
  deliverables: [],
  deliverablesEn: [],
  features: [],
  featuresEn: [],
  testimonial: { quote: '', quoteEn: '', name: '', role: '' },
};

const AdminPortfolio = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [editing, setEditing] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [hasCaseStudy, setHasCaseStudy] = useState(false);
  const location = useLocation();

  useEffect(() => { fetchProjects(); }, [location.key]);

  async function fetchProjects() {
    const { data } = await supabase
      .from('portfolio_projects')
      .select('*')
      .order('sort_order');
    setProjects((data as any[]) || []);
    setLoading(false);
  }

  function startEdit(p: PortfolioProject) {
    setEditing(p);
    setHasCaseStudy(!!p.case_study);
  }

  async function handleSave() {
    if (!editing) return;
    const { id, ...rest } = editing;

    // Set slug from title if empty
    if (!rest.slug) rest.slug = slugify(rest.title);

    // Set case_study based on toggle
    if (!hasCaseStudy) rest.case_study = null;

    if (id.startsWith('new-')) {
      const { error } = await supabase.from('portfolio_projects').insert({ ...rest });
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    } else {
      const { error } = await supabase.from('portfolio_projects').update(rest).eq('id', id);
      if (error) { toast.error(getUserFriendlyError(error)); return; }
    }

    toast.success('Proiect salvat!');
    setEditing(null);
    fetchProjects();
  }

  async function handleDelete(id: string) {
    if (!confirm('Mută în Coș Reciclare? Poți restaura oricând din Admin → Coș Reciclare.')) return;
    const { error } = await supabase.from('portfolio_projects').update({ deleted_at: new Date().toISOString() }).eq('id', id);
    if (error) { toast.error(getUserFriendlyError(error)); return; }
    toast.success('Proiect mutat în Coș Reciclare. Îl poți restaura din Admin → Coș Reciclare.');
    fetchProjects();
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0] || !editing) return;
    setUploading(true);
    const file = e.target.files[0];
    const ext = file.name.split('.').pop();
    const path = `portfolio/${Date.now()}.${ext}`;

    const { error: upError } = await supabase.storage.from('site-assets').upload(path, file);
    if (upError) { toast.error(upError.message); setUploading(false); return; }

    const { data: urlData } = supabase.storage.from('site-assets').getPublicUrl(path);
    setEditing({ ...editing, image_url: urlData.publicUrl });
    setUploading(false);
    toast.success('Imagine incarcata!');
  }

  function newProject() {
    const p: PortfolioProject = {
      id: `new-${Date.now()}`,
      sort_order: projects.length,
      category: 'webdev',
      title: '',
      subtitle_ro: '',
      subtitle_en: '',
      description_ro: '',
      description_en: '',
      tags: [],
      image_url: null,
      live_url: null,
      slug: null,
      case_study: null,
    };
    setEditing(p);
    setHasCaseStudy(false);
  }

  // Helper to update case_study fields
  function updateCS(updates: Partial<CaseStudyData>) {
    if (!editing) return;
    const cs = editing.case_study || { ...emptyCaseStudy };
    setEditing({ ...editing, case_study: { ...cs, ...updates } });
  }

  function updateTestimonial(updates: Partial<CaseStudyData['testimonial']>) {
    if (!editing) return;
    const cs = editing.case_study || { ...emptyCaseStudy };
    setEditing({ ...editing, case_study: { ...cs, testimonial: { ...cs.testimonial, ...updates } } });
  }

  if (loading) return <p className="text-muted-foreground">Se incarca...</p>;

  if (editing) {
    const cs = editing.case_study || emptyCaseStudy;

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading font-bold text-2xl text-foreground">
            {editing.id.startsWith('new-') ? 'Proiect nou' : `Editare: ${editing.title}`}
          </h1>
          <Button variant="ghost" onClick={() => setEditing(null)}>Inapoi</Button>
        </div>

        <div className="glass-card p-6 space-y-5" style={{ transform: 'none' }}>
          {/* Basic fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Titlu</Label>
              <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label>Categorie</Label>
              <select
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full h-10 rounded-md border border-white/10 bg-white/5 px-3 text-sm text-foreground"
              >
                <option value="webdev">Web Development</option>
                <option value="ecommerce">Ecommerce</option>
                <option value="design">Design</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Slug (URL)</Label>
              <Input
                value={editing.slug || ''}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                placeholder={slugify(editing.title || 'titlu-proiect')}
                className="bg-white/5 border-white/10"
              />
              <p className="text-xs text-muted-foreground">Se auto-genereaza din titlu daca e gol</p>
            </div>
            <div className="space-y-2">
              <Label>Ordine sortare</Label>
              <Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="bg-white/5 border-white/10 w-24" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>URL Site Live</Label>
            <Input
              value={editing.live_url || ''}
              onChange={(e) => setEditing({ ...editing, live_url: e.target.value || null })}
              placeholder="https://exemplu.vercel.app"
              className="bg-white/5 border-white/10"
            />
            <p className="text-xs text-muted-foreground">Link catre site-ul live (apare ca buton pe card si case study)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Subtitle (RO)</Label>
              <Input value={editing.subtitle_ro} onChange={(e) => setEditing({ ...editing, subtitle_ro: e.target.value })} className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label>Subtitle (EN)</Label>
              <Input value={editing.subtitle_en} onChange={(e) => setEditing({ ...editing, subtitle_en: e.target.value })} className="bg-white/5 border-white/10" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Descriere (RO)</Label>
              <Textarea value={editing.description_ro} onChange={(e) => setEditing({ ...editing, description_ro: e.target.value })} className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label>Descriere (EN)</Label>
              <Textarea value={editing.description_en} onChange={(e) => setEditing({ ...editing, description_en: e.target.value })} className="bg-white/5 border-white/10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags (separate prin virgula)</Label>
            <Input
              value={editing.tags.join(', ')}
              onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
              className="bg-white/5 border-white/10"
              placeholder="Next.js, Tailwind, CMS"
            />
          </div>

          <div className="space-y-2">
            <Label>Imagine</Label>
            {editing.image_url && (
              <img src={editing.image_url} alt="" className="w-48 h-32 object-cover rounded-xl mb-2" />
            )}
            <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="bg-white/5 border-white/10" />
          </div>

          {/* Case Study Toggle */}
          <div className="border-t border-white/10 pt-5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasCaseStudy}
                onChange={(e) => {
                  setHasCaseStudy(e.target.checked);
                  if (e.target.checked && !editing.case_study) {
                    setEditing({ ...editing, case_study: { ...emptyCaseStudy } });
                  }
                }}
                className="w-4 h-4 rounded border-white/20"
              />
              <span className="font-heading font-semibold text-foreground">Case Study (pagina de detalii)</span>
            </label>
            <p className="text-xs text-muted-foreground mt-1">Activeaza pentru a adauga provocare, solutie, rezultate, etc.</p>
          </div>

          {/* Case Study Fields */}
          {hasCaseStudy && (
            <div className="space-y-5 border-l-2 border-primary/30 pl-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Pret</Label>
                  <Input value={cs.price} onChange={(e) => updateCS({ price: e.target.value })} placeholder="7.500 RON" className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Durata (RO)</Label>
                  <Input value={cs.duration} onChange={(e) => updateCS({ duration: e.target.value })} placeholder="4 saptamani" className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Durata (EN)</Label>
                  <Input value={cs.durationEn} onChange={(e) => updateCS({ durationEn: e.target.value })} placeholder="4 weeks" className="bg-white/5 border-white/10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>An</Label>
                <Input value={cs.year} onChange={(e) => updateCS({ year: e.target.value })} placeholder="2025" className="bg-white/5 border-white/10 w-24" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Provocare (RO)</Label>
                  <Textarea value={cs.challenge} onChange={(e) => updateCS({ challenge: e.target.value })} rows={6} className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Challenge (EN)</Label>
                  <Textarea value={cs.challengeEn} onChange={(e) => updateCS({ challengeEn: e.target.value })} rows={6} className="bg-white/5 border-white/10" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Solutie (RO)</Label>
                  <Textarea value={cs.solution} onChange={(e) => updateCS({ solution: e.target.value })} rows={6} className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Solution (EN)</Label>
                  <Textarea value={cs.solutionEn} onChange={(e) => updateCS({ solutionEn: e.target.value })} rows={6} className="bg-white/5 border-white/10" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Proces (RO)</Label>
                  <Textarea value={cs.process} onChange={(e) => updateCS({ process: e.target.value })} rows={6} className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Process (EN)</Label>
                  <Textarea value={cs.processEn} onChange={(e) => updateCS({ processEn: e.target.value })} rows={6} className="bg-white/5 border-white/10" />
                </div>
              </div>

              {/* Results */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Rezultate</Label>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => updateCS({ results: [...cs.results, { value: '', label: '', labelEn: '' }] })}
                  >
                    <Plus className="w-3 h-3 mr-1" /> Adauga
                  </Button>
                </div>
                {cs.results.map((r, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <Input
                      value={r.value}
                      onChange={(e) => {
                        const results = [...cs.results];
                        results[i] = { ...results[i], value: e.target.value };
                        updateCS({ results });
                      }}
                      placeholder="1.8s"
                      className="bg-white/5 border-white/10 w-24"
                    />
                    <Input
                      value={r.label}
                      onChange={(e) => {
                        const results = [...cs.results];
                        results[i] = { ...results[i], label: e.target.value };
                        updateCS({ results });
                      }}
                      placeholder="Label RO"
                      className="bg-white/5 border-white/10 flex-1"
                    />
                    <Input
                      value={r.labelEn}
                      onChange={(e) => {
                        const results = [...cs.results];
                        results[i] = { ...results[i], labelEn: e.target.value };
                        updateCS({ results });
                      }}
                      placeholder="Label EN"
                      className="bg-white/5 border-white/10 flex-1"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="text-destructive shrink-0"
                      onClick={() => updateCS({ results: cs.results.filter((_, j) => j !== i) })}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Deliverables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Livrabile (RO) — un item pe linie</Label>
                  <Textarea
                    value={cs.deliverables.join('\n')}
                    onChange={(e) => updateCS({ deliverables: e.target.value.split('\n').filter(Boolean) })}
                    rows={5}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Deliverables (EN) — one per line</Label>
                  <Textarea
                    value={cs.deliverablesEn.join('\n')}
                    onChange={(e) => updateCS({ deliverablesEn: e.target.value.split('\n').filter(Boolean) })}
                    rows={5}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Functionalitati (RO) — un item pe linie</Label>
                  <Textarea
                    value={cs.features.join('\n')}
                    onChange={(e) => updateCS({ features: e.target.value.split('\n').filter(Boolean) })}
                    rows={5}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Features (EN) — one per line</Label>
                  <Textarea
                    value={cs.featuresEn.join('\n')}
                    onChange={(e) => updateCS({ featuresEn: e.target.value.split('\n').filter(Boolean) })}
                    rows={5}
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>

              {/* Testimonial */}
              <div className="space-y-3 border-t border-white/10 pt-4">
                <Label className="text-base">Testimonial</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Citat (RO)</Label>
                    <Textarea value={cs.testimonial.quote} onChange={(e) => updateTestimonial({ quote: e.target.value })} rows={3} className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Quote (EN)</Label>
                    <Textarea value={cs.testimonial.quoteEn} onChange={(e) => updateTestimonial({ quoteEn: e.target.value })} rows={3} className="bg-white/5 border-white/10" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nume</Label>
                    <Input value={cs.testimonial.name} onChange={(e) => updateTestimonial({ name: e.target.value })} className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Rol</Label>
                    <Input value={cs.testimonial.role} onChange={(e) => updateTestimonial({ role: e.target.value })} className="bg-white/5 border-white/10" />
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button onClick={handleSave} className="gradient-primary text-white border-0 rounded-2xl">
            <Save className="w-4 h-4 mr-2" /> Salveaza
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="font-heading font-bold text-xl sm:text-2xl text-foreground">Portofoliu</h1>
        <Button onClick={newProject} size="sm" className="gradient-primary text-white border-0 rounded-2xl self-start">
          <Plus className="w-4 h-4 mr-2" /> Proiect nou
        </Button>
      </div>

      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id} className="glass-card p-3 sm:p-4" style={{ transform: 'none' }}>
            <div className="flex items-start gap-3">
              {p.image_url && <img src={p.image_url} alt="" className="w-12 h-8 sm:w-16 sm:h-10 object-cover rounded shrink-0" />}
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-foreground text-sm truncate">
                  {p.title}
                  {p.case_study && <span className="ml-2 text-xs text-primary-light">[Case Study]</span>}
                </h3>
                <p className="text-xs text-muted-foreground truncate">{p.category} — {p.subtitle_ro} {p.slug && `(/${p.slug})`}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button size="sm" variant="ghost" onClick={() => startEdit(p)} className="h-8 px-2 text-xs">Editeaza</Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(p.id)} className="text-destructive h-8 px-2">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-muted-foreground text-sm">Niciun proiect. Adauga primul!</p>
        )}
      </div>
    </div>
  );
};

export default AdminPortfolio;
