import { useState, useCallback } from 'react'

interface ToastProps {
  title?: string
  description?: string
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = useCallback(({ title, description }: ToastProps) => {
    setToasts((prev) => [...prev, { title, description }])
    setTimeout(() => setToasts((prev) => prev.slice(1)), 3000)
  }, [])

  return { toast, toasts }
} 