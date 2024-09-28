import Section from '../Section'
import cvJson from '@/mocks/cv.json'
function Skills() {
  const { skills } = cvJson
  return (
    <Section title="Habilidades">
      <ul className="inline-flex flex-wrap justify-center gap-1">
        {skills.map((skill, i) => (
          <li
            className="rounded-lg dark:bg-neutral-800 bg-neutral-200/80  font-medium px-2"
            key={i}
          >
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default Skills
