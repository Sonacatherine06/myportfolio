/* ============================================================
   firebase-config.js — OPTIONAL, only needed for GitHub Pages
   ============================================================
   Vercel deployments already get shared, cross-visitor calendar
   saves via api/calendar.js + Vercel KV — you don't need this file
   for that.

   GitHub Pages can't run server code at all, so to make the
   calendar save for EVERY visitor (not just the admin's own
   browser) on GitHub Pages, the site talks directly to a free
   Firebase project from the browser instead.

   Until you fill this in with a real project, the site falls back
   to saving in the current browser only (localStorage) — nothing
   breaks, this is purely additive.

   Full setup steps are in README.md → "Shared calendar saves on
   GitHub Pages (Firebase)". Short version:
     1. Create a free project at https://console.firebase.google.com
     2. Build → Firestore Database → Create database → Start in
        production mode.
     3. Rules tab → paste the rules from the README → Publish.
     4. Build → Authentication → get started → Email/Password →
        Enable. Then Users tab → Add user → use the SAME email as
        adminEmail below, and pick a real password (this becomes
        your admin login password on the live site — separate
        from the demo123 local password).
     5. Project settings (gear icon) → General → "Your apps" →
        Add app → Web (</> icon) → register it → copy the
        firebaseConfig object it gives you into FIREBASE_CONFIG
        below.
     6. Set adminEmail below to the same email you used in step 4.
   ============================================================ */

const FIREBASE_CONFIG = {
  apiKey: '',            // safe to be public — Firebase's security comes
  authDomain: '',        // from the Firestore rules + real sign-in, not
  projectId: '',         // from hiding these values. Paste your project's
  storageBucket: '',     // values here once you've created it.
  messagingSenderId: '',
  appId: '',
};

// The email address of the Firebase Auth user you created for yourself in
// step 4 above. The site's admin login form still only asks for a
// password — it signs in as this fixed email behind the scenes.
const FIREBASE_ADMIN_EMAIL = '';
