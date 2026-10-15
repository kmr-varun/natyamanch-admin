import { useState } from 'react'

export default function VideoPreviewCard() {
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [trailer, setTrailer] = useState<string | null>(null)

  const handleThumbnailUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e: any) => {
      const file = e.target?.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setThumbnail(e.target?.result as string)
          alert('Thumbnail uploaded successfully! ✓')
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const handleTrailerUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'video/*'
    input.onchange = (e: any) => {
      const file = e.target?.files?.[0]
      if (file) {
        setTrailer(file.name)
        alert(`Trailer uploaded successfully! ✓\n\nFile: ${file.name}`)
      }
    }
    input.click()
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#0b1c30] leading-[26px]">
          Video Preview
        </h2>
      </div>

      {/* Upload Area */}
      <div className="w-full h-[263px] bg-gradient-to-b from-[#f8f9ff] to-[#f8efff] rounded-lg flex flex-col items-center justify-center px-6 py-[141px] relative">
        {thumbnail && (
          <img src={thumbnail} alt="Thumbnail" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
        )}
        {!thumbnail && (
          <>
            {/* Upload Icon */}
            <div className="w-14 h-14 bg-[#7f28bc] rounded-full flex items-center justify-center shadow-lg mb-3">
              <img src="/icons/upload-cloud.svg" alt="" className="w-[25.667px] h-[18.667px]" />
            </div>

            {/* Upload Text */}
            <h3 className="text-lg font-semibold text-[#0b1c30] text-center leading-[26px] mb-4">
              Upload Video
            </h3>
          </>
        )}

        {/* Action Buttons */}
        <div className={`flex items-center gap-3 mb-3 ${thumbnail ? 'absolute bottom-4' : ''}`}>
          <button onClick={handleThumbnailUpload} className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#7f28bc] rounded text-xs font-medium text-[#7f28bc] tracking-[0.24px] shadow-sm hover:bg-[#f7ecff] transition-colors">
            <img src="/icons/image-icon.svg" alt="" className="w-[13.5px] h-[13.5px]" />
            {thumbnail ? 'Change Thumbnail' : 'Upload Thumbnail'}
          </button>
          <button onClick={handleTrailerUpload} className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#7f28bc] rounded text-xs font-medium text-[#7f28bc] tracking-[0.24px] shadow-sm hover:bg-[#f7ecff] transition-colors">
            <img src="/icons/video-icon.svg" alt="" className="w-[15px] h-3" />
            {trailer ? 'Change Trailer' : 'Upload Trailer'}
          </button>
        </div>

        {/* Help Text */}
        {!thumbnail && (
          <p className="text-xs text-[#7d7481] text-center leading-[18px]">
            Recommended: 16:9 Cinema Scope • ProRes / MP4 / HLS • Up to 4K Master
          </p>
        )}
        {trailer && (
          <p className="text-xs text-green-600 text-center mt-2">
            Trailer: {trailer}
          </p>
        )}
      </div>
    </div>
  )
}
