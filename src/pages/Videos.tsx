import { useState, useEffect, useRef } from 'react'
import VideosFilterToolbar from '../components/VideosFilterToolbar'
import VideosTable from '../components/VideosTable'
import { PageContainer } from '../components/shared'
import { videosApi, type AdminVideo, type Pagination } from '../lib/api'

export default function Videos() {
  const [videos, setVideos] = useState<AdminVideo[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchVideos = async (s: string, st: string, p: number) => {
    setLoading(true)
    try {
      const params: Record<string, string | number> = { page: p, limit: 10 }
      if (s) params.search = s
      if (st) params.status = st
      const res = await videosApi.list(params)
      setVideos(res.data)
      if (res.pagination) setPagination(res.pagination)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchVideos(search, status, page) }, [status, page])

  const handleSearch = (q: string) => {
    setSearch(q)
    if (searchTimer.current) clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => { setPage(1); fetchVideos(q, status, 1) }, 400)
  }

  const handleStatusFilter = (s: string) => {
    setStatus(s)
    setPage(1)
  }

  const handlePageChange = (p: number) => setPage(p)

  const handlePublishToggle = async (video: AdminVideo) => {
    try {
      if (video.is_published) {
        await videosApi.unpublish(video.id)
      } else {
        await videosApi.publish(video.id)
      }
      fetchVideos(search, status, page)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (video: AdminVideo) => {
    try {
      await videosApi.delete(video.id)
      fetchVideos(search, status, page)
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete video')
    }
  }

  return (
    <PageContainer>
      <VideosFilterToolbar onSearch={handleSearch} onStatusFilter={handleStatusFilter} status={status} />
      <div className="pt-6">
        <VideosTable
          videos={videos}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
          onPublishToggle={handlePublishToggle}
          onDelete={handleDelete}
          onRefresh={() => fetchVideos(search, status, page)}
        />
      </div>
    </PageContainer>
  )
}
