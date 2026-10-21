import { useState, useEffect } from 'react'
import { PageContainer, Button } from '../components/shared'
import ContentFilterBar from '../components/ContentFilterBar'
import ContentSectionsTable from '../components/ContentSectionsTable'
import ContentEditModal from '../components/ContentEditModal'
import AddContentSectionModal from '../components/AddContentSectionModal'
import { contentApi, type AdminContent } from '../lib/api'

export default function Content() {
  const [sections, setSections] = useState<AdminContent[]>([])
  const [filtered, setFiltered] = useState<AdminContent[]>([])
  const [loading, setLoading] = useState(true)
  const [editSection, setEditSection] = useState<AdminContent | null>(null)
  const [addModalOpen, setAddModalOpen] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const res = await contentApi.list()
      setSections(res.sections)
      setFiltered(res.sections)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleSearch = (q: string) => {
    const lower = q.toLowerCase()
    setFiltered(sections.filter(s =>
      s.title.toLowerCase().includes(lower) ||
      s.section_key.toLowerCase().includes(lower) ||
      (s.description || '').toLowerCase().includes(lower)
    ))
  }

  const handleDelete = async (key: string) => {
    await contentApi.delete(key)
    await load()
  }

  const handleSaved = async () => {
    setEditSection(null)
    setAddModalOpen(false)
    await load()
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1d1b20] leading-8">Content Management</h1>
            <p className="text-sm text-[#64748b] mt-0.5">Manage all website content sections — edit text, slides, testimonials and more</p>
          </div>
          <Button onClick={() => setAddModalOpen(true)}>Add Section</Button>
        </div>

        <ContentFilterBar onSearch={handleSearch} />
        <ContentSectionsTable
          sections={filtered}
          loading={loading}
          onEdit={s => setEditSection(s)}
          onDelete={handleDelete}
        />
      </div>

      <ContentEditModal
        section={editSection}
        onClose={() => setEditSection(null)}
        onSaved={handleSaved}
      />
      <AddContentSectionModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdded={handleSaved}
      />
    </PageContainer>
  )
}
