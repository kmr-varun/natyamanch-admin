import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { VideoFormProvider, type VideoFormState } from '../contexts/VideoFormContext'
import VideoPreviewCard from '../components/VideoPreviewCard'
import CloudStreamSettingsCard from '../components/CloudStreamSettingsCard'
import AdditionalDetailsCard from '../components/AdditionalDetailsCard'
import StatusPublishingCard from '../components/StatusPublishingCard'
import BasicInformationCard from '../components/BasicInformationCard'
import PricingAccessCard from '../components/PricingAccessCard'
import CastCrewCard from '../components/CastCrewCard'
import EditVideoActionBar from '../components/EditVideoActionBar'
import { PageContainer } from '../components/shared'
import { videosApi, type AdminVideo } from '../lib/api'

function EditVideoInner({ video }: { video: AdminVideo }) {
  let castCrew: { name: string; role: string }[] = []
  try { castCrew = video.cast_crew ? JSON.parse(video.cast_crew) : [] } catch { castCrew = [] }

  const initialData: Partial<VideoFormState> = {
    title: video.title,
    slug: video.slug,
    shortDescription: video.short_description || '',
    fullDescription: video.full_description || '',
    categoryId: video.category_id || '',
    language: video.language || 'Marathi',
    durationSeconds: video.duration_seconds || 0,
    priceInr: video.price_inr,
    isFeatured: Boolean(video.is_featured),
    isPublished: Boolean(video.is_published),
    cloudflareVideoId: video.cloudflare_video_id || '',
    trailerCloudflareId: video.trailer_cloudflare_id || '',
    playbackPolicy: video.playback_policy || 'signed',
    year: video.year ? String(video.year) : '',
    certification: video.certification || 'U/A 13+',
    castCrew,
  }

  return (
    <VideoFormProvider initialData={initialData}>
      <>
        <PageContainer className="pb-24">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-7 flex flex-col gap-6">
              <VideoPreviewCard />
              <CloudStreamSettingsCard />
              <AdditionalDetailsCard />
              <StatusPublishingCard />
            </div>
            <div className="col-span-5 flex flex-col gap-6">
              <BasicInformationCard />
              <PricingAccessCard />
              <CastCrewCard />
            </div>
          </div>
        </PageContainer>
        <EditVideoActionBar videoId={video.id} />
      </>
    </VideoFormProvider>
  )
}

export default function EditVideo() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [video, setVideo] = useState<AdminVideo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    videosApi.get(id)
      .then(res => setVideo(res.video))
      .catch(() => navigate('/videos'))
      .finally(() => setLoading(false))
  }, [id, navigate])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">Loading video…</div>
  )
  if (!video) return null

  return <EditVideoInner video={video} />
}
