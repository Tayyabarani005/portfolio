import { Resend } from 'resend';

const WINDOW_MS = 10 * 60 * 1000;
const attempts = new Map<string, number[]>();

const clean = (value: unknown) => typeof value === 'string' ? value.trim().replace(/[\u0000-\u001F\u007F]/g, '') : '';
const json = (body: unknown, status = 200) => ({ statusCode: status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify(body) });
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] || character);

export const handler = async (event: { httpMethod?: string; headers?: Record<string, string | undefined>; body?: string | null }) => {
  if (event.httpMethod !== 'POST') return json({ message: 'Method not allowed' }, 405);
  const origin = event.headers?.origin || event.headers?.Origin || '';
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map((value) => value.trim()).filter(Boolean);
  if (!origin || !allowedOrigins.includes(origin)) return json({ message: 'Request not allowed' }, 403);
  if ((event.body || '').length > 10 * 1024) return json({ message: 'Request is too large.' }, 400);

  let input: Record<string, unknown>;
  try { input = JSON.parse(event.body || '{}'); } catch { return json({ message: 'Invalid request.' }, 400); }
  if (clean(input.website)) return json({ ok: true });

  const ip = event.headers?.['x-nf-client-connection-ip'] || event.headers?.['x-forwarded-for']?.split(',')[0].trim() || 'unknown';
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= 5) return json({ message: 'Too many messages. Please try again later.' }, 429);
  recent.push(now); attempts.set(ip, recent);

  const name = clean(input.name); const email = clean(input.email); const message = clean(input.message);
  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > 80) errors.name = 'Name must be 2 to 80 characters.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
  if (message.length < 10 || message.length > 2000) errors.message = 'Message must be 10 to 2000 characters.';
  if (Object.keys(errors).length) return json({ message: 'Please check the highlighted fields.', errors }, 400);
  if (typeof input.startedAt !== 'number' || now - input.startedAt < 3000) return json({ ok: true });

  const required = ['RESEND_API_KEY', 'CONTACT_TO_EMAIL', 'CONTACT_FROM_EMAIL'];
  if (required.some((key) => !process.env[key])) { console.error('Missing contact email configuration.'); return json({ message: "Couldn't send right now" }, 500); }
  const sentAt = new Date(now).toISOString();
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const result = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!, to: process.env.CONTACT_TO_EMAIL!, replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nTime sent: ${sentAt}\n\nMessage:\n${message}`,
      html: `<div style="background:#F7F3E8;color:#1F1C17;padding:24px;font-family:Arial,sans-serif"><h2 style="color:#1F1C17">New portfolio message</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Time sent:</strong> ${escapeHtml(sentAt)}</p><div style="background:#F6DE8D;padding:16px"><strong>Message</strong><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p></div></div>`,
    });
    if (result.error || !result.data) { console.error('Resend send failed:', result.error); return json({ message: "Couldn't send right now" }, 500); }
    if (process.env.CONTACT_AUTOREPLY === 'true') {
      const autoreply = await resend.emails.send({ from: process.env.CONTACT_FROM_EMAIL!, to: email, subject: 'Thanks for reaching out', text: `Thanks for your message, ${name}. I will get back to you soon.` });
      if (autoreply.error || !autoreply.data) console.error('Resend autoreply failed:', autoreply.error);
    }
  } catch (error) {
    console.error('Resend send failed:', error);
    return json({ message: "Couldn't send right now" }, 500);
  }
  return json({ ok: true });
};