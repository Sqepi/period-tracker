import { FC } from "react"

export const Toast: FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  )
}

export function useToast() {
  return {
    toast: ({ title, description }: { title: string; description: string }) => {
      // Implementimi bazë
      console.log(title, description)
    }
  }
}