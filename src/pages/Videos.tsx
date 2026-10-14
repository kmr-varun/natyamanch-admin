import VideosFilterToolbar from '../components/VideosFilterToolbar'
import VideosTable from '../components/VideosTable'

export default function Videos() {
  return (
    <div className="p-8">
      <VideosFilterToolbar />

      {/* Videos Table */}
      <div className="pt-6">
        <VideosTable />
      </div>
    </div>
  )
}
