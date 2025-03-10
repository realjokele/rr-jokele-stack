import { cn } from '#/utils/tw'

import { Heading } from './heading'

const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-bg text-fg **:data-[slot=table-header]:bg-muted/50 rounded-lg border shadow-xs has-[table]:overflow-hidden has-[table]:**:data-[slot=card-footer]:border-t **:[table]:overflow-hidden',
        className,
      )}
      {...props}
    />
  )
}

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
}

const CardHeader = ({ className, title, description, children, ...props }: HeaderProps) => (
  <div
    data-slot="card-header"
    className={cn('flex flex-col gap-y-1 px-6 py-5', className)}
    {...props}
  >
    {title && <CardTitle>{title}</CardTitle>}
    {description && <CardDescription>{description}</CardDescription>}
    {!title && typeof children === 'string' ? <CardTitle>{children}</CardTitle> : children}
  </div>
)

const CardTitle = ({ className, level = 3, ...props }: React.ComponentProps<typeof Heading>) => {
  return (
    <Heading
      data-slot="card-title"
      level={level}
      className={cn('leading-none font-semibold tracking-tight sm:leading-6', className)}
      {...props}
    />
  )
}

const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      data-slot="description"
      className={cn('text-muted-fg text-sm', className)}
      {...props}
    />
  )
}

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="card-content"
      className={cn(
        'has-[[data-slot=table-header]]:bg-muted/40 px-6 pb-6 has-[table]:border-t has-[table]:p-0 **:data-[slot=table-cell]:px-6 **:data-[slot=table-column]:px-6 [&:has(table)+[data-slot=card-footer]]:py-5',
        className,
      )}
      {...props}
    />
  )
}

const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
}

Card.Content = CardContent
Card.Description = CardDescription
Card.Footer = CardFooter
Card.Header = CardHeader
Card.Title = CardTitle

export { Card }
