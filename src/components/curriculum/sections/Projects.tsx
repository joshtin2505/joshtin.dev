import Link from 'next/link'
import Section from '../Section'
import cvJson from '@/mocks/cv.json'
function Projects() {
  const { projects } = cvJson
  return (
    <Section title="Proyectos">
      <ul className="grid grid-template-colums-auto-fill gap-2">
        {projects.map(({ description, highlights, name, url, isActive }) => (
          <li key={name}>
            <article className="flex flex-col p-4 rounded-md border dark:border-neutral-600 gap-4 h-full">
              <header className="flex-1">
                <h3 className="mb-2 flex gap-1">
                  {url ? (
                    <Link
                      className="dark:text-neutral-100 hover:underline dark:hover:text-neutral-300"
                      href={url}
                      target="_blank"
                      rel="noreferrer noopener"
                      title={`Ver el proyecto ${name}`}
                    >
                      {name}
                    </Link>
                  ) : (
                    <span className="dark:text-neutral-100">{name}</span>
                  )}
                  {isActive && <span className="scale-150"> &#8226; </span>}
                </h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </header>
              <footer className="flex flex-wrap justify-start items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                {highlights.map((highlight) => {
                  return (
                    <span
                      className="rounded-lg dark:bg-neutral-800 bg-neutral-200/80 text-muted-foreground text-sm font-medium px-2 "
                      key={highlight}
                    >
                      {highlight}
                    </span>
                  )
                })}
              </footer>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default Projects
