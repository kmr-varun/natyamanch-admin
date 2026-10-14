export default function MandalsActionHeader() {
  return (
    <div className="bg-[#f7ecff] rounded-xl p-3 flex items-start justify-between">
      {/* Organization Icon */}
      <div className="bg-[#faf5ff] border border-[#f3e8ff] rounded-xl w-16 h-16 p-px flex items-center justify-center flex-shrink-0">
        <img src="/icons/building-icon-large.svg" alt="" className="w-8 h-8" />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-end gap-2">
        <button className="px-3 py-[6px] bg-[#7f28bc] rounded-lg flex items-center gap-1 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#6d1fa3]">
          <img src="/icons/plus-icon-white.svg" alt="" className="w-[14px] h-[14px]" />
          <span className="text-xs font-semibold text-white leading-4">Add Organization</span>
        </button>
        <button className="w-[151px] h-7 px-[13px] py-[5px] border border-[#7f28bc] rounded-lg flex items-center justify-center gap-1 hover:bg-[#faf5ff]">
          <img src="/icons/edit-purple-icon.svg" alt="" className="w-3 h-3" />
          <span className="text-xs font-semibold text-[#7f28bc] leading-4">Edit</span>
        </button>
      </div>
    </div>
  )
}
