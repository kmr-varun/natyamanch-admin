interface CategoriesMetricsProps {
  categories?: any[]
}

export default function CategoriesMetrics({ categories }: CategoriesMetricsProps = {}) {
  const totalCount = categories?.length || 12
  const activeCount = categories?.filter(c => c.status === 'Active').length || 10
  return (
    <div className="flex gap-2">
      {/* Total Categories */}
      <div className="flex-1 bg-white border border-[rgba(226,232,240,0.9)] rounded-xl p-2 flex gap-2.5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="bg-[#faf5ff] rounded-xl p-2.5 w-10 h-10 flex items-center justify-center flex-shrink-0">
          <img src="/icons/folder-icon.svg" alt="" className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold text-[#1e293b] leading-8 tracking-[-0.6px]">
            {totalCount}
          </span>
          <span className="text-xs font-medium text-[#64748b] leading-4">
            Total Categories
          </span>
          <div className="flex items-center gap-1 pt-0.5">
            <img src="/icons/arrow-up-icon.svg" alt="" className="w-[10.42px] h-3" />
            <span className="text-xs text-[#059669] leading-5">+2 this month</span>
          </div>
        </div>
      </div>

      {/* Active Categories */}
      <div className="flex-1 bg-white border border-[rgba(226,232,240,0.9)] rounded-xl p-2 flex gap-2.5 h-[92px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="bg-[#ecfdf5] rounded-xl p-2.5 w-10 h-10 flex items-center justify-center flex-shrink-0">
          <img src="/icons/check-circle-icon.svg" alt="" className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold text-[#1e293b] leading-8 tracking-[-0.6px]">
            {activeCount}
          </span>
          <span className="text-xs font-medium text-[#64748b] leading-4">
            Active Categories
          </span>
        </div>
      </div>

      {/* Draft Category */}
      <div className="flex-1 bg-white border border-[rgba(226,232,240,0.9)] rounded-xl p-2 flex gap-2.5 h-[92px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="bg-[#fffbeb] rounded-xl p-2.5 w-10 h-10 flex items-center justify-center flex-shrink-0">
          <img src="/icons/clock-icon.svg" alt="" className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold text-[#1e293b] leading-8 tracking-[-0.6px]">
            1
          </span>
          <span className="text-xs font-medium text-[#64748b] leading-4">
            Draft Category
          </span>
        </div>
      </div>

      {/* Archived Category */}
      <div className="flex-1 bg-white border border-[rgba(226,232,240,0.9)] rounded-xl p-2 flex gap-2.5 h-[92px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="bg-[#fff1f2] rounded-xl p-2.5 w-10 h-10 flex items-center justify-center flex-shrink-0">
          <img src="/icons/archive-icon.svg" alt="" className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold text-[#1e293b] leading-8 tracking-[-0.6px]">
            1
          </span>
          <span className="text-xs font-medium text-[#64748b] leading-4">
            Archived Category
          </span>
        </div>
      </div>
    </div>
  )
}
