export default function CategoryEditDrawer() {
  return (
    <div className="bg-white border-l border-[#e2e8f0] rounded-xl flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-[#e2e8f0] px-5 py-[18px]">
        <h2 className="text-sm font-semibold text-[#0f172a] leading-5">
          Add / Edit Category
        </h2>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-auto p-5 flex flex-col gap-4">
        {/* Section Title */}
        <h3 className="text-xs font-bold text-[#1e293b] leading-4 tracking-[-0.3px]">
          Category Information
        </h3>

        {/* Category Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Category Name <span className="text-[#f43f5e]">*</span>
          </label>
          <input
            type="text"
            defaultValue="Marathi Drama"
            className="h-10 px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#1e293b] leading-4 focus:outline-none focus:border-[#7f28bc]"
          />
        </div>

        {/* Slug */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Slug (URL) <span className="text-[#f43f5e]">*</span>
          </label>
          <input
            type="text"
            defaultValue="marathi-drama"
            className="h-10 px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#1e293b] font-mono leading-4 focus:outline-none focus:border-[#7f28bc]"
          />
          <p className="text-[11px] text-[#94a3b8] leading-4">
            This will be used in the category URL (e.g. /category/marathi-drama)
          </p>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Description
          </label>
          <textarea
            rows={3}
            defaultValue="Traditional and contemporary Marathi drama performances, including classic and modern plays."
            className="px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#334155] leading-[19.5px] resize-none focus:outline-none focus:border-[#7f28bc]"
          />
          <div className="flex justify-end pt-0.5">
            <span className="text-[11px] text-[#94a3b8] leading-4">78/300</span>
          </div>
        </div>

        {/* Category Image */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Category Image
          </label>
          <div className="flex flex-col gap-3">
            {/* Image Preview */}
            <div className="h-[99px] rounded overflow-hidden">
              <img
                src="/images/category-thumbnail.png"
                alt="Category"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Action Buttons */}
            <div className="flex items-center gap-1.5">
              <button className="flex items-center gap-1.5 h-[30px] px-[49.65px] border border-[#7f28bc] rounded-lg text-xs font-semibold text-[#7f28bc] leading-4 hover:bg-[#faf5ff] transition-colors">
                <img src="/icons/upload-icon.svg" alt="" className="w-[14px] h-[14px]" />
                Change Image
              </button>
              <button className="h-[30px] px-[49.65px] border border-[#f43f5e] rounded-lg text-xs font-semibold text-[#f43f5e] leading-4 hover:bg-[#fff1f2] transition-colors">
                Remove
              </button>
            </div>
            {/* Help Text */}
            <p className="text-[10px] text-[#94a3b8] leading-[12.5px]">
              Recommended size: 1200 x 630 px (16:9)<br />
              Formats: JPG, PNG, WebP (Max 2MB)
            </p>
          </div>
        </div>

        {/* Parent Category */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Parent Category
          </label>
          <div className="relative h-10">
            <select className="w-full h-full px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#1e293b] leading-4 appearance-none focus:outline-none focus:border-[#7f28bc]">
              <option>None (Main Category)</option>
              <option>Drama</option>
              <option>Comedy</option>
            </select>
            <img
              src="/icons/chevron-down-icon.svg"
              alt=""
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-[14px] h-[14px] pointer-events-none"
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Status
          </label>
          <div className="relative h-10">
            <select className="w-full h-full px-[13px] py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs text-[#1e293b] leading-4 appearance-none focus:outline-none focus:border-[#7f28bc]">
              <option>Active</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
            <img
              src="/icons/chevron-down-icon.svg"
              alt=""
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-[14px] h-[14px] pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="bg-white border-t border-[#e2e8f0] px-4 py-4 flex items-center gap-2">
        <button className="flex-1 h-10 border border-[#7f28bc] rounded-lg text-xs font-semibold text-[#7f28bc] leading-4 hover:bg-[#faf5ff] transition-colors">
          Cancel
        </button>
        <button className="flex-1 h-10 bg-[#7f28bc] rounded-lg text-xs font-semibold text-white leading-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#6d1fa3] transition-colors">
          Save Category
        </button>
      </div>
    </div>
  )
}
