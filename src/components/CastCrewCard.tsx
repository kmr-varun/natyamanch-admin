import { useState } from 'react'
import { useVideoForm, type CastMember } from '../contexts/VideoFormContext'

export default function CastCrewCard() {
  const form = useVideoForm()
  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState('')
  const [adding, setAdding] = useState(false)

  const handleAdd = () => {
    if (!newName.trim()) return
    form.setCastCrew([...form.castCrew, { name: newName.trim(), role: newRole.trim() || 'Cast' }])
    setNewName('')
    setNewRole('')
    setAdding(false)
  }

  const handleRemove = (index: number) => {
    form.setCastCrew(form.castCrew.filter((_, i) => i !== index))
  }

  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] p-[21px] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#1e293b] leading-5">Cast & Crew</h2>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-1.5 px-[13px] py-[7px] bg-[#faf5ff] border border-[#e9d5ff] rounded-lg text-xs font-semibold text-[#7e22ce] leading-4 hover:bg-[#f5e8ff] transition-colors"
        >
          + Add Member
        </button>
      </div>

      {adding && (
        <div className="flex gap-2 items-end">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">Name</label>
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Full name"
              className="h-9 px-3 border border-[#e2e8f0] rounded-lg text-xs focus:outline-none focus:border-[#7f28bc]"
              autoFocus
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-medium text-[#334155]">Role</label>
            <input
              type="text"
              value={newRole}
              onChange={e => setNewRole(e.target.value)}
              placeholder="Actor, Director…"
              className="h-9 px-3 border border-[#e2e8f0] rounded-lg text-xs focus:outline-none focus:border-[#7f28bc]"
              onKeyDown={e => { if (e.key === 'Enter') handleAdd() }}
            />
          </div>
          <button onClick={handleAdd} className="h-9 px-3 bg-[#7f28bc] text-white rounded-lg text-xs font-medium hover:bg-[#6d1fa3]">Add</button>
          <button onClick={() => { setAdding(false); setNewName(''); setNewRole('') }} className="h-9 px-3 border border-[#e2e8f0] rounded-lg text-xs text-gray-500 hover:bg-gray-50">Cancel</button>
        </div>
      )}

      {form.castCrew.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-sm text-[#64748b] mb-4">No cast members added yet</p>
          <button
            onClick={() => setAdding(true)}
            className="px-4 py-2 border-2 border-dashed border-[#cbd5e1] rounded-lg text-xs font-semibold text-[#64748b] hover:border-[#7f28bc] hover:text-[#7f28bc] hover:bg-[#faf5ff] transition-colors"
          >
            + Add First Cast Member
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {form.castCrew.map((member: CastMember, i: number) => (
            <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#faf5ff] border border-[#e9d5ff] rounded-lg">
              <div>
                <p className="text-xs font-semibold text-[#1e293b] leading-[14px]">{member.name}</p>
                <p className="text-[10px] text-[#94a3b8] leading-[13px]">{member.role}</p>
              </div>
              <button onClick={() => handleRemove(i)} className="text-[#94a3b8] hover:text-[#ef4444] ml-1 text-sm leading-none">×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
