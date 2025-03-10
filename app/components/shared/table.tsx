import * as React from 'react'
import { tv } from 'tailwind-variants'

import { cn } from '#utils/tw'

const tableVariants = tv({
  slots: {
    base: ['w-full divide-y divide-gray-300 rounded ring-2 ring-gray-200 ring-opacity-50'],
    header: ['bg-gray-50 data-[focused]:ring-0'],
    body: [''],
    footer: ['border-t bg-muted/50 font-medium [&>tr]:last:border-b-0'],
    column: ['py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 outline-none'],
    row: ['odd:bg-white even:bg-slate-50'],
    cell: ['py-3.5 pl-4 pr-3 text-left text-sm text-gray-900'],
  },
  variants: {
    type: {
      dialog: {
        base: [''],
        title: [''],
        description: [''],
      },
    },
  },
})

const { base, header, body, footer, column, row, cell } = tableVariants()

type TableProps = React.HTMLAttributes<HTMLTableElement> & {
  ref?: React.Ref<HTMLTableElement>
}
function Table({ ref, className, ...props }: TableProps) {
  return <table ref={ref} className={cn(base(), className)} {...props} />
}
Table.displayName = 'Table'

type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.Ref<HTMLTableSectionElement>
}
function TableHeader({ ref, className, children, ...props }: TableHeaderProps) {
  return (
    <thead ref={ref} className={cn(header(), className)} {...props}>
      <tr>{children}</tr>
    </thead>
  )
}
TableHeader.displayName = 'TableHeader'

type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.Ref<HTMLTableSectionElement>
}
function TableBody({ ref, className, ...props }: TableBodyProps) {
  return <tbody ref={ref} className={cn(body(), className)} {...props} />
}
TableBody.displayName = 'TableBody'

type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.Ref<HTMLTableSectionElement>
}
function TableFooter({ ref, className, ...props }: TableFooterProps) {
  return <tfoot ref={ref} className={cn(footer(), className)} {...props} />
}
TableFooter.displayName = 'TableFooter'

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  ref?: React.Ref<HTMLTableRowElement>
}
function TableRow({ ref, className, ...props }: TableRowProps) {
  return <tr ref={ref} className={cn(row(), className)} {...props} />
}
TableRow.displayName = 'TableRow'

type TableColumnProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  ref?: React.Ref<HTMLTableCellElement>
}
function TableColumn({ ref, className, ...props }: TableColumnProps) {
  return <th ref={ref} className={cn(column(), className)} {...props} />
}
TableColumn.displayName = 'TableColumn'

type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  ref?: React.Ref<HTMLTableCellElement>
}
function TableCell({ ref, className, ...props }: TableCellProps) {
  return <td ref={ref} className={cn(cell(), className)} {...props} />
}
TableCell.displayName = 'TableCell'

export { Table, TableHeader, TableBody, TableFooter, TableColumn, TableRow, TableCell }
