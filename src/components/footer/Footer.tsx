import { SOCIAL_ICONS } from '@/lib/SocialIcons'
import Link from 'next/link'
import React from 'react'

import cvJson from '@/mocks/cv.json'
import { MailIcon } from 'lucide-react'

function Footer() {
  const { basics } = cvJson
  return (
    <footer className="print:hidden w-full dark:bg-black border dark:border-neutral-900 dark:text-neutral-200 py-4 flex flex-col ">
      <div className="w-full">
        <div className="max-w-screen-xl mx-auto px-4 py-5 flex sm:justify-between flex-col-reverse justify-center sm:flex-row ">
          <div className="flex items-center gap-3 justify-center md:justify-normal">
            <h5 className="font-mono-mono capitalize">Contact me :3</h5>
            <ul className="flex gap-2">
              {basics.profiles.map(({ network, url }, i) => {
                if (!SOCIAL_ICONS[network]) return null
                if (i === 1) return null
                const Icon = SOCIAL_ICONS[network]
                return (
                  <li
                    key={network}
                    className="h-7 w-7 transition-all  dark:hover:text-muted-foreground dark:text-white dark:bg-neutral-800/50 dark:hover:bg-neutral-500/20 rounded"
                  >
                    <Link
                      className="w-full h-full grid place-items-center"
                      href={url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Icon className="size-5" />
                    </Link>
                  </li>
                )
              })}
              <li className="h-7 w-7 transition-all  dark:hover:text-muted-foreground dark:text-white dark:bg-neutral-800/50 dark:hover:bg-neutral-500/20 rounded">
                <Link
                  className="w-full h-full grid place-items-center"
                  href={`mailto:${basics.email}`}
                >
                  <MailIcon className="size-5" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-normal">
            <ul className="flex gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/curriculum" className="hover:underline">
                  Curriculum
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <p className="text-center sm:text-nowrap">
          &copy; 2024 Joshtin.dev. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
