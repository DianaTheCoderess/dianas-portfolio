export interface LoadingLine {
  id: string
  text: string
}

export interface LoadingState {
  progress: number
  isVisible: boolean
  loadingTexts: string[]
  visibleLines: LoadingLine[]
  status: "initializing" | "loading" | "complete"
}
