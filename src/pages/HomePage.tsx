import { motion } from 'framer-motion'
import Header from '../components/Header'
import ThreeBackground from '../components/ThreeBackground'
import { useSmoothScroll } from '../context/ScrollContext'
import { useScrollToHash } from '../hooks/useScrollToHash'
import About from '../sections/About'
import Contact from '../sections/Contact'
import Hero from '../sections/Hero'
import Projects from '../sections/Projects'
import Skills from '../sections/Skills'

const HomePage = () => {
  const { scrollTo } = useSmoothScroll()
  useScrollToHash(scrollTo)

  return (
    <motion.main
      className="relative z-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <ThreeBackground />
      <Header />
      <Hero />
      <div className="mx-auto w-[min(1200px,92vw)] pb-20">
        <About />
        <Skills />
        <Projects />
        <Contact />
        <footer className="mt-12 text-center text-xs uppercase tracking-[0.4em] text-muted">
          Crafted with motion, systems thinking, and intent
        </footer>
      </div>
    </motion.main>
  )
}

export default HomePage
