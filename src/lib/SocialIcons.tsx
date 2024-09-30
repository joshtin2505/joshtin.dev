import { Github, LinkedIn, Npm, X } from '@/components/icon'
import { SVGProps } from 'react'

export const SOCIAL_ICONS: Record<
  string,
  // eslint-disable-next-line no-unused-vars
  (props: SVGProps<SVGSVGElement>) => JSX.Element
> = {
  LinkedIn,
  GitHub: Github,
  NPM: Npm,
  X
}
