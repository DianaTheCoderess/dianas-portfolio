import type React from "react"
import { useEffect, useState } from "react"

interface TechStackProps {
  technologies: string[]
}

export const TechStack: React.FC<TechStackProps> = ({ technologies }) => {
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
    }, 3000)

    return () => clearInterval(interval)
  }, [technologies, totalVisible])

  return (
    <div className="border-t border-cream/10 pt-6 sm:pt-8">
      <h2 className="text-cyber-blue font-mono text-xs sm:text-sm mb-3 sm:mb-4">
        TECH STACK
      </h2>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {visibleTechs.map((tech, index) => {
          return (
            <span
              key={`${tech}-${index}`}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-deep-purple/50 rounded-lg sm:rounded-xl 
                     text-xs sm:text-sm text-cream/80 border border-neon-pink/20 
                     hover:border-cyber-blue/50 transition-all duration-300
                     animate-fade-in"
            >
              {tech}
            </span>
          )
        })}
      </div>
    </div>
  )
}
