// Mock users data
const mockUsers = [
  {
    id: 1048,
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    purchasedVideos: 8,
    activeVideos: 6,
    activeStatus: 'Active' as const,
    accountStatus: 'Active' as const,
    joinedDate: 'Sep 12, 2026',
  },
  {
    id: 1047,
    name: 'Rahul Mehta',
    email: 'rahul.mehta@email.com',
    purchasedVideos: 8,
    activeVideos: 6,
    activeStatus: 'Active' as const,
    accountStatus: 'Active' as const,
    joinedDate: 'Sep 12, 2026',
  },
  {
    id: 1046,
    name: 'Ananya Iyer',
    email: 'ananya.iyer@email.com',
    purchasedVideos: 8,
    activeVideos: 6,
    activeStatus: 'Active' as const,
    accountStatus: 'Active' as const,
    joinedDate: 'Sep 12, 2026',
  },
  {
    id: 1045,
    name: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    purchasedVideos: 8,
    activeVideos: 0,
    activeStatus: 'Expired' as const,
    accountStatus: 'Expired' as const,
    joinedDate: 'Sep 12, 2026',
  },
  {
    id: 1044,
    name: 'Neha Kapoor',
    email: 'neha.kapoor@email.com',
    purchasedVideos: 8,
    activeVideos: 6,
    activeStatus: 'Active' as const,
    accountStatus: 'Active' as const,
    joinedDate: 'Sep 12, 2026',
  },
  {
    id: 1043,
    name: 'Arjun Patel',
    email: 'arjun.patel@email.com',
    purchasedVideos: 8,
    activeVideos: 6,
    activeStatus: 'Active' as const,
    accountStatus: 'Active' as const,
    joinedDate: 'Sep 12, 2026',
  },
  {
    id: 1042,
    name: 'Divya Nair',
    email: 'divya.nair@email.com',
    purchasedVideos: 8,
    activeVideos: 6,
    activeStatus: 'Active' as const,
    accountStatus: 'Active' as const,
    joinedDate: 'Sep 12, 2026',
  },
  {
    id: 1041,
    name: 'Karan Desai',
    email: 'karan.desai@email.com',
    purchasedVideos: 8,
    activeVideos: 6,
    activeStatus: 'Active' as const,
    accountStatus: 'Active' as const,
    joinedDate: 'Sep 12, 2026',
  },
]

export default function UsersTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#e6e6e6]">
      {/* Header */}
      <div className="bg-[rgba(248,242,250,0.6)] border-b border-[#f2ecf4] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-base font-bold text-[#1d1b20] leading-6">All Users</h2>
          <span className="text-base text-[#d4c2ca]">•</span>
          <div className="flex items-center gap-2">
            <button className="px-6 h-[26px] bg-[#7f28bc] text-white text-xs font-medium tracking-[0.36px] rounded shadow-[0px_2px_4px_rgba(56,6,43,0.2)] hover:bg-[#6d1fa3] transition-colors">
              Active User
            </button>
            <button className="px-3.5 h-[27px] border border-[#7f28bc] text-[#7f28bc] text-xs font-medium tracking-[0.36px] rounded hover:bg-[#f7ecff] transition-colors">
              Deactivated User
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-normal text-[#50434a]">Show:</span>
          <div className="pl-3 pr-6 py-1 bg-white border border-[#f2ecf4] rounded-sm shadow-sm">
            <span className="text-[11px] font-bold text-[#1d1b20] tracking-[0.55px]">10 per page</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f7ecff] border-b border-[#f2ecf4]">
              <th className="w-[107px] px-6 py-5">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-[#767676] rounded-sm"
                />
              </th>
              <th className="px-4 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">
                User
              </th>
              <th className="px-4 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">
                Email
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">
                Purchased Videos
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">
                Active Videos
              </th>
              <th className="px-4 py-3 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">
                Account Status
              </th>
              <th className="px-4 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-center">
                Joined
              </th>
              <th className="px-6 py-5 text-[11px] font-semibold text-[#323232] tracking-[0.55px] uppercase text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id} className="border-b border-[#f8f2fa]">
                <td className="px-6 py-5.5">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-[#767676] rounded-sm"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-sm font-semibold text-[#1d1b20] leading-[17.5px]">
                      {user.name}
                    </span>
                    <span className="text-[11px] font-semibold text-[#3c0d5d] tracking-[0.55px] leading-[14px]">
                      #{user.id}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-6 text-xs font-normal text-[#3b3b3b] text-center">
                  {user.email}
                </td>
                <td className="px-4 py-6 text-sm font-normal text-[#1d1b20] text-center">
                  {user.purchasedVideos} Videos
                </td>
                <td className="px-4 py-5.5 text-center">
                  <div className="inline-flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-[#7f28bc] rounded-full" />
                    <span className="text-sm font-semibold text-[#7f28bc] leading-5">
                      {user.activeVideos > 0 ? `${user.activeVideos} Active` : 'Expired'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-5 text-center">
                  {user.accountStatus === 'Active' ? (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#dcfce7] rounded-xl">
                      <div className="w-1.5 h-1.5 bg-[#16a34a] rounded-full" />
                      <span className="text-[11px] font-semibold text-[#166534] tracking-[0.55px] leading-[14px]">
                        Active
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#ffebef] rounded-xl">
                      <div className="w-1.5 h-1.5 bg-[#e23e5e] rounded-full" />
                      <span className="text-[11px] font-semibold text-[#e23e5e] tracking-[0.55px] leading-[14px]">
                        Expired
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-5 text-xs font-normal text-[#3b3b3b] text-center">
                  {user.joinedDate}
                </td>
                <td className="px-6 py-5 text-center">
                  <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                    <img src="/icons/dots-menu.svg" alt="Actions" className="w-3.5 h-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with Pagination */}
      <div className="bg-[rgba(248,242,250,0.6)] border-t border-[#f2ecf4] px-6 py-4 flex items-center justify-between">
        <span className="text-xs font-normal text-[#50434a]">
          Showing <span className="text-[#1d1b20]">1–10</span> of <span className="text-[#1d1b20]">4,892</span> users
        </span>

        <div className="flex items-center gap-1">
          <button className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium text-[#585858] tracking-[0.36px] hover:bg-white transition-colors">
            <img src="/icons/chevron-left.svg" alt="" className="w-[4.933px] h-2" />
            Previous
          </button>

          <button className="w-8 h-8 flex items-center justify-center bg-[#7f28bc] text-white text-xs font-semibold tracking-[0.36px] rounded shadow-sm">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-[#585858] text-xs font-semibold tracking-[0.36px] rounded hover:bg-white transition-colors">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-[#585858] text-xs font-semibold tracking-[0.36px] rounded hover:bg-white transition-colors">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-[#585858] text-xs font-semibold tracking-[0.36px] rounded hover:bg-white transition-colors">
            4
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-[#585858] text-xs font-semibold tracking-[0.36px] rounded hover:bg-white transition-colors">
            5
          </button>

          <button className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium text-[#585858] tracking-[0.36px] hover:bg-white transition-colors">
            Next
            <img src="/icons/chevron-right-small.svg" alt="" className="w-[4.933px] h-2" />
          </button>
        </div>
      </div>
    </div>
  )
}
