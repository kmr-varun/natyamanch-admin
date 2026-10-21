import { createContext, useContext, useState } from 'react'

export interface CastMember {
  name: string
  role: string
}

export interface VideoFormState {
  title: string
  slug: string
  shortDescription: string
  fullDescription: string
  categoryId: string
  language: string
  durationSeconds: number
  priceInr: number
  isFeatured: boolean
  isPublished: boolean
  cloudflareVideoId: string
  trailerCloudflareId: string
  playbackPolicy: string
  year: string
  certification: string
  castCrew: CastMember[]
}

interface VideoFormContextValue extends VideoFormState {
  setField: <K extends keyof VideoFormState>(key: K, value: VideoFormState[K]) => void
  setCastCrew: (members: CastMember[]) => void
}

const VideoFormContext = createContext<VideoFormContextValue | null>(null)

export function VideoFormProvider({ children, initialData }: { children: React.ReactNode; initialData?: Partial<VideoFormState> }) {
  const [state, setState] = useState<VideoFormState>({
    title: initialData?.title ?? '',
    slug: initialData?.slug ?? '',
    shortDescription: initialData?.shortDescription ?? '',
    fullDescription: initialData?.fullDescription ?? '',
    categoryId: initialData?.categoryId ?? '',
    language: initialData?.language ?? 'Marathi',
    durationSeconds: initialData?.durationSeconds ?? 0,
    priceInr: initialData?.priceInr ?? 0,
    isFeatured: initialData?.isFeatured ?? false,
    isPublished: initialData?.isPublished ?? false,
    cloudflareVideoId: initialData?.cloudflareVideoId ?? '',
    trailerCloudflareId: initialData?.trailerCloudflareId ?? '',
    playbackPolicy: initialData?.playbackPolicy ?? 'signed',
    year: initialData?.year ?? '',
    certification: initialData?.certification ?? 'U/A 13+',
    castCrew: initialData?.castCrew ?? [],
  })

  const setField = <K extends keyof VideoFormState>(key: K, value: VideoFormState[K]) => {
    setState(prev => ({ ...prev, [key]: value }))
  }

  const setCastCrew = (members: CastMember[]) => {
    setState(prev => ({ ...prev, castCrew: members }))
  }

  return (
    <VideoFormContext.Provider value={{ ...state, setField, setCastCrew }}>
      {children}
    </VideoFormContext.Provider>
  )
}

export function useVideoForm() {
  const ctx = useContext(VideoFormContext)
  if (!ctx) throw new Error('useVideoForm must be used within VideoFormProvider')
  return ctx
}
