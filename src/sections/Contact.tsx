import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type FormEvent,
  type ChangeEvent,
  type FocusEvent,
} from 'react'
import './Contact.css'
import Section from '../components/Section'
import { GitHubIcon, LinkedInIcon } from '../components/Icons'

/* ── Field config ── */
const FIELDS = [
  { name: 'name', label: 'Your Name', type: 'text' },
  { name: 'email', label: 'Email Address', type: 'email' },
] as const

// Determine API endpoint based on environment
// In production (Vercel), use relative path /api/contact
// In development (localhost), use http://localhost:8081/api/contact
const getContactEndpoint = () => {
  if (typeof window === 'undefined') return '/api/contact'
  
  const hostname = window.location.hostname
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1'
  
  // If VITE_CONTACT_ENDPOINT is explicitly set in env, use it
  const envEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT
  if (envEndpoint && envEndpoint !== 'http://localhost:8081/api/contact') {
    return envEndpoint
  }
  
  // Otherwise, use localhost for local dev, /api/contact for production
  return isLocalhost ? 'http://localhost:8081/api/contact' : '/api/contact'
}

const CONTACT_ENDPOINT = getContactEndpoint()

type Status = 'idle' | 'sending' | 'sent' | 'error'

/* ── Tilt wrapper (reusable) ── */
function TiltPanel({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    el.style.setProperty('--rx', `${((y - cy) / cy) * -6}deg`)
    el.style.setProperty('--ry', `${((x - cx) / cx) * 6}deg`)
    el.style.setProperty('--glow-x', `${x}px`)
    el.style.setProperty('--glow-y', `${y}px`)
  }, [])

  const handleLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }, [])

  return (
    <div
      ref={ref}
      className={`ct-tilt ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="ct-tilt__glow" />
      <div className="ct-tilt__border" />
      {children}
    </div>
  )
}

/* ── Floating-label input ── */
function FloatingInput({
  name,
  label,
  type,
  value,
  error,
  touched,
  onChange,
  onBlur,
}: {
  name: string
  label: string
  type: string
  value: string
  error: string
  touched: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: FocusEvent<HTMLInputElement>) => void
}) {
  return (
    <div className={`ct-field ${value ? 'ct-field--filled' : ''} ${touched && error ? 'ct-field--error' : ''}`}>
      <input
        className="ct-field__input"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
        required
      />
      <label className="ct-field__label" htmlFor={name}>
        {label}
      </label>
      <span className="ct-field__line" />
      {touched && error && <span className="ct-field__error">{error}</span>}
    </div>
  )
}

/* ── Floating-label textarea ── */
function FloatingTextarea({
  value,
  error,
  touched,
  onChange,
  onBlur,
}: {
  value: string
  error: string
  touched: boolean
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onBlur: (e: FocusEvent<HTMLTextAreaElement>) => void
}) {
  const maxLen = 500
  return (
    <div className={`ct-field ct-field--area ${value ? 'ct-field--filled' : ''} ${touched && error ? 'ct-field--error' : ''}`}>
      <textarea
        className="ct-field__input ct-field__textarea"
        id="message"
        name="message"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLen}
        rows={5}
        required
      />
      <label className="ct-field__label" htmlFor="message">
        Tell me about your idea
      </label>
      <span className="ct-field__line" />
      <span className="ct-field__counter">
        {value.length}/{maxLen}
      </span>
      {touched && error && <span className="ct-field__error">{error}</span>}
    </div>
  )
}

/* ── Social Link ── */
function SocialLink({
  href,
  icon,
  label,
  index,
  visible,
}: {
  href: string
  icon: React.ReactNode
  label: string
  index: number
  visible: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.setProperty('--mx', `${x * 0.3}px`)
    el.style.setProperty('--my', `${y * 0.3}px`)
  }, [])

  const handleLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--mx', '0px')
    el.style.setProperty('--my', '0px')
  }, [])

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`ct-social ${visible ? 'ct-social--visible' : ''}`}
      style={{ animationDelay: `${0.6 + index * 0.12}s` }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <span className="ct-social__icon">{icon}</span>
      <span className="ct-social__label">{label}</span>
      <span className="ct-social__arrow">→</span>
      <span className="ct-social__shimmer" />
    </a>
  )
}

/* ╔════════════════════════════════════╗
   ║       MAIN CONTACT COMPONENT       ║
   ╚════════════════════════════════════╝ */
const Contact = () => {
  /* scroll reveal */
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  /* form state */
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState({ name: false, email: false, message: false })
  const [status, setStatus] = useState<Status>('idle')

  const validate = useCallback(() => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }, [form])

  const errors = validate()
  const isValid = Object.keys(errors).length === 0

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (!isValid) return

    setStatus('sending')
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      })

      if (!response.ok) throw new Error('Failed to send')

      setStatus('sent')
      setTimeout(() => {
        setStatus('idle')
        setForm({ name: '', email: '', message: '' })
        setTouched({ name: false, email: false, message: false })
      }, 3000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2500)
    }
  }

  const socials = [
    {
      href: 'https://github.com/Aadityaotakuu',
      icon: <GitHubIcon className="h-5 w-5" />,
      label: 'github.com/Aadityaotakuu',
    },
    {
      href: 'https://linkedin.com/in/aaditya-parab-5486212b7/',
      icon: <LinkedInIcon className="h-5 w-5" />,
      label: 'linkedin.com/in/Aaditya Parab',
    },
  ]

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let&apos;s build the next legend"
    >
      <div ref={sectionRef} className="ct-grid">
        {/* ─── FORM CARD ─── */}
        <TiltPanel className={`ct-card ct-card--form ${visible ? 'ct-card--revealed' : ''}`}>
          {/* success overlay */}
          <div className={`ct-success ${status === 'sent' ? 'ct-success--show' : ''}`}>
            <div className="ct-success__check">
              <svg viewBox="0 0 52 52" className="ct-success__svg">
                <circle cx="26" cy="26" r="25" fill="none" className="ct-success__circle" />
                <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" className="ct-success__tick" />
              </svg>
            </div>
            <p className="ct-success__text">Message sent!</p>
            <p className="ct-success__sub">I'll get back to you soon ✨</p>
          </div>

          <form
            className={`ct-form ${status === 'sent' ? 'ct-form--hidden' : ''}`}
            onSubmit={handleSubmit}
            noValidate
          >
            {FIELDS.map((f) => (
              <FloatingInput
                key={f.name}
                name={f.name}
                label={f.label}
                type={f.type}
                value={form[f.name as keyof typeof form]}
                error={errors[f.name] ?? ''}
                touched={touched[f.name as keyof typeof touched]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))}

            <FloatingTextarea
              value={form.message}
              error={errors.message ?? ''}
              touched={touched.message}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div className="ct-form__footer">
              <span className="ct-form__hint">
                {status === 'idle' && 'Feel free to drop me a message about anything — project ideas, collaboration, or just to say hi!'}
                {status === 'sending' && ''}
                {status === 'error' && 'Something went wrong. Try again.'}
              </span>

              <button
                type="submit"
                className={`ct-btn ${status === 'sending' ? 'ct-btn--loading' : ''}`}
                disabled={status === 'sending'}
              >
                <span className="ct-btn__text">
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </span>
                <span className="ct-btn__icon">
                  {status === 'sending' ? (
                    <span className="ct-btn__spinner" />
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  )}
                </span>
                <span className="ct-btn__ripple" />
              </button>
            </div>
          </form>
        </TiltPanel>

        {/* ─── SOCIAL CARD ─── */}
        <TiltPanel className={`ct-card ct-card--social ${visible ? 'ct-card--revealed ct-card--revealed-delay' : ''}`}>
          <p className="ct-card__eyebrow">Social</p>
          <h3 className="ct-card__heading">Find me on these channels</h3>
          <p className="ct-card__body">
            Let's connect — I'm always open to new ideas, collaborations, and conversations.
          </p>

          <div className="ct-social-list">
            {socials.map((s, i) => (
              <SocialLink
                key={s.label}
                href={s.href}
                icon={s.icon}
                label={s.label}
                index={i}
                visible={visible}
              />
            ))}
          </div>

          {/* availability badge */}
          <div className={`ct-avail ${visible ? 'ct-avail--visible' : ''}`}>
            <span className="ct-avail__dot" />
            <span>Currently available for work</span>
          </div>

          {/* decorative orbs */}
          <div className="ct-orb ct-orb--1" />
          <div className="ct-orb ct-orb--2" />
        </TiltPanel>
      </div>
    </Section>
  )
}

export default Contact