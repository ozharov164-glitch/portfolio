import { ICON_PATHS } from './paths'

export type IconName = keyof typeof ICON_PATHS

export type IconSize = 16 | 20 | 24 | 32

export function Icon({
  name,
  size = 20,
  className,
}: {
  name: IconName
  size?: IconSize
  className?: string
}) {
  return (
    <svg
      className={['icon', className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICON_PATHS[name]}
    </svg>
  )
}
