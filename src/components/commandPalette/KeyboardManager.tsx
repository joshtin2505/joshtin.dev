'use client'
import cvJson from '@/mocks/cv.json'
import './KeyboardManager'

import CommantPalette from './CommantPalette'
import { SOCIAL_ICONS } from '@/lib/SocialIcons'

function KeyboardManager() {
  const { basics } = cvJson
  const { profiles } = basics

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
