import { VideoFormProvider } from '../contexts/VideoFormContext'
import VideoPreviewCard from '../components/VideoPreviewCard'
import CloudStreamSettingsCard from '../components/CloudStreamSettingsCard'
import AdditionalDetailsCard from '../components/AdditionalDetailsCard'
import StatusPublishingCard from '../components/StatusPublishingCard'
import BasicInformationCard from '../components/BasicInformationCard'
import PricingAccessCard from '../components/PricingAccessCard'
import CastCrewCard from '../components/CastCrewCard'
import VideoActionBar from '../components/VideoActionBar'
import { PageContainer } from '../components/shared'

export default function AddVideo() {
  return (
    <VideoFormProvider>
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

        <VideoActionBar />
      </>
    </VideoFormProvider>
  )
}
