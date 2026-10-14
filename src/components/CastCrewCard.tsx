export default function CastCrewCard() {
  const castMembers = [
    { name: 'Atul Parchure', role: 'Lead Actor', image: '/images/cast-atul-parchure.png' },
    { name: 'Atul Parchure', role: 'Lead Actor', image: '/images/cast-atul-parchure.png' },
    { name: 'Swati Chitnis', role: 'Supporting', image: '/images/cast-swati-chitnis.png' },
    { name: 'Rajan Bhise', role: 'Supporting', image: '/images/cast-rajan-bhise.png' },
    { name: 'Priya Marathe', role: 'Supporting', image: '/images/cast-priya-marathe.png' },
  ]

  const castMembersRow2 = [
    { name: 'Atul Parchure', role: 'Lead Actor', image: '/images/cast-atul-parchure.png' },
    { name: 'Swati Chitnis', role: 'Supporting', image: '/images/cast-swati-chitnis.png' },
    { name: 'Rajan Bhise', role: 'Supporting', image: '/images/cast-rajan-bhise.png' },
    { name: 'Priya Marathe', role: 'Supporting', image: '/images/cast-priya-marathe.png' },
  ]

  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] p-[21px] flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#1e293b] leading-5">
          Cast & Crew
        </h2>
        <button className="flex items-center gap-1.5 px-[13px] py-[7px] bg-[#faf5ff] border border-[#e9d5ff] rounded-lg text-xs font-semibold text-[#7e22ce] leading-4 hover:bg-[#f5e8ff] transition-colors">
          <img src="/icons/users-icon.svg" alt="" className="w-[13.4px] h-[11px]" />
          Manage Cast & Crew
        </button>
      </div>

      {/* First Row - 5 Members */}
      <div className="flex items-center gap-2.5">
        {castMembers.map((member, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full border-2 border-[#f1f5f9] overflow-hidden mb-1.5">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Name */}
            <div className="w-full h-[13.75px] overflow-hidden mb-[-0.2px]">
              <p className="text-[11px] font-semibold text-[#1e293b] text-center leading-[13.75px] truncate">
                {member.name}
              </p>
            </div>
            {/* Role */}
            <p className="text-[9px] font-medium text-[#94a3b8] text-center leading-[13.5px]">
              {member.role}
            </p>
          </div>
        ))}
      </div>

      {/* Second Row - 4 Members + Add Button */}
      <div className="flex items-center gap-2.5">
        {castMembersRow2.map((member, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full border-2 border-[#f1f5f9] overflow-hidden mb-1.5">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Name */}
            <div className="w-full h-[13.75px] overflow-hidden mb-[-0.2px]">
              <p className="text-[11px] font-semibold text-[#1e293b] text-center leading-[13.75px] truncate">
                {member.name}
              </p>
            </div>
            {/* Role */}
            <p className="text-[9px] font-medium text-[#94a3b8] text-center leading-[13.5px]">
              {member.role}
            </p>
          </div>
        ))}

        {/* Add Member Button */}
        <div className="flex-1 flex flex-col items-center h-[81px]">
          <button className="w-12 h-12 rounded-full border-2 border-dashed border-[#cbd5e1] flex items-center justify-center mb-1.5 hover:border-[#7f28bc] hover:bg-[#faf5ff] transition-colors">
            <span className="text-sm font-black text-[#94a3b8] leading-5">+</span>
          </button>
          <p className="text-[11px] font-medium text-[#64748b] text-center leading-[16.5px] pt-1.5">
            Add
          </p>
        </div>
      </div>
    </div>
  )
}
