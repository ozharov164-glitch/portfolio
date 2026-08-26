import { publicUrl } from '../lib/publicUrl'

type ChromaIconProps = {
  src: string
  alt: string
  className?: string
}

export function ChromaIcon({ src, alt, className }: ChromaIconProps) {
  return (
    <span className={['chroma-icon', className].filter(Boolean).join(' ')}>
      <img src={publicUrl(src)} alt={alt} width={256} height={256} decoding="async" />
    </span>
  )
}
