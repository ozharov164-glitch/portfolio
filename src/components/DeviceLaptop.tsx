import type { ReactNode } from 'react'
import { useTilt } from '../lib/motion'

type DeviceLaptopProps = {
  children: ReactNode
  className?: string
}

export function DeviceLaptop({ children, className }: DeviceLaptopProps) {
  const tiltRef = useTilt(4)

  return (
    <div className={['laptop', className].filter(Boolean).join(' ')}>
      <div className="laptop__tilt" ref={tiltRef}>
        <div className="laptop__lid">
          <span className="laptop__camera" aria-hidden="true" />
          <div className="laptop__screen">{children}</div>
        </div>
        <div className="laptop__base" aria-hidden="true" />
      </div>
      <span className="phone__ground" aria-hidden="true" />
    </div>
  )
}
