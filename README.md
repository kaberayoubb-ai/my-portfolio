# Ayoub Kaber — Portfolio

## 📁 Project Structure
```
portfolio/
├── index.html          ← Main portfolio page
├── server.js           ← Node.js backend (contact form)
├── package.json        ← Dependencies
├── .env.example        ← Environment variables template
└── images/
    ├── ayoub.jpg       ← Your profile photo
    ├── csharp.svg
    ├── dotnet.svg
    ├── react.svg
    ├── javascript.svg
    ├── java.svg
    ├── sql.svg
    ├── docker.svg
    ├── html5.svg
    ├── css3.svg
    ├── tailwind.svg
    ├── git.svg
    └── cicd.svg
```

## 🚀 Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your Gmail credentials
```

3. Enable Gmail App Password:
   - Go to Google Account → Security → 2-Step Verification → App Passwords
   - Create a new App Password and paste it in `.env` as `MAIL_PASS`

4. Run the server:
```bash
npm start
```
Visit: http://localhost:3000

## 🌐 Hosting Options

### Option A — Static only (no contact form backend)
Deploy `index.html` + `images/` to:
- **GitHub Pages** (free)
- **Netlify** (free, drag & drop)
- **Vercel** (free)

For the contact form to work without a backend, replace the `fetch('/api/contact', ...)` call with a service like **Formspree** or **EmailJS**.

### Option B — Full stack (with contact form)
Deploy to:
- **Railway** (free tier, supports Node.js)
- **Render** (free tier)
- **DigitalOcean App Platform**

Set the environment variables (`MAIL_USER`, `MAIL_PASS`) in your hosting dashboard.

## ✉ Contact Form
The form sends emails via Gmail SMTP using Nodemailer.
- You receive a notification email
- The visitor receives an auto-reply

## 📝 Notes
- All skill icons are local SVG files → no CDN dependency when hosting
- Profile photo is local → no external image dependency
- Multilingual: ES / FR / EN
