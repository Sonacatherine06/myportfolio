# Sona Catherine — Portfolio

A 3-page portfolio — **Home** (About, Experience, PM-VIKAS spotlight, Projects,
Skills, Education, Certifications, Achievements, Resume, Contact), the full
**PM-VIKAS Internship** page, and a dedicated **Projects** page — plus a
hidden admin login used to edit the PM-VIKAS calendar. It runs two ways with
zero code changes:

- **Locally**: double-click `index.html`, or open the folder with VS Code's
  Live Server. No build step, no server required.
- **Deployed on Vercel**: the same site, but the admin login and calendar
  edits are backed by a real database (Vercel KV) instead of this browser's
  storage.

## ⚠️ Status update

The project originally uploaded for this round of fixes contained only the
**code** files — no `images/`, `certificates/`, `resume/`, or `api/` folders,
even though the code (and the old README) referenced all of them.

Since then, **6 of your real certificates have been added** to
`certificates/` with matching thumbnails in `certificates/thumbs/`:
MATLAB Onramp, NPTEL Design Thinking, BSNL RTTC Internship, Evolve Robotics
Internship, H2OForge (IEEE), and a new one — **Solar Photovoltaic Workshop**
(Christ College / ECTA) — which wasn't in the original certificate list, so
it's been added as a 7th card. The ISRO National Space Day certificate was
also added and wired into the "Achievements" spotlight section.

Still missing:
- The **Neo Green Labs PCB Design & Fabrication Workshop** certificate file
  — its entry in `portfolio-data.js` is still pointing at a filename that
  doesn't exist yet, so that card currently shows the clean fallback tile.
  Add `certificates/Neo-Green-Labs-PCB-Certificate.jpeg` (or whatever format
  you have) plus a thumbnail to fix it — no code changes needed.
- `resume/Sona_Catherine_Resume.pdf` (your resume)

`api/login.js` and `api/calendar.js` (the Vercel serverless functions) have
already been rebuilt from scratch to match exactly what `script.js` expects.

I won't fabricate certificate images or a resume PDF myself — I have no way
to verify what should be in them, and generating fake credential-looking
documents isn't something I'll do. But the site handles any of these being
missing gracefully (see "No more broken icons" below) — nothing will ever
show as a broken image, worst case it's a clean placeholder until you add
the real file.

## Folder structure

```
index.html              Home — hero, internships, projects teaser, education, certifications, skills
pmvikas.html             PM-VIKAS IoT Assistant Internship page + editable calendar + Projects quick-link
projects.html            NEW — dedicated "All Projects" page, cards rendered from portfolio-data.js
style.css                All styles (unchanged design system — same colors/fonts/animations)
script.js                Admin login + calendar logic + certificate/project rendering + image-fallback safety net
data.js                  Calendar seed data + local config (unchanged)
portfolio-data.js        NEW — the ONE file you edit for contact info, certificates and projects
assets/                  favicon.svg (recreated, since the original was missing)
images/                  Drop extra photos here (marquee/achievement images already reference certificates/thumbs/)
certificates/            Put your real certificate files here (PDF/JPEG) — see filenames below
certificates/thumbs/     Small preview thumbnails for each certificate (optional — see fallback behaviour)
resume/                  Put Sona_Catherine_Resume.pdf here
documents/               Anything else you want to link to later
projects/                Reserved for project-specific assets (screenshots, etc.) if you add any
icons/                   Reserved — icons currently come from the Font Awesome CDN, no local files needed
api/login.js             Vercel serverless function — checks ADMIN_PASSWORD, issues a session token
api/calendar.js          Vercel serverless function — reads/writes the calendar to Vercel KV
```

## How to update things (this is the part you'll use most)

### Add or edit a certificate
Open **`portfolio-data.js`** → `certificates` array. Each entry looks like:

```js
{
  title: 'MATLAB Onramp Certification',
  subtitle: 'MATLAB Academy, 2025',
  category: 'course',            // 'internship' | 'workshop' | 'course' — powers the filter buttons
  file: 'certificates/MATLAB-Onramp-Certificate.pdf',   // opens in a new tab when the card is clicked
  thumb: 'certificates/thumbs/matlab-thumb.jpg',        // shown on the card
}
```

1. Drop the real certificate file into `certificates/` with that exact name.
2. Drop a small preview image into `certificates/thumbs/` (optional).
3. Add or edit the object above. Save, refresh — no HTML editing required.

If a thumbnail is missing or fails to load, the card automatically falls back
to a clean tile with the certificate's initials instead of a broken-image
icon — so it's safe to add the config entry before you have the thumbnail.

### GitHub project integration (controlled — nothing shows automatically)

Your GitHub account (`github.com/Sonacatherine06`) is where all project code
lives, including test/practice/incomplete repos. **None of that appears on
the portfolio automatically.** `projects.html` only ever shows projects
you've explicitly added to `PORTFOLIO.featuredProjects` in
`portfolio-data.js`. Creating a new repo (or folder) on GitHub does nothing
to the site until you add an entry for it here.

**Your setup:** all 9 current projects live as folders inside one shared
repo, [`Arduino_Projects`](https://github.com/Sonacatherine06/Arduino_Projects),
rather than as separate repos each. So every entry points `githubRepo` at
`'Arduino_Projects'` and uses `repoPath` for the specific folder name — the
"View on GitHub" button links straight to that folder
(`.../Arduino_Projects/tree/main/Ultrasonic Sensor`, etc.), not just the
repo root. If a project ever gets split into its own standalone repo
instead, just delete `repoPath` from that entry and point `githubRepo` at
the new repo name.

**Where it's configured:** `portfolio-data.js` → two things:
- `projectCategories` — the three sections (`sensor` / `actuator` / `combo`),
  their icons, titles and descriptions. You shouldn't need to touch this
  unless you want to rename a section.
- `featuredProjects` — the actual list of selected projects. This is the
  one you edit regularly.

**To add a new project to the portfolio:**
1. Finish the project as a folder in `Arduino_Projects` (or its own repo).
2. Add one object to the `featuredProjects` array:
   ```js
   {
     githubRepo: 'Arduino_Projects',
     repoPath: 'Temperature Sensor',     // folder name inside the repo
     title: 'Temperature Sensor',
     category: 'sensor',                 // 'sensor' | 'actuator' | 'combo'
     description: 'Reads ambient temperature from a DHT11 and logs it over serial.',
     image: 'images/temperature.png',    // optional — thumbnail
     circuitImage: '',                   // optional — shown in "View Project"
     outputImage: '',                    // optional — shown in "View Project"
   }
   ```
3. Save. The card appears on `projects.html` automatically — no other file
   needs to change.

**⚠️ Double-check your folder names.** I filled in `repoPath` for your 9
projects by guessing folder names that match each title exactly (e.g.
`'Ultrasonic Sensor'`, `'LED Blink'`). I can't browse your repo directly, so
please open
[github.com/Sonacatherine06/Arduino_Projects](https://github.com/Sonacatherine06/Arduino_Projects)
and confirm each folder is named exactly that (case-sensitive) — if a name
doesn't match, either rename the folder on GitHub or update `repoPath` to
the real name. Any mismatch shows up as a small warning on that project's
card once you preview the page (see the GitHub existence check below), so
it's easy to spot.

**How you choose the category:** set `category` to `'sensor'`, `'actuator'`,
or `'combo'`, matching the `key` values in `projectCategories`. That's the
only thing that determines which of the three sections a project lands in.

**How the numbering works:** each category counts its own entries from the
top of the `featuredProjects` array. The 1st `sensor` entry is `01`, the 2nd
is `02`, and so on — completely independent of the other categories and of
GitHub's own ordering. Concretely, with the current list:
- Sensor: `01 Ultrasonic Sensor`, `02 Vibration Sensor`, `03 Tilt Sensor`
- Actuator & Output: `01 LED Blink` … `06 LCD`
- Sensor + Actuator: empty → shows a "Coming Soon" card

Add a 4th `sensor` entry anywhere in the array and it becomes `04`
automatically (it doesn't have to be added at the very end — its position
*among sensor entries* determines the number, so if you want a specific
project to stay `01`, keep it first among that category's entries).

**How to add images:**
- `image` → the card thumbnail on `projects.html`. Missing/omitted → the
  card shows the category's icon in a clean tile instead of a thumbnail —
  never a broken image.
- `circuitImage` / `outputImage` → shown side-by-side in the "View Project"
  popup for that card, labeled "Circuit Diagram" and "Output". Leave either
  blank to omit it; if both are blank, the popup shows a "no images yet"
  placeholder instead.
- Drop the actual files into `images/` (see `images/README.txt`) and point
  the field at that path, e.g. `images/ultrasonic.png`.

**"View Project" button:** opens a built-in popup showing the full
description plus the circuit/output images. If you later build a full
custom page for a project, set `detailPage: 'projects/ultrasonic.html'` (or
any URL) on that entry — "View Project" will link straight there instead,
and the popup is skipped for that card. This is how any future
project-specific page, diagram, or write-up stays attached to its project
without being overwritten by this system.

**"View on GitHub" button:** always constructed from
`profile.githubUsername` + `githubRepo` (+ `repoPath` if set), so it's
guaranteed to point at the right place — you never type a full URL. As a
light integrity check, the page also pings the public (unauthenticated)
GitHub API for each project — checking the exact folder if `repoPath` is
set, or the whole repo otherwise; if it doesn't exist or is private, a small
note appears on that card so a typo doesn't go unnoticed (e.g. `GitHub
folder "Ultrasonic Sensor" not found in Arduino_Projects — check repoPath in
portfolio-data.js`). No token or credential is used or exposed — this only
ever calls GitHub's public, no-auth API, and fails silently if the check
itself can't run (offline, rate-limited, etc.) — it never blocks the card
from rendering.

**To update or remove a project without touching GitHub:** edit or delete
its object in `featuredProjects`. The repo itself is completely unaffected —
this array only controls what shows on the portfolio. Removing an entry
automatically renumbers the remaining projects in that category (e.g.
deleting `02` shifts what was `03` up to `02`).

**Existing flagship projects** (Alcohol Detection with Engine Lock System,
Muscle Translation Device, Smart Reminder System) stay exactly where they
are, in the "Projects" section of `index.html` — this new system only
applies to `projects.html`. They weren't touched.

### Change your GitHub link
Open **`portfolio-data.js`** → `profile.githubUsername` (used to build every
`View on GitHub` link), `profile.github` (your profile URL) and
`profile.githubRepos` (your repositories tab — used by the Projects card on
the PM-VIKAS page and the "View My GitHub Profile" button).

### Change your resume
1. Replace the file at `resume/Sona_Catherine_Resume.pdf` (or use a new
   filename).
2. If you changed the filename, update `profile.resume` in
   `portfolio-data.js`. Every "View/Download Resume" button reads from it.

### Change your profile image
The hero photo is embedded directly in `index.html` as a Base64 data URI
(that's why it survived even though no `images/` folder was uploaded). To
replace it: open `index.html`, find `<img class="hero-photo" src="data:image/jpeg;base64,...">`,
and swap the whole `src="data:..."` value for a normal path, e.g.
`src="images/profile.jpg"`, after dropping your new photo into `images/`.

### Change contact details (email, phone, LinkedIn)
Open **`portfolio-data.js`** → `profile`. These fields drive the `mailto:`,
`tel:`, and LinkedIn links in the hero section and footer on every page.

### Everything else (About, Education, Skills, Experience text)
These sections stay directly in `index.html`/`pmvikas.html` for now — the
copy is usually one-off, hand-written prose rather than a repeatable list, so
moving it to config would add complexity without much benefit. Just edit the
text between the relevant `<h2>`/`<p>` tags directly; the layout won't break
as long as you don't remove the surrounding tags.

## No more broken icons or images

Two safety nets were added and now cover the **whole site**, including
anything rendered dynamically:

1. **Certificate thumbnails** — if a thumbnail file is missing or 404s, the
   card swaps to a styled tile showing the certificate's initials (uses the
   `.cert-card-icon` / `.no-thumb` styles that already existed in `style.css`
   but weren't wired up before).
2. **Every other image on the site** (marquee photos, achievement spotlight,
   anything added later) — a single delegated listener catches any image
   load failure and swaps in a clean placeholder graphic instead of the
   browser's broken-image icon. Nothing you do can produce a broken-image
   icon anymore; worst case, you'll see an intentional placeholder.

Font Awesome (6.5.1, via CDN) is now loaded on all three pages, so every
icon — including the new GitHub icons — renders reliably without needing any
local icon files.

## How the admin login works

The admin login bar (`Admin Login` / `Admin Active` / `Log out`) sits in the
top nav on the Home and PM-VIKAS pages.

The password is **`demo123`** by default (set in `data.js` as
`APP_CONFIG.LOCAL_ADMIN_PASSWORD`) — this is what you'll use when opening the
site locally or on Live Server, since there's no server to check a real
password against.

1. Click **Admin Login** in the top bar and enter the password.
2. `script.js` first checks whether `/api/login` is reachable (only true once
   deployed on Vercel). If it is, the real check happens there against the
   `ADMIN_PASSWORD` environment variable. If not — e.g. you're running the
   file locally — it falls back to checking against `demo123` in `data.js`.
3. On success, the top bar shows **Admin Active** and every calendar day
   becomes clickable.
4. Editing a day:
   - **On Vercel** → saves to your Vercel KV database and shows a
     ✅ "Saved — update reflected in the Vercel database" message.
   - **Locally / Live Server** → saves to this browser's `localStorage` and
     shows a "Saved locally in this browser" message, so your edits still
     survive page reloads even without a backend.
5. The session token lives only in `sessionStorage` and clears when you log
   out or close the tab.

## Reorganizing Arduino_Projects on GitHub

`portfolio-data.js` now expects `Arduino_Projects` to be organized like this:

```
Arduino_Projects
├── 01-Sensor-Projects
│   ├── 01-Ultrasonic-Sensor
│   ├── 02-Vibration-Sensor
│   └── 03-Tilt-Sensor
├── 02-Actuator-Output-Projects
│   ├── 01-LED-Blink
│   ├── 02-Buzzer
│   ├── 03-Hobby-Motor
│   ├── 04-RGB-LED
│   ├── 05-NeoPixel
│   └── 06-LCD
└── 03-Sensor-Actuator-Projects
    └── README.md   (placeholder until the first combo project is added)
```

If your repo isn't organized this way yet, the "View on GitHub" links on
`projects.html` will 404 until you move the folders on GitHub's side to
match — this is a GitHub-side change, not something that can be done from
this project's files. Move each existing project folder (whole folder, all
contents — code, README, images) into the matching category folder above,
without deleting anything. The safest way to do it on Windows is with
GitHub Desktop:

1. **Back up first** — on `github.com/Sonacatherine06/Arduino_Projects`,
   click **Code → Download ZIP** and save it somewhere safe.
2. Clone the repo with GitHub Desktop, create a new branch (e.g.
   `reorganize-projects`).
3. In File Explorer, create the three category folders, then cut-and-paste
   each existing project folder into its new parent (renaming the folder
   itself as needed) — this moves everything inside automatically.
4. Add `03-Sensor-Actuator-Projects/README.md` with the "Coming Soon" text.
5. Review the changed-files list in GitHub Desktop (should show as renames,
   preserving history), commit, push, and merge via a Pull Request so you
   can review the full diff on GitHub before it lands on `main`.

Once the real repo matches the structure above, every "View on GitHub"
button and the on-page GitHub check will work without touching this
project's files again.



### 1. Push this folder to GitHub
Push everything in this folder to a new repo (drag-and-drop works fine on
github.com too).

### 2. Import into Vercel
- [vercel.com/new](https://vercel.com/new) → import the repo.
- Framework preset: **Other** (static site + serverless functions, no build
  step needed).
- Deploy.

### 3. Add a database
- **Storage → Create Database → KV** (or the Upstash for Redis marketplace
  integration, which powers `@vercel/kv`).
- **Connect Project** to this project — Vercel injects `KV_REST_API_URL` and
  `KV_REST_API_TOKEN` automatically.

### 4. Set your real admin password
- **Settings → Environment Variables** → add `ADMIN_PASSWORD` with a strong
  password of your choice (this is separate from the `demo123` local
  fallback — the live site never uses `demo123`).
- Redeploy so the function picks up the new variable.

### 5. Visit your site
Log in on the **PM-VIKAS Internship** page with your real `ADMIN_PASSWORD`,
click any calendar day, and save — it now persists in your database for
every visitor.

## Deploying to GitHub Pages instead

GitHub Pages only serves static files — it can't run the `api/` serverless
functions. That's fine: the site was built to work without a backend.

1. Push this folder to a GitHub repo.
2. **Settings → Pages → Source** → deploy from the `main` branch (root).
3. Your site is live at `https://<username>.github.io/<repo-name>/`.
4. Out of the box, the admin login falls back to the local `demo123`
   password and calendar edits save to each visitor's own browser
   (`localStorage`) only — everything else (certificates, projects, resume,
   contact links) works identically to a Vercel deployment. Set up Firebase
   below if you want calendar edits to show up for every visitor instead.

## Shared calendar saves on GitHub Pages (Firebase)

GitHub Pages can't run server code, so there's no way to check a password
or write to a shared database from a serverless function like on Vercel.
Instead, the site can talk **directly from the browser** to a free Firebase
project — this is the standard way to add a small shared database to a
static site, and it's genuinely free at this scale (a personal portfolio's
traffic is nowhere near Firebase's free-tier limits).

**Is this safe?** Yes, by design. The `FIREBASE_CONFIG` values (`apiKey`,
`projectId`, etc.) that go in `firebase-config.js` are *meant* to be public —
Firebase's own docs are explicit about this. They're not secrets; anyone
can see them if they view your page source, same as your email address in
`portfolio-data.js`. Security instead comes from two real, server-enforced
things: (1) the **Firestore Security Rules** you set in step 3 below, which
Google's servers enforce regardless of what a visitor's browser tries to
send, and (2) **Firebase Authentication**, which requires your real
password to sign in — that password is typed into the browser at login
time, never stored in any file. This is the same trust model as the Vercel
`ADMIN_PASSWORD`, just enforced by Firebase's servers instead of ours.

### Setup (one-time, ~10 minutes)

1. Go to [console.firebase.google.com](https://console.firebase.google.com) →
   **Add project** → name it anything (e.g. `sona-portfolio`) → you can
   skip Google Analytics → **Create project**.
2. **Build → Firestore Database → Create database** → start in
   **production mode** → pick any region → **Enable**.
3. In Firestore, go to the **Rules** tab, replace the contents with the
   rules below, and click **Publish**:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /portfolio/calendar {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```
   This means: anyone can *read* the calendar (so visitors see it), but
   only a signed-in user can *write* to it.
4. **Build → Authentication → Get started** → under Sign-in method, enable
   **Email/Password**. Then go to the **Users** tab → **Add user** → enter
   an email (can be your real one) and a strong password — this password
   becomes your real admin login on the live GitHub Pages site.
5. Click the gear icon → **Project settings** → scroll to **Your apps** →
   click the **</>** (Web) icon → give it any nickname → **Register app**.
   Firebase shows you a `firebaseConfig` object — copy those values into
   `FIREBASE_CONFIG` in `firebase-config.js`.
6. In `firebase-config.js`, set `FIREBASE_ADMIN_EMAIL` to the same email
   you used in step 4.
7. Push the updated `firebase-config.js` to your GitHub Pages repo. That's
   it — no other files need to change.

### How it behaves after setup

- Any visitor loading the PM-VIKAS page reads the calendar straight from
  Firestore — everyone sees the same data.
- Logging in as admin now checks your real Firebase password (not
  `demo123`) and, once signed in, saves/deletes write straight to Firestore
  for everyone to see.
- If Firebase is ever unreachable (or you never set it up), everything
  quietly falls back to the local-browser behavior — nothing breaks.
- **On Vercel**, none of this matters — Vercel's own `api/` functions are
  checked first and take priority automatically.

## Performance & accessibility notes

- All certificate and marquee thumbnails use `loading="lazy"` so they don't
  block the initial page load.
- `portfolio-data.js`, `data.js`, and `script.js` are all loaded with
  `defer`, so they never block HTML parsing.
- Font Awesome is loaded from a version-pinned, integrity-checked CDN URL.
- Every `<img>` on the site has descriptive `alt` text; interactive elements
  (nav toggle, admin login button) carry `aria-*` attributes.
- No inline `<script>` blocks execute before `DOMContentLoaded`, so nothing
  depends on load order beyond the three `<script src>` tags at the bottom
  of each page (keep them in that order if you ever move them).

## Adding more later

- **More certificates / projects**: edit `portfolio-data.js` — see above,
  no HTML changes needed.
- **More achievement/event photos**: drop into `images/` and add a
  `.marquee-card.photo` block in `pmvikas.html`.
- **A new page**: copy `projects.html` as a starting point — it already has
  the shared header/footer markup and script includes.
