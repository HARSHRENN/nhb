import express from 'express';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID, timingSafeEqual } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { defaultContent, pageMeta } from '../src/data/siteContent.js';
import { videoEmbedUrl, mediaUrl } from '../src/lib/media.js';
const root = path.dirname(fileURLToPath(import.meta.url));
const dataDir = process.env.DATA_DIR || path.join(root, 'data');
const uploadsDir = path.join(dataDir, 'uploads');
const privateDir = path.join(dataDir, 'private');
for (const dir of [dataDir, uploadsDir, privateDir]) fs.mkdirSync(dir, {
  recursive: true
});
const dbPath = path.join(dataDir, 'db.json');
let db = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath, 'utf8')) : {};
// Migrate the old demo data without deleting records or publishing sample assets.
if (!db.briefVersion) {
  if (fs.existsSync(dbPath) && !fs.existsSync(path.join(dataDir, 'db.pre-brief.json'))) fs.copyFileSync(dbPath, path.join(dataDir, 'db.pre-brief.json'), fs.constants.COPYFILE_EXCL);
  for (const key of ['jobs', 'gallery', 'quotes', 'applications', 'articles', 'reviews']) {
    db[key] = (db[key] || []).map(item => ({
      ...item,
      ...(key === 'jobs' ? {
        status: 'draft'
      } : {}),
      published: false,
      legacyDemo: true
    }));
  }
  db.analytics = {
    pageViews: 0,
    sessions: [],
    byPage: {},
    recentEvents: []
  };
  db.briefVersion = 1;
}
db.content = {
  ...defaultContent,
  ...db.content
};
db.pages ||= [];
db.contacts ||= [];
db.actionTracker ||= [{
  id: 'sales',
  department: 'Sales',
  assignee: 'To confirm: Ravi / Vikas',
  task: 'Product information, images, customer references and approved specifications',
  deadline: '2026-11-02',
  status: 'In Progress',
  notes: 'Meeting summary and detailed notes disagree on Sales and Lean ownership. Confirm internally.'
}, {
  id: 'lean',
  department: 'Lean',
  assignee: 'To confirm: Ravi / Vikas',
  task: 'Plant photos, corporate video, Kaizen before/after stories and learning content',
  deadline: '2026-11-02',
  status: 'In Progress',
  notes: 'Provide approved assets, dates and captions.'
}, {
  id: 'hr',
  department: 'HR',
  assignee: 'HR',
  task: 'Approved EVP wording, current openings and regional lifestyle content',
  deadline: '2026-11-02',
  status: 'In Progress',
  notes: 'Confirm the current vacancies before publication.'
}, {
  id: 'assets',
  department: 'Review',
  assignee: 'Arjun Mehta',
  task: 'Consolidate assets and send for website review',
  deadline: '2026-11-02',
  status: 'In Progress',
  notes: 'Upcoming Monday following the Oct 27 meeting.'
}];
const save = () => {
  const tmp = dbPath + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
  fs.renameSync(tmp, dbPath);
};
save();
const app = express();
app.use(express.json({
  limit: '1mb'
}));
app.use('/uploads', express.static(uploadsDir, {
  setHeaders: res => res.setHeader('X-Content-Type-Options', 'nosniff')
}));
const admin = (req, res, next) => {
  const token = process.env.ADMIN_TOKEN;
  if (!token && process.env.NODE_ENV !== 'production' && ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(req.socket.remoteAddress)) return next();
  if (!token) return res.status(503).json({
    error: 'Set ADMIN_TOKEN on the server to enable administration.'
  });
  const sent = Buffer.from((req.headers.authorization || '').replace(/^Bearer /, ''));
  const expected = Buffer.from(token);
  if (sent.length !== expected.length || !timingSafeEqual(sent, expected)) return res.status(401).json({
    error: 'Sign in with your admin password.'
  });
  next();
};
const id = prefix => `${prefix}-${randomUUID()}`;
const fail = (message, status = 400) => Object.assign(new Error(message), {
  status
});
const emailValid = value => typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const requireText = (body, keys) => {
  for (const key of keys) if (typeof body[key] !== 'string' || !body[key].trim()) throw fail(`${key} is required.`);
};
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024,
    files: 20
  }
});
const record = (collection, item) => {
  db[collection].unshift(item);
  save();
  return item;
};
app.get('/api/health', (req, res) => res.json({
  status: 'ok'
}));
app.get('/api/content', (req, res) => res.json(db.content));
app.put('/api/content', admin, (req, res, next) => {
  try {
    const c = {
      ...db.content,
      ...req.body
    };
    if (c.corporateVideoUrl && !videoEmbedUrl(c.corporateVideoUrl)) throw fail('Use a valid YouTube or Vimeo link.');
    for (const key of ['corporateVideoThumbnail', 'peoplePhoto', 'plantPhoto']) if (c[key] && !mediaUrl(c[key])) throw fail(`Invalid ${key} URL.`);
    for (const key of ['contactEmail', 'careersEmail', 'salesEmail']) if (c[key] && !emailValid(c[key])) throw fail(`Invalid ${key}.`);
    if (!Array.isArray(c.products) || !Array.isArray(c.companyStats) || !Array.isArray(c.evpTiles) || !Array.isArray(c.certifications)) throw fail('Invalid content lists.');
    for (const cert of c.certifications) {
      if (cert.url && !mediaUrl(cert.url)) throw fail('Use an HTTPS or uploaded certificate link.');
      if (cert.logoUrl && !mediaUrl(cert.logoUrl)) throw fail('Use an HTTPS or uploaded certification logo.');
    }
    db.content = c;
    save();
    res.json(c);
  } catch (e) {
    next(e);
  }
});
app.get('/api/jobs', (req, res) => res.json(db.jobs.filter(j => j.status === 'active' && !j.legacyDemo)));
app.get('/api/gallery', (req, res) => res.json(db.gallery.filter(g => g.published && !g.legacyDemo)));
app.get('/api/pages', (req, res) => res.json(db.pages.filter(p => p.published)));
app.get('/api/admin', admin, (req, res) => res.json({
  jobs: db.jobs,
  gallery: db.gallery,
  pages: db.pages,
  content: db.content,
  contacts: db.contacts,
  quotes: db.quotes.filter(q => !q.legacyDemo),
  applications: db.applications.filter(a => !a.legacyDemo),
  actionTracker: db.actionTracker,
  stats: {
    pageViews: db.analytics.pageViews || 0,
    sessions: db.analytics.sessions?.length || 0,
    byPage: db.analytics.byPage || {},
    recentEvents: db.analytics.recentEvents || []
  },
  localMode: !process.env.ADMIN_TOKEN
}));
const validateJob = b => {
  requireText(b, ['title', 'department', 'location', 'experience', 'shortDesc']);
  return {
    title: b.title,
    department: b.department,
    location: b.location,
    experience: b.experience,
    shortDesc: b.shortDesc,
    responsibilities: Array.isArray(b.responsibilities) ? b.responsibilities : [],
    type: b.type || 'Full Time',
    status: b.status === 'active' ? 'active' : 'draft',
    legacyDemo: false
  };
};
const validateGallery = b => {
  requireText(b, ['title', 'caption', 'date']);
  if (!['photo', 'video'].includes(b.type)) throw fail('Select photo or video.');
  if (!['Kaizen Events', 'Plant', 'Training', 'Events'].includes(b.category)) throw fail('Select a gallery category.');
  if (b.type === 'video' && !videoEmbedUrl(b.videoUrl)) throw fail('Use a YouTube or Vimeo video link.');
  if (b.type === 'photo' && !mediaUrl(b.imageUrl)) throw fail('Upload a photo or provide an HTTPS image URL.');
  for (const key of ['thumbnailUrl', 'beforeImageUrl', 'afterImageUrl']) if (b[key] && !mediaUrl(b[key])) throw fail(`Invalid ${key}.`);
  return {
    type: b.type,
    title: b.title,
    caption: b.caption,
    date: b.date,
    category: b.category,
    imageUrl: mediaUrl(b.imageUrl),
    videoUrl: videoEmbedUrl(b.videoUrl),
    thumbnailUrl: mediaUrl(b.thumbnailUrl),
    beforeImageUrl: mediaUrl(b.beforeImageUrl),
    afterImageUrl: mediaUrl(b.afterImageUrl),
    problem: b.problem || '',
    solution: b.solution || '',
    result: b.result || '',
    featured: !!b.featured,
    published: !!b.published,
    legacyDemo: false
  };
};
const validatePage = b => {
  requireText(b, ['title', 'slug', 'body']);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(b.slug) || ['home', 'about', 'products', 'quality', 'lean-culture', 'gallery', 'careers', 'contact', 'admin'].includes(b.slug)) throw fail('Choose a unique lowercase page slug.');
  if (b.linkUrl && !mediaUrl(b.linkUrl)) throw fail('Reference links must use HTTPS.');
  return {
    title: b.title,
    slug: b.slug,
    body: b.body,
    description: b.description || '',
    linkUrl: mediaUrl(b.linkUrl),
    linkLabel: b.linkLabel || 'Read more',
    published: !!b.published
  };
};
for (const [collection, validate] of [['jobs', validateJob], ['gallery', validateGallery], ['pages', validatePage]]) {
  app.post(`/api/${collection}`, admin, (req, res, next) => {
    try {
      const item = validate(req.body);
      if (collection === 'pages' && db.pages.some(p => p.slug === item.slug)) throw fail('This page slug already exists.');
      res.status(201).json(record(collection, {
        ...item,
        id: id(collection)
      }));
    } catch (e) {
      next(e);
    }
  });
  app.put(`/api/${collection}/:id`, admin, (req, res, next) => {
    try {
      const index = db[collection].findIndex(x => x.id === req.params.id);
      if (index < 0) throw fail('Item not found.', 404);
      const item = validate({
        ...db[collection][index],
        ...req.body
      });
      if (collection === 'pages' && db.pages.some(p => p.slug === item.slug && p.id !== req.params.id)) throw fail('This page slug already exists.');
      db[collection][index] = {
        ...item,
        id: req.params.id
      };
      save();
      res.json(db[collection][index]);
    } catch (e) {
      next(e);
    }
  });
  app.delete(`/api/${collection}/:id`, admin, (req, res) => {
    db[collection] = db[collection].filter(x => x.id !== req.params.id);
    save();
    res.json({
      success: true
    });
  });
}
app.post('/api/gallery/upload', admin, upload.array('photos', 20), (req, res, next) => {
  try {
    if (!req.files?.length) throw fail('Select at least one photo.');
    // Validate the whole batch before writing any files.
    const checked = req.files.map(file => {
      const b = file.buffer;
      let ext = '';
      if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) ext = '.jpg';
      if (b.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) ext = '.png';
      if (b.subarray(0, 4).toString() === 'RIFF' && b.subarray(8, 12).toString() === 'WEBP') ext = '.webp';
      if (!ext) throw fail('Only JPG, PNG and WebP images are supported.');
      return {
        file,
        ext
      };
    });
    res.status(201).json(checked.map(({
      file,
      ext
    }) => {
      const name = randomUUID() + ext;
      fs.writeFileSync(path.join(uploadsDir, name), file.buffer);
      return {
        url: `/uploads/${name}`,
        name: file.originalname
      };
    }));
  } catch (e) {
    next(e);
  }
});
app.post('/api/documents/upload', admin, upload.single('document'), (req, res, next) => {
  try {
    if (!req.file || req.file.buffer.subarray(0, 5).toString() !== '%PDF-') throw fail('Upload a PDF certificate.');
    const name = randomUUID() + '.pdf';
    fs.writeFileSync(path.join(uploadsDir, name), req.file.buffer);
    res.status(201).json({
      url: `/uploads/${name}`
    });
  } catch (e) {
    next(e);
  }
});
app.put('/api/action-tracker/:id', admin, (req, res, next) => {
  try {
    const item = db.actionTracker.find(x => x.id === req.params.id);
    if (!item) throw fail('Task not found.', 404);
    for (const key of ['assignee', 'deadline', 'status', 'notes', 'task']) if (typeof req.body[key] === 'string') item[key] = req.body[key];
    save();
    res.json(item);
  } catch (e) {
    next(e);
  }
});
app.post('/api/contact', (req, res, next) => {
  try {
    requireText(req.body, ['name', 'email', 'message']);
    if (!emailValid(req.body.email)) throw fail('Enter a valid email.');
    const {
      name,
      email,
      phone,
      subject,
      message
    } = req.body;
    const item = record('contacts', {
      id: id('contact'),
      name,
      email,
      phone,
      subject,
      message,
      createdAt: new Date().toISOString()
    });
    res.status(201).json({
      success: true,
      id: item.id
    });
  } catch (e) {
    next(e);
  }
});
for (const [route, collection, fileField, required, extensions] of [['quotes', 'quotes', 'drawingFile', ['companyName', 'email'], ['.pdf', '.dwg', '.dxf', '.step', '.stp']], ['applications', 'applications', 'resumeFile', ['applicantName', 'email'], ['.pdf', '.doc', '.docx']]]) app.post(`/api/${route}`, upload.single(fileField), (req, res, next) => {
  try {
    requireText(req.body, required);
    if (!emailValid(req.body.email)) throw fail('Enter a valid email.');
    const item = {
      ...req.body,
      id: id(route),
      status: 'New',
      createdAt: new Date().toISOString()
    };
    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      if (!extensions.includes(ext)) throw fail('Unsupported attachment type.');
      const name = randomUUID() + ext;
      fs.writeFileSync(path.join(privateDir, name), req.file.buffer);
      item[fileField === 'drawingFile' ? 'drawingFileName' : 'resumeFileName'] = req.file.originalname;
      item[fileField === 'drawingFile' ? 'drawingUrl' : 'resumeUrl'] = `/api/files/${name}`;
    }
    record(collection, item);
    res.status(201).json({
      success: true,
      [route === 'quotes' ? 'quote' : 'application']: item
    });
  } catch (e) {
    next(e);
  }
});
app.get('/api/files/:name', admin, (req, res) => {
  if (!/^[\w.-]+$/.test(req.params.name)) return res.sendStatus(400);
  res.download(path.join(privateDir, req.params.name));
});
app.post('/api/stats/track-view', (req, res) => {
  const page = String(req.body.path || '/').slice(0, 100);
  const session = String(req.body.session || '').slice(0, 80);
  db.analytics.pageViews = (db.analytics.pageViews || 0) + 1;
  db.analytics.byPage ||= {};
  db.analytics.byPage[page] = (db.analytics.byPage[page] || 0) + 1;
  db.analytics.sessions ||= [];
  if (session && !db.analytics.sessions.includes(session)) db.analytics.sessions.push(session);
  db.analytics.recentEvents = [{
    type: 'page_view',
    path: page,
    timestamp: new Date().toISOString()
  }, ...(db.analytics.recentEvents || [])].slice(0, 50);
  save();
  res.json({
    success: true
  });
});
const dist = path.join(root, '../dist');
const origin = (process.env.SITE_URL || 'https://nhbball.com').replace(/\/$/, '');
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
})[c]);
app.get('/robots.txt', (req, res) => res.type('text/plain').send(`User-agent: *\nDisallow: /admin\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`));
app.get('/sitemap.xml', (req, res) => res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['', ...Object.keys(pageMeta).filter(p => !['home', 'admin'].includes(p)), ...db.pages.filter(p => p.published).map(p => p.slug)].map(slug => `<url><loc>${escapeHtml(origin + '/' + slug)}</loc></url>`).join('')}</urlset>`));
app.use(express.static(dist, {
  index: false
}));
app.get(/^\/(?!api\/|uploads\/).*/, (req, res) => {
  const slug = req.path.replace(/^\/|\/$/g, '') || 'home';
  const custom = db.pages.find(p => p.published && p.slug === slug);
  const meta = pageMeta[slug] || (custom ? [`${custom.title} | NHB`, custom.description] : ['Page not found | NHB', 'The requested page was not found.']);
  let html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
  html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(meta[0])}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(meta[1])}" />`);
  const found = !!(pageMeta[slug] || custom);
  html = html.replace('</head>', `<link rel="canonical" href="${escapeHtml(origin + (slug === 'home' ? '/' : '/' + slug))}"/><meta name="robots" content="${slug === 'admin' || !found ? 'noindex,nofollow' : 'index,follow'}"/></head>`);
  res.status(found ? 200 : 404).type('html').send(html);
});
app.use((error, req, res, next) => {
  console.error(error.message);
  res.status(error.status || 400).json({
    error: error.code === 'LIMIT_FILE_SIZE' ? 'File exceeds 25 MB.' : error.message || 'Request failed.'
  });
});
const port = Number(process.env.PORT || 3001);
const server = app.listen(port, process.env.HOST || '127.0.0.1', error => {
  if (error) return;
  console.log(`NHB API running on http://127.0.0.1:${server.address().port}`);
});
server.on('error', error => {
  console.error(error.message);
  process.exit(1);
});
