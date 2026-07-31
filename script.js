/* ============================================================
   script.js — admin login + PM-VIKAS calendar
   Works two ways:
   - Deployed on Vercel: talks to /api/login and /api/calendar,
     which check the real ADMIN_PASSWORD env var and read/write
     Vercel KV. This is the persistent, multi-visitor source of truth.
   - Opened locally (double-click index.html, or Live Server):
     there is no backend to call, so it falls back to the local
     password in data.js and stores calendar edits in this
     browser's localStorage, so edits still persist across reloads.
   Either way the UI, login flow and edit flow look identical.
   ============================================================ */

/* ============================================================
   IMAGE FALLBACK — never show a broken-image icon.
   Delegated at the document level (capture phase, since the
   `error` event doesn't bubble) so it also covers images that
   get rendered dynamically later, like the certificate grid.
   ============================================================ */
(function () {
  const FALLBACK_SRC = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150">' +
    '<rect width="200" height="150" fill="#0B1220"/>' +
    '<g stroke="#5B6B85" stroke-width="2" fill="none">' +
    '<rect x="34" y="34" width="132" height="82" rx="6"/>' +
    '<circle cx="66" cy="64" r="10"/>' +
    '<path d="M34 104l38-30 26 20 30-26 38 32" stroke-linejoin="round" stroke-linecap="round"/>' +
    '</g></svg>'
  );

  document.addEventListener('error', function (e) {
    const el = e.target;
    if (!el || el.tagName !== 'IMG' || el.dataset.fallbackApplied || el.dataset.customFallback) return;
    el.dataset.fallbackApplied = 'true';
    el.src = FALLBACK_SRC;
    el.classList.add('img-fallback');
    if (!el.alt) el.alt = 'Image unavailable';
  }, true);
})();

/* ============================================================
   PORTFOLIO-DATA RENDERING — certificate grid + project cards,
   both sourced from PORTFOLIO in portfolio-data.js so neither
   section ever needs hand-edited HTML again.
   ============================================================ */
(function () {
  if (typeof PORTFOLIO === 'undefined') return;

  function initials(title) {
    return title.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
  }

  // ---------- certificate grid (index.html #certGrid) ----------
  function renderCertGrid() {
    const grid = document.getElementById('certGrid');
    if (!grid || !PORTFOLIO.certificates) return;

    grid.innerHTML = '';
    PORTFOLIO.certificates.forEach((cert) => {
      const card = document.createElement('a');
      card.className = 'cert-card';
      card.dataset.category = cert.category;
      card.href = cert.file;
      card.target = '_blank';
      card.rel = 'noopener';

      const img = document.createElement('img');
      img.dataset.customFallback = 'true'; // opt out of the generic image fallback below
      img.src = cert.thumb;
      img.alt = cert.title + ' thumbnail';
      img.loading = 'lazy';
      img.addEventListener('error', function onErr() {
        if (img.dataset.fallbackApplied) return;
        img.dataset.fallbackApplied = 'true';
        card.classList.add('no-thumb');
        const icon = document.createElement('div');
        icon.className = 'cert-card-icon';
        icon.textContent = initials(cert.title);
        img.replaceWith(icon);
      });

      const body = document.createElement('div');
      body.className = 'cert-card-body';
      body.innerHTML = `<b>${cert.title}</b><span>${cert.subtitle}</span>`;

      card.append(img, body);
      grid.appendChild(card);
    });

    // Re-apply the currently active filter (grid was just rebuilt)
    const activeBtn = document.querySelector('.cert-filter-btn.active');
    const filter = activeBtn ? activeBtn.dataset.filter : 'all';
    grid.querySelectorAll('.cert-card').forEach((card) => {
      card.classList.toggle('filtered-out', !(filter === 'all' || card.dataset.category === filter));
    });
  }

  // ---------- featured projects (projects.html) ----------
  // Only repos listed in PORTFOLIO.featuredProjects ever appear here —
  // nothing is pulled automatically from the GitHub account.
  function renderFeaturedProjects() {
    renderProjectSection('featuredProjectsRoot', PORTFOLIO.projectCategories, PORTFOLIO.featuredProjects);
  }

  // ---------- PM-VIKAS projects (pmvikas.html only) ----------
  // Same rendering engine as above, pointed at the separate
  // pmVikasProjectCategories / pmVikasProjects lists so these never
  // leak onto projects.html or the index.html "Projects" section.
  function renderPmVikasProjects() {
    renderProjectSection('pmVikasProjectsRoot', PORTFOLIO.pmVikasProjectCategories, PORTFOLIO.pmVikasProjects);
  }

  // ---------- shared project-grid renderer ----------
  // rootId    — id of the container element to render into
  // categories — array of { key, icon, title, description }
  // allProjects — array of project objects (see portfolio-data.js for field reference)
  function renderProjectSection(rootId, categories, allProjects) {
    const root = document.getElementById(rootId);
    if (!root || !categories || !allProjects) return;

    const username = PORTFOLIO.profile.githubUsername;
    const byCategory = {};
    allProjects.forEach((p) => {
      (byCategory[p.category] = byCategory[p.category] || []).push(p);
    });

    root.innerHTML = '';
    const cardEls = []; // { el, project } — for the async GitHub-existence check below

    categories.forEach((cat) => {
      const projects = byCategory[cat.key] || [];

      const section = document.createElement('section');
      section.className = 'project-category';
      section.id = 'projects-' + cat.key;

      const head = document.createElement('div');
      head.className = 'section-head';
      head.innerHTML = `
        <div>
          <span class="eyebrow">${cat.icon} ${cat.title}</span>
          <h2>${cat.title}</h2>
          <p class="project-category-desc">${cat.description}</p>
        </div>
        <span class="section-index">${String(projects.length).padStart(2, '0')} ${projects.length === 1 ? 'project' : 'projects'}</span>
      `;
      section.appendChild(head);

      if (projects.length === 0) {
        const soon = document.createElement('div');
        soon.className = 'coming-soon';
        soon.innerHTML = `<span class="eyebrow">Coming soon</span><br>No projects in this category yet — add one to <code>featuredProjects</code> in <code>portfolio-data.js</code> and it'll appear here, numbered 01 automatically.`;
        section.appendChild(soon);
        root.appendChild(section);
        return;
      }

      const grid = document.createElement('div');
      grid.className = 'card-grid featured-project-grid';

      projects.forEach((project, i) => {
        const number = String(i + 1).padStart(2, '0');
        // Projects can live as separate repos, OR as subfolders inside one
        // shared repo (set `repoPath` to the folder name in that case).
        const branch = project.repoBranch || 'main';
        const repoUrl = project.repoPath
          ? `https://github.com/${username}/${project.githubRepo}/tree/${branch}/${project.repoPath}`
          : `https://github.com/${username}/${project.githubRepo}`;

        // A project can set its own `icon` (matched to its specific
        // hardware, e.g. 🌡️ for a temperature sensor) — falls back to
        // the category icon when not set.
        const icon = project.icon || cat.icon;

        const card = document.createElement('div');
        card.className = 'card project-card featured-project-card';

        const img = document.createElement('div');
        img.className = 'featured-project-thumb';
        if (project.image) {
          const imgEl = document.createElement('img');
          imgEl.dataset.customFallback = 'true'; // opt out of the generic image fallback
          imgEl.src = project.image;
          imgEl.alt = project.title + ' thumbnail';
          imgEl.loading = 'lazy';
          imgEl.addEventListener('error', function onErr() {
            if (imgEl.dataset.fallbackApplied) return;
            imgEl.dataset.fallbackApplied = 'true';
            img.classList.add('no-image');
            img.textContent = icon;
          });
          img.appendChild(imgEl);
        } else {
          img.classList.add('no-image');
          img.textContent = icon;
        }

        const body = document.createElement('div');
        body.className = 'featured-project-body';
        body.innerHTML = `
          <span class="project-tag">${icon} ${number} — ${cat.title.replace(' Projects', '').replace(' & Output', '')}</span>
          <h3>${number} — ${project.title}</h3>
          <p class="project-desc">${project.description || ''}</p>
        `;

        const actions = document.createElement('div');
        actions.className = 'featured-project-actions';

        const viewBtn = document.createElement('button');
        viewBtn.type = 'button';
        viewBtn.className = 'btn-secondary';
        viewBtn.innerHTML = '<i class="fa-solid fa-eye" aria-hidden="true"></i> View Project';
        viewBtn.addEventListener('click', () => {
          if (project.detailPage) {
            window.location.href = project.detailPage;
          } else {
            openProjectModal(project, cat, number, repoUrl, icon);
          }
        });

        const ghBtn = document.createElement('a');
        ghBtn.className = 'btn-primary';
        ghBtn.href = repoUrl;
        ghBtn.target = '_blank';
        ghBtn.rel = 'noopener';
        ghBtn.innerHTML = '<i class="fa-brands fa-github" aria-hidden="true"></i> View on GitHub';

        actions.append(viewBtn, ghBtn);
        body.appendChild(actions);

        const repoBadge = document.createElement('span');
        repoBadge.className = 'repo-status-badge';
        repoBadge.hidden = true;
        body.appendChild(repoBadge);

        card.append(img, body);
        grid.appendChild(card);
        cardEls.push({ badge: repoBadge, project });
      });

      section.appendChild(grid);
      root.appendChild(section);
    });

    // Best-effort check that each configured repo (and, if set, the exact
    // subfolder) actually exists and is public — uses the unauthenticated
    // public GitHub API (no token, no credentials, generous enough for a
    // portfolio's traffic). Silently does nothing if the request fails
    // (offline, rate-limited, etc.) so it never blocks or breaks the page.
    cardEls.forEach(({ badge, project }) => {
      const checkUrl = project.repoPath
        ? `https://api.github.com/repos/${username}/${project.githubRepo}/contents/${project.repoPath}`
        : `https://api.github.com/repos/${username}/${project.githubRepo}`;
      fetch(checkUrl)
        .then((res) => {
          if (!res.ok) {
            badge.hidden = false;
            badge.textContent = project.repoPath
              ? `GitHub folder "${project.repoPath}" not found in ${project.githubRepo} — check repoPath in portfolio-data.js`
              : 'GitHub repo not found — check the name in portfolio-data.js';
          }
        })
        .catch(() => { /* offline / rate-limited — fail silently */ });
    });
  }

  // ---------- shared "View Project" detail modal ----------
  let projectModalEl = null;
  function openProjectModal(project, cat, number, repoUrl, icon) {
    icon = icon || project.icon || cat.icon;
    if (!projectModalEl) {
      projectModalEl = document.createElement('div');
      projectModalEl.className = 'project-modal-backdrop';
      projectModalEl.innerHTML = `
        <div class="project-modal" role="dialog" aria-modal="true">
          <button type="button" class="project-modal-close" aria-label="Close">&times;</button>
          <div class="project-modal-content"></div>
        </div>
      `;
      document.body.appendChild(projectModalEl);
      projectModalEl.addEventListener('click', (e) => {
        if (e.target === projectModalEl) closeProjectModal();
      });
      projectModalEl.querySelector('.project-modal-close').addEventListener('click', closeProjectModal);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModalEl.classList.contains('open')) closeProjectModal();
      });
    }

    const media = [project.circuitImage, project.outputImage].filter(Boolean);
    const mediaHtml = media.length ? `
      <div class="project-modal-media">
        ${project.circuitImage ? `<figure><img src="${project.circuitImage}" alt="${project.title} circuit diagram" loading="lazy"><figcaption>Circuit Diagram</figcaption></figure>` : ''}
        ${project.outputImage ? `<figure><img src="${project.outputImage}" alt="${project.title} output" loading="lazy"><figcaption>Output</figcaption></figure>` : ''}
      </div>
    ` : `<div class="project-modal-media no-media"><span>${icon}</span><p>No circuit/output images added yet for this project.</p></div>`;

    projectModalEl.querySelector('.project-modal-content').innerHTML = `
      <span class="project-tag">${icon} ${number} — ${cat.title}</span>
      <h3>${project.title}</h3>
      <p class="project-desc">${project.description || ''}</p>
      ${mediaHtml}
      <a class="btn-primary" href="${repoUrl}" target="_blank" rel="noopener" style="margin-top:18px;">
        <i class="fa-brands fa-github" aria-hidden="true"></i> View on GitHub
      </a>
    `;
    projectModalEl.classList.add('open');
    document.body.classList.add('modal-open');
  }
  function closeProjectModal() {
    if (!projectModalEl) return;
    projectModalEl.classList.remove('open');
    document.body.classList.remove('modal-open');
  }

  // ---------- profile-driven links (contact chips, resume, footer) ----------
  function applyProfileFields() {
    const p = PORTFOLIO.profile;
    if (!p) return;
    document.querySelectorAll('[data-field="email-href"]').forEach((el) => { el.href = 'mailto:' + p.email; });
    document.querySelectorAll('[data-field="phone-href"]').forEach((el) => { el.href = 'tel:' + p.phoneHref; });
    document.querySelectorAll('[data-field="github-href"]').forEach((el) => { el.href = p.github; });
    document.querySelectorAll('[data-field="github-repos-href"]').forEach((el) => { el.href = p.githubRepos; });
    document.querySelectorAll('[data-field="linkedin-href"]').forEach((el) => { el.href = p.linkedin; });
    document.querySelectorAll('[data-field="resume-href"]').forEach((el) => { el.href = p.resume; });
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyProfileFields();
    renderCertGrid();
    renderFeaturedProjects();
    renderPmVikasProjects();
  });
})();

(function () {
  const TOKEN_KEY = 'sc_admin_token';
  const MODE_KEY = 'sc_admin_mode'; // 'server' | 'firebase' | 'local'
  let backendAvailable = null; // null = unknown, true/false once checked

  function getToken() { return sessionStorage.getItem(TOKEN_KEY); }
  function setToken(t) { sessionStorage.setItem(TOKEN_KEY, t); }
  function clearToken() { sessionStorage.removeItem(TOKEN_KEY); }
  function isAdmin() { return !!getToken(); }
  function getMode() { return sessionStorage.getItem(MODE_KEY) || 'local'; }
  function setMode(m) { sessionStorage.setItem(MODE_KEY, m); }

  window.ScAuth = { getToken, isAdmin, clearToken };

  // ---------- detect whether /api is reachable (Vercel deployment) ----------
  async function checkBackend() {
    if (backendAvailable !== null) return backendAvailable;
    if (location.protocol === 'file:') { backendAvailable = false; return false; }
    try {
      const res = await fetch('/api/calendar', { method: 'GET' });
      backendAvailable = res.ok;
    } catch (e) {
      backendAvailable = false;
    }
    return backendAvailable;
  }

  // ---------- Firebase (GitHub Pages fallback for shared calendar saves) ----------
  // Only activates once firebase-config.js has been filled in with a real
  // project — see that file's comments for setup steps. Until then, every
  // function below is a safe no-op and the site behaves exactly as before.
  let firebaseApp = null;
  let firebaseReady = false;
  function isFirebaseConfigured() {
    return typeof FIREBASE_CONFIG !== 'undefined'
      && typeof firebase !== 'undefined'
      && !!FIREBASE_CONFIG.apiKey
      && !!FIREBASE_CONFIG.projectId
      && !!FIREBASE_ADMIN_EMAIL;
  }
  function getFirebase() {
    if (!isFirebaseConfigured()) return null;
    if (!firebaseReady) {
      try {
        firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
        firebaseReady = true;
      } catch (e) {
        return null; // bad config, offline, etc. — callers fall back to local
      }
    }
    return { auth: firebase.auth(), db: firebase.firestore() };
  }

  // ---------- login ----------
  async function doLogin(password) {
    const online = await checkBackend();
    if (online) {
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        });
        const json = await res.json();
        if (json.ok) { setToken(json.token); setMode('server'); return { ok: true, mode: 'server' }; }
        return { ok: false, message: json.message || 'Incorrect password.' };
      } catch (e) {
        // fall through to Firebase/local check if the request itself failed
      }
    }

    // Firebase tier (GitHub Pages, once firebase-config.js is filled in)
    const fb = getFirebase();
    if (fb) {
      try {
        const cred = await fb.auth.signInWithEmailAndPassword(FIREBASE_ADMIN_EMAIL, password);
        setToken('firebase-' + cred.user.uid);
        setMode('firebase');
        return { ok: true, mode: 'firebase' };
      } catch (e) {
        // wrong password against Firebase — don't also try the local
        // password, that would let the weaker local password bypass a
        // configured real backend.
        return { ok: false, message: 'Incorrect password.' };
      }
    }

    // local fallback (no backend configured at all — plain static hosting)
    if (password === APP_CONFIG.LOCAL_ADMIN_PASSWORD) {
      setToken('local-' + Date.now());
      setMode('local');
      return { ok: true, mode: 'local' };
    }
    return { ok: false, message: 'Incorrect password.' };
  }

  document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const statusEl = document.getElementById('adminStatus');
    const pop = document.getElementById('loginPop');
    const form = document.getElementById('loginForm');
    const pwInput = document.getElementById('pwInput');
    const msgEl = document.getElementById('loginMsg');
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    function refreshUI() {
      const admin = isAdmin();
      if (statusEl) statusEl.classList.toggle('show', admin);
      if (logoutBtn) logoutBtn.classList.toggle('show', admin);
      if (loginBtn) loginBtn.style.display = admin ? 'none' : 'inline-block';
      document.body.classList.toggle('is-admin', admin);
      window.dispatchEvent(new CustomEvent('sc-auth-change', { detail: { admin } }));
    }

    if (loginBtn && pop) {
      loginBtn.addEventListener('click', () => {
        pop.classList.toggle('show');
        if (pop.classList.contains('show')) pwInput && pwInput.focus();
      });
      document.addEventListener('click', (e) => {
        if (!pop.contains(e.target) && e.target !== loginBtn) pop.classList.remove('show');
      });
    }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        msgEl.textContent = 'Verifying…';
        msgEl.className = 'login-msg';
        const result = await doLogin(pwInput.value);
        if (result.ok) {
          msgEl.textContent = 'Admin active.';
          msgEl.className = 'login-msg ok';
          pwInput.value = '';
          refreshUI();
          setTimeout(() => pop.classList.remove('show'), 700);
        } else {
          msgEl.textContent = result.message || 'Incorrect password.';
          msgEl.className = 'login-msg err';
        }
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        if (getMode() === 'firebase') {
          const fb = getFirebase();
          if (fb) fb.auth.signOut().catch(() => {});
        }
        clearToken();
        sessionStorage.removeItem(MODE_KEY);
        refreshUI();
      });
    }

    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('show-mobile');
        mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('show-mobile');
          mobileToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // ---------- certificate category filters (index.html only) ----------
    const certFilters = document.getElementById('certFilters');
    const certGrid = document.getElementById('certGrid');
    if (certFilters && certGrid) {
      const cards = certGrid.querySelectorAll('.cert-card');
      certFilters.querySelectorAll('.cert-filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          certFilters.querySelectorAll('.cert-filter-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          const filter = btn.dataset.filter;
          cards.forEach((card) => {
            const show = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('filtered-out', !show);
          });
        });
      });
    }

    refreshUI();
  });

  // ============================================================
  // CALENDAR
  // ============================================================
  let logData = {};
  let currentYear = 2026;
  let currentMonth = 5; // June — start here since that's where the logged activity begins

  function pad(n) { return String(n).padStart(2, '0'); }
  function dateKey(y, m, d) { return `${y}-${pad(m + 1)}-${pad(d)}`; }
  function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
  function firstWeekday(y, m) { return new Date(y, m, 1).getDay(); }
  function escapeHtml(str) { const div = document.createElement('div'); div.textContent = str; return div.innerHTML; }

  function loadLocalCalendar() {
    try {
      const raw = localStorage.getItem(APP_CONFIG.CALENDAR_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return null;
  }
  function saveLocalCalendar(data) {
    try {
      localStorage.setItem(APP_CONFIG.CALENDAR_STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* ignore (e.g. storage disabled) */ }
  }

  function calendarDocRef(db) { return db.collection('portfolio').doc('calendar'); }

  async function loadData() {
    const online = await checkBackend();
    if (online) {
      try {
        const res = await fetch('/api/calendar');
        const json = await res.json();
        if (json.ok && json.data && Object.keys(json.data).length > 0) {
          logData = json.data;
          render();
          renderTimeline();
          return;
        }
      } catch (e) { /* fall through to Firebase/local */ }
    }

    const fb = getFirebase();
    if (fb) {
      try {
        const snap = await calendarDocRef(fb.db).get();
        const data = snap.exists ? snap.data() : null;
        if (data && Object.keys(data).length > 0) {
          logData = data;
          render();
          renderTimeline();
          return;
        }
      } catch (e) { /* fall through to local */ }
    }

    const local = loadLocalCalendar();
    logData = local || JSON.parse(JSON.stringify(DEFAULT_CALENDAR_LOG));
    render();
    renderTimeline();
  }

  const grid = document.getElementById('calGrid');
  const monthLabel = document.getElementById('calMonthLabel');
  const tooltip = document.getElementById('dayTooltip');
  const modalBackdrop = document.getElementById('dayModal');
  const modalDate = document.getElementById('modalDate');
  const modalTitle = document.getElementById('modalTitle');
  const modalModule = document.getElementById('modalModule');
  const modalDesc = document.getElementById('modalDesc');
  const modalMsg = document.getElementById('modalMsg');
  const modalSaveBtn = document.getElementById('modalSaveBtn');
  const modalDeleteBtn = document.getElementById('modalDeleteBtn');
  const modalCancelBtn = document.getElementById('modalCancelBtn');

  function render() {
    if (!grid) return;
    const admin = window.ScAuth && window.ScAuth.isAdmin();
    grid.innerHTML = '';

    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach((d) => {
      const el = document.createElement('div');
      el.className = 'cal-dow';
      el.textContent = d;
      grid.appendChild(el);
    });

    const total = daysInMonth(currentYear, currentMonth);
    const startDay = firstWeekday(currentYear, currentMonth);

    for (let i = 0; i < startDay; i++) {
      const el = document.createElement('div');
      el.className = 'cal-day empty';
      grid.appendChild(el);
    }

    for (let d = 1; d <= total; d++) {
      const key = dateKey(currentYear, currentMonth, d);
      const entry = logData[key];
      const isAbsent = !!entry && entry.status === 'absent';
      const hasLog = !!entry && !isAbsent;
      const el = document.createElement('div');
      el.className = 'cal-day' + (hasLog ? ' has-log' : '') + (isAbsent ? ' is-absent' : '') + (admin ? ' editable' : '');
      el.innerHTML = `<span class="d-num">${d}</span><span class="d-dot"></span>`;

      if (entry) {
        el.addEventListener('mouseenter', (e) => showTooltip(e, entry));
        el.addEventListener('mousemove', moveTooltip);
        el.addEventListener('mouseleave', hideTooltip);
      }
      if (admin) {
        el.addEventListener('click', () => openModal(key, entry));
      } else if (entry) {
        el.addEventListener('click', () => openDayDetail(key, entry));
      }
      grid.appendChild(el);
    }

    if (monthLabel) {
      monthLabel.textContent = new Date(currentYear, currentMonth, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
    }
  }

  function changeMonth(delta) {
    currentMonth += delta;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    render();
    renderTimeline();
  }
  const prevBtn = document.getElementById('calPrevBtn');
  const nextBtn = document.getElementById('calNextBtn');
  if (prevBtn) prevBtn.addEventListener('click', () => changeMonth(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => changeMonth(1));

  function showTooltip(e, entry) {
    if (!tooltip) return;
    tooltip.innerHTML = `<b>${escapeHtml(entry.title)}</b>`;
    tooltip.classList.add('show');
    moveTooltip(e);
  }
  function moveTooltip(e) {
    if (!tooltip) return;
    tooltip.style.left = e.clientX + 14 + 'px';
    tooltip.style.top = e.clientY + 14 + 'px';
  }
  function hideTooltip() { if (tooltip) tooltip.classList.remove('show'); }

  // Track which timeline card is currently expanded (only one at a time)
  let expandedTimelineKey = null;

  function renderTimeline() {
    const tl = document.getElementById('timeline');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    if (!tl) return;

    const keys = Object.keys(logData).sort();
    const totalPlanned = 10;
    const pct = Math.min(100, Math.round((keys.length / totalPlanned) * 100));
    if (progressFill) progressFill.style.width = pct + '%';
    if (progressText) progressText.textContent = `${keys.length} day${keys.length === 1 ? '' : 's'} logged`;

    tl.innerHTML = '';
    keys.forEach((key, idx) => {
      const entry = logData[key];
      const isAbsent = entry.status === 'absent';
      const dateStr = new Date(key + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const moduleLabel = entry.module ? ` <span style="color:var(--ink-soft);font-weight:400;font-size:12px;">— ${escapeHtml(MODULE_LABELS[entry.module] || entry.module)}</span>` : '';
      const isExpanded = expandedTimelineKey === key;

      // Use bullets if available, fall back to description
      const bullets = entry.bullets && Array.isArray(entry.bullets) && entry.bullets.length > 0
        ? entry.bullets
        : (entry.description ? [entry.description] : []);

      // Use 2-line summary if available, fall back to first bullet
      const summary = entry.summary && Array.isArray(entry.summary) && entry.summary.length >= 2
        ? entry.summary
        : (entry.description ? [entry.description.slice(0, 120)] : ['']);

      // Build bullet HTML
      const bulletHtml = bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('');

      // Build 2-line summary HTML (two separate spans for line clamping)
      const summaryHtml = summary.length >= 2
        ? `<span class="tl-line1">${escapeHtml(summary[0])}</span><span class="tl-line2">${escapeHtml(summary[1])}</span>`
        : escapeHtml(summary[0] || '');

      const row = document.createElement('div');
      row.className = 'tl-row' + (isAbsent ? ' absent' : '');
      row.innerHTML = `
        <div class="tl-date">${dateStr}</div>
        <div class="tl-dot-col"><div class="tl-dot${isAbsent ? ' absent' : ''}"></div>${idx < keys.length - 1 ? '<div class="tl-line"></div>' : ''}</div>
        <div class="tl-content">
          <h4>${escapeHtml(entry.title)}${moduleLabel}</h4>
          <p class="tl-summary">${summaryHtml}</p>
          <div class="tl-bullets${isExpanded ? ' expanded' : ''}">
            <ul class="tl-bullet-list">${bulletHtml}</ul>
          </div>
        </div>`;
      tl.appendChild(row);

      // Add click handler for expand/collapse on the content area
      const contentEl = row.querySelector('.tl-content');
      if (contentEl) {
        contentEl.addEventListener('click', (e) => {
          e.stopPropagation();
          if (isExpanded) {
            expandedTimelineKey = null;
          } else {
            expandedTimelineKey = key;
          }
          renderTimeline();
        });
      }
    });
  }

  // ---------- admin modal ----------
  let activeKey = null;

  function openModal(key, entry) {
    activeKey = key;
    modalDate.textContent = new Date(key + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    modalTitle.value = entry ? entry.title : '';
    modalModule.value = entry ? (entry.module || '') : '';
    modalDesc.value = entry ? (entry.description || '') : '';
    modalMsg.textContent = '';
    modalMsg.className = 'modal-msg';
    modalDeleteBtn.style.display = entry ? 'inline-block' : 'none';
    modalBackdrop.classList.add('show');
    setTimeout(() => modalTitle.focus(), 50);
  }
  function closeModal() { modalBackdrop.classList.remove('show'); activeKey = null; }

  if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => { if (e.target === modalBackdrop) closeModal(); });
  }

  // ---------- read-only day detail popup (checklist), for all visitors ----------
  const dayDetailModal = document.getElementById('dayDetailModal');
  const dayDetailModule = document.getElementById('dayDetailModule');
  const dayDetailTitle = document.getElementById('dayDetailTitle');
  const dayDetailDate = document.getElementById('dayDetailDate');
  const dayDetailChecklist = document.getElementById('dayDetailChecklist');
  const dayDetailCloseBtn = document.getElementById('dayDetailCloseBtn');
  const dayDetailCloseX = document.getElementById('dayDetailCloseX');

  function openDayDetail(key, entry) {
    if (!dayDetailModal || !entry) return;
    const isAbsent = entry.status === 'absent';

    dayDetailDate.textContent = new Date(key + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    dayDetailTitle.textContent = entry.title || '';

    if (isAbsent) {
      dayDetailModule.textContent = 'Absent';
      dayDetailModule.className = 'day-detail-module is-absent';
    } else {
      dayDetailModule.textContent = (entry.module && (MODULE_LABELS[entry.module] || entry.module)) || '';
      dayDetailModule.className = 'day-detail-module';
      dayDetailModule.style.display = entry.module ? '' : 'none';
    }

    const items = (entry.bullets && Array.isArray(entry.bullets) && entry.bullets.length > 0)
      ? entry.bullets
      : (entry.description ? [entry.description] : []);

    dayDetailChecklist.className = 'day-detail-checklist' + (isAbsent ? ' is-absent' : '');
    dayDetailChecklist.innerHTML = items.map((item) =>
      `<li><span class="chk">${isAbsent ? '–' : '✓'}</span><span>${escapeHtml(item)}</span></li>`
    ).join('');

    dayDetailModal.classList.add('show');
  }
  function closeDayDetail() { if (dayDetailModal) dayDetailModal.classList.remove('show'); }

  if (dayDetailCloseBtn) dayDetailCloseBtn.addEventListener('click', closeDayDetail);
  if (dayDetailCloseX) dayDetailCloseX.addEventListener('click', closeDayDetail);
  if (dayDetailModal) {
    dayDetailModal.addEventListener('click', (e) => { if (e.target === dayDetailModal) closeDayDetail(); });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDayDetail();
  });

  async function persistEntry(date, entry) {
    const online = await checkBackend();
    const token = window.ScAuth.getToken();
    const mode = getMode();

    if (online && mode === 'server' && token) {
      try {
        const res = await fetch('/api/calendar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ date, title: entry.title, module: entry.module, description: entry.description }),
        });
        const json = await res.json();
        if (json.ok) return { ok: true, mode: 'server', data: json.data };
        return { ok: false, message: json.message };
      } catch (e) { /* fall through to local */ }
    }

    if (mode === 'firebase') {
      const fb = getFirebase();
      if (fb && fb.auth.currentUser) {
        try {
          const updated = { ...logData, [date]: { ...entry, updatedAt: new Date().toISOString() } };
          await calendarDocRef(fb.db).set(updated);
          logData = updated;
          return { ok: true, mode: 'firebase', data: logData };
        } catch (e) {
          return { ok: false, message: 'Could not save to Firebase — check your Firestore rules.' };
        }
      }
    }

    // local persistence
    logData[date] = { ...entry, updatedAt: new Date().toISOString() };
    saveLocalCalendar(logData);
    return { ok: true, mode: 'local', data: logData };
  }

  async function deleteEntry(date) {
    const online = await checkBackend();
    const token = window.ScAuth.getToken();
    const mode = getMode();

    if (online && mode === 'server' && token) {
      try {
        const res = await fetch('/api/calendar', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ date }),
        });
        const json = await res.json();
        if (json.ok) return { ok: true, mode: 'server', data: json.data };
        return { ok: false, message: json.message };
      } catch (e) { /* fall through */ }
    }

    if (mode === 'firebase') {
      const fb = getFirebase();
      if (fb && fb.auth.currentUser) {
        try {
          const updated = { ...logData };
          delete updated[date];
          await calendarDocRef(fb.db).set(updated);
          logData = updated;
          return { ok: true, mode: 'firebase', data: logData };
        } catch (e) {
          return { ok: false, message: 'Could not delete from Firebase — check your Firestore rules.' };
        }
      }
    }

    delete logData[date];
    saveLocalCalendar(logData);
    return { ok: true, mode: 'local', data: logData };
  }

  if (modalSaveBtn) {
    modalSaveBtn.addEventListener('click', async () => {
      if (!activeKey) return;
      if (!modalTitle.value.trim()) {
        modalMsg.textContent = 'Title is required.';
        modalMsg.className = 'modal-msg err';
        return;
      }
      modalMsg.textContent = 'Saving…';
      modalMsg.className = 'modal-msg';

      const entry = {
        title: modalTitle.value.trim(),
        module: modalModule.value,
        description: modalDesc.value.trim(),
      };
      const result = await persistEntry(activeKey, entry);
      if (result.ok) {
        if (result.data) logData = result.data;
        modalMsg.textContent = result.mode === 'server'
          ? 'Saved — update reflected in the Vercel database.'
          : result.mode === 'firebase'
          ? 'Saved — update reflected in Firebase for every visitor.'
          : 'Saved locally in this browser (no live database connected).';
        modalMsg.className = 'modal-msg ok';
        render();
        renderTimeline();
        setTimeout(closeModal, 900);
      } else {
        modalMsg.textContent = result.message || 'Update failed.';
        modalMsg.className = 'modal-msg err';
      }
    });
  }

  if (modalDeleteBtn) {
    modalDeleteBtn.addEventListener('click', async () => {
      if (!activeKey) return;
      modalMsg.textContent = 'Deleting…';
      modalMsg.className = 'modal-msg';
      const result = await deleteEntry(activeKey);
      if (result.ok) {
        if (result.data) logData = result.data;
        modalMsg.textContent = 'Entry removed.';
        modalMsg.className = 'modal-msg ok';
        render();
        renderTimeline();
        setTimeout(closeModal, 600);
      } else {
        modalMsg.textContent = result.message || 'Delete failed.';
        modalMsg.className = 'modal-msg err';
      }
    });
  }

  window.addEventListener('sc-auth-change', () => {
    expandedTimelineKey = null;
    render();
    renderTimeline();
  });
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('calGrid')) loadData();
  });

  // Close expanded timeline card when clicking outside
  document.addEventListener('click', (e) => {
    if (expandedTimelineKey !== null) {
      const clickedInside = e.target.closest('.tl-content');
      if (!clickedInside) {
        expandedTimelineKey = null;
        renderTimeline();
      }
    }
  });
})();

/* ============================================================
   VISUAL ENHANCEMENTS — floating nav state, scroll-reveal,
   number-ticker stats, spotlight-card cursor glow, magnetic
   hero CTAs, and a one-time hero eyebrow type-in.
   Purely additive: does not touch auth, calendar or filter logic.
   ============================================================ */
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    /* ---------- floating nav: shadow/opacity once scrolled ---------- */
    const topbar = document.querySelector('.topbar');
    if (topbar) {
      const onScroll = () => topbar.classList.toggle('scrolled', window.scrollY > 12);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ---------- scroll-spy: highlight active nav link (index.html) ---------- */
    const navLinks = Array.from(document.querySelectorAll('.nav-links a[href*="#"]'));
    const spySections = navLinks
      .map((a) => {
        const hash = a.getAttribute('href').split('#')[1];
        const el = hash ? document.getElementById(hash) : null;
        return el ? { link: a, el } : null;
      })
      .filter(Boolean);
    if (spySections.length && 'IntersectionObserver' in window) {
      const spyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const match = spySections.find((s) => s.el === entry.target);
            if (!match) return;
            navLinks.forEach((a) => a.classList.remove('active'));
            match.link.classList.add('active');
          });
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
      );
      spySections.forEach((s) => spyObserver.observe(s.el));
    }

    /* ---------- scroll-reveal for section content ---------- */
    const revealSelectors = [
      '.section-head', '.about-grid', '.pv-feature-card', '.card-grid .card',
      '.edu-row', '.cert-grid .cert-card', '.skills-cat', '.achievement-spotlight',
      '.resume-card', '.module-grid .module-card', '.progress-wrap', '.cal-wrap',
      '.contact-row',
    ].join(', ');
    const revealEls = Array.from(document.querySelectorAll(revealSelectors));
    if (revealEls.length) {
      if (reduceMotion || !('IntersectionObserver' in window)) {
        revealEls.forEach((el) => el.classList.add('reveal', 'in-view'));
      } else {
        const revealObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
        );
        revealEls.forEach((el, i) => {
          el.classList.add('reveal');
          el.style.transitionDelay = Math.min(i % 6, 5) * 0.06 + 's';
          revealObserver.observe(el);
        });
      }
    }

    /* ---------- number-ticker for stat cells ---------- */
    const statNums = Array.from(document.querySelectorAll('.stat-num'));
    if (statNums.length) {
      const animateCount = (el) => {
        const raw = el.textContent.trim();
        const target = parseInt(raw, 10);
        if (Number.isNaN(target)) return;
        if (reduceMotion) { el.textContent = String(target); return; }
        const duration = 900;
        const start = performance.now();
        const suffix = raw.replace(/^-?\d+/, '');
        function tick(now) {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      };
      if ('IntersectionObserver' in window) {
        const statObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                animateCount(entry.target);
                statObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.6 }
        );
        statNums.forEach((el) => statObserver.observe(el));
      }
    }

    /* ---------- spotlight-card cursor glow ---------- */
    if (!reduceMotion) {
      const spotlightEls = document.querySelectorAll('.card, .cert-card, .module-card');
      spotlightEls.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
          el.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });
      });

      /* ---------- magnetic hero CTAs ---------- */
      document.querySelectorAll('.hero-cta-row .btn-primary, .hero-cta-row .btn-secondary').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
          btn.style.transform = `translate(${x}px, ${y}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
      });
    }

    /* ---------- one-time type-in for the hero eyebrow ---------- */
    const heroEyebrow = document.querySelector('.hero .eyebrow');
    if (heroEyebrow && !reduceMotion) {
      const full = heroEyebrow.textContent;
      heroEyebrow.textContent = '';
      let i = 0;
      const typeSpeed = 18;
      (function typeChar() {
        heroEyebrow.textContent = full.slice(0, i);
        i++;
        if (i <= full.length) setTimeout(typeChar, typeSpeed);
      })();
    }
  });
})();
