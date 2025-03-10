import { Link as RemixLink } from 'react-router'

import { cn } from '#/utils/tw'

export function Link({
  className,
  to,
  children,
}: {
  className?: string
  to: string
  children: React.ReactNode
}) {
  return (
    <RemixLink to={to} className={cn('text-primary underline', className)}>
      {children}
    </RemixLink>
  )
}
