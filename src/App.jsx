import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LogoBar from './components/LogoBar'
import Services from './components/Services'
import Manifesto from './components/Manifesto'
import Cases from './components/Cases'
import { lazy, Suspense } from 'react'
const LumineShowcase = lazy(() => import('./components/LumineShowcase'))
import Reviews from './components/Reviews'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoBar />
        <Services />
        <Manifesto />
        <Cases />
        <Suspense fallback={<div className="h-[80rem] bg-[#0F0F0E]" />}>
          <LumineShowcase />
        </Suspense>
        <Reviews />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
