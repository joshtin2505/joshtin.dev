import Section from '../Section'
import cvJson from '@/mocks/cv.json'
function Education() {
  const { education } = cvJson
  return (
    <Section title="Educación">
      <ul className="flex flex-col gap-8">
        {education.map(({ institution, startDate, endDate, area }, i) => {
          const startYear = new Date(startDate).getFullYear()
          const endYear =
            endDate != null ? new Date(endDate).getFullYear() : 'Actual'
          const years = `${startYear} - ${endYear}`
          return (
            <li key={i}>
              <article>
                <header className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium dark:text-neutral-300">
                      {institution}
                    </h3>
                  </div>

                  <time className="dark:text-neutral-400 text-sm min-w-24 max-md:text-right">
                    {years}
                  </time>
                </header>

                <footer>
                  <p>{area}</p>
                </footer>
              </article>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

export default Education
