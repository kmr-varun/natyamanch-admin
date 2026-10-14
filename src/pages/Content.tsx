import ContentFilterBar from '../components/ContentFilterBar'
import ContentPagesTable from '../components/ContentPagesTable'
import ContentEditPanel from '../components/ContentEditPanel'

export default function Content() {
  return (
    <div className="p-8 flex flex-col gap-6">
      {/* Full Width Filter Bar */}
      <ContentFilterBar />

      {/* Two Column Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - 8 cols */}
        <div className="col-span-8">
          <ContentPagesTable />
        </div>

        {/* Right Column - 4 cols */}
        <div className="col-span-4">
          <ContentEditPanel />
        </div>
      </div>
    </div>
  )
}
