import { useState } from 'react'
import { notificationsApi } from '../lib/api'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSent: (count: number) => void
}

const TYPES = ['info', 'alert', 'promo']

export default function SendNotificationModal({ isOpen, onClose, onSent }: Props) {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState('info')
  const [audience, setAudience] = useState<'all' | 'user'>('all')
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const reset = () => {
    setTitle(''); setMessage(''); setType('info')
    setAudience('all'); setUserId(''); setError('')
  }

  const handleClose = () => { reset(); onClose() }

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) { setError('Title and message are required'); return }
    if (audience === 'user' && !userId.trim()) { setError('User ID is required for targeted send'); return }
    setLoading(true)
    setError('')
    try {
      const res = await notificationsApi.broadcast({
        title: title.trim(),
        message: message.trim(),
        type,
        userId: audience === 'user' ? userId.trim() : undefined,
      })
      onSent(res.sent)
      handleClose()
    } catch {
      setError('Failed to send notification')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && handleClose()}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0f172a]">Send Notification</h2>
          <button onClick={handleClose} className="text-[#94a3b8] hover:text-[#475569] text-xl leading-none">×</button>
        </div>

        {/* Form */}
        <div className="p-6 flex flex-col gap-4">
          {error && <div className="px-3 py-2 bg-[#fee2e2] text-[#b91c1c] text-xs rounded-lg">{error}</div>}

          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155] leading-4">Title <span className="text-[#ef4444]">*</span></label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter notification title"
              className="h-10 bg-white border border-[#e2e8f0] rounded-lg px-3 text-sm text-[#1e293b] outline-none focus:border-[#7f28bc]"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155] leading-4">Message <span className="text-[#ef4444]">*</span></label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Enter your message..."
              maxLength={500}
              rows={3}
              className="bg-white border border-[#e2e8f0] rounded-lg px-3 py-2.5 text-sm text-[#1e293b] outline-none focus:border-[#7f28bc] resize-none"
            />
            <div className="flex justify-end">
              <span className="text-[10px] text-[#94a3b8]">{message.length}/500</span>
            </div>
          </div>

          {/* Type */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#334155] leading-4">Type</label>
            <div className="flex gap-2">
              {TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex-1 py-2.5 rounded-lg border text-xs font-medium capitalize transition-colors ${
                    type === t
                      ? 'border-[#7f28bc] bg-[#faf5ff] text-[#7e22ce]'
                      : 'border-[#e2e8f0] text-[#475569] hover:bg-[#f8fafc]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Audience */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#334155] leading-4">Audience</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="radio" checked={audience === 'all'} onChange={() => setAudience('all')} className="accent-[#7f28bc]" />
                <span className="text-sm text-[#1e293b]">All active users</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="radio" checked={audience === 'user'} onChange={() => setAudience('user')} className="accent-[#7f28bc]" />
                <span className="text-sm text-[#1e293b]">Specific user (by ID)</span>
              </label>
            </div>
            {audience === 'user' && (
              <input
                type="text"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                placeholder="User ID"
                className="h-10 bg-white border border-[#e2e8f0] rounded-lg px-3 text-sm text-[#1e293b] outline-none focus:border-[#7f28bc]"
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#e2e8f0] flex justify-end gap-3">
          <button onClick={handleClose} className="px-4 py-2 border border-[#e2e8f0] rounded-lg text-sm font-medium text-[#334155] hover:bg-[#f8fafc]">
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={loading}
            className="px-4 py-2 bg-[#7f28bc] rounded-lg text-sm font-medium text-white hover:bg-[#6d21a5] disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send Notification'}
          </button>
        </div>
      </div>
    </div>
  )
}
