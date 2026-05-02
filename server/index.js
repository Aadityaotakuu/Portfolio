const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8080
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const MAIL_TO = process.env.MAIL_TO || 'parabaaditya785@gmail.com'
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

if (!SMTP_USER || !SMTP_PASS) {
  // eslint-disable-next-line no-console
  console.error('Missing SMTP_USER or SMTP_PASS in environment')
  process.exit(1)
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
})

app.use(
  cors({
    origin: CLIENT_ORIGIN.split(',').map((origin) => origin.trim()),
    methods: ['POST'],
  })
)
app.use(express.json({ limit: '10kb' }))

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const trimmed = {
    name: String(name).trim(),
    email: String(email).trim(),
    message: String(message).trim(),
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  if (trimmed.message.length > 2000) {
    return res.status(400).json({ error: 'Message is too long' })
  }

  try {
    await transporter.sendMail({
      from: `Portfolio Contact <${SMTP_USER}>`,
      to: MAIL_TO,
      replyTo: trimmed.email,
      subject: `New message from ${trimmed.name}`,
      text: `Name: ${trimmed.name}\nEmail: ${trimmed.email}\n\n${trimmed.message}`,
      html: `
        <p><strong>Name:</strong> ${trimmed.name}</p>
        <p><strong>Email:</strong> ${trimmed.email}</p>
        <p><strong>Message:</strong></p>
        <p>${trimmed.message.replace(/\n/g, '<br />')}</p>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Email send failed:', error)
    return res.status(500).json({ error: 'Failed to send message' })
  }
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Contact backend listening on port ${PORT}`)
})
