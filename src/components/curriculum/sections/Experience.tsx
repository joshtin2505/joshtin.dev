import React from 'react'
import Section from '../Section'
import cv from '@/mocks/cv.json'
function Experience() {
  const { work } = cv
  return (
    <Section title="Experiencia">
      <ul className="flex flex-col gap-8">
        {work.map(
          ({
            name,
            startDate,
            endDate,
            position,
            summary,
            highlights,
            url
          }) => {
            const startYear = new Date(startDate).getFullYear()
            const endYear =
              endDate != null ? new Date(endDate).getFullYear() : 'Actual'

            return (
              <li key={name}>
                <article>
                  <header className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-medium">
                        <a
                          className="hover:underline"
                          href={url}
                          title={`Ver ${name}`}
                          target="_blank"
                        >
                          {name}
                        </a>
                      </h3>
                      <h4 className="font-normal">{position}</h4>
                    </div>

                    <div className="[&>time]:text-muted-foreground [&>time]:text-sm [&>time]:min-w-24 [&>time]:cursor-default  ">
                      <time dateTime={startDate} data-title={startDate}>
                        {startYear}
                      </time>
                      {' - '}
                      <time
                        dateTime={endDate ?? undefined}
                        data-title={endDate}
                      >
                        {endYear}
                      </time>
                    </div>
                  </header>

                  <footer>
                    <p>{summary}</p>
                  </footer>
                </article>
                <ul className="flex flex-wrap gap-1 pt-1">
                  {highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-lg dark:bg-neutral-800 bg-neutral-200/80 font-medium px-2"
                    >
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </li>
            )
          }
        )}
      </ul>
      {/* <h4>Actualmente no cuento con experiencia laboral. </h4> */}
    </Section>
  )
}

export default Experience
