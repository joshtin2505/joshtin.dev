import { ImageIcon } from 'lucide-react'
import React from 'react'

function DevTemplates() {
  return (
    <div className="w-full flex flex-col py-3 overflow-x-auto">
      <h4 className="text-xl sm:text-2xl dark:text-neutral-300 flex text-center">
        Project Tamplates
        <span className="border border-green-500 bg-green-400/20 rounded-full text-base px-2 dark:text-white font-mono-mono font-normal py-1 scale-[.80] opacity-80">
          Developing
        </span>
      </h4>
      <ul className="flex gap-2 w-auto mx-auto py-2">
        {[0, 1, 2, 3].map((articulo) => (
          <li key={articulo}>
            <figure className="p-2 dark:bg-neutral-800/50 backdrop-blur-sm rounded w-60">
              <div className="w-full grid place-items-center dark:bg-neutral-700 rounded h-28">
                <ImageIcon size={32} />
              </div>
              <figcaption className="flex flex-col gap-1 pt-2">
                <div className="py-1 rounded-full w-full dark:bg-neutral-300 opacity-50"></div>
                <div className="py-1 rounded-full w-full dark:bg-neutral-300 opacity-50"></div>
                <div className="py-1 rounded-full w-4/5 dark:bg-neutral-300 opacity-50"></div>
                <div className="py-1 rounded-full w-2/4 dark:bg-neutral-300 opacity-50"></div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DevTemplates
