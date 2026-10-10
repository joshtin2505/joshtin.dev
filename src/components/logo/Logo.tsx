import Link from 'next/link'
import './Logo.css'
import { Code2Icon } from 'lucide-react'

function Logo() {
  return (
    <Link
      href="/"
      className="logo cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
      aria-label="Ir al inicio de Joshtin.tech"
    >
      <Code2Icon className="text-red-500 size-6" />
      <span className="titleLogo text-xl font-mono font-bold tracking-tight">
        Joshtin.tech
      </span>
    </Link>
  )
}

export default Logo
