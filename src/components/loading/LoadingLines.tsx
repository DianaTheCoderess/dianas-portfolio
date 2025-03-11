import type { LoadingLine } from "@/types/loadingScreenTypes"

interface LoadingLinesProps {
  lines: LoadingLine[]
}

const LoadingLines = ({ lines }: LoadingLinesProps) => {
  return (
    <div className="h-[4.5rem] sm:h-[5.25rem] md:h-[6rem] mb-2 sm:mb-3">
      {lines.map((line, index) => {
        return (
          <div
            key={line.id}
            className="flex items-center gap-2 text-xs sm:text-sm md:text-base opacity-0 animate-fade-in h-6 sm:h-7 md:h-8"
            style={{ animationDelay: `${index * 300}ms` }}
          >
            <span className="text-neon-pink">{">"}</span>
            <span className="text-cream/80">{line.text}</span>
          </div>
        )
      })}
    </div>
  )
}

export type { LoadingLinesProps }
export { LoadingLines }
