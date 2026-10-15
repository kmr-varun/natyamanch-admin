import { handleModal, handleClick, handleDropdownChange, handleForm, handleNotification } from '../utils/mockHandlers'

export default function NotificationCreatePanel() {

  return (
    <div className="bg-white border border-[#e2e8f0] shadow-sm rounded-xl p-[21px] flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-1">
        <h3 className="text-sm font-bold text-[#0f172a] leading-5">Create New Notification</h3>
        <button onClick={() => handleModal.close()} className="w-4 h-4">
          <img src="/icons/close-x-icon.svg" alt="" className="w-full h-full" />
        </button>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#334155] leading-4">
            Title <span className="text-[#ef4444]">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter notification title"
            className="h-10 bg-white border border-[#e2e8f0] rounded-lg px-[13px] py-2.5 text-xs text-[#94a3b8] leading-4"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#334155] leading-4">
            Message <span className="text-[#ef4444]">*</span>
          </label>
          <textarea
            placeholder="Enter your message..."
            className="h-[82px] bg-white border border-[#e2e8f0] rounded-lg px-[13px] py-2.5 text-xs text-[#94a3b8] leading-4 resize-none"
          />
          <div className="flex justify-end pt-0.5">
            <span className="text-[10px] text-[#94a3b8] leading-4">0/500</span>
          </div>
        </div>

        {/* Type */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#334155] leading-4">
            Type <span className="text-[#ef4444]">*</span>
          </label>
          <div className="flex items-start gap-2">
            <button onClick={() => handleClick('Select Push Type')} className="flex-1 bg-[rgba(250,245,255,0.5)] border-2 border-[#7f28bc] rounded-lg px-7 py-3 flex flex-col items-center justify-center gap-1">
              <img src="/icons/bell-notification-icon.svg" alt="" className="w-4 h-4" />
              <span className="text-[11px] font-medium text-[#7e22ce] leading-4">Push</span>
            </button>
            <button onClick={() => handleClick('Select Email Type')} className="flex-1 border border-[#e2e8f0] rounded-lg px-[26.9px] py-3 flex flex-col items-center justify-center gap-1">
              <img src="/icons/bell-notification-icon.svg" alt="" className="w-4 h-4" />
              <span className="text-[11px] font-medium text-[#475569] leading-4">Email</span>
            </button>
            <button onClick={() => handleClick('Select In-App Type')} className="flex-1 border border-[#e2e8f0] rounded-lg px-[23.13px] py-3 flex flex-col items-center justify-center gap-1">
              <img src="/icons/bell-notification-icon.svg" alt="" className="w-4 h-4" />
              <span className="text-[11px] font-medium text-[#475569] leading-4">In-App</span>
            </button>
          </div>
        </div>

        {/* Audience */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-[#334155] leading-4">
            Audience <span className="text-[#ef4444]">*</span>
          </label>
          <div className="relative">
            <select onChange={(e) => handleDropdownChange('Audience', e.target.value)} className="w-full h-10 bg-white border border-[#e2e8f0] rounded-lg px-[13px] py-2.5 text-xs text-[#94a3b8] leading-4 appearance-none">
              <option>Select audience</option>
            </select>
            <img
              src="/icons/dropdown-arrow-gray.svg"
              alt=""
              className="absolute right-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none"
            />
          </div>
          <span className="text-[10px] text-[#94a3b8] leading-4">
            You can also select specific users or segments.
          </span>
        </div>

        {/* Schedule */}
        <div className="flex flex-col gap-3 pt-1">
          <label className="text-xs font-medium text-[#334155] leading-4">Schedule</label>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-[11px]">
              <div className="w-2.5 h-2.5 bg-[#9333ea] border border-transparent rounded-full flex items-center justify-center p-[0.556px]">
                <div className="w-[8.889px] h-[8.889px] bg-white rounded-full"></div>
              </div>
              <span className="text-xs text-[#1e293b] leading-4">Send Now</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-white border border-[#cbd5e1] rounded-full"></div>
              <span className="text-xs text-[#334155] leading-4">Schedule for Later</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-start justify-center gap-2.5 pt-3">
          <button onClick={() => handleForm.cancel()} className="flex-1 border border-[#e2e8f0] rounded-lg px-[13px] py-2.5 text-xs font-medium text-[#334155] leading-4">
            Cancel
          </button>
          <button onClick={() => handleNotification.send('Push')} className="flex-1 bg-[#7f28bc] rounded-lg px-3 py-2.5 text-xs font-medium text-white leading-4">
            Send Notification
          </button>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-[rgba(250,245,255,0.7)] border border-[#f3e8ff] rounded-lg p-[15px] flex flex-col gap-3">
        <div className="flex items-center gap-1.5">
          <img src="/icons/lightbulb-icon.svg" alt="" className="w-4 h-4" />
          <span className="text-xs font-bold text-[#7f28bc] leading-4">Notification Tips</span>
        </div>
        <ul className="text-xs text-[#4d4d4d] leading-[17.88px] list-disc ml-[18px] flex flex-col gap-2">
          <li>Keep your message clear and concise</li>
          <li>Use engaging titles to increase open rates</li>
          <li>Avoid sending too many notifications</li>
          <li>Use rich media to make notifications attractive</li>
          <li>Segment your audience for better results</li>
        </ul>
      </div>
    </div>
  )
}
