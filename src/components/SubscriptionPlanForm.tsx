import { handleModal, handleDropdownChange, handleCRUD, handleForm } from '../utils/mockHandlers'

interface SubscriptionPlanFormProps {
  mode?: 'add' | 'edit'
  initialData?: {
    name: string
    slug: string
    type: 'Individual' | 'Mandal / Organization'
    price: string
    duration: string
    description: string
    features: string[]
    status: string
    sortOrder: string
  }
}

export default function SubscriptionPlanForm({ mode = 'add', initialData }: SubscriptionPlanFormProps) {

  return (
    <div className="bg-white border border-[rgba(226,232,240,0.8)] rounded-xl p-[21px] flex flex-col gap-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      {/* Header */}
      <div className="pb-[13px] border-b border-[#f1f5f9] flex items-center justify-between pr-[0.01px]">
        <h2 className="text-sm font-semibold text-[#1e293b] leading-5">
          {mode === 'edit' ? 'Edit Subscription Plan' : 'Add Subscription Plan'}
        </h2>
        <button onClick={() => handleModal.close()} className="text-lg text-[#94a3b8] leading-[18px]">×</button>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-[14px]">
        {/* Plan Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Plan Name <span className="text-[#ef4444]">*</span>
          </label>
          <input
            type="text"
            defaultValue={mode === 'edit' ? initialData?.name : ''}
            placeholder="Enter plan name"
            className="h-10 px-[13px] py-[9px] border border-[#e2e8f0] rounded-lg text-xs text-[#1e293b] leading-4 focus:outline-none focus:border-[#7f28bc]"
          />
        </div>

        {/* Slug */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Slug (URL) <span className="text-[#ef4444]">*</span>
          </label>
          <input
            type="text"
            defaultValue={mode === 'edit' ? initialData?.slug : ''}
            placeholder="plan-slug"
            className="h-10 px-[13px] py-[9px] border border-[#e2e8f0] rounded-lg text-xs text-[#1e293b] leading-4 focus:outline-none focus:border-[#7f28bc]"
          />
        </div>

        {/* Type Radio Buttons */}
        <div className="flex flex-col gap-[6px]">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Type <span className="text-[#ef4444]">*</span>
          </label>
          <div className="flex items-center gap-[19px] h-4">
            <label className="flex items-center gap-[6px] cursor-pointer">
              <input
                type="radio"
                name="planType"
                value="Individual"
                defaultChecked={mode === 'add' || initialData?.type === 'Individual'}
                className="w-4 h-4"
              />
              <span className="text-xs text-[#334155] leading-4">Individual</span>
            </label>
            <label className="flex items-center gap-[5px] cursor-pointer">
              <input
                type="radio"
                name="planType"
                value="Mandal / Organization"
                defaultChecked={mode === 'edit' && initialData?.type === 'Mandal / Organization'}
                className="w-4 h-4"
              />
              <span className="text-xs font-medium text-[#334155] leading-4">Mandal / Organization</span>
            </label>
          </div>
        </div>

        {/* Price and Duration Row */}
        <div className="flex gap-[11.99px]">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#334155] leading-4">
              Price (INR) <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="text"
              defaultValue={mode === 'edit' ? initialData?.price : ''}
              placeholder="0"
              className="h-10 px-[13px] py-[9px] border border-[#e2e8f0] rounded-lg text-xs text-[#1e293b] leading-4 focus:outline-none focus:border-[#7f28bc]"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#334155] leading-4">
              Duration <span className="text-[#ef4444]">*</span>
            </label>
            <div className="relative">
              <select onChange={(e) => handleDropdownChange('Duration', e.target.value)} className="w-full h-10 pl-[13px] pr-[41px] py-[9px] border border-[#e2e8f0] rounded-lg text-xs text-[#1e293b] leading-4 appearance-none focus:outline-none focus:border-[#7f28bc]">
                <option>1 Year</option>
                <option>1 Month</option>
                <option>48 Hours</option>
              </select>
              <img
                src="/icons/dropdown-arrow.svg"
                alt=""
                className="absolute right-[9px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Plan Description */}
        <div className="flex flex-col gap-1 pb-1">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Plan Description <span className="text-[#ef4444]">*</span>
          </label>
          <textarea
            defaultValue={mode === 'edit' ? initialData?.description : ''}
            placeholder="Enter plan description"
            rows={3}
            className="px-[13px] py-[9px] border border-[#e2e8f0] rounded-lg text-xs text-[#1e293b] leading-[19.5px] resize-none focus:outline-none focus:border-[#7f28bc]"
          />
        </div>

        {/* Features */}
        <div className="flex flex-col gap-[6px]">
          <label className="text-xs font-semibold text-[#334155] leading-4">
            Features <span className="text-[#ef4444]">*</span>
          </label>
          <div className="flex flex-col gap-[6px]">
            {(mode === 'edit' && initialData?.features ? initialData.features : []).map((feature, idx) => (
              <div key={idx} className="h-10 px-[11px] py-[7px] bg-white border border-[#e2e8f0] rounded-lg flex items-center gap-2">
                <input
                  type="text"
                  value={feature}
                  className="flex-1 text-xs text-[#1e293b] leading-4 bg-transparent focus:outline-none"
                />
                <button className="flex-shrink-0">
                  <img src="/icons/drag-handle-icon.svg" alt="" className="w-[14px] h-[14px]" />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => handleCRUD.create('Feature')} className="w-full px-px py-[9px] border border-dashed border-[#7f28bc] rounded-lg flex items-center justify-center gap-1 hover:bg-[#faf5ff]">
            <span className="text-sm font-bold text-[#7f28bc] leading-[14px]">+</span>
            <span className="text-xs font-semibold text-[#7f28bc] leading-4">Add Feature</span>
          </button>
        </div>

        {/* Status and Sort Order */}
        <div className="flex gap-[11.99px] pt-1">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#334155] leading-4">Status</label>
            <div className="relative">
              <select onChange={(e) => handleDropdownChange('Status', e.target.value)} className="w-full h-10 pl-[13px] pr-[41px] py-[9px] border border-[#e2e8f0] rounded-lg text-xs text-[#1e293b] leading-4 appearance-none focus:outline-none focus:border-[#7f28bc]">
                <option>Active</option>
                <option>Inactive</option>
                <option>Upcoming</option>
              </select>
              <img
                src="/icons/dropdown-arrow.svg"
                alt=""
                className="absolute right-[9px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#334155] leading-4">Sort Order</label>
            <input
              type="text"
              defaultValue={mode === 'edit' ? initialData?.sortOrder : ''}
              placeholder="0"
              className="h-10 px-[13px] py-[9px] border border-[#e2e8f0] rounded-lg text-xs text-[#1e293b] leading-4 focus:outline-none focus:border-[#7f28bc]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-[17px] border-t border-[#f1f5f9]">
          <button onClick={() => handleForm.cancel()} className="flex-1 px-[17px] py-[9px] border border-[#e2e8f0] rounded-lg text-xs font-semibold text-[#334155] leading-4 hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={() => handleForm.submit('Subscription Plan')} className="flex-1 px-4 py-2 bg-[#4f1787] rounded-lg text-xs font-semibold text-white leading-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#6d1fa3]">
            {mode === 'edit' ? 'Update Plan' : 'Save Plan'}
          </button>
        </div>
      </div>
    </div>
  )
}
