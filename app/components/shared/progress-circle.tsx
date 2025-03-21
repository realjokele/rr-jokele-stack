import { ProgressBar, type ProgressBarProps } from 'react-aria-components'

import { cn } from '#/utils/tw'

interface ProgressCircleProps extends Omit<ProgressBarProps, 'className'> {
  className?: string
}

const ProgressCircle = ({ className, ...props }: ProgressCircleProps) => {
  const c = '50%'
  const r = 'calc(50% - 2px)'
  return (
    <ProgressBar {...props}>
      {({ percentage, isIndeterminate }) => (
        <svg
          className={cn('size-4 shrink-0', className)}
          viewBox="0 0 24 24"
          fill="none"
          data-slot="icon"
        >
          <circle cx={c} cy={c} r={r} strokeWidth={3} stroke="currentColor" strokeOpacity={0.25} />
          {!isIndeterminate ? (
            <circle
              cx={c}
              cy={c}
              r={r}
              strokeWidth={3}
              stroke="currentColor"
              pathLength={100}
              strokeDasharray="100 200"
              strokeDashoffset={100 - (percentage ?? 0)}
              strokeLinecap="round"
              transform="rotate(-90)"
              className="origin-center"
            />
          ) : (
            <circle
              cx={c}
              cy={c}
              r={r}
              strokeWidth={3}
              stroke="currentColor"
              pathLength={100}
              strokeDasharray="100 200"
              strokeDashoffset={100 - 30}
              strokeLinecap="round"
              className="origin-center animate-spin"
            />
          )}
        </svg>
      )}
    </ProgressBar>
  )
}

export { ProgressCircle }
