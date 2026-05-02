/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Unbounded"', '"Space Grotesk"', 'ui-sans-serif', 'system-ui'],
        body: ['"Sora"', '"Space Grotesk"', 'ui-sans-serif', 'system-ui'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-strong': 'var(--surface-strong)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
      },
      boxShadow: {
        glow: '0 0 32px var(--glow)',
        neon: '0 0 48px var(--glow)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(circle at center, rgba(121, 245, 255, 0.15), transparent 70%)',
      },
    },
  },
  plugins: [],
}
// Force tailwind rebuild
