import type { LoadingState } from "@/types/loadingScreenTypes"
import { useCallback, useEffect, useReducer } from "react"
import loading_messages from "../data/loading_messages.txt?raw"

import { ANIMATION_TIMINGS } from "@/constants"

type LoadingAction =
  | { type: "INITIALIZE_TEXTS"; payload: string[] }
  | { type: "ADD_LINE"; payload: string }
  | { type: "UPDATE_LINE"; payload: { index: number; text: string } }
  | { type: "SET_PROGRESS"; payload: number }
  | { type: "COMPLETE" }

const generateId = () => `loading-${Math.random().toString(36).slice(2, 11)}`
const getRandomText = (texts: string[]) =>
  texts[Math.floor(Math.random() * texts.length)]

const initialState: LoadingState = {
  progress: 0,
  isVisible: true,
  loadingTexts: [],
  visibleLines: [],
  status: "initializing",
}

function loadingReducer(
  state: LoadingState,
  action: LoadingAction,
): LoadingState {
  switch (action.type) {
    case "INITIALIZE_TEXTS":
      return {
        ...state,
        loadingTexts: action.payload,
        status: "loading",
      }
    case "ADD_LINE":
      return {
        ...state,
        visibleLines: [
          ...state.visibleLines,
          { id: generateId(), text: action.payload },
        ],
      }
    case "UPDATE_LINE":
      return {
        ...state,
        visibleLines: state.visibleLines.map((line, index) =>
          index === action.payload.index
            ? { ...line, text: action.payload.text }
            : line,
        ),
      }
    case "SET_PROGRESS":
      return {
        ...state,
        progress: action.payload,
      }
    case "COMPLETE":
      return {
        ...state,
        isVisible: false,
        status: "complete",
      }
    default:
      return state
  }
}

export function useLoadingState() {
  const [state, dispatch] = useReducer(loadingReducer, initialState)

  const scheduleAnimation = useCallback(
    (callback: () => void, delay: number) => {
      let start: number | null = null

      const animate = (timestamp: number) => {
        if (!start) start = timestamp
        const elapsed = timestamp - start

        if (elapsed >= delay) {
          callback()
          return
        }
        requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    },
    [],
  )

  // Initialize loading texts and lines
  useEffect(() => {
    const texts = loading_messages
      .split("\n")
      .filter((text) => text.trim() !== "")
    dispatch({ type: "INITIALIZE_TEXTS", payload: texts })

    // Add initial lines
    dispatch({ type: "ADD_LINE", payload: getRandomText(texts) })

    const addLines = () => {
      scheduleAnimation(() => {
        dispatch({ type: "ADD_LINE", payload: getRandomText(texts) })
        scheduleAnimation(() => {
          dispatch({ type: "ADD_LINE", payload: getRandomText(texts) })
        }, ANIMATION_TIMINGS.LINE_DELAY)
      }, ANIMATION_TIMINGS.LINE_DELAY)
    }
    addLines()
  }, [scheduleAnimation])

  // Handle progress and completion
  useEffect(() => {
    if (state.status !== "loading") return

    const startTime = performance.now()
    let animationFrameId: number

    const updateProgress = (timestamp: number) => {
      const elapsed = timestamp - startTime
      const newProgress = Math.min(
        (elapsed / ANIMATION_TIMINGS.LOADING_DURATION) * 100,
        100,
      )

      dispatch({ type: "SET_PROGRESS", payload: newProgress })

      if (newProgress >= 100) {
        scheduleAnimation(() => {
          dispatch({ type: "COMPLETE" })
        }, ANIMATION_TIMINGS.COMPLETION_DELAY)
        return
      }

      animationFrameId = requestAnimationFrame(updateProgress)
    }

    animationFrameId = requestAnimationFrame(updateProgress)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [state.status, scheduleAnimation])

  // Handle text updates
  useEffect(() => {
    if (
      state.status !== "loading" ||
      state.visibleLines.length < 3 ||
      state.progress >= 100
    )
      return

    let animationFrameId: number
    let lastUpdate = performance.now()

    const updateText = (timestamp: number) => {
      if (timestamp - lastUpdate >= ANIMATION_TIMINGS.TEXT_UPDATE) {
        const lineToUpdate = Math.floor(Math.random() * 3)
        dispatch({
          type: "UPDATE_LINE",
          payload: {
            index: lineToUpdate,
            text: getRandomText(state.loadingTexts),
          },
        })
        lastUpdate = timestamp
      }

      animationFrameId = requestAnimationFrame(updateText)
    }

    animationFrameId = requestAnimationFrame(updateText)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [
    state.status,
    state.visibleLines.length,
    state.progress,
    state.loadingTexts,
  ])

  return state
}
