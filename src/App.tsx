import { CapabilityGrid } from './components/CapabilityGrid'
import { ChromaIcon } from './components/ChromaIcon'
import { ContactCTA } from './components/ContactCTA'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HeroFlow } from './components/HeroFlow'
import { MobileDock } from './components/MobileDock'
import { MoreWork } from './components/MoreWork'
import { PitchBand } from './components/PitchBand'
import { ProofBar } from './components/ProofBar'
import { ProjectSwitcher } from './components/ProjectSwitcher'
import { Reveal } from './components/Reveal'
import { SiteAtmosphere } from './components/SiteAtmosphere'
import { WorkProcess } from './components/WorkProcess'
import { icons, isConfigured, site } from './content/site'

export default function App() {
  const telegramReady = isConfigured(site.telegramUrl)

  return (
    <>
      <SiteAtmosphere />
      <a className="skip-link" href="#main">
        К содержанию
      </a>
      <Header />
      <main id="main">
        <section className="hero" id="top">
          <div className="hero__copy">
            <p className="hero__eyebrow">
              <span className="status-dot" aria-hidden="true" />
              {site.hero.eyebrow}
            </p>
            <h1>
              {site.hero.h1Before}{' '}
              <span className="accent-text">{site.hero.h1Accent}</span>
            </h1>
            <p className="hero__sub">{site.hero.subtitle}</p>
            <p className="hero__promise">{site.hero.promise}</p>
            <div className="hero__actions">
              <a className="btn btn-primary" href="#projects">
                {site.hero.primaryCta}
              </a>
              {telegramReady ? (
                <a
                  className="btn btn-ghost btn-telegram"
                  href={site.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ChromaIcon src={icons.telegram} alt="" />
                  {site.hero.secondaryCta}
                </a>
              ) : (
                <a className="btn btn-ghost btn-telegram" href="#contact">
                  <ChromaIcon src={icons.telegram} alt="" />
                  {site.hero.secondaryCta}
                </a>
              )}
            </div>
          </div>
          <HeroFlow />
          <p className="hero__stack">{site.hero.stackLine}</p>
        </section>

        <Reveal>
          <ProofBar />
        </Reveal>
        <Reveal>
          <PitchBand />
        </Reveal>
        <Reveal>
          <ProjectSwitcher />
        </Reveal>
        <Reveal>
          <MoreWork />
        </Reveal>
        <Reveal>
          <CapabilityGrid />
        </Reveal>
        <Reveal>
          <WorkProcess />
        </Reveal>
        <Reveal>
          <ContactCTA />
        </Reveal>
      </main>
      <Footer />
      <MobileDock />
    </>
  )
}
