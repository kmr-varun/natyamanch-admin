import { useState } from 'react'
import ContentFilterBar from '../components/ContentFilterBar'
import ContentPagesTable from '../components/ContentPagesTable'
import ContentEditPanel from '../components/ContentEditPanel'
import AddContentModal from '../components/AddContentModal'
import { PageContainer, TwoColumnLayout, Button } from '../components/shared'

export default function Content() {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'Page' | 'Popup'>('Page')
  const [content, setContent] = useState([
    { id: 1, title: 'Privacy Policy', type: 'Page' as const, status: 'Published' as const, lastModified: '2026-10-10' },
    { id: 2, title: 'Terms of Service', type: 'Page' as const, status: 'Published' as const, lastModified: '2026-10-09' },
    { id: 3, title: 'Welcome Popup', type: 'Popup' as const, status: 'Draft' as const, lastModified: '2026-10-08' },
  ])

  const handleAddContent = (newContent: any) => {
    const item = {
      id: Math.max(...content.map(c => c.id)) + 1,
      ...newContent,
      lastModified: new Date().toISOString().split('T')[0]
    }
    setContent([item, ...content])
  }

  const handleAddPage = () => {
    setModalType('Page')
    setAddModalOpen(true)
  }

  const handleAddPopup = () => {
    setModalType('Popup')
    setAddModalOpen(true)
  }

  return (
    <PageContainer className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <div className="flex gap-2">
          <Button onClick={handleAddPopup} icon="/icons/plus-icon.svg" className="px-3 py-[6px]">
            Add Popup
          </Button>
          <Button onClick={handleAddPage} icon="/icons/plus-icon.svg" className="px-3 py-[6px]">
            Add Page
          </Button>
        </div>
      </div>
      <ContentFilterBar />
      <TwoColumnLayout
        leftColumn={<ContentPagesTable content={content} />}
        rightColumn={<ContentEditPanel />}
      />
      <AddContentModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddContent}
        type={modalType}
      />
    </PageContainer>
  )
}
