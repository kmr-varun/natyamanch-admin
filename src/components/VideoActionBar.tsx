export default function VideoActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-[6px] bg-[rgba(255,255,255,0.95)] border-t border-[#e2e8f0] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-end gap-3 px-8 py-[14px]">
        {/* Save as Draft Button */}
        <button className="px-[21px] py-2 bg-white border border-[#cbd5e1] rounded-lg text-sm font-semibold text-[#334155] leading-4 hover:bg-gray-50 transition-colors">
          Save as Draft
        </button>

        {/* Preview Button */}
        <button className="flex items-center gap-1.5 px-[21px] py-2 bg-white border border-[#cbd5e1] rounded-lg text-sm font-semibold text-[#334155] leading-4 hover:bg-gray-50 transition-colors">
          <img src="/icons/eye-icon.svg" alt="" className="w-[13.5px] h-[10.5px]" />
          Preview
        </button>

        {/* Publish Play Button */}
        <button className="flex items-center gap-2 px-6 py-2 bg-[#7f28bc] rounded-lg text-sm font-semibold text-white leading-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#6d1fa3] transition-colors">
          <img src="/icons/paper-plane-icon.svg" alt="" className="w-[12.005px] h-[12.006px]" />
          Publish Play
        </button>
      </div>
    </div>
  )
}
