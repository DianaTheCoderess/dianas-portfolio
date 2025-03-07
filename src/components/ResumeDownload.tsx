import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown"
import { render } from "jsonresume-theme-even"
import resumeData from "../data/resume.json"

const ResumeDownload = () => {
  const generateResumeURL = async () => {
    try {
      const html = render(resumeData)
      const blob = new Blob([html], { type: "text/html" })
      return URL.createObjectURL(blob)
    } catch (error) {
      console.error("Error rendering resume:", error)
      return null
    }
  }

  const handleOpen = async () => {
    const url = await generateResumeURL()
    if (url) {
      window.open(url, "_blank")
      URL.revokeObjectURL(url)
    }
  }

  const handleDownload = async () => {
    const url = await generateResumeURL()
    if (url) {
      const a = document.createElement("a")
      a.href = url
      a.download = "resume.html"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ResumeDownload
