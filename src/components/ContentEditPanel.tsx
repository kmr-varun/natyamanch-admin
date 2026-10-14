export default function ContentEditPanel() {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden p-px flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-[#e2e8f0] px-5 py-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#0f172a] leading-5 tracking-[-0.35px]">Edit Page</h2>
        <button className="w-4 h-4 rounded-md p-1">
          <img src="/icons/close-x-icon.svg" alt="" className="w-full h-full" />
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#e2e8f0] px-5 pb-px flex items-start">
        <button className="flex-1 pb-[14px] pt-3 px-3 border-b-2 border-[#7f28bc] text-xs font-semibold text-[#7f28bc] leading-4">
          Content
        </button>
        <button className="flex-1 pb-[13px] pt-3 px-3 text-xs font-semibold text-[#64748b] leading-4">
          SEO
        </button>
        <button className="flex-1 pb-[13px] pt-3 px-3 text-xs font-semibold text-[#64748b] leading-4">
          Settings
        </button>
      </div>

      {/* Form Body */}
      <div className="flex-1 overflow-auto p-5 flex flex-col gap-4">
        {/* Page Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#334155] leading-4">
            Page Title <span className="text-[#ef4444]">*</span>
          </label>
          <input
            type="text"
            value="Home"
            className="h-10 bg-white border border-[#e2e8f0] rounded-lg px-[13px] py-2.5 text-xs text-[#1e293b] leading-4"
          />
        </div>

        {/* URL / Slug */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#334155] leading-4">
            URL / Slug <span className="text-[#ef4444]">*</span>
          </label>
          <input
            type="text"
            value="/"
            className="h-10 bg-white border border-[#e2e8f0] rounded-lg px-[13px] py-2.5 text-xs text-[#1e293b] leading-4"
          />
          <span className="text-[11px] text-[#94a3b8] leading-4">
            This will be used in the page URL (e.g. /about)
          </span>
        </div>

        {/* Short Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#334155] leading-4">Short Description</label>
          <textarea
            value="Experience the magic of theatre with Natyamanch."
            className="h-[62px] bg-white border border-[#e2e8f0] rounded-lg px-[13px] py-2.5 text-xs text-[#1e293b] leading-4 resize-none"
          />
          <div className="flex justify-end pt-1">
            <span className="text-[11px] text-[#94a3b8] leading-4">45/160</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex items-center gap-1.5">
          <label className="flex-1 text-xs font-semibold text-[#334155] leading-4">Page Content</label>
          <button className="w-[163px] bg-[#7f28bc] rounded-lg px-3 py-2 flex items-center justify-center gap-1.5">
            <img src="/icons/edit-content-icon.svg" alt="" className="w-[10px] h-[14px]" />
            <span className="text-xs font-medium text-white leading-4">Edit Page Content</span>
          </button>
        </div>

        {/* Featured Image */}
        <div className="flex flex-col gap-1.5 pt-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">Featured Image</label>
          <div className="flex items-center gap-3">
            <img src="/images/page-thumbnail.png" alt="" className="w-[87px] h-[74px] rounded object-cover flex-shrink-0" />
            <div className="flex flex-col gap-2">
              <button className="bg-white border border-[#e2e8f0] rounded-lg px-[13px] py-[7px] flex items-center gap-1.5">
                <img src="/icons/change-image-icon.svg" alt="" className="w-[11.45px] h-[14px]" />
                <span className="text-xs font-medium text-[#334155] leading-4">Change Image</span>
              </button>
              <button className="w-[126px] bg-white border border-[#dc2626] rounded-lg px-[13px] py-[7px] flex items-center justify-center">
                <span className="text-xs font-medium text-[#dc2626] leading-4">Remove</span>
              </button>
            </div>
          </div>
        </div>

        {/* Page Status */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#334155] leading-4">Page Status</label>
          <div className="relative">
            <div className="bg-white border border-[#e2e8f0] rounded-lg px-[13px] py-2.5 flex items-center">
              <span className="flex-1 text-xs text-[#1e293b] leading-4">Published</span>
            </div>
            <img
              src="/icons/dropdown-arrow-gray.svg"
              alt=""
              className="absolute right-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px]"
            />
          </div>
          <span className="text-[11px] text-[#94a3b8] leading-4">
            Published pages are visible on the website.
          </span>
        </div>

        {/* Last Updated */}
        <div className="border-t border-[#f1f5f9] pt-2.5 flex flex-col">
          <span className="text-[11px] font-semibold text-[#64748b] leading-[17.88px]">Last Updated</span>
          <span className="text-[11px] text-[#94a3b8] leading-[17.88px]">
            12 Sep 2025, 10:30 AM<br />by Admin
          </span>
        </div>
      </div>

      {/* Bottom Fixed Action Bar */}
      <div className="bg-white border-t border-[#e2e8f0] h-[81px] px-4 py-4 flex items-center gap-[11px]">
        <button className="flex-1 bg-white border border-[#e2e8f0] rounded-lg px-[13px] py-2.5 flex items-center justify-center gap-1.5">
          <img src="/icons/eye-preview-icon.svg" alt="" className="w-[14px] h-[14px]" />
          <span className="text-xs font-semibold text-[#334155] leading-4">Preview</span>
        </button>
        <button className="flex-1 bg-[#7f28bc] shadow-sm rounded-lg px-3 py-2 flex items-center justify-center">
          <span className="text-xs font-semibold text-white leading-4">Update Page</span>
        </button>
      </div>
    </div>
  )
}
