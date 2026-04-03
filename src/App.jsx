import './App.css'

import headerImageBackground from '@assets/HeaderImagebackground.png'
import headerImageBand from '@assets/HeaderImageBand.png'
import bandPhoto1 from '@assets/bandphotos/543652132_796462996464546_1266051853510077286_n.jpg'
import bandPhoto2 from '@assets/bandphotos/544466204_796462909797888_1928373643037447258_n.jpg'
import bandPhoto3 from '@assets/bandphotos/545053986_796462939797885_4120336002699839729_n.jpg'
import polaroidFrame from '@assets/PolaroidTemp.png'
import spiteGif from '@assets/spite gif.gif'
import decoHeart1 from '@assets/svgs/heart1.svg'
import decoHeart2 from '@assets/svgs/heart2.svg'
import decoHeart3 from '@assets/svgs/heart3.svg'
import decoHeart4 from '@assets/svgs/heart4.svg'
import decoHeart5 from '@assets/svgs/heart5.svg'
import decoHeart6 from '@assets/svgs/heart6.svg'
import decoHeart7 from '@assets/svgs/heart7.svg'
import decoHearts from '@assets/svgs/hearts.svg'
import decoStar1 from '@assets/svgs/star1.svg'
import decoStar2 from '@assets/svgs/star2.svg'
import decoStar3 from '@assets/svgs/star3.svg'
import decoX from '@assets/svgs/x.svg'
import backtoschoolStrokes from '@assets/backtoschool.json'
import HeroParallax from './HeroParallax.jsx'
import PolaroidStrokePlayback from './PolaroidStrokePlayback.jsx'
import HeroSocialIcons, { ReachSocialIcons } from './HeroSocialIcons.jsx'
import { siteContent } from './siteContent.js'
import { useParallaxDecos, parallaxSpeedForIndex } from './useParallaxDecos.js'

const tapeNav = [
  { href: '#bio', label: 'Bio' },
  { href: '#spite', label: 'SPITE' },
  { href: '#dates', label: 'Dates' },
  { href: '#reach', label: 'Reach' },
]

const streamArtist = {
  spotify: 'https://open.spotify.com/artist/3CmxFoGJTPqKDQmJ2Tlq3O',
  bandcamp: 'https://chainsawlassy.bandcamp.com/',
  apple: 'https://music.apple.com/us/artist/chainsaw-lassy/1717008612',
}

const streamSpiteEp = {
  bandcamp: 'https://chainsawlassy.bandcamp.com/album/spite',
  spotify: 'https://open.spotify.com/album/2Gp544X5Z5k4AIye5G3e6b',
  apple: 'https://music.apple.com/us/album/spite-ep/1764209332',
}

const socialLinks = {
  facebook: 'https://www.facebook.com/chainsawlassy',
  instagram: 'https://www.instagram.com/chainsawlassy/',
}

/** Full-height layer behind transparent sections (bio, reach, footer). */
const zineBodyDeco = [
  { src: decoHeart1, mod: '01' },
  { src: decoStar1, mod: '02' },
  { src: decoHeart3, mod: '03' },
  { src: decoStar2, mod: '04' },
  { src: decoHeart5, mod: '05' },
  { src: decoX, mod: '06' },
  { src: decoHeart7, mod: '07' },
  { src: decoStar3, mod: '08' },
  { src: decoHeart2, mod: '09' },
  { src: decoHearts, mod: '10' },
  { src: decoHeart4, mod: '11' },
  { src: decoStar1, mod: '12' },
  { src: decoHeart6, mod: '13' },
  { src: decoX, mod: '14' },
  { src: decoHeart3, mod: '15' },
  { src: decoStar2, mod: '16' },
]

/** Sit above solid strip background. */
const listenStripDeco = [
  { src: decoStar3, mod: '1' },
  { src: decoHeart5, mod: '2' },
  { src: decoHeart1, mod: '3' },
  { src: decoStar2, mod: '4' },
]

const footerDeco = [
  { src: decoHeart7, mod: '1' },
  { src: decoHearts, mod: '2' },
  { src: decoStar3, mod: '3' },
]

export default function App() {
  useParallaxDecos()

  return (
    <div className="zine">
      <a className="zine__skip" href="#main">
        Skip to content
      </a>

      <header className="tape-bar">
        <div className="tape-bar__inner">
          <nav className="tape-bar__nav" aria-label="Site">
            {tapeNav.map((item) => (
              <a key={item.href} className="tape-tab" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main">
        <HeroParallax backgroundSrc={headerImageBackground} bandSrc={headerImageBand}>
          <div className="hero-stack__title">
            <p className="paste-hero__issue mono">{siteContent.hero.issue}</p>
            <h1 id="zine-title" className="paste-hero__title">
              <span className="paste-hero__w1">{siteContent.hero.titleLine1}</span>
              <span className="paste-hero__w2">{siteContent.hero.titleLine2}</span>
            </h1>
            <HeroSocialIcons
              spotify={streamArtist.spotify}
              appleMusic={streamArtist.apple}
              bandcamp={streamArtist.bandcamp}
              facebook={socialLinks.facebook}
              instagram={socialLinks.instagram}
            />
          </div>
        </HeroParallax>

        <div className="zine-body">
          <div className="zine-body__atmosphere" aria-hidden="true">
            {zineBodyDeco.map(({ src, mod }, i) => (
              <img
                key={mod}
                src={src}
                alt=""
                className={`zine-body__deco zine-body__deco--${mod}`}
                data-parallax-speed={parallaxSpeedForIndex(i)}
              />
            ))}
          </div>

          <section id="bio" className="bio-section" aria-labelledby="bio-heading">
            <div className="bio-section__inner">
              <div className="bio-section__body">
                <p className="bio-section__eyebrow mono">{siteContent.bio.eyebrow}</p>
                <h2 id="bio-heading" className="bio-section__title">
                  {siteContent.bio.title}
                </h2>
                <div className="bio-section__text">
                  <p>{siteContent.bio.paragraph1}</p>
                  <p>{siteContent.bio.paragraph2}</p>
                </div>
              </div>
              <figure className="bio-section__figure">
                <div
                  className="bio-section__polaroid-stack"
                  role="group"
                  aria-label="Chainsaw Lassy band photos"
                >
                  <div className="bio-section__polaroid bio-section__polaroid--stack bio-section__polaroid--s1">
                    <img
                      className="bio-section__img"
                      src={bandPhoto1}
                      alt=""
                      width={900}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                    />
                    <img
                      className="bio-section__frame"
                      src={polaroidFrame}
                      alt=""
                      width={300}
                      height={400}
                      decoding="async"
                      aria-hidden={true}
                    />
                    <PolaroidStrokePlayback data={backtoschoolStrokes} />
                  </div>
                  <div className="bio-section__polaroid bio-section__polaroid--stack bio-section__polaroid--s2">
                    <img
                      className="bio-section__img"
                      src={bandPhoto2}
                      alt=""
                      width={900}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                    />
                    <img
                      className="bio-section__frame"
                      src={polaroidFrame}
                      alt=""
                      width={300}
                      height={400}
                      decoding="async"
                      aria-hidden={true}
                    />
                    <PolaroidStrokePlayback data={backtoschoolStrokes} />
                  </div>
                  <div className="bio-section__polaroid bio-section__polaroid--stack bio-section__polaroid--s3">
                    <img
                      className="bio-section__img"
                      src={bandPhoto3}
                      alt=""
                      width={900}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                    />
                    <img
                      className="bio-section__frame"
                      src={polaroidFrame}
                      alt=""
                      width={300}
                      height={400}
                      decoding="async"
                      aria-hidden={true}
                    />
                    <PolaroidStrokePlayback data={backtoschoolStrokes} />
                  </div>
                </div>
              </figure>
            </div>
          </section>

          <section id="spite" className="paste-panel spite-spotlight" aria-labelledby="spite-heading">
            <div className="paste-panel__inner spite-spotlight__inner">
              <div className="spite-spotlight__grid">
                <div className="spite-spotlight__art">
                  <img
                    className="spite-spotlight__gif"
                    src={spiteGif}
                    alt="SPITE EP animated artwork"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="spite-spotlight__copy">
                  <p className="spite-spotlight__eyebrow mono">{siteContent.spite.eyebrow}</p>
                  <h2 id="spite-heading" className="spite-spotlight__title">
                    {siteContent.spite.title}
                  </h2>
                  <p className="spite-spotlight__lead">{siteContent.spite.lead}</p>
                  <div className="spite-spotlight__actions">
                    <a
                      className="spite-spotlight__btn"
                      href={streamSpiteEp.bandcamp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Bandcamp
                    </a>
                    <a
                      className="spite-spotlight__btn"
                      href={streamSpiteEp.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Spotify
                    </a>
                    <a
                      className="spite-spotlight__btn"
                      href={streamSpiteEp.apple}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apple Music
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="dates" className="paste-strip paste-strip--black" aria-labelledby="dates-heading">
            <div className="paste-strip__atmosphere" aria-hidden="true">
              {listenStripDeco.map(({ src, mod }, i) => (
                <img
                  key={mod}
                  src={src}
                  alt=""
                  className={`paste-strip__deco paste-strip__deco--${mod}`}
                  data-parallax-speed={parallaxSpeedForIndex(i + 3)}
                />
              ))}
            </div>
            <div className="paste-strip__inner paste-strip__inner--dates">
              <h2 id="dates-heading" className="paste-strip__h mono">
                {siteContent.dates.heading}
              </h2>
              <ul className="date-rows">
                {(siteContent.dates.shows ?? []).map((show) => (
                  <li key={show.id}>
                    <span className="date-rows__when mono">{show.when}</span>
                    <span className="date-rows__info">
                      <strong>{show.venue}</strong>
                      <span>{show.city}</span>
                      {show.ticketUrl?.trim() ? (
                        <a
                          className="date-rows__ticket"
                          href={show.ticketUrl.trim()}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {show.ticketLabel?.trim() || 'Tickets'}
                        </a>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
              <div
                className="paste-strip__dates-booking"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <p
                  className="paste-strip__dates-note type-note mono"
                  style={{
                    margin: '1rem 0 0',
                    minWidth: 0,
                    maxWidth: 'min(100%, 42rem)',
                    width: '100%',
                    textAlign: 'center',
                    opacity: 0.72,
                    color: 'var(--strip-text)',
                  }}
                >
                  {siteContent.dates.bookingNote}
                </p>
              </div>
            </div>
          </section>

          <section id="reach" className="paste-panel paste-panel--reach">
            <div className="paste-panel__inner reach-zine">
              <div className="reach-zine__atmosphere" aria-hidden="true">
                <img
                  src={decoHeart4}
                  alt=""
                  className="reach-zine__deco reach-zine__deco--1"
                  data-parallax-speed={parallaxSpeedForIndex(11)}
                />
                <img
                  src={decoStar2}
                  alt=""
                  className="reach-zine__deco reach-zine__deco--2"
                  data-parallax-speed={parallaxSpeedForIndex(12)}
                />
                <img
                  src={decoHeart5}
                  alt=""
                  className="reach-zine__deco reach-zine__deco--3"
                  data-parallax-speed={parallaxSpeedForIndex(13)}
                />
              </div>
              <div className="reach-zine__stack">
                <h2>{siteContent.reach.heading}</h2>
                <div className="reach-zine__links">
                  <a href={siteContent.reach.emailHref}>{siteContent.reach.emailLabel}</a>
                  <ReachSocialIcons facebook={socialLinks.facebook} instagram={socialLinks.instagram} />
                </div>
              </div>
            </div>
          </section>

          <footer className="zine-foot mono">
            <div className="zine-foot__atmosphere" aria-hidden="true">
              {footerDeco.map(({ src, mod }, i) => (
                <img
                  key={mod}
                  src={src}
                  alt=""
                  className={`zine-foot__deco zine-foot__deco--${mod}`}
                  data-parallax-speed={parallaxSpeedForIndex(i + 14)}
                />
              ))}
            </div>
            <p>© {new Date().getFullYear()} {siteContent.footer.copyrightName}</p>
          </footer>
        </div>
      </main>
    </div>
  )
}
