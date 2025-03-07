import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown"
import { Download, FileText } from "lucide-react"

interface ResumeDropdownProps {
  onOpen: () => void
  onDownload: () => void
}

export function ResumeDropdown({ onOpen, onDownload }: ResumeDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
        // className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 md:px-8 md:py-4 bg-neon-pink hover:bg-cyber-blue transition-all duration-300 rounded-lg sm:rounded-xl text-deep-purple font-semibold transform hover:scale-105 hover:shadow-lg hover:shadow-cyber-blue/20 text-sm sm:text-base"
        >
          <Download className="w-5 h-5" />
          Resume
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-deep-purple/95 border border-neon-pink/20">
        <DropdownMenuItem
          onClick={onDownload}
          className="text-cream hover:text-cyber-blue hover:bg-deep-purple/50 cursor-pointer gap-2"
        >
          <Download className="w-4 h-4" />
          Download HTML
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onOpen}
          className="text-cream hover:text-cyber-blue hover:bg-deep-purple/50 cursor-pointer gap-2"
        >
          <FileText className="w-4 h-4" />
          Open in Browser
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
