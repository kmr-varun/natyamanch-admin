export default function PricingAccessCard() {
  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] p-[21px] flex flex-col gap-2.5">
      {/* Header */}
      <h2 className="text-base font-bold text-[#1e293b] leading-5">
        Pricing & Access
      </h2>

      {/* Individual Rental Option (Selected) */}
      <label className="border-2 border-[#9333ea] bg-[rgba(250,245,255,0.2)] rounded-xl p-4 flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-3">
          {/* Radio Button */}
          <div className="relative">
            <input
              type="radio"
              name="pricing"
              defaultChecked
              className="w-4 h-[18px] appearance-none"
            />
            <div className="absolute top-0 left-0 w-[18px] h-[18px] bg-[#7e22ce] border border-transparent rounded-full flex items-center justify-center p-px">
              <img
                src="/icons/radio-check.svg"
                alt=""
                className="w-4 h-4"
              />
            </div>
          </div>

          {/* Label */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-[#0f172a] leading-4">
              Individual Rental
            </span>
            <span className="text-[11px] text-[#64748b] leading-[16.5px]">
              Single user purchase with 48-hour access
            </span>
          </div>
        </div>

        {/* Price Badge */}
        <div className="bg-[#f9f0ff] rounded-lg px-3 py-1">
          <span className="text-sm font-bold text-[#7f28bc] leading-5">
            ₹149
          </span>
        </div>
      </label>

      {/* Subscription Option */}
      <label className="border border-[#e2e8f0] bg-white rounded-xl p-[15px] h-20 flex items-center cursor-pointer">
        <div className="flex items-center gap-3">
          {/* Radio Button */}
          <div className="w-4 h-[18px] pt-0.5">
            <input
              type="radio"
              name="pricing"
              className="w-4 h-4 appearance-none bg-white border border-[#cbd5e1] rounded-full"
            />
          </div>

          {/* Label */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-[#1e293b] leading-4">
              Included in Subscription
            </span>
            <div className="text-[11px] leading-[16.5px]">
              <p className="text-[#64748b] mb-0">
                Available for Mandal/Organization subscription plans.
              </p>
              <p className="text-[#94a3b8]">
                This video will be included in selected subscription plans.
              </p>
            </div>
          </div>
        </div>
      </label>

      {/* Available For */}
      <div className="flex flex-col gap-2 py-1.5">
        <h3 className="text-sm font-semibold text-[#334155] leading-4">
          Available For
        </h3>
        <div className="flex flex-col gap-2">
          {/* Individual Users */}
          <label className="flex items-center gap-2 cursor-pointer h-4">
            <div className="relative">
              <input
                type="checkbox"
                defaultChecked
                className="w-[18px] h-[18px] border border-transparent rounded bg-[#7e22ce] appearance-none cursor-pointer"
              />
              <img
                src="/icons/check-white.svg"
                alt=""
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              />
            </div>
            <span className="text-sm font-medium text-[#334155] leading-4">
              Individual Users
            </span>
          </label>

          {/* Mandal Plans */}
          <label className="flex items-center gap-2 cursor-pointer h-4">
            <div className="relative">
              <input
                type="checkbox"
                defaultChecked
                className="w-[18px] h-[18px] border border-transparent rounded bg-[#7e22ce] appearance-none cursor-pointer"
              />
              <img
                src="/icons/check-white.svg"
                alt=""
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              />
            </div>
            <span className="text-sm font-medium text-[#334155] leading-4">
              Mandal Plans
            </span>
          </label>
        </div>
      </div>

      {/* Featured Toggle */}
      <div className="border-t border-[#f1f5f9] pt-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-[#334155] leading-4">
          Featured
        </span>
        <label className="flex items-center gap-2.5 cursor-pointer">
          {/* Toggle Switch */}
          <div className="relative">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-9 h-5 bg-[#7e22ce] rounded-full peer-checked:bg-[#7e22ce]"></div>
            <div className="absolute top-0.5 left-[18px] w-4 h-4 bg-white border border-white rounded-full transition-transform peer-checked:translate-x-0"></div>
          </div>
          <span className="text-xs text-[#475569] leading-4">
            Show this play in featured section on homepage
          </span>
        </label>
      </div>
    </div>
  )
}
