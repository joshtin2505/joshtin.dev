'use client'
import cvJson from '@/mocks/cv.json'
import './KeyboardManager'

import { SVGProps } from 'react'
import CommantPalette from './CommantPalette'
import { Github, LinkedIn, Npm, X } from '../icon'

function KeyboardManager() {
  const { basics } = cvJson
  const { profiles } = basics
  const SOCIAL_ICONS: Record<
    string,
    // eslint-disable-next-line no-unused-vars
    (props: SVGProps<SVGSVGElement>) => JSX.Element
  > = {
    GitHub: Github,
    LinkedIn,
    X,
    NPM: Npm
  }

  const socialkeymaps = profiles.map((profile) => {
    const { network, url } = profile
    const icon = SOCIAL_ICONS[network] // Add index signature
    const firstLetter = network[0].toUpperCase()
    return {
      title: 'Visita mi ' + network,
      url,
      section: 'Social',
      hotKey: 'Ctrl+' + firstLetter,
      icon
    }
  })

  return <CommantPalette socials={socialkeymaps} />
}

export default KeyboardManager
