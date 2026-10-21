import { useState } from 'react'

interface Props {
  onSearch: (q: string) => void
}

export default function SubscriptionPlansFilterBar({ onSearch }: Props) {
  const [value, setValue] = useState('')

  const handleChange = (q: string) => {
    setValue(q)
    onSearch(q)
  }

  return (
    <div className="bg-white border border-[rgba(226,232,240,0.9)] rounded-xl px-4 py-3 flex items-center gap-3 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <div className="relative flex-1 max-w-xs">
        <img src="/icons/search-icon.svg" alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={e => handleChange(e.target.value)}
          placeholder="Search plans…"
          className="w-full h-9 pl-9 pr-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-sm text-[#334155] focus:outline-none focus:border-[#7f28bc]"
        />
      </div>
    </div>
  )
}
