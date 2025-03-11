interface ProgressBarProps {
  progress: number
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const scaleX = Math.min(progress, 100) / 100

  return (
    <div
      className="relative h-1.5 sm:h-2"
      data-testid="loading-progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-deep-purple/50 rounded-full" />

      {/* Glow Base */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div
          className="h-full w-full bg-linear-to-r from-neon-pink to-cyber-blue opacity-20 blur-xs transition-transform duration-300 ease-out origin-left"
          style={{ transform: `scaleX(${scaleX})` }}
        />
      </div>

      {/* Main Progress Bar */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div
          className="h-full w-full bg-linear-to-r from-neon-pink to-cyber-blue transition-transform duration-300 ease-out origin-left"
          style={{ transform: `scaleX(${scaleX})` }}
        />
      </div>

      {/* Outer Glow */}
      <div
        className="absolute inset-0 rounded-full opacity-50 bg-linear-to-r from-neon-pink to-cyber-blue blur-md transition-transform duration-300 ease-out origin-left"
        style={{ transform: `scaleX(${scaleX})` }}
      />
    </div>
  )
}

export type { ProgressBarProps }
export { ProgressBar }
