/* ============================================================
   api/calendar.js — Vercel serverless function
   Reads/writes the PM-VIKAS calendar log to Vercel KV so edits
   persist for every visitor (not just the admin's own browser).

   GET              -> public, returns the stored calendar log.
   POST / DELETE    -> require a valid token (see api/login.js)
                       in the Authorization: Bearer <token> header.

   Requires a Vercel KV (or Upstash Redis) database attached to
   this project — see README.md → "Deploy it to Vercel".
   ============================================================ */

const crypto = require('crypto');

const KV_KEY = 'pmvikas_calendar_v1';
const TOKEN_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

function verifyToken(authHeader) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !authHeader || !authHeader.startsWith('Bearer ')) return false;

  const token = authHeader.slice('Bearer '.length).trim();
  const [timestamp, hmac] = token.split('.');
  if (!timestamp || !hmac) return false;

  if (Date.now() - Number(timestamp) > TOKEN_MAX_AGE_MS) return false;

  const expected = crypto.createHmac('sha256', adminPassword).update(timestamp).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected));
  } catch (e) {
    return false; // length mismatch etc. -> not equal
  }
}

async function getKv() {
  // Lazily required so the function still boots (for GET requests during
  // local testing) even before @vercel/kv env vars are attached.
  const { kv } = require('@vercel/kv');
  return kv;
}

module.exports = async function handler(req, res) {
  let kv;
  try {
    kv = await getKv();
  } catch (e) {
    res.status(500).json({ ok: false, message: 'Vercel KV is not configured for this project yet.' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const data = (await kv.get(KV_KEY)) || {};
      res.status(200).json({ ok: true, data });
    } catch (e) {
      res.status(500).json({ ok: false, message: 'Could not read the calendar from the database.' });
    }
    return;
  }

  if (req.method === 'POST' || req.method === 'DELETE') {
    if (!verifyToken(req.headers.authorization)) {
      res.status(401).json({ ok: false, message: 'Session expired — please log in again.' });
      return;
    }

    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { body = {}; }
    }
    const date = body && body.date;
    if (!date) {
      res.status(400).json({ ok: false, message: 'Missing date.' });
      return;
    }

    try {
      const data = (await kv.get(KV_KEY)) || {};

      if (req.method === 'POST') {
        data[date] = {
          title: body.title || '',
          module: body.module || '',
          description: body.description || '',
          updatedAt: new Date().toISOString(),
        };
      } else {
        delete data[date];
      }

      await kv.set(KV_KEY, data);
      res.status(200).json({ ok: true, data });
    } catch (e) {
      res.status(500).json({ ok: false, message: 'Could not save the change to the database.' });
    }
    return;
  }

  res.status(405).json({ ok: false, message: 'Method not allowed.' });
};
