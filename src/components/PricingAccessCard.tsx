import { useVideoForm } from '../contexts/VideoFormContext'

export default function PricingAccessCard() {
  const form = useVideoForm()

  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] p-[21px] flex flex-col gap-2.5">
      <h2 className="text-base font-bold text-[#1e293b] leading-5">Pricing & Access</h2>

      {/* Price input */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-[#334155] leading-4">
          Price (₹) <span className="text-[#f43f5e]">*</span>
        </label>
        <div className="relative h-10">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#334155]">₹</span>
          <input
            type="number"
            value={form.priceInr || ''}
            onChange={e => form.setField('priceInr', parseFloat(e.target.value) || 0)}
            placeholder="0"
            min={0}
            step={1}
            className="w-full h-full pl-7 pr-3 bg-white border border-[#e2e8f0] rounded-lg text-xs font-medium text-[#1e293b] focus:outline-none focus:border-[#7f28bc]"
          />
        </div>
        <p className="text-[11px] text-[#94a3b8] leading-[16.5px]">Set to 0 for free videos</p>
      </div>

      {/* Featured Toggle */}
      <div className="border-t border-[#f1f5f9] pt-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-[#334155] leading-4">Featured</span>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={e => form.setField('isFeatured', e.target.checked)}
              className="sr-only peer"
            />
            <div className={`w-9 h-5 rounded-full transition-colors ${form.isFeatured ? 'bg-[#7e22ce]' : 'bg-gray-200'}`} />
            <div className={`absolute top-0.5 w-4 h-4 bg-white border border-white rounded-full transition-transform ${form.isFeatured ? 'left-[18px]' : 'left-0.5'}`} />
          </div>
          <span className="text-xs text-[#475569] leading-4">Show in featured section on homepage</span>
        </label>
      </div>
    </div>
  )
}
