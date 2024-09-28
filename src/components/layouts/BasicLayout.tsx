import type { ReactNode } from 'react'
import NavBar from '../nav/NavBar'
import Footer from '../footer/Footer'
import { cn } from '@/lib/utils'
import KeyboardManager from '../commandPalette/KeyboardManager'

function BasicLayout({
  children,
  className
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className={cn(className, 'flex-1')}>{children}</main>
        <Footer />
      </div>
      <KeyboardManager />
    </>
  )
}

export default BasicLayout
