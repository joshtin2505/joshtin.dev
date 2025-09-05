import cvMock from '@/mocks/cv.json'
import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
function ToolsIUse() {
  return (
    <section className="max-w-5xl mx-auto lg:px-0 px-3 min-h-dvh py-2">
      <h2 className="w-full text-start text-3xl sm:text-4xl mb-3 flex">
        <span className="text-red-500 text-3xl sm:text-4xl">&bull;</span>
        Tools I Use
      </h2>
      <ul className="flex flex-wrap gap-2 justify-center">
        {cvMock.toolsIUse.map((tool) => (
          <li
            className="border dark:border-neutral-800 p-2 rounded max-w-60 dark:hover:bg-neutral-800/50 dark:bg-black/40 backdrop-blur-sm transition duration-200 hover:z-50 "
            key={tool.name}
          >
            <h5>
              <Link
                className="hover:underline flex items-center"
                target="_blank"
                rel="noreferrer"
                href={tool.url}
              >
                {tool.name}
                &nbsp;
                <ExternalLinkIcon size={12} />
              </Link>
            </h5>
            <p>{tool.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ToolsIUse
