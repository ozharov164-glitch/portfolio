import type { CSSProperties } from 'react'
import { publicUrl } from '../lib/publicUrl'

export function SiteAtmosphere() {
  const photoStyle = {
    '--aurora-photo': `url("${publicUrl('/media/atmosphere/aurora.webp')}")`,
  } as CSSProperties

  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere__photo" style={photoStyle} />
      <div className="atmosphere__blob atmosphere__blob--a" />
      <div className="atmosphere__blob atmosphere__blob--b" />
      <div className="atmosphere__blob atmosphere__blob--c" />
      <svg className="atmosphere__draw" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path
          className="atmosphere__trace"
          d="M80 160C220 90 310 260 460 210C610 160 680 40 820 110C960 180 1040 320 1180 280C1280 252 1360 180 1420 210"
        />
        <path
          className="atmosphere__trace atmosphere__trace--slow"
          d="M40 720C180 640 260 780 420 740C590 696 660 560 820 600C980 640 1100 760 1280 700"
        />
        <circle className="atmosphere__node" cx="460" cy="210" r="3.2" />
        <circle className="atmosphere__node" cx="820" cy="110" r="3.2" />
        <circle className="atmosphere__node" cx="1180" cy="280" r="3.2" />
        <circle className="atmosphere__node" cx="420" cy="740" r="3.2" />
        <circle className="atmosphere__node" cx="820" cy="600" r="3.2" />
      </svg>
      <div className="atmosphere__grid" />
      <div className="atmosphere__vignette" />
      <div className="atmosphere__noise" />
    </div>
  )
}
