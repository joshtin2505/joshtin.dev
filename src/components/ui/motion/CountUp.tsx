'use client'

import * as React from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

interface CountUpProps {
  to: number
  from?: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function CountUp({
  to,
  from = 0,
  duration = 1.5,
  prefix = '',
  suffix = '',
  className,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  const shouldReduceMotion = useReducedMotion()

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    if (!inView || shouldReduceMotion) {
      node.textContent = `${prefix}${to}${suffix}`
      return
    }

    const controls = animate(from, to, {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate(value) {
        node.textContent = `${prefix}${Math.round(value)}${suffix}`
      },
    })

    return () => controls.stop()
  }, [inView, from, to, duration, prefix, suffix, shouldReduceMotion])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {shouldReduceMotion ? to : from}
      {suffix}
    </span>
  )
}
