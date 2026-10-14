export default function SubscriptionPlansTipsBanner() {
  return (
    <div className="bg-gradient-to-r from-[#f5f3ff] to-[#eff6ff] border border-[#f3e8ff] rounded-xl p-[17px] flex gap-4">
      <div className="pt-0.5">
        <div className="w-8 h-8 bg-[#f3e8ff] rounded-full flex items-center justify-center flex-shrink-0">
          <img src="/icons/lightbulb-icon.svg" alt="" className="w-4 h-4" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-xs font-semibold text-[#7f28bc] leading-4">Subscription Plan Tips</h3>
        <ul className="flex flex-col gap-1 list-disc pl-[16.5px] text-[11px] text-[#475569] leading-4">
          <li>Individual plans are for single users (e.g. single video purchase or monthly pass).</li>
          <li>Mandal plans are for organizations with multiple accounts.</li>
          <li>You can enable/disable plans anytime without affecting existing subscribers.</li>
          <li>Use clear feature lists to help users choose the right plan.</li>
        </ul>
      </div>
    </div>
  )
}
