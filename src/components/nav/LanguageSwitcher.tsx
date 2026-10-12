'use client'

import { useState, useEffect } from 'react'
import { Languages } from 'lucide-react'

export function LanguageSwitcher() {
  const [locale, setLocale] = useState<'es' | 'en'>('es')

  useEffect(() => {
    const match = document.cookie.match(/NEXT_LOCALE=(es|en)/)
    if (match && (match[1] === 'es' || match[1] === 'en')) {
      setLocale(match[1])
    }
  }, [])

  const toggleLanguage = () => {
    const nextLocale = locale === 'es' ? 'en' : 'es'
    setLocale(nextLocale)
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Cambiar idioma a ${locale === 'es' ? 'Inglés' : 'Español'}`}
      title="Cambiar idioma (ES / EN)"
    >
      <Languages className="size-3.5 text-primary" />
      <span className="uppercase font-semibold">{locale}</span>
    </button>
  )
}
