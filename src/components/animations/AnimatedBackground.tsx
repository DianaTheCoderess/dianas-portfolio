import type React from "react"
import { useEffect, useRef, useState } from "react"

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const particles = useRef<
    Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      baseSpeedX: number
      baseSpeedY: number
    }>
  >([])
  const animationFrameId = useRef<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Set initial mobile state
    setIsMobile(window.innerWidth < 768)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const colors = ["#FF6B97", "#00F5FF", "#9D4EDD"]
    // Reduce particle count on mobile for better performance
    const particleCount = isMobile ? 24 : 42

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Set background color
      ctx.fillStyle = "#2A1B3D"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update isMobile on resize
      setIsMobile(window.innerWidth < 768)
    }

    const createParticle = (x?: number, y?: number) => {
      // Slower base speed for mobile
      const speedMultiplier = isMobile ? 0.5 : 1
      const baseSpeedX = (Math.random() - 0.5) * 2 * speedMultiplier
      const baseSpeedY = (Math.random() - 0.5) * 2 * speedMultiplier

      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        size: Math.random() * (isMobile ? 3 : 2) + 2, // Slightly larger particles on mobile
        speedX: baseSpeedX,
        speedY: baseSpeedY,
        baseSpeedX,
        baseSpeedY,
        color: colors[Math.floor(Math.random() * colors.length)],
      }
    }

    const createParticles = () => {
      particles.current = Array.from({ length: particleCount }, () =>
        createParticle(),
      )
    }

    const drawParticle = (particle: (typeof particles.current)[0]) => {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.fill()
    }

    const updateParticle = (particle: (typeof particles.current)[0]) => {
      if (isMobile) {
        // Mobile animation pattern: gentle wave motion
        const time = Date.now() / 2000 // Slower wave motion
        particle.speedX =
          particle.baseSpeedX + Math.sin(time + particle.y * 0.01) * 0.2
        particle.speedY =
          particle.baseSpeedY + Math.cos(time + particle.x * 0.01) * 0.2
      } else {
        // Desktop: Mouse interaction
        const dx = mousePosition.current.x - particle.x
        const dy = mousePosition.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const angle = Math.atan2(dy, dx)
          const force = (1 - distance / 100) * 0.2
          particle.speedX += Math.cos(angle) * force
          particle.speedY += Math.sin(angle) * force
        } else {
          // Return to base speed when not influenced by mouse
          particle.speedX = particle.speedX * 0.95 + particle.baseSpeedX * 0.05
          particle.speedY = particle.speedY * 0.95 + particle.baseSpeedY * 0.05
        }

        // Limit maximum speed
        const maxSpeed = 3
        const currentSpeed = Math.sqrt(
          particle.speedX ** 2 + particle.speedY ** 2,
        )
        if (currentSpeed > maxSpeed) {
          const scale = maxSpeed / currentSpeed
          particle.speedX *= scale
          particle.speedY *= scale
        }
      }

      // Update position
      particle.x += particle.speedX
      particle.y += particle.speedY

      // Bounce off screen borders with damping
      const damping = isMobile ? 0.8 : 1 // More damping on mobile for smoother motion
      if (particle.x <= 0 || particle.x >= canvas.width) {
        particle.speedX *= -damping
        particle.baseSpeedX *= -damping
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
      }
      if (particle.y <= 0 || particle.y >= canvas.height) {
        particle.speedY *= -damping
        particle.baseSpeedY *= -damping
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))
      }
    }

    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas and redraw background
      ctx.fillStyle = "#2A1B3D"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (const particle of particles.current) {
        updateParticle(particle)
        drawParticle(particle)
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    // Handle window resize
    const handleResize = () => {
      resizeCanvas()
      createParticles() // Recreate particles on resize for better distribution
    }

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        mousePosition.current = {
          x: e.clientX,
          y: e.clientY,
        }
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    resizeCanvas()
    createParticles()
    animate()

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMobile]) // Add isMobile to dependencies

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] will-change-transform transform-gpu"
    />
  )
}

AnimatedBackground.displayName = "AnimatedBackground"

export { AnimatedBackground }
