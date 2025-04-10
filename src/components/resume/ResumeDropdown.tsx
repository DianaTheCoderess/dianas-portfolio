import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui"
import { Download, FileText } from "lucide-react"
import type React from "react"
import { useState } from "react"

interface ResumeDropdownProps {
  onOpen: () => void
  onDownload: () => void
}

const ResumeDropdown = ({ onOpen, onDownload }: ResumeDropdownProps) => {
  const [open, setOpen] = useState(false)

  const handleButtonClick = (e: React.MouseEvent) => {
    if (window.innerWidth <= 768) {
      e.preventDefault()
      e.stopPropagation()
      setOpen(!open)
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          onClick={handleButtonClick}
          aria-haspopup="true"
          aria-expanded={open}
          aria-label="Resume Options"
        >
          <Download className="w-5 h-5" />
          Resume
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-deep-purple/95 border border-neon-pink/20"
        onInteractOutside={() => setOpen(false)}
      >
        <DropdownMenuItem
          onClick={() => {
            onDownload()
            setOpen(false)
          }}
          className="text-cream hover:text-cyber-blue hover:bg-deep-purple/50 cursor-pointer gap-2"
          data-umami-event="resume-download"
        >
          <Download className="w-4 h-4" />
          Download HTML
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            onOpen()
            setOpen(false)
          }}
          className="text-cream hover:text-cyber-blue hover:bg-deep-purple/50 cursor-pointer gap-2"
          data-umami-event="resume-open-in-browser"
        >
          <FileText className="w-4 h-4" />
          Open in Browser
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export type { ResumeDropdownProps }
export { ResumeDropdown }
