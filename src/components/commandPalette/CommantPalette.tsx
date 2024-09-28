'use client'
// import { SocialKeymaps } from "@/types"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { usePathname } from 'next/navigation'

import { SVGProps, useEffect, useState } from 'react'

function CommantPalette({
  socials
}: {
  socials?: {
    title: string
    url: string
    section: string
    hotKey: string
    // eslint-disable-next-line no-unused-vars
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  }[]
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])
  const openUrl = (url: string) => {
    window.open(url, '_blank')
  }
  return (
    <>
      <CommandDialog
        // className="print:hidden w-96 dark:bg-neutral-900/50 border dark:border-neutral-800 backdrop-blur p-2 rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2  z-40"
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput
          className="outline-none w-full bg-transparent h-11 px-2 text-white/80 border-b border-white/20 placeholder:bg-white/10 placeholder:p-1 placeholder:px-2 placeholder:rounded "
          placeholder="Type a command or search"
        />
        <CommandList>
          <CommandEmpty className="p-1 w-full flex flex-col gap-1 items-center">
            <strong>No results found</strong>
          </CommandEmpty>
          {pathname.includes('curriculum') && (
            <CommandGroup className="" heading="General">
              {/* <CommandItem
              className="flex justify-between p-1 px-2 hover:cursor-pointer hover:bg-white/10 rounded-md"
              onSelect={() => setOpen(false)}
            >
              <div className="flex gap-1">
                <span>✖️</span>
                <strong>Cerrar ventana de comandos</strong>
              </div>
              <span>
                <kbd>Ctrl + K</kbd>
              </span>
            </CommandItem> */}

              <CommandItem
                className="flex justify-between p-1 px-2 hover:cursor-pointer hover:bg-white/10 rounded-md"
                onSelect={() => window.print()}
              >
                <div className="flex gap-1">
                  <span>🖨️</span>
                  <strong>Imprimir Curriculum</strong>
                </div>
                <span>
                  <kbd>Ctrl + P</kbd>
                </span>
              </CommandItem>
            </CommandGroup>
          )}
          <CommandSeparator />
          <CommandGroup className="flex flex-col " heading="Social">
            {socials &&
              socials.map((social) => {
                const Icon = social.icon
                return (
                  <CommandItem
                    className="flex p-1 px-2 items-center gap-2 hover:cursor-pointer hover:bg-white/10 rounded-md"
                    key={social.title}
                    onSelect={() => openUrl(social.url)}
                  >
                    <Icon className="" />
                    <strong>{social.title}</strong>
                  </CommandItem>
                )
              })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CommantPalette
