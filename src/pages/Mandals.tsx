import MandalsMetrics from '../components/MandalsMetrics'
import MandalsFilterBar from '../components/MandalsFilterBar'
import MandalsTable from '../components/MandalsTable'
import MandalsActionHeader from '../components/MandalsActionHeader'
import MandalsDetailSidebar from '../components/MandalsDetailSidebar'

export default function Mandals() {
  return (
    <div className="p-8">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - 8 cols */}
        <div className="col-span-8 flex flex-col gap-6">
          <MandalsMetrics />
          <MandalsFilterBar />
          <MandalsTable />
        </div>

        {/* Right Column - 4 cols */}
        <div className="col-span-4 flex flex-col gap-6">
          <MandalsActionHeader />
          <MandalsDetailSidebar />
        </div>
      </div>
    </div>
  )
}
