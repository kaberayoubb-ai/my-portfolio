/**
 * Ayoub Kaber Portfolio — Contact Form Backend
 * Run: node server.js
 * Requires: npm install express cors nodemailer dotenv
 */

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const nodemailer = require('nodemailer');
const path    = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));   // serves index.html + images/

/* ── Email transporter ─────────────────────────────────────────────── */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,   // your Gmail address in .env
    pass: process.env.MAIL_PASS,   // Gmail App Password in .env
  },
});

/* ── POST /api/contact ─────────────────────────────────────────────── */
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email address.' });
  }

  try {
    await transporter.sendMail({
      from    : `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      to      : process.env.MAIL_USER,        // receives the message
      replyTo : email,
      subject : `New message from ${name} — Portfolio`,
      html    : `
        <div style="font-family:sans-serif;max-width:520px;margin:auto">
          <h2 style="color:#d4f500;background:#0a0a0a;padding:1rem;border-radius:6px">
            📩 New Portfolio Message
          </h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left:3px solid #d4f500;padding-left:1rem;color:#444">
            ${message.replace(/\n/g, '<br>')}
          </blockquote>
        </div>`,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from    : `"Ayoub Kaber" <${process.env.MAIL_USER}>`,
      to      : email,
      subject : `Thanks for your message, ${name}!`,
      html    : `
        <div style="font-family:sans-serif;max-width:520px;margin:auto">
          <h2 style="color:#d4f500;background:#0a0a0a;padding:1rem;border-radius:6px">
            Hey ${name} 👋
          </h2>
          <p>Thanks for reaching out! I'll get back to you as soon as possible.</p>
          <p>— Ayoub Kaber</p>
        </div>`,
    });

    res.json({ ok: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Mail error:', err);
    res.status(500).json({ ok: false, error: 'Failed to send message. Please try again.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
