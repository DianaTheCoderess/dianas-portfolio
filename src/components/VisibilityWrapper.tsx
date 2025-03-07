import type { ReactNode } from "react"
import React from "react"
import { useLoadingState } from "../hooks/useLoadingState"

interface VisibilityWrapperProps {
  children: ReactNode
}

export const VisibilityWrapper: React.FC<VisibilityWrapperProps> = ({
  children,
}) => {
  const { status, progress } = useLoadingState()
  const childrenArray = React.Children.toArray(children)

  return (
    <>
      <div
        className={`transition-all duration-500 ${
          status === "complete" && progress >= 100
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
        id="header-section"
      >
        {childrenArray[0]}
      </div>
      <div
        className={`transition-all duration-500 ${
          status === "complete" && progress >= 100
            ? "visible opacity-100 delay-200"
            : "invisible opacity-0"
        }`}
        id="hero-section"
      >
        {childrenArray[1]}
      </div>
    </>
  )
}
