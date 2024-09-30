import Link from 'next/link'
// import { FaCode } from "react-icons/fa6"
import './Logo.css'
import { Code2Icon } from 'lucide-react'

function Logo() {
  return (
    <Link href="/" className="logo cursor-pointer flex items-center gap-1 ">
      <Code2Icon className="text-red-400 text-2xl" />
      <h2 className="titleLogo text-2xl font-mono font-semibold">
        Joshtin.Dev
      </h2>
    </Link>
  )
}

export default Logo
