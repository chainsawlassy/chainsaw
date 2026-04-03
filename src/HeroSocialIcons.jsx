function IconSpotify() {
  return (
    <svg className="hero-social__svg" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.35c-.24.35-.66.48-1.02.24a8.26 8.26 0 00-10.56-1.14c-.4.1-.8-.24-.84-.66-.04-.42.24-.84.66-.9 4.56-.98 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3zm.12-3.36c-3.84-2.28-10.26-2.52-13.92-1.38-.6.18-1.2-.18-1.38-.72-.18-.54.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z"
      />
    </svg>
  )
}

function IconAppleMusic() {
  return (
    <svg className="hero-social__svg" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
      />
    </svg>
  )
}

function IconBandcamp() {
  return (
    <svg className="hero-social__svg" viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M0 18.75l7.5-13.5h16.5l-7.5 13.5H0z" />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg className="hero-social__svg" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg className="hero-social__svg" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
      />
    </svg>
  )
}

const external = { target: '_blank', rel: 'noopener noreferrer' }

/** Facebook + Instagram only (e.g. Reach / booking section). */
export function ReachSocialIcons({ facebook, instagram }) {
  return (
    <ul className="hero-social hero-social--reach mono" aria-label="Social media">
      <li className="hero-social__item">
        <a
          className="hero-social__link"
          href={facebook}
          {...external}
          aria-label="Chainsaw Lassy on Facebook"
        >
          <IconFacebook />
        </a>
      </li>
      <li className="hero-social__item">
        <a
          className="hero-social__link"
          href={instagram}
          {...external}
          aria-label="Chainsaw Lassy on Instagram"
        >
          <IconInstagram />
        </a>
      </li>
    </ul>
  )
}

export default function HeroSocialIcons({ spotify, appleMusic, bandcamp, facebook, instagram }) {
  const items = [
    { href: spotify, label: 'Chainsaw Lassy on Spotify', Icon: IconSpotify },
    { href: appleMusic, label: 'Chainsaw Lassy on Apple Music', Icon: IconAppleMusic },
    { href: bandcamp, label: 'Chainsaw Lassy on Bandcamp', Icon: IconBandcamp },
    { href: facebook, label: 'Chainsaw Lassy on Facebook', Icon: IconFacebook },
    { href: instagram, label: 'Chainsaw Lassy on Instagram', Icon: IconInstagram },
  ]

  return (
    <ul className="hero-social mono" aria-label="Music and social links">
      {items.map(({ href, label, Icon }) => (
        <li key={label} className="hero-social__item">
          <a className="hero-social__link" href={href} {...external} aria-label={label}>
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  )
}
