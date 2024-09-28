'use client'
import Link from 'next/link'
import './NavBar.css'
import { useCallback, useEffect, useState } from 'react'
import './NavBar.css'
import Logo from '../logo/Logo'
import { ModeToggle } from '../Theme/ModeToggle'
// import { FaBars } from "react-icons/fa6"

function NavBar() {
  const [dropdown, setDropdown] = useState(false)
  const [os, setOs] = useState('')
  useEffect(() => {
    const userAgent = window.navigator.userAgent
    if (userAgent.includes('Win')) {
      setOs('Windows')
    } else if (userAgent.includes('Mac')) {
      setOs('MacOS')
    } else if (userAgent.includes('Linux')) {
      setOs('Linux')
    } else if (userAgent.includes('Android')) {
      setOs('Android')
    } else if (userAgent.includes('iOS')) {
      setOs('iOS')
    } else {
      setOs('Unknown')
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
    <header className="top-0 w-full h-auto print:hidden sticky backdrop-blur-md backdrop-saturate-[180%] z-30 ">
      <nav className="flex items-center px-4  justify-between border-b dark:border-b-neutral-800 h-[69px] relative">
        <Logo />
        <button
          className="sm:hidden transition dark:text-neutral-500 dark:hover:text-neutral-200 hover:scale-110 dark:active:text-neutral-300 dark:active:scale-100"
          onClick={() => setDropdown((prevState) => !prevState)}
        >
          {/* <FaBars size={24} /> */}
        </button>
        <div className="flex items-center">
          <ul
            className={
              'flex-col absolute dark:sm:bg-transparent dark:bg-black/80 items-start border sm:border-0 dark:border-neutral-800 rounded  backdrop-blur-md sm:backdrop-blur-none z-20 -bottom-[135px] right-1 sm:static sm:flex-row justify-center sm:justify-between sm:items-center p-4 w-auto gap-3 sm:flex [&>li]:bg-neutral-900 sm:[&>li]:bg-transparent [&>li]:p-1 sm:[&>li]:p-0 [&>li]:rounded [&>li]:transition-colors  dark:hover:[&>li]:bg-neutral-700 dark:sm:hover:[&>li]:bg-transparent ' +
              (!dropdown ? 'hidden' : 'flex')
            }
          >
            <li>
              <button
                className="hidden w-48 justify-between md:flex bg-neutral-100 dark:bg-neutral-900 rounded pl-2 py-1"
                onClick={simulateCtrlK}
              >
                <span className="text-neutral-500">Serch...</span>
                {os === 'MacOS' ? (
                  <kbd className="bg-neutral-500/30 text-neutral-400/90 rounded-md px-1 scale-95">
                    Cmd + K
                  </kbd>
                ) : (
                  <kbd className="bg-neutral-500/30 text-neutral-400/90 rounded-md px-1 scale-75">
                    Ctrl + K
                  </kbd>
                )}
              </button>
            </li>
            <li className="dark:hover:text-white">
              <Link href="/curriculum">Curriculum</Link>
            </li>
            <li className="text-neutral-500  text-center">
              <Link className="flex gap-1" href="/blog">
                Blog
                <span className="border border-neutral-400 bg-neutral-500/10 rounded-full px-2 text-sm text-center">
                  comming
                </span>
              </Link>
            </li>
          </ul>
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}

export default NavBar
