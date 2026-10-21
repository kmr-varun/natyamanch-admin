import { useEffect, useState, useRef } from 'react'
import { useVideoForm } from '../contexts/VideoFormContext'
import { videosApi } from '../lib/api'

const CF_SUBDOMAIN = 'customer-w1lqmmjxo1pu5rut'

type CFState = 'idle' | 'checking' | 'processing' | 'ready' | 'error'

export default function VideoPreviewCard() {
  const form = useVideoForm()
  const [cfState, setCfState] = useState<CFState>('idle')
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastCheckedId = useRef<string>('')

  useEffect(() => {
    if (!form.cloudflareVideoId) {
      setCfState('idle')
      lastCheckedId.current = ''
      if (pollTimer.current) clearTimeout(pollTimer.current)
      return
    }

    if (form.cloudflareVideoId === lastCheckedId.current && cfState === 'ready') return

    const check = async (id: string) => {
      try {
        setCfState('checking')
        const res = await videosApi.cloudflareStatus(id)
        if (!res.video) { setCfState('error'); return }
        if (res.video.readyToStream) {
          setCfState('ready')
          lastCheckedId.current = id
        } else {
          setCfState('processing')
          pollTimer.current = setTimeout(() => check(id), 4000)
        }
      } catch {
        setCfState('error')
      }
    }

    if (pollTimer.current) clearTimeout(pollTimer.current)
    check(form.cloudflareVideoId)

    return () => { if (pollTimer.current) clearTimeout(pollTimer.current) }
  }, [form.cloudflareVideoId])

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col gap-4">
      <h2 className="text-lg font-bold text-[#0b1c30] leading-[26px]">Video Preview</h2>

      {!form.cloudflareVideoId ? (
        <div className="w-full h-[263px] bg-gradient-to-b from-[#f8f9ff] to-[#f8efff] rounded-lg flex flex-col items-center justify-center gap-3">
          <div className="w-14 h-14 bg-[#7f28bc] rounded-full flex items-center justify-center shadow-lg">
            <img src="/icons/upload-cloud.svg" alt="" className="w-[25.667px] h-[18.667px]" />
          </div>
          <h3 className="text-lg font-semibold text-[#0b1c30] text-center leading-[26px]">Video Preview</h3>
          <p className="text-xs text-[#7d7481] text-center leading-[18px]">
            Upload a video in CloudStream Settings to see a preview here
          </p>
        </div>
      ) : cfState === 'ready' ? (
        <>
          <div className="aspect-video rounded-lg overflow-hidden bg-black">
            <iframe
              src={`https://${CF_SUBDOMAIN}.cloudflarestream.com/${form.cloudflareVideoId}/iframe`}
              className="w-full h-full"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-[10px] text-[#94a3b8] text-center font-mono">{form.cloudflareVideoId}</p>
        </>
      ) : cfState === 'processing' || cfState === 'checking' ? (
        <div className="aspect-video rounded-lg bg-[#0f0f0f] flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-2 border-[#7f28bc] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-white font-medium">Processing video…</p>
          <p className="text-[11px] text-[#94a3b8]">Cloudflare is encoding your video. This usually takes a minute.</p>
          <p className="text-[10px] font-mono text-[#4a4a5a] mt-1">{form.cloudflareVideoId}</p>
        </div>
      ) : (
        <div className="aspect-video rounded-lg bg-[#1a0a0a] flex flex-col items-center justify-center gap-2">
          <p className="text-sm text-[#ef4444]">Could not load video status</p>
          <p className="text-[11px] text-[#94a3b8]">Check that Cloudflare Stream is configured correctly</p>
          <p className="text-[10px] font-mono text-[#6a4a4a] mt-1">{form.cloudflareVideoId}</p>
        </div>
      )}
    </div>
  )
}
