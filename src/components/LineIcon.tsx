import type { LineIconId } from '../content/site'

type LineIconProps = {
  name: LineIconId
  className?: string
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function glyph(name: LineIconId) {
  switch (name) {
    case 'bot':
      return (
        <>
          <path
            {...stroke}
            d="M5 6.6h14A2.4 2.4 0 0 1 21.4 9v6.2A2.4 2.4 0 0 1 19 17.6h-8.2L6.6 21v-3.4H5A2.4 2.4 0 0 1 2.6 15.2V9A2.4 2.4 0 0 1 5 6.6Z"
          />
          <path {...stroke} d="M9.6 12.2h4.8M13.2 10.4 15 12.2l-1.8 1.8" />
        </>
      )
    case 'screen':
      return (
        <>
          <rect {...stroke} x="7" y="2.6" width="10" height="18.8" rx="2.2" />
          <path {...stroke} d="M9.4 5.2h5.2" />
          <rect {...stroke} x="9" y="7.4" width="6" height="8.2" rx="0.9" />
          <path {...stroke} d="M11 18.9h2" />
        </>
      )
    case 'board':
      return (
        <>
          <rect {...stroke} x="2.6" y="5" width="18.8" height="14" rx="2" />
          <path {...stroke} d="M2.6 8.8h18.8" />
          <circle cx="5.8" cy="6.9" r="0.55" fill="currentColor" />
          <circle cx="8" cy="6.9" r="0.55" fill="currentColor" />
          <circle cx="10.2" cy="6.9" r="0.55" fill="currentColor" />
          <rect {...stroke} x="6" y="11.1" width="12" height="5.1" rx="0.8" />
        </>
      )
    case 'cards':
      return (
        <>
          <rect {...stroke} x="7.4" y="3.8" width="11.2" height="14.2" rx="1.8" />
          <rect {...stroke} x="4.4" y="6.4" width="11.2" height="14.2" rx="1.8" />
        </>
      )
    case 'shield':
      return (
        <>
          <path
            {...stroke}
            d="M12 3.2 19.1 6.1v5.5c0 4.1-2.9 7.1-7.1 8.3-4.2-1.2-7.1-4.2-7.1-8.3V6.1L12 3.2Z"
          />
          <path {...stroke} d="M9.1 12.2 11.1 14l3.9-4.3" />
        </>
      )
    case 'focus':
      return (
        <>
          <circle {...stroke} cx="12" cy="12" r="7.4" />
          <circle {...stroke} cx="12" cy="12" r="2.1" />
          <path {...stroke} d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4" />
        </>
      )
    case 'nodes':
      return (
        <>
          <circle {...stroke} cx="12" cy="6.2" r="2.05" />
          <circle {...stroke} cx="6.5" cy="16.6" r="2.05" />
          <circle {...stroke} cx="17.5" cy="16.6" r="2.05" />
          <path {...stroke} d="M10.4 7.7 8 14.7M13.6 7.7l2.4 7" />
        </>
      )
    case 'handoff':
      return (
        <>
          <rect {...stroke} x="3.2" y="6.8" width="10.2" height="10.4" rx="1.7" />
          <path {...stroke} d="M16 12h4.8M18.4 9.7 21 12l-2.6 2.3" />
        </>
      )
    default: {
      const exhaustive: never = name
      throw new Error(`Unknown line icon: ${exhaustive}`)
    }
  }
}

export function LineIcon({ name, className }: LineIconProps) {
  return (
    <span className={['line-icon', className].filter(Boolean).join(' ')}>
      <svg
        viewBox="0 0 24 24"
        width="32"
        height="32"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        {glyph(name)}
      </svg>
    </span>
  )
}
