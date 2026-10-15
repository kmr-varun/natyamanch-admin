import { Button } from './shared'

interface MandalsActionHeaderProps {
  onAddMandal: () => void
}

export default function MandalsActionHeader({ onAddMandal }: MandalsActionHeaderProps) {
  return (
    <div className="bg-[#f7ecff] rounded-xl p-3 flex items-start justify-between">
      {/* Organization Icon */}
      <div className="bg-[#faf5ff] border border-[#f3e8ff] rounded-xl w-16 h-16 p-px flex items-center justify-center flex-shrink-0">
        <img src="/icons/building-icon-large.svg" alt="" className="w-8 h-8" />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-end gap-2">
        <Button onClick={onAddMandal} icon="/icons/plus-icon-white.svg" className="px-3 py-[6px]">
          Add Organization
        </Button>
        <Button onClick={() => alert('Edit functionality (opens edit form)')} variant="secondary" icon="/icons/edit-purple-icon.svg" className="w-[151px] h-7 px-[13px] py-[5px]">
          Edit
        </Button>
      </div>
    </div>
  )
}
