'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { TooltipProvider } from '@/components/ui/tooltip'
import { MotionProvider } from '@/components/providers/MotionProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <MotionProvider>{children}</MotionProvider>
      </TooltipProvider>
    </NextThemesProvider>
  )
}
