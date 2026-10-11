import { useEffect, useRef, useState, type ImgHTMLAttributes, type ReactNode } from 'react'
import { spawnRipple } from '../lib/motion'
import { TelegramMark } from './TelegramMark'

type SoftImageProps = ImgHTMLAttributes<HTMLImageElement>

export function SoftImage({ className, onLoad, ...props }: SoftImageProps) {
  const ref = useRef<HTMLImageElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const image = ref.current
    if (image?.complete && image.naturalWidth > 0) setReady(true)
  }, [props.src])

  return (
    <img
      {...props}
      ref={ref}
      className={['soft-img', ready ? 'is-ready' : '', className].filter(Boolean).join(' ')}
      decoding={props.decoding ?? 'async'}
      onLoad={(event) => {
        setReady(true)
        onLoad?.(event)
      }}
    />
  )
}

type TgLinkProps = {
  href: string
  className?: string
  children: string
}

export function TgLink({ href, className, children }: TgLinkProps) {
  return (
    <a
      className={['btn', 'btn-tg', className].filter(Boolean).join(' ')}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerDown={spawnRipple}
    >
      <TelegramMark />
      <span>{children}</span>
      <span className="sr-only"> (откроется в новой вкладке)</span>
    </a>
  )
}

type ExternalLinkProps = {
  href: string
  className?: string
  children: ReactNode
}

export function ExternalLink({ href, className, children }: ExternalLinkProps) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (откроется в новой вкладке)</span>
    </a>
  )
}
