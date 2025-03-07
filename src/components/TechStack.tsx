import { TECH_STACK } from "@/constants.ts"
import type React from "react"
import { useEffect, useState } from "react"

interface TechStackProps {
  technologies: string[]
  maxWidth?: string
}

const TechStack: React.FC<TechStackProps> = ({
  technologies,
  maxWidth = "100%",
}) => {
  const [visibleTechs, setVisibleTechs] = useState<string[]>([])
  const itemsPerRow = 4
  const visibleRows = 2
  const totalVisible = itemsPerRow * visibleRows

  useEffect(() => {
    const getNextBatch = (prev: string[]) => {
      const available = technologies.filter((tech) => !prev.includes(tech))
      if (available.length < totalVisible) {
        return technologies.slice(0, totalVisible)
      }

      const selected: string[] = []
      while (selected.length < totalVisible) {
        const randomIndex = Math.floor(Math.random() * available.length)
        selected.push(available[randomIndex])
        available.splice(randomIndex, 1)
      }
      return selected
    }

    setVisibleTechs(getNextBatch([]))

    const interval = setInterval(() => {
      setVisibleTechs((prev) => getNextBatch(prev))
    }, TECH_STACK.UPDATE_INTERVAL)

    return () => clearInterval(interval)
  }, [technologies, totalVisible])

  const techRows = Array.from({ length: visibleRows }, (_, rowIndex) =>
    visibleTechs.slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow),
  )

  return (
    <div className="border-t border-cream/10 pt-6 sm:pt-8" style={{ maxWidth }}>
      <h2 className="text-cyber-blue font-mono text-xs sm:text-sm mb-3 sm:mb-4">
        TECH STACK
      </h2>
      <div className="grid grid-rows-2 gap-2 sm:gap-3">
        {techRows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex flex-row gap-2 sm:gap-3">
            {row.map((tech, index) => {
              const textLength = tech.length
              const minWidth = 1
              const maxWidth = 2
              const flexBasis = Math.min(
                maxWidth,
                Math.max(minWidth, textLength / 6),
              )

              return (
                <span
                  data-testid="tech-stack"
                  key={`${tech}-${rowIndex}-${index}`}
                  className="px-2 sm:px-3 h-8 sm:h-10 bg-deep-purple/50 rounded-lg sm:rounded-xl
                          text-xs sm:text-sm text-cream/80 border border-neon-pink/20
                          hover:border-cyber-blue/50 transition-all duration-300
                          animate-fade-in flex items-center justify-center
                          truncate"
                  title={tech}
                  style={{
                    flexGrow: flexBasis,
                    flexShrink: 1,
                    flexBasis: `${flexBasis * 20}%`,
                  }}
                >
                  {tech}
                </span>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
TechStack.displayName = "TechStack"

export type { TechStackProps }
export { TechStack }
