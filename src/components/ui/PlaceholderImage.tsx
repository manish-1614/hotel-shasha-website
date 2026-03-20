import { ImageIcon } from 'lucide-react'

interface PlaceholderImageProps {
  label?: string
  gradient?: string
  aspectRatio?: string
  className?: string
  icon?: boolean
}

export default function PlaceholderImage({
  label,
  gradient = 'from-forest/20 to-forest-light/10',
  aspectRatio = 'aspect-[4/3]',
  className = '',
  icon = true,
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative bg-gradient-to-br ${gradient} ${aspectRatio} ${className} overflow-hidden`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-forest/25">
        {icon && <ImageIcon size={32} strokeWidth={1} />}
        {label && (
          <span className="font-accent text-lg sm:text-xl">{label}</span>
        )}
      </div>
    </div>
  )
}
