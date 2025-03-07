import { LoadingLines } from "@/components/LoadingLines"
import { ProgressBar } from "@/components/ProgressBar"
import { LOADING_SCREEN } from "@/constants.ts"
import { useLoadingState } from "@/hooks/useLoadingState"
import { useSearchParams } from "react-router-dom"

const LoadingScreen = () => {
  const [searchParams] = useSearchParams()
  const skipLoading = searchParams.get('skip-loading')
  const { progress, isVisible, visibleLines } = useLoadingState(skipLoading === 'true')

  if (!isVisible) return null

  console.log("LoadingScreen")

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-500 bg-deep-purple/95"
      aria-label="Loading screen"
    >
      <div
        className={`cyber-window w-full max-w-${LOADING_SCREEN.MAX_WIDTH_SM} sm:max-w-${LOADING_SCREEN.MAX_WIDTH_MD} md:max-w-${LOADING_SCREEN.MAX_WIDTH_LG} rounded-lg sm:rounded-xl relative overflow-hidden`}
      >
        <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          <div className="terminal-text font-mono">
            <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base mb-2 sm:mb-3">
              <span className="text-neon-pink">$</span>
              <span className="text-cyber-blue/80">
                initiating_portfolio.sh
              </span>
            </div>

            <LoadingLines lines={visibleLines} />
            <ProgressBar progress={progress} />

            <div className="flex justify-end mt-2 sm:mt-3">
              <div className="loading-dots text-xs sm:text-sm text-cream/60">
                {progress < 100 ? "Loading" : "Complete"}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-linear-to-b from-transparent to-deep-purple/30 pointer-events-none" />
      </div>
    </div>
  )
}

export default LoadingScreen
