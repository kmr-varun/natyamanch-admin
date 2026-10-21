import { useState, useRef, useEffect } from 'react'
import { useVideoForm } from '../contexts/VideoFormContext'
import { videosApi } from '../lib/api'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

function getToken() {
  return localStorage.getItem('admin_token')
}

type CFStatus = 'idle' | 'uploading' | 'checking' | 'processing' | 'ready' | 'error'

export default function CloudStreamSettingsCard() {
  const form = useVideoForm()
  const [tab, setTab] = useState<'file' | 'url' | 'manual'>('file')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [cfStatus, setCfStatus] = useState<CFStatus>('idle')
  const [cfThumbnail, setCfThumbnail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [importingUrl, setImportingUrl] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const xhrRef = useRef<XMLHttpRequest | null>(null)
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pollingIdRef = useRef('')

  // Poll Cloudflare until video is ready
  const pollStatus = (id: string) => {
    if (pollingIdRef.current === id && cfStatus === 'ready') return
    pollingIdRef.current = id
    const check = async () => {
      try {
        const res = await videosApi.cloudflareStatus(id)
        if (pollingIdRef.current !== id) return // stale
        if (!res.video) { setCfStatus('error'); setErrorMsg('Video not found on Cloudflare'); return }
        if (res.video.readyToStream) {
          setCfStatus('ready')
          setCfThumbnail(res.video.thumbnail || '')
          if (res.video.duration && res.video.duration > 0) {
            form.setField('durationSeconds', Math.round(res.video.duration))
          }
        } else {
          setCfStatus('processing')
          pollRef.current = setTimeout(check, 4000)
        }
      } catch {
        if (pollingIdRef.current === id) {
          setCfStatus('error')
          setErrorMsg('Could not reach Cloudflare Stream to check status')
        }
      }
    }
    setCfStatus('checking')
    check()
  }

  useEffect(() => {
    if (pollRef.current) clearTimeout(pollRef.current)
    if (!form.cloudflareVideoId) {
      setCfStatus('idle')
      setCfThumbnail('')
      pollingIdRef.current = ''
    } else {
      pollStatus(form.cloudflareVideoId)
    }
    return () => { if (pollRef.current) clearTimeout(pollRef.current) }
  }, [form.cloudflareVideoId])

  const handleFileUpload = (file: File) => {
    setErrorMsg('')
    setCfStatus('uploading')
    setUploadProgress(0)

    const formData = new FormData()
    formData.append('file', file, file.name)
    formData.append('name', form.title || file.name)

    const xhr = new XMLHttpRequest()
    xhrRef.current = xhr

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) setUploadProgress(Math.round((e.loaded / e.total) * 100))
    })
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText)
          form.setField('cloudflareVideoId', data.uid)
          // pollStatus will fire from the useEffect above
        } catch {
          setCfStatus('error')
          setErrorMsg('Unexpected response from server')
        }
      } else {
        setCfStatus('idle')
        try {
          const data = JSON.parse(xhr.responseText)
          setErrorMsg(data?.error?.message || `Upload failed (${xhr.status})`)
        } catch {
          setErrorMsg(`Upload failed (${xhr.status})`)
        }
      }
    }
    xhr.onerror = () => { setCfStatus('idle'); setErrorMsg('Network error — check your connection') }
    xhr.onabort = () => { setCfStatus('idle'); setUploadProgress(0) }

    xhr.open('POST', `${API_BASE}/admin/videos/upload/file`)
    const token = getToken()
    if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.send(formData)
  }

  const handleUrlImport = async () => {
    if (!urlInput.trim()) return
    setImportingUrl(true)
    setErrorMsg('')
    try {
      const token = getToken()
      const res = await fetch(`${API_BASE}/admin/videos/upload-from-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ url: urlInput.trim(), name: form.title || 'Untitled Video' }),
      })
      const data = await res.json()
      if (!res.ok) { setErrorMsg(data?.error?.message || 'URL import failed'); return }
      form.setField('cloudflareVideoId', data.uid)
      setUrlInput('')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'URL import failed')
    } finally {
      setImportingUrl(false)
    }
  }

  const disconnect = () => {
    if (pollRef.current) clearTimeout(pollRef.current)
    form.setField('cloudflareVideoId', '')
    setCfStatus('idle')
    setCfThumbnail('')
    setErrorMsg('')
    pollingIdRef.current = ''
  }

  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] p-[21px] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#1e293b] leading-5">CloudStream Video Settings</h2>
        {form.cloudflareVideoId && cfStatus !== 'uploading' && (
          <button onClick={disconnect} className="text-xs text-[#94a3b8] hover:text-[#ef4444] transition-colors">
            Disconnect
          </button>
        )}
      </div>

      {/* ── STATUS WHEN VIDEO ID IS SET ── */}
      {form.cloudflareVideoId && cfStatus !== 'uploading' && (
        <div className="flex flex-col gap-3">
          {/* Status pipeline */}
          <div className="flex items-center gap-2">
            {/* Step 1: Uploaded */}
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#7f28bc] flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[11px] font-medium text-[#7f28bc]">Uploaded</span>
            </div>

            <div className={`flex-1 h-0.5 rounded-full ${cfStatus === 'ready' ? 'bg-[#7f28bc]' : 'bg-[#e2e8f0]'}`} />

            {/* Step 2: Processing */}
            <div className="flex items-center gap-1.5">
              {cfStatus === 'checking' || cfStatus === 'processing' ? (
                <div className="w-5 h-5 rounded-full border-2 border-[#7f28bc] border-t-transparent rounded-full animate-spin flex-shrink-0" />
              ) : cfStatus === 'ready' ? (
                <div className="w-5 h-5 rounded-full bg-[#7f28bc] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : cfStatus === 'error' ? (
                <div className="w-5 h-5 rounded-full bg-[#ef4444] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[10px] font-bold">!</span>
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#e2e8f0] flex-shrink-0" />
              )}
              <span className={`text-[11px] font-medium ${cfStatus === 'ready' ? 'text-[#7f28bc]' : cfStatus === 'error' ? 'text-[#ef4444]' : 'text-[#94a3b8]'}`}>
                {cfStatus === 'checking' ? 'Checking…' : cfStatus === 'processing' ? 'Encoding…' : 'Encoded'}
              </span>
            </div>

            <div className={`flex-1 h-0.5 rounded-full ${cfStatus === 'ready' ? 'bg-[#10b981]' : 'bg-[#e2e8f0]'}`} />

            {/* Step 3: Ready */}
            <div className="flex items-center gap-1.5">
              {cfStatus === 'ready' ? (
                <div className="w-5 h-5 rounded-full bg-[#10b981] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#e2e8f0] flex-shrink-0" />
              )}
              <span className={`text-[11px] font-medium ${cfStatus === 'ready' ? 'text-[#10b981]' : 'text-[#94a3b8]'}`}>
                Ready
              </span>
            </div>
          </div>

          {/* Status message */}
          {(cfStatus === 'checking' || cfStatus === 'processing') && (
            <p className="text-xs text-[#64748b] bg-[#f8fafc] rounded-lg px-3 py-2">
              Cloudflare is encoding your video — this usually takes 30 seconds to a few minutes. The preview will appear automatically when it's done.
            </p>
          )}

          {cfStatus === 'error' && (
            <p className="text-xs text-[#ef4444] bg-[#fef2f2] border border-[#fecaca] rounded-lg px-3 py-2">
              {errorMsg || 'Failed to get video status from Cloudflare Stream'}
            </p>
          )}

          {/* Ready state: thumbnail + details */}
          {cfStatus === 'ready' && (
            <div className="flex gap-3 bg-[#f0fdf4] border border-[#a7f3d0] rounded-lg p-3">
              {cfThumbnail && (
                <img src={cfThumbnail} alt="Video thumbnail" className="w-24 h-14 object-cover rounded-md flex-shrink-0 bg-black" />
              )}
              <div className="flex flex-col justify-center gap-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-[#10b981] rounded-full" />
                  <span className="text-xs font-semibold text-[#047857]">Video is ready to stream</span>
                </div>
                <p className="text-[10px] font-mono text-[#64748b] truncate">{form.cloudflareVideoId}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── UPLOAD IN PROGRESS ── */}
      {cfStatus === 'uploading' && (
        <div className="flex flex-col gap-2 p-3 bg-[#f8fafc] rounded-lg">
          <div className="flex items-center justify-between text-xs text-[#334155]">
            <span>Uploading to Cloudflare Stream…</span>
            <span className="font-semibold">{uploadProgress}%</span>
          </div>
          <div className="w-full h-2 bg-[#e2e8f0] rounded-full overflow-hidden">
            <div className="h-full bg-[#7f28bc] rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
          </div>
          <button onClick={() => { xhrRef.current?.abort() }} className="text-xs text-[#ef4444] hover:underline self-start">
            Cancel
          </button>
        </div>
      )}

      {/* ── UPLOAD OPTIONS (no video connected yet) ── */}
      {!form.cloudflareVideoId && cfStatus === 'idle' && (
        <>
          <div className="flex gap-1 bg-[#f8fafc] rounded-lg p-1">
            {(['file', 'url', 'manual'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${tab === t ? 'bg-white shadow-sm text-[#7f28bc]' : 'text-[#64748b] hover:text-[#334155]'}`}
              >
                {t === 'file' ? 'Upload File' : t === 'url' ? 'Import URL' : 'Enter ID'}
              </button>
            ))}
          </div>

          {tab === 'file' && (
            <>
              <input ref={fileRef} type="file" accept="video/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFileUpload(f); e.target.value = '' }} />
              <button onClick={() => fileRef.current?.click()}
                className="w-full h-28 border-2 border-dashed border-[#e2e8f0] rounded-lg flex flex-col items-center justify-center gap-2 hover:border-[#7f28bc] hover:bg-[#faf5ff] transition-colors">
                <img src="/icons/upload-cloud.svg" alt="" className="w-7 h-5 opacity-50" />
                <span className="text-xs font-medium text-[#64748b]">Click to select a video file</span>
                <span className="text-[10px] text-[#94a3b8]">MP4, MOV, WebM — up to 200 MB</span>
              </button>
            </>
          )}

          {tab === 'url' && (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-[#64748b]">Cloudflare will download the video from this public URL.</p>
              <div className="flex gap-2">
                <input type="url" value={urlInput} onChange={e => setUrlInput(e.target.value)}
                  placeholder="https://example.com/video.mp4"
                  className="flex-1 h-10 px-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#334155] focus:outline-none focus:border-[#7f28bc]" />
                <button onClick={handleUrlImport} disabled={importingUrl || !urlInput.trim()}
                  className="h-10 px-4 bg-[#7f28bc] rounded-lg text-xs font-medium text-white hover:bg-[#6d1fa3] disabled:opacity-50 transition-colors">
                  {importingUrl ? 'Importing…' : 'Import'}
                </button>
              </div>
            </div>
          )}

          {tab === 'manual' && (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-[#64748b]">Paste an existing Cloudflare Stream video ID from your dashboard.</p>
              <input type="text" value={form.cloudflareVideoId} onChange={e => form.setField('cloudflareVideoId', e.target.value)}
                placeholder="e.g. 5d5bc37ffcf54c9b76ffd5e8d572b474"
                className="h-10 px-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs font-mono text-[#334155] focus:outline-none focus:border-[#7f28bc]" />
            </div>
          )}
        </>
      )}

      {/* General error (outside upload flow) */}
      {errorMsg && cfStatus === 'idle' && (
        <p className="text-xs text-[#ef4444] bg-[#fef2f2] border border-[#fecaca] rounded-lg px-3 py-2">{errorMsg}</p>
      )}

      {/* Trailer */}
      <div className="flex flex-col gap-1.5 pt-1 border-t border-[#f1f5f9]">
        <label className="text-sm font-semibold text-[#334155] leading-4">
          Trailer Video ID <span className="text-xs font-normal text-[#94a3b8]">(Optional)</span>
        </label>
        <input type="text" value={form.trailerCloudflareId} onChange={e => form.setField('trailerCloudflareId', e.target.value)}
          placeholder="Cloudflare Stream video ID for trailer"
          className="h-10 px-[13px] py-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs font-mono text-[#334155] focus:outline-none focus:border-[#7f28bc]" />
      </div>
    </div>
  )
}
