import * as React from 'react'

import { motion } from 'motion/react'
import {
  ProgressBar as ProgressBarPrimitive,
  type ProgressBarProps as ProgressBarPrimitiveProps,
} from 'react-aria-components'

import { Label } from './field'
import { composeTailwindRenderProps } from './primitive'

interface ProgressBarProps extends ProgressBarPrimitiveProps {
  label?: string
  max?: string
  duration?: number
}

const ProgressBar = ({ label, max, duration, className, ...props }: ProgressBarProps) => {
  return (
    <ProgressBarPrimitive
      {...props}
      className={composeTailwindRenderProps(className, 'flex flex-col gap-1')}
    >
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          <div className="flex justify-between gap-2">
            <Label>{label}</Label>
          </div>
          <div className="flex flex-row items-baseline">
            <div className="bg-secondary relative h-2 min-w-64 flex-grow overflow-hidden rounded-full outline-1 -outline-offset-1 outline-transparent">
              {!isIndeterminate ? (
                <motion.div
                  className="bg-primary absolute top-0 left-0 h-full rounded-full forced-colors:bg-[Highlight]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: duration ?? 0.5, ease: 'easeInOut' }}
                />
              ) : (
                <motion.div
                  className="bg-primary absolute top-0 h-full rounded-full forced-colors:bg-[Highlight]"
                  initial={{ left: '0%', width: '40%' }}
                  animate={{ left: ['0%', '100%', '0%'] }}
                  transition={{
                    repeat: Infinity,
                    duration: duration ?? 2,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </div>
            <span className="text-muted-fg ml-4 w-8 text-right text-sm tabular-nums">
              {`${valueText}${max ? ` / ${max}` : ''}`}
            </span>
          </div>
        </>
      )}
    </ProgressBarPrimitive>
  )
}

export { ProgressBar }
