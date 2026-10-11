import { About } from './components/About'
import { Cases } from './components/Cases'
import { ContactCTA } from './components/ContactCTA'
import { FloatCta } from './components/FloatCta'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MoreWork } from './components/MoreWork'
import { Offer } from './components/Offer'
import { Reviews } from './components/Reviews'
import { SiteAtmosphere } from './components/SiteAtmosphere'
import { WorkProcess } from './components/WorkProcess'

export default function App() {
  return (
    <>
      <SiteAtmosphere />
      <div className="scroll-sentinel" aria-hidden="true" />
      <a className="skip-link" href="#main">
        К содержанию
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Cases />
        <MoreWork />
        <Offer />
        <WorkProcess />
        <About />
        <Reviews />
        <ContactCTA />
      </main>
      <Footer />
      <FloatCta />
    </>
  )
}
