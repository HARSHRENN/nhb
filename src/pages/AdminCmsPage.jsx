import React, { useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import { api, setAdminToken } from '../lib/api';
import { compressPhoto } from '../lib/media';
import { analyticsConfigured } from '../lib/analytics';
import { MediaThumbnail } from '../components/GalleryPreview';
const today = () => new Date().toLocaleDateString('en-CA', {
  timeZone: 'Asia/Kolkata'
});
function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  options,
  rows = 4
}) {
  return <label>{label}{type === 'textarea' ? <textarea rows={rows} value={value || ''} onChange={e => onChange(e.target.value)} required={required} /> : type === 'checkbox' ? <input type="checkbox" checked={!!value} onChange={e => onChange(e.target.checked)} /> : options ? <select value={value || ''} onChange={e => onChange(e.target.value)}>{options.map(x => <option value={x} key={x}>{x}</option>)}</select> : <input type={type} value={value || ''} onChange={e => onChange(e.target.value)} required={required} />}</label>;
}
function ImageField({
  label,
  value,
  onChange
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const upload = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const body = new FormData();
      body.append('photos', await compressPhoto(file));
      const result = await api('/gallery/upload', {
        method: 'POST',
        body
      });
      onChange(result[0].url);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
      e.target.value = '';
    }
  };
  return <div className="image-field"><Field label={label} value={value} onChange={onChange} /><label className="upload-label">{busy ? 'Compressing and uploading…' : 'Or upload a photo'}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} disabled={busy} /></label>{value && <img className="cms-image-preview" src={value} alt={label} />}{error && <p role="alert" className="form-error">{error}</p>}</div>;
}
function CertificateField({
  value,
  onChange
}) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  return <div className="image-field"><Field label="Certificate link (HTTPS or uploaded PDF)" value={value} onChange={onChange} /><label>Or upload a PDF certificate<input type="file" accept="application/pdf,.pdf" disabled={busy} onChange={async e => {
        const file = e.target.files?.[0];
        if (!file) return;
        setError('');
        setBusy(true);
        try {
          const body = new FormData();
          body.append('document', file);
          const result = await api('/documents/upload', {
            method: 'POST',
            body
          });
          onChange(result.url);
        } catch (e) {
          setError(e.message);
        } finally {
          setBusy(false);
          e.target.value = '';
        }
      }} /></label>{busy && <p role="status">Uploading certificate…</p>}{error && <p role="alert" className="form-error">{error}</p>}</div>;
}
const blankJob = () => ({
  title: '',
  department: 'Manufacturing',
  location: 'Amalsad, Gujarat',
  experience: '',
  shortDesc: '',
  type: 'Full Time',
  status: 'draft',
  responsibilities: []
});
const blankMedia = () => ({
  title: '',
  type: 'photo',
  category: 'Kaizen Events',
  caption: '',
  date: today(),
  imageUrl: '',
  videoUrl: '',
  thumbnailUrl: '',
  featured: false,
  published: false,
  problem: '',
  solution: '',
  result: '',
  beforeImageUrl: '',
  afterImageUrl: ''
});
const blankPage = () => ({
  title: '',
  slug: '',
  description: '',
  body: '',
  linkLabel: '',
  linkUrl: '',
  published: false
});
function EntryEditor({
  kind,
  initial,
  onSave,
  onCancel,
  busy
}) {
  const [item, setItem] = useState(initial);
  const set = (key, value) => setItem(prev => ({
    ...prev,
    [key]: value
  }));
  const f = (key, label, type = 'text', required = false, options) => <Field key={key} label={label} type={type} value={item[key]} onChange={value => set(key, value)} required={required} options={options} />;
  return <form className="cms-form brief-card" onSubmit={e => {
    e.preventDefault();
    onSave(item);
  }}><h2>{item.id ? 'Edit' : 'Add'} {kind === 'jobs' ? 'opening' : kind === 'gallery' ? 'gallery item' : 'page'}</h2>{f('title', 'Title', 'text', true)}
 {kind === 'jobs' && <>{f('department', 'Department', 'text', true)}{f('location', 'Location', 'text', true)}{f('experience', 'Experience required', 'text', true)}{f('type', 'Employment type')}{f('shortDesc', 'Short description', 'textarea', true)}<Field label="Responsibilities (one per line)" type="textarea" value={item.responsibilities?.join('\n')} onChange={v => set('responsibilities', v.split('\n'))} />{f('status', 'Publication status', 'text', false, ['draft', 'active'])}</>}
 {kind === 'gallery' && <>{f('type', 'Media type', 'text', false, ['photo', 'video'])}{f('category', 'Category', 'text', false, ['Kaizen Events', 'Plant', 'Training', 'Events'])}{f('date', 'Date', 'date', true)}{f('caption', 'Short caption', 'textarea', true)}{item.type === 'photo' ? <ImageField label="Photo URL or upload" value={item.imageUrl} onChange={v => set('imageUrl', v)} /> : <>{f('videoUrl', 'YouTube or Vimeo link', 'url', true)}<ImageField label="Video thumbnail (optional)" value={item.thumbnailUrl} onChange={v => set('thumbnailUrl', v)} /></>}{f('featured', 'Feature on Lean & Learning page', 'checkbox')}{f('published', 'Publish on the website', 'checkbox')}<details><summary>Before / after improvement story (optional)</summary>{f('problem', 'Before: what needed improvement?', 'textarea')}{f('solution', 'What changed?', 'textarea')}{f('result', 'After: what improved?', 'textarea')}<ImageField label="Before photo" value={item.beforeImageUrl} onChange={v => set('beforeImageUrl', v)} /><ImageField label="After photo" value={item.afterImageUrl} onChange={v => set('afterImageUrl', v)} /></details></>}
 {kind === 'pages' && <>{f('slug', 'URL slug (e.g. plant-news)', 'text', true)}{f('description', 'Search description', 'textarea')}{f('body', 'Page content (separate paragraphs with a blank line)', 'textarea', true)}{f('linkLabel', 'Reference link label (optional)')}{f('linkUrl', 'Reference link URL (optional)', 'url')}{f('published', 'Publish and add to footer', 'checkbox')}</>}
 <div className="hero-actions"><button className="pill primary" disabled={busy}>{busy ? 'Saving…' : 'Save changes'}</button><button className="text-link" type="button" onClick={onCancel}>Cancel</button></div></form>;
}
const contentGroups = [['Home', [['heroTitle', 'Main heading'], ['heroDescription', 'Introduction'], ['clients', 'Customers (comma-separated)']]], ['Company & page introductions', [['aboutTitle', 'About heading'], ['aboutBody', 'About text'], ['productsIntro', 'Products introduction'], ['qualityIntro', 'Quality introduction'], ['leanIntro', 'Lean & learning introduction'], ['careersTitle', 'Careers heading'], ['careersIntro', 'Careers introduction']]], ['Corporate film', [['corporateVideoTitle', 'Film title'], ['corporateVideoDescription', 'One-line description'], ['corporateVideoUrl', 'YouTube or Vimeo link']]], ['Contact information', [['contactEmail', 'General email'], ['salesEmail', 'Sales email'], ['careersEmail', 'Careers email'], ['phone', 'Approved phone number'], ['address', 'Approved plant address'], ['mapQuery', 'Google Maps location query or coordinates']]]];
function ContentEditor({
  content,
  onSave,
  busy
}) {
  const [draft, setDraft] = useState(content);
  const set = (key, value) => setDraft(prev => ({
    ...prev,
    [key]: value
  }));
  return <form className="cms-form" onSubmit={e => {
    e.preventDefault();
    onSave(draft);
  }}><p>Publish approved company text, contacts and assets here. Leave unavailable media and contact fields blank.</p>{contentGroups.map(([title, fields]) => <fieldset className="brief-card" key={title}><legend>{title}</legend>{fields.map(([key, label]) => <Field key={key} label={label} value={draft[key]} onChange={v => set(key, v)} type={/Body|Intro|Description|heroTitle/.test(key) ? 'textarea' : 'text'} />)}</fieldset>)}<fieldset className="brief-card"><legend>Company photos</legend>{[['plantPhoto', 'Plant photo'], ['peoplePhoto', 'People photo'], ['corporateVideoThumbnail', 'Corporate film thumbnail']].map(([key, label]) => <ImageField key={key} label={label} value={draft[key]} onChange={v => set(key, v)} />)}</fieldset>{[['products', 'Product range', [['title', 'Product name'], ['description', 'Description']]], ['companyStats', 'Company numbers', [['value', 'Value'], ['label', 'Label']]], ['evpTiles', 'Career benefits', [['title', 'Title'], ['description', 'Description']]], ['certifications', 'Certifications', [['code', 'Standard'], ['title', 'Description'], ['url', 'Certificate HTTPS link (optional)'], ['logoUrl', 'Certification logo']]]].map(([key, title, fields]) => <fieldset className="brief-card" key={key}><legend>{title}</legend>{draft[key].map((row, index) => <div className="cms-list-row" key={index}>{fields.map(([field, label]) => field === 'logoUrl' ? <ImageField key={field} label={label} value={row[field]} onChange={v => set(key, draft[key].map((r, i) => i === index ? { ...r, [field]: v } : r))} /> : field === 'url' ? <CertificateField key={field} value={row[field]} onChange={v => set(key, draft[key].map((r, i) => i === index ? {
          ...r,
          [field]: v
        } : r))} /> : <Field key={field} label={label} value={row[field]} onChange={v => set(key, draft[key].map((r, i) => i === index ? {
          ...r,
          [field]: v
        } : r))} />)}<button type="button" className="danger-link" onClick={() => set(key, draft[key].filter((_, i) => i !== index))}>Remove row</button></div>)}<button type="button" className="text-link" onClick={() => set(key, [...draft[key], Object.fromEntries(fields.map(([f]) => [f, '']))])}>Add row +</button></fieldset>)}<fieldset className="brief-card"><legend>Content review</legend><p>Mark these only after your team has reviewed the content.</p>{[['evpApproved','Final EVP wording approved'],['openingsReviewed','Current openings list reviewed (including no vacancies)'],['companyFactsApproved','Company story, product range and facts approved'],['contactsApproved','Contact details and exact map location approved']].map(([key,label])=><Field key={key} label={label} type="checkbox" value={draft[key]} onChange={v=>set(key,v)}/>)}</fieldset><button className="pill primary" disabled={busy}>{busy ? 'Saving…' : 'Publish site content'}</button></form>;
}
function BulkUpload({
  run,
  onUploaded
}) {
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState('Kaizen Events');
  const [date, setDate] = useState(today());
  const [caption, setCaption] = useState('');
  return <form className="brief-card cms-form" onSubmit={e => {
    e.preventDefault();
    run(async () => {
      if (!files.length) throw new Error('Select photos first.');
      const body = new FormData();
      for (const file of files) body.append('photos', await compressPhoto(file));
      const photos = await api('/gallery/upload', {
        method: 'POST',
        body
      });
      for (const photo of photos) await api('/gallery', {
        method: 'POST',
        body: JSON.stringify({
          ...blankMedia(),
          title: photo.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
          imageUrl: photo.url,
          category,
          date,
          caption
        })
      });
      setFiles([]);
      onUploaded();
    }, 'Photos uploaded as drafts. Edit captions and publish when ready.');
  }}><h2>Bulk photo upload</h2><p>Up to 20 JPG, PNG or WebP photos. Images are resized to 1920 px and compressed before upload. New items are saved as drafts.</p><label>Select photos<input type="file" accept="image/jpeg,image/png,image/webp" multiple required onChange={e => setFiles(Array.from(e.target.files).slice(0, 20))} /></label><Field label="Category" value={category} onChange={setCategory} options={['Kaizen Events', 'Plant', 'Training', 'Events']} /><Field label="Date" value={date} onChange={setDate} type="date" required /><Field label="Shared caption (edit each item after upload)" value={caption} onChange={setCaption} required /><button className="pill primary">Upload {files.length || ''} photos as drafts</button></form>;
}
function TaskEditor({
  task,
  onSave
}) {
  const [draft, setDraft] = useState(task);
  return <form className="brief-card cms-form" onSubmit={e => {
    e.preventDefault();
    onSave(draft);
  }}><span className="eyebrow">{task.department}</span><Field label="Task" type="textarea" value={draft.task} onChange={v => setDraft({
      ...draft,
      task: v
    })} /><Field label="Owner" value={draft.assignee} onChange={v => setDraft({
      ...draft,
      assignee: v
    })} /><Field label="Due date" value={draft.deadline} onChange={v => setDraft({
      ...draft,
      deadline: v
    })} /><Field label="Status" value={draft.status} onChange={v => setDraft({
      ...draft,
      status: v
    })} options={['In Progress', 'Ready for Review', 'Completed / Live', 'Aligned']} /><Field label="Notes" type="textarea" value={draft.notes} onChange={v => setDraft({
      ...draft,
      notes: v
    })} /><button className="text-link">Save task</button></form>;
}
export function AdminCmsPage() {
  const {
    refreshData
  } = useData();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [key, setKey] = useState('');
  const [tab, setTab] = useState('overview');
  const [editor, setEditor] = useState(null);
  const [busy, setBusy] = useState(false);
  const load = async () => {
    const next = await api('/admin');
    setData(next);
    setError('');
  };
  useEffect(() => {
    load().catch(e => setError(e.message));
  }, []);
  const run = async (work, message = 'Saved.') => {
    if (busy) return;
    setBusy(true);
    setNotice('');
    setError('');
    try {
      await work();
      await load();
      await refreshData();
      setNotice(message);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };
  const saveEntry = item => run(async () => {
    await api(`/${tab}${item.id ? `/${item.id}` : ''}`, {
      method: item.id ? 'PUT' : 'POST',
      body: JSON.stringify(item)
    });
    setEditor(null);
  }, 'Changes saved.');
  const download = async url => {
    try {
      const response = await fetch(url, {
        headers: sessionStorage.getItem('nhb-admin-key') ? {
          Authorization: `Bearer ${sessionStorage.getItem('nhb-admin-key')}`
        } : {}
      });
      if (!response.ok) throw new Error('Could not download attachment.');
      const blob = await response.blob();
      const href = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = href;
      a.download = url.split('/').pop();
      a.click();
      URL.revokeObjectURL(href);
    } catch (e) {
      setError(e.message);
    }
  };
  if (!data) return <div className="brief-page"><section className="brief-page-heading wrap"><h1>Site administration</h1><p>Manage NHB content, openings, media and inquiries.</p><form className="cms-form brief-card login-form" onSubmit={e => {
        e.preventDefault();
        setAdminToken(key);
        load().catch(e => setError(e.message));
      }}><Field label="Admin password" type="password" value={key} onChange={setKey} /><button className="pill primary">Sign in</button>{error && <p role="alert" className="form-error">{error}</p>}</form></section></div>;
  return <div className="brief-page cms-page"><section className="brief-page-heading wrap"><div className="section-heading"><div><span className="eyebrow">NHB ADMINISTRATION</span><h1>Keep your website current.</h1></div><button className="text-link" onClick={() => {
          setAdminToken('');
          setData(null);
        }}>Sign out</button></div><p>{data.localMode ? 'Local development mode. Set ADMIN_TOKEN before deploying.' : 'Signed in to website administration.'}</p></section><section className="wrap brief-section"><div className="filter-row cms-tabs">{['overview', 'content', 'gallery', 'jobs', 'pages', 'inbox', 'tracker'].map(value => <button key={value} className={tab === value ? 'selected' : ''} aria-pressed={tab === value} onClick={() => {
          setTab(value);
          setEditor(null);
          setError('');
          setNotice('');
        }}>{value === 'content' ? 'Site content' : value === 'inbox' ? 'Inquiries' : value === 'tracker' ? 'Action tracker' : value}</button>)}</div><div aria-live="polite">{busy && <p role="status">Processing…</p>}{notice && <p className="form-success">{notice}</p>}{error && <p className="form-error" role="alert">{error}</p>}</div><div className={busy ? 'cms-busy' : ''}><fieldset disabled={busy} className="cms-workspace">
 {tab === 'overview' && <><div className="brief-grid three">{[['Page views', data.stats.pageViews], ['Browser sessions', data.stats.sessions], ['Contact inquiries', data.contacts.length], ['Quote requests', data.quotes.length], ['Online applications', data.applications.length], ['Published media', data.gallery.filter(g => g.published && !g.legacyDemo).length]].map(([label, value]) => <div className="brief-card" key={label}><span className="eyebrow">{label}</span><h2>{value}</h2></div>)}</div><div className="brief-card"><h2>Analytics setup</h2><p>{analyticsConfigured ? 'GA4 measurement ID configured. Verify event delivery in Google Analytics Realtime.' : 'GA4 is not connected. Add VITE_GA_MEASUREMENT_ID to the environment and rebuild to enable Google Analytics.'}</p><p>Counts above come from this website’s local event log. They are not Google Analytics reports or verified unique visitors. Time on site and engagement reports are available in GA4 after configuration.</p><h3>Views by page</h3>{Object.entries(data.stats.byPage).map(([path, count]) => <p key={path}>{path}: {count}</p>)}</div><div className="brief-card"><h2>Content needed from NHB</h2><p>Use Site content, Jobs and Gallery to add assets and record approvals. Keep the final corporate video file internally; publish its YouTube or Vimeo link here.</p><ul className="content-checklist">{[
 ['Final EVP wording',data.content.evpApproved],
 ['Reviewed current openings list',data.content.openingsReviewed],
 ['Corporate video YouTube / Vimeo link',!!data.content.corporateVideoUrl],
 ['Kaizen media with captions, dates and categories',data.gallery.some(item=>!item.legacyDemo&&item.category==='Kaizen Events'&&item.caption&&item.date)],
 ['Plant photo',!!data.content.plantPhoto],
 ['People photo',!!data.content.peoplePhoto],
 ['Certification logos',data.content.certifications.length>0&&data.content.certifications.every(cert=>cert.logoUrl)],
 ['Approved company facts, product range and figures',data.content.companyFactsApproved],
 ['Approved contacts and exact plant map location',data.content.contactsApproved]
 ].map(([label,ready])=><li key={label}><span>{label}</span><strong className={ready?'content-added':'content-needed'}>{ready?'Recorded':'Needed'}</strong></li>)}</ul></div></>}
 {tab === 'content' && <ContentEditor content={data.content} busy={busy} onSave={value => run(() => api('/content', {
            method: 'PUT',
            body: JSON.stringify(value)
          }), 'Site content published.')} />}
 {['gallery', 'jobs', 'pages'].includes(tab) && <>{editor ? <EntryEditor key={editor.id || tab} kind={tab} initial={editor} onSave={saveEntry} onCancel={() => setEditor(null)} busy={busy} /> : <><div className="hero-actions cms-actions"><button className="pill primary" onClick={() => setEditor(tab === 'jobs' ? blankJob() : tab === 'gallery' ? blankMedia() : blankPage())}>Add {tab === 'jobs' ? 'opening' : tab === 'gallery' ? 'photo / video' : 'page'} +</button></div>{tab === 'gallery' && <BulkUpload run={run} onUploaded={() => {}} />}<div className={tab === 'gallery' ? 'media-grid' : 'job-list'}>{data[tab].map(item => <article className="brief-card" key={item.id}>{tab === 'gallery' && <MediaThumbnail item={item} />}<span className="eyebrow">{item.legacyDemo ? 'Legacy demo · unpublished' : tab === 'jobs' ? item.status : item.published ? 'Published' : 'Draft'}</span><h2>{item.title}</h2><p>{item.shortDesc || item.caption || `/${item.slug}`}</p><div className="hero-actions"><button className="text-link" onClick={() => setEditor(item)}>Edit</button><button className="danger-link" onClick={() => {
                      if (confirm(`Remove “${item.title}” from the website?`)) run(() => api(`/${tab}/${item.id}`, {
                        method: 'DELETE'
                      }), 'Item removed.');
                    }}>Remove</button></div></article>)}</div>{!data[tab].length && <p>No items yet. Add your first {tab === 'gallery' ? 'photo or video' : tab === 'jobs' ? 'opening' : 'page'} above.</p>}</>}</>}
 {tab === 'inbox' && <>{[['Contact messages', data.contacts], ['Quote requests', data.quotes], ['Online applications', data.applications]].map(([title, entries]) => <section className="brief-section" key={title}><h2>{title}</h2>{!entries.length && <p>No submissions yet.</p>}<div className="job-list">{entries.map(entry => <article className="brief-card" key={entry.id}><h3>{entry.name || entry.companyName || entry.applicantName}</h3><a href={`mailto:${entry.email}`} className="text-link">{entry.email}</a><p>{entry.subject || entry.jobTitle || entry.application} · {entry.createdAt}</p>{Object.entries(entry).filter(([k, v]) => v && !['id', 'name', 'companyName', 'applicantName', 'email', 'createdAt', 'drawingUrl', 'resumeUrl'].includes(k)).map(([k, v]) => <p key={k}><strong>{k.replace(/([A-Z])/g, ' $1')}: </strong>{String(v)}</p>)}{(entry.drawingUrl || entry.resumeUrl) && <button className="text-link" onClick={() => download(entry.drawingUrl || entry.resumeUrl)}>Download attachment</button>}</article>)}</div></section>)}</>}
 {tab === 'tracker' && <><p>The Oct 27 summary and detailed notes assign Sales and Lean owners differently. Confirm internally and edit the owners below. The referenced upcoming Monday is November 2, 2026.</p><div className="brief-grid two">{data.actionTracker.map(task => <TaskEditor key={task.id} task={task} onSave={value => run(() => api(`/action-tracker/${task.id}`, {
                method: 'PUT',
                body: JSON.stringify(value)
              }), 'Task updated.')} />)}</div></>}
 </fieldset></div></section></div>;
}
