'use client'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import Logo from '../logo/Logo'
import { ModeToggle } from '../Theme/ModeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { AlignJustifyIcon } from 'lucide-react'

function NavBar() {
  const [os, setOs] = useState('')

  useEffect(() => {
    const userAgent = window.navigator.userAgent
    if (userAgent.includes('Mac')) {
      setOs('MacOS')
    } else {
      setOs('Windows')
    }
  }, [])

  const simulateCtrlK = useCallback(() => {
    const event = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      ctrlKey: true,
      key: 'k'
    })
    document.dispatchEvent(event)
  }, [])

  return (
    <header className="top-0 w-full h-auto print:hidden sticky backdrop-blur-md backdrop-saturate-180 z-30 bg-background/80 border-b border-border">
      <nav aria-label="Navegación principal" className="max-w-5xl mx-auto flex items-center px-4 justify-between h-[69px]">
        <Logo />

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            className="hidden items-center w-44 justify-between md:flex bg-neutral-100/90 hover:bg-neutral-200/90 dark:bg-neutral-900/90 dark:hover:bg-neutral-800/90 transition-all duration-300 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground border border-border hover:border-emerald-500/40 hover:shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]"
            onClick={simulateCtrlK}
            aria-label="Buscar en la paleta de comandos (Ctrl+K)"
          >
            <span>Buscar...</span>
            <kbd className="bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded px-1.5 py-0.5 font-mono text-[10px]">
              {os === 'MacOS' ? 'Cmd + K' : 'Ctrl + K'}
            </kbd>
          </button>

          <ul className="hidden sm:flex items-center gap-5 text-sm font-medium text-muted-foreground">
            <li>
              <Link
                className="transition hover:text-foreground"
                href="/#experiencia"
              >
                Experiencia
              </Link>
            </li>
            <li>
              <Link
                className="transition hover:text-foreground"
                href="/#proyectos"
              >
                Proyectos
              </Link>
            </li>
            <li>
              <Link
                className="transition hover:text-foreground"
                href="/blog"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                className="transition hover:text-foreground"
                href="/curriculum"
              >
                Curriculum
              </Link>
            </li>
          </ul>

          <div className="flex items-center sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger
                className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition outline-none"
                aria-label="Abrir menú de navegación"
              >
                <AlignJustifyIcon className="size-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/#experiencia">Experiencia</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/#proyectos">Proyectos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/blog">Blog</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/curriculum">Curriculum</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}

export default NavBar
