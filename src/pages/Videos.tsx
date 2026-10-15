import VideosFilterToolbar from '../components/VideosFilterToolbar'
import VideosTable from '../components/VideosTable'
import { PageContainer } from '../components/shared'

export default function Videos() {
  return (
    <PageContainer>
      <VideosFilterToolbar />

      <div className="pt-6">
        <VideosTable />
      </div>
    </PageContainer>
  )
}
