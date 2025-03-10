import spriteHref from './sprite.svg'
import type { SVGProps } from 'react'
import type { IconName } from './name'

export { IconName }

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName
}) {
  return (
    <svg {...props}>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  )
}
