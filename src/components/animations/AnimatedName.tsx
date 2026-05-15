"use client"
import { cn } from "@/lib/utils.ts"
import type React from "react"
import { memo, useCallback, useEffect, useRef, useState } from "react"

interface AnimatedNameProps {
  name: string | undefined
  animationSpeed?: number
  className?: string
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const LETTERS_LENGTH = LETTERS.length
const DEFAULT_ANIMATION_SPEED = 30
const DEFAULT_ITERATION_STEP = 1 / 3

const AnimatedName: React.FC<AnimatedNameProps> = memo(
  ({ name, animationSpeed = DEFAULT_ANIMATION_SPEED, className = "" }) => {
    const finalText = name || "Testy McTestface"
    const [displayText, setDisplayText] = useState(finalText)
    const animationRef = useRef<number>(0)
    const iterationRef = useRef<number>(0)
    const elementRef = useRef<HTMLHeadingElement>(null)

    const animate = useCallback(() => {
      setDisplayText(() =>
        finalText
          .split("")
          .map((_originalChar, index) => {
            if (index < iterationRef.current) {
              return finalText[index]
            }
            return LETTERS[Math.floor(Math.random() * LETTERS_LENGTH)]
          })
          .join(""),
      )

      if (iterationRef.current < finalText.length) {
        iterationRef.current += DEFAULT_ITERATION_STEP
        animationRef.current = window.setTimeout(animate, animationSpeed)
      } else {
        iterationRef.current = 0
      }
    }, [finalText, animationSpeed])

    const handleMouseOver = useCallback(() => {
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }

      iterationRef.current = 0
      animate()
    }, [animate])

    useEffect(() => {
      const element = elementRef.current

      if (element) {
        element.addEventListener("mouseover", handleMouseOver)

        return () => {
          element.removeEventListener("mouseover", handleMouseOver)
          if (animationRef.current) {
            clearTimeout(animationRef.current)
          }
        }
      }
    }, [handleMouseOver])

    useEffect(() => {
      if (name) {
        setDisplayText(name)
      }
    }, [name])

    return (
      <span ref={elementRef} className={cn(className)} aria-label={finalText}>
        {displayText}
      </span>
    )
  },
)
AnimatedName.displayName = "AnimatedName"

export type { AnimatedNameProps }
export { AnimatedName }
