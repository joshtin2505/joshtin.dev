'use client'

import * as React from 'react'
import { m, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  as?: 'div' | 'span' | 'section'
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  className,
  as = 'div',
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  const getInitialOffset = () => {
    if (shouldReduceMotion || direction === 'none') return { x: 0, y: 0 }
    switch (direction) {
      case 'up':
        return { x: 0, y: 24 }
      case 'down':
        return { x: 0, y: -24 }
      case 'left':
        return { x: 24, y: 0 }
      case 'right':
        return { x: -24, y: 0 }
    }
  }

  const offset = getInitialOffset()
  const MotionComponent = m[as]

  return (
    <MotionComponent
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
    >
      {children}
    </MotionComponent>
  )
}
