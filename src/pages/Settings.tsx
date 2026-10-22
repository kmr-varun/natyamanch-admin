import { useState, useEffect } from 'react'
import SettingsGeneral from '../components/SettingsGeneral'
import SettingsEmailNotifications from '../components/SettingsEmailNotifications'
import SettingsBranding from '../components/SettingsBranding'
import SettingsSiteConfig from '../components/SettingsSiteConfig'
import { PageContainer, Button } from '../components/shared'
import { settingsApi } from '../lib/api'

const DEFAULTS: Record<string, string> = {
  site_name: 'Natyamanch',
  tagline: 'Discover. Watch. Celebrate Theatre',
  website_url: 'https://natyamanch.com',
  support_email: 'support@natyamanch.com',
  default_language: 'en',
  timezone: 'Asia/Kolkata',
  primary_color: '#6B21A8',
  secondary_color: '#EC4899',
  font_family: 'Inter',
  email_from_name: 'Natyamanch',
  email_from_address: 'no-reply@natyamanch.com',
  smtp_provider: 'sendgrid',
  email_order_confirmation: 'true',
  email_subscription_renewal: 'false',
  email_marketing: 'false',
  allow_registration: 'true',
  enable_subscriptions: 'true',
  enable_ppv: 'true',
  enable_reviews: 'true',
  enable_comments: 'true',
  maintenance_mode: 'false',
  show_trailer: 'true',
}

export default function Settings() {
  const [settings, setSettings] = useState<Record<string, string>>(DEFAULTS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    settingsApi.get().then(res => {
      const remote = res.settings as Record<string, string>
      setSettings(prev => ({ ...prev, ...remote }))
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveStatus('idle')
    try {
      await settingsApi.update(settings)
      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch {
      setSaveStatus('error')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = async () => {
    setLoading(true)
    try {
      const res = await settingsApi.get()
      const remote = res.settings as Record<string, string>
      setSettings({ ...DEFAULTS, ...remote })
    } catch {}
    setLoading(false)
  }

  return (
    <PageContainer className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1d1b20] leading-8">Settings</h1>
          <p className="text-sm text-[#64748b] mt-0.5">Manage your platform configuration</p>
        </div>
        {saveStatus === 'success' && (
          <span className="text-sm text-[#047857] font-medium bg-[#ecfdf5] px-3 py-1.5 rounded-lg">Settings saved successfully</span>
        )}
        {saveStatus === 'error' && (
          <span className="text-sm text-[#b91c1c] font-medium bg-[#fee2e2] px-3 py-1.5 rounded-lg">Failed to save settings</span>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-sm text-[#94a3b8]">Loading settings...</div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <SettingsGeneral settings={settings} onChange={handleChange} />
            <SettingsEmailNotifications settings={settings} onChange={handleChange} />
          </div>
          <div className="flex flex-col gap-6">
            <SettingsBranding settings={settings} onChange={handleChange} />
            <SettingsSiteConfig settings={settings} onChange={handleChange} />
          </div>
        </div>
      )}

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          onClick={handleCancel}
          disabled={saving}
          className="border border-[#e2e8f0] rounded-lg px-4 py-2.5 text-xs font-medium text-[#334155] leading-4 hover:bg-[#f8fafc] disabled:opacity-60"
        >
          Cancel
        </button>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </PageContainer>
  )
}
