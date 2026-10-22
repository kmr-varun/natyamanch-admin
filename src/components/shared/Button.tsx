import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'text'
  icon?: string
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-lg text-xs font-semibold leading-4 transition-colors flex items-center gap-1.5'

  const variantStyles = {
    primary: 'bg-[#7f28bc] text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#6d1fa3]',
    secondary: 'bg-white border border-[#7f28bc] text-[#7f28bc] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#faf5ff]',
    text: 'px-2 py-1 text-[#7f28bc] hover:underline',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className} disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {icon && iconPosition === 'left' && (
        <img src={icon} alt="" className="w-[14px] h-[14px]" />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <img src={icon} alt="" className="w-[14px] h-[14px]" />
      )}
    </button>
  )
}
