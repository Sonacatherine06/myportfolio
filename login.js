/* ============================================================
   api/login.js — Vercel serverless function
   Checks the submitted password against the ADMIN_PASSWORD
   environment variable and issues a stateless session token.

   The token is `<timestamp>.<hmac>` where the hmac is
   HMAC-SHA256(timestamp, ADMIN_PASSWORD). api/calendar.js can
   verify it without needing a session store, and it naturally
   expires (see TOKEN_MAX_AGE_MS) if the password ever changes.

   Only runs once this project is deployed on Vercel with an
   ADMIN_PASSWORD environment variable set (see _env.example).
   Locally / on Live Server, script.js never reaches this file —
   it falls back to APP_CONFIG.LOCAL_ADMIN_PASSWORD in data.js.
   ============================================================ */

const crypto = require('crypto');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed.' });
    return;
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    res.status(500).json({
      ok: false,
      message: 'ADMIN_PASSWORD is not configured on the server. Add it in Vercel → Settings → Environment Variables.',
    });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const password = body && body.password;

  if (!password || password !== adminPassword) {
    res.status(401).json({ ok: false, message: 'Incorrect password.' });
    return;
  }

  const timestamp = Date.now().toString();
  const hmac = crypto.createHmac('sha256', adminPassword).update(timestamp).digest('hex');
  const token = `${timestamp}.${hmac}`;

  res.status(200).json({ ok: true, token });
};
