import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Services     from './components/Services'
import WhyEbel      from './components/WhyEbel'
import HoeIkWerk    from './components/HoeIkWerk'
import Werk         from './components/Werk'
import OverMij      from './components/OverMij'
import Configurator from './components/Configurator'
import Pricing      from './components/Pricing'
import Contact      from './components/Contact'
import Footer       from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyEbel />
        <HoeIkWerk />
        <Werk />
        <Configurator />
        <Pricing />
        <OverMij />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
