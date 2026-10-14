export default function VideoPreviewCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#0b1c30] leading-[26px]">
          Video Preview
        </h2>
      </div>

      {/* Upload Area */}
      <div className="w-full h-[263px] bg-gradient-to-b from-[#f8f9ff] to-[#f8efff] rounded-lg flex flex-col items-center justify-center px-6 py-[141px]">
        {/* Upload Icon */}
        <div className="w-14 h-14 bg-[#7f28bc] rounded-full flex items-center justify-center shadow-lg mb-3">
          <img src="/icons/upload-cloud.svg" alt="" className="w-[25.667px] h-[18.667px]" />
        </div>

        {/* Upload Text */}
        <h3 className="text-lg font-semibold text-[#0b1c30] text-center leading-[26px] mb-4">
          Upload Video
        </h3>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mb-3">
          <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#7f28bc] rounded text-xs font-medium text-[#7f28bc] tracking-[0.24px] shadow-sm hover:bg-[#f7ecff] transition-colors">
            <img src="/icons/image-icon.svg" alt="" className="w-[13.5px] h-[13.5px]" />
            Upload Thumbnail
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#7f28bc] rounded text-xs font-medium text-[#7f28bc] tracking-[0.24px] shadow-sm hover:bg-[#f7ecff] transition-colors">
            <img src="/icons/video-icon.svg" alt="" className="w-[15px] h-3" />
            Upload Trailer
          </button>
        </div>

        {/* Help Text */}
        <p className="text-xs text-[#7d7481] text-center leading-[18px]">
          Recommended: 16:9 Cinema Scope • ProRes / MP4 / HLS • Up to 4K Master
        </p>
      </div>
    </div>
  )
}
