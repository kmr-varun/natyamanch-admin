import type { ReactNode } from 'react'

interface TwoColumnLayoutProps {
  leftColumn: ReactNode
  rightColumn: ReactNode
  leftSpan?: number
  rightSpan?: number
  gap?: string
}

export default function TwoColumnLayout({
  leftColumn,
  rightColumn,
  leftSpan = 8,
  rightSpan = 4,
  gap = 'gap-6',
}: TwoColumnLayoutProps) {
  return (
    <div className={`grid grid-cols-12 ${gap}`}>
      <div className={`col-span-${leftSpan} flex flex-col gap-6`}>{leftColumn}</div>
      <div className={`col-span-${rightSpan} flex flex-col gap-6`}>{rightColumn}</div>
    </div>
  )
}
