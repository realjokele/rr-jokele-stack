import * as React from 'react'
import {
  useToastRegion,
  useToast,
  type AriaToastRegionProps,
  type AriaToastProps,
} from '@react-aria/toast'
import { type ToastState, ToastQueue, useToastQueue } from '@react-stately/toast'

import { Button } from './button'
import { Icon } from '../Icon'

interface MyToast {
  title: string
  description: string
}

// Global toast queue
export const toastQueue = new ToastQueue<MyToast>({
  maxVisibleToasts: 5,
})

// Manage the state for the toast queue with the useToastState hook.
// Alternatively, you could use a global toast queue
interface ToastProviderProps {}

export function ToastProvider({ ...props }: ToastProviderProps) {
  const state = useToastQueue<MyToast>(toastQueue)

  return <>{state.visibleToasts.length > 0 && <ToastRegion state={state} {...props} />}</>
}

// Provides the behavior and accessibility implementation for a toast region
// containing one or more toasts.
interface ToastRegionProps<T> extends AriaToastRegionProps {
  state: ToastState<MyToast>
}

function ToastRegion<T extends React.ReactNode>({ state, ...props }: ToastRegionProps<T>) {
  const ref = React.useRef(null)
  const { regionProps } = useToastRegion(props, state, ref)

  return (
    <div
      {...regionProps}
      ref={ref}
      className="toast-region fixed right-4 bottom-4 flex flex-col gap-2"
    >
      {state.visibleToasts.map((toast) => (
        <Toast key={toast.key} toast={toast} state={state} />
      ))}
    </div>
  )
}

interface ToastProps extends AriaToastProps<MyToast> {
  state: ToastState<MyToast>
}

function Toast({ state, ...props }: ToastProps) {
  const ref = React.useRef(null)
  const { toastProps, titleProps, closeButtonProps } = useToast(props, state, ref)

  return (
    <div
      {...toastProps}
      ref={ref}
      className="ring-opacity-5 pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-lg bg-white ring-1 shadow-lg ring-black"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon name="circle-check-big" className="h-6 w-6 text-green-400"></Icon>
          </div>
          <div className="ml-3 flex-1 pt-0.5">
            <p {...titleProps} className="text-sm font-medium text-gray-900">
              {props.toast.content.title}
            </p>
            <p className="mt-1 text-sm text-gray-500">{props.toast.content.description}</p>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <Button
              appearance="plain"
              {...closeButtonProps}
              className="absolute top-0 right-0 inline-flex rounded-md border-0 bg-white text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <Icon name="x" className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
