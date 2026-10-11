import type { ReactNode } from 'react'
import { useTilt } from '../lib/motion'

type PhoneFrameProps = {
  children: ReactNode
  className?: string
  label?: string
  tilt?: number
}

export function PhoneFrame({ children, className, label, tilt = 0 }: PhoneFrameProps) {
  const tiltRef = useTilt(tilt)

  return (
    <div className={['phone', className].filter(Boolean).join(' ')}>
      <div className="phone__tilt" ref={tilt === 0 ? undefined : tiltRef}>
        <div className="phone__shell">
          <span className="phone__island" aria-hidden="true" />
          <div className="phone__screen">{children}</div>
          <span className="phone__glare" aria-hidden="true" />
        </div>
        <span className="phone__ground" aria-hidden="true" />
      </div>
      {label ? <p className="phone__caption">{label}</p> : null}
    </div>
  )
}
