import { useEffect, useRef } from 'react'

interface ActionMenuOption {
  label: string
  onClick: () => void
  className?: string
}

interface ActionMenuProps {
  isOpen: boolean
  onClose: () => void
  options: ActionMenuOption[]
  position?: { top: number; left: number }
  align?: 'left' | 'right'
}

export default function ActionMenu({ isOpen, onClose, options, position, align = 'right' }: ActionMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={menuRef}
      className={`absolute z-50 bg-white border border-[#e2e8f0] rounded-lg shadow-lg py-1 min-w-[140px] ${
        align === 'right' ? 'right-0' : 'left-0'
      }`}
      style={position ? { top: position.top, left: position.left } : { top: '100%', marginTop: '4px' }}
    >
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => {
            option.onClick()
            onClose()
          }}
          className={`w-full px-4 py-2 text-left text-xs font-medium transition-colors hover:bg-[#f8f2fa] ${
            option.className || 'text-[#334155]'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
