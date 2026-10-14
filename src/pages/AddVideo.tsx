import VideoPreviewCard from '../components/VideoPreviewCard'
import CloudStreamSettingsCard from '../components/CloudStreamSettingsCard'
import AdditionalDetailsCard from '../components/AdditionalDetailsCard'
import StatusPublishingCard from '../components/StatusPublishingCard'
import BasicInformationCard from '../components/BasicInformationCard'
import PricingAccessCard from '../components/PricingAccessCard'
import CastCrewCard from '../components/CastCrewCard'
import VideoActionBar from '../components/VideoActionBar'

export default function AddVideo() {
  return (
    <>
      <div className="p-8 pb-24">
        {/* Two Column Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-7 flex flex-col gap-6">
            <VideoPreviewCard />
            <CloudStreamSettingsCard />
            <AdditionalDetailsCard />
            <StatusPublishingCard />
          </div>

          {/* Right Column */}
          <div className="col-span-5 flex flex-col gap-6">
            <BasicInformationCard />
            <PricingAccessCard />
            <CastCrewCard />
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <VideoActionBar />
    </>
  )
}
