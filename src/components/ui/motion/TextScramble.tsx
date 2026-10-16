'use client'

import * as React from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

const GLYPHS = '0123456789ABCDEF_#@!<>{}[]/~$%*&+'

interface TextScrambleProps {
  text: string
  className?: string
  speed?: number
  triggerOnHover?: boolean
}

export function TextScramble({
  text,
  className,
  speed = 30,
  triggerOnHover = false,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = React.useState(text)
  const [isScrambling, setIsScrambling] = React.useState(false)
  const containerRef = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-20px' })
  const shouldReduceMotion = useReducedMotion()

  const scramble = React.useCallback(() => {
    if (isScrambling || shouldReduceMotion) return
    setIsScrambling(true)

    let iteration = 0
    const totalIterations = text.length * 3

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration / 3) {
              return text[index]
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join('')
      )

      if (iteration >= totalIterations) {
        clearInterval(interval)
        setDisplayText(text)
        setIsScrambling(false)
      }

      iteration += 1
    }, speed)
  }, [text, speed, isScrambling, shouldReduceMotion])

  React.useEffect(() => {
    if (inView && !shouldReduceMotion) {
      scramble()
    }
  }, [inView, scramble, shouldReduceMotion])

  return (
    <span
      ref={containerRef}
      onMouseEnter={triggerOnHover ? scramble : undefined}
      className={cn('inline-block font-mono tracking-tight select-none', className)}
    >
      {shouldReduceMotion ? text : displayText}
    </span>
  )
}
