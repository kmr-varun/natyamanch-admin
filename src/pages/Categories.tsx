import { useState } from 'react'
import CategoriesMetrics from '../components/CategoriesMetrics'
import CategoriesFilterBar from '../components/CategoriesFilterBar'
import CategoriesTable from '../components/CategoriesTable'
import CategoryEditDrawer from '../components/CategoryEditDrawer'
import { PageContainer, TwoColumnLayout, Button } from '../components/shared'

interface Category {
  id: number
  name: string
  slug: string
  videoCount: number
  status: string
  displayOrder: number
  description?: string
  image?: string
  parentCategory?: string
}

const initialCategories: Category[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: 'Marathi Drama',
  slug: 'marathi-drama',
  videoCount: 24,
  status: 'Active',
  displayOrder: i + 1,
  description: 'Traditional Marathi drama performances',
}))

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(initialCategories)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<'add' | 'edit'>('add')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sortBy, setSortBy] = useState('')

  const handleAddCategory = () => {
    setDrawerMode('add')
    setSelectedCategory(null)
    setDrawerOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setDrawerMode('edit')
    setSelectedCategory(category)
    setDrawerOpen(true)
  }

  const handleSaveCategory = (categoryData: Partial<Category>) => {
    if (drawerMode === 'add') {
      const newCategory: Category = {
        id: Math.max(...categories.map(c => c.id)) + 1,
        name: categoryData.name || '',
        slug: categoryData.slug || '',
        videoCount: 0,
        status: categoryData.status || 'Active',
        displayOrder: categories.length + 1,
        description: categoryData.description,
        image: categoryData.image,
        parentCategory: categoryData.parentCategory,
      }
      const updated = [newCategory, ...categories]
      setCategories(updated)
      applyFilters(updated, searchQuery, statusFilter, sortBy)
    } else if (selectedCategory) {
      const updated = categories.map(c =>
        c.id === selectedCategory.id ? { ...c, ...categoryData } : c
      )
      setCategories(updated)
      applyFilters(updated, searchQuery, statusFilter, sortBy)
    }
    setDrawerOpen(false)
  }

  const handleDeleteCategory = (categoryId: number) => {
    const updated = categories.filter(c => c.id !== categoryId)
    setCategories(updated)
    applyFilters(updated, searchQuery, statusFilter, sortBy)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    applyFilters(categories, query, statusFilter, sortBy)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    applyFilters(categories, searchQuery, status, sortBy)
  }

  const handleSort = (sort: string) => {
    setSortBy(sort)
    applyFilters(categories, searchQuery, statusFilter, sort)
  }

  const applyFilters = (categoryList: Category[], query: string, status: string, sort: string) => {
    let filtered = categoryList

    // Apply search filter
    if (query) {
      filtered = filtered.filter(category =>
        category.name.toLowerCase().includes(query.toLowerCase()) ||
        category.slug.toLowerCase().includes(query.toLowerCase())
      )
    }

    // Apply status filter
    if (status) {
      filtered = filtered.filter(category => category.status === status)
    }

    // Apply sorting
    if (sort) {
      filtered = [...filtered].sort((a, b) => {
        if (sort === 'Name A-Z') return a.name.localeCompare(b.name)
        if (sort === 'Name Z-A') return b.name.localeCompare(a.name)
        if (sort === 'Newest First') return b.id - a.id
        return 0
      })
    }

    setFilteredCategories(filtered)
  }

  return (
    <PageContainer>
      <TwoColumnLayout
        leftColumn={
          <>
            <CategoriesMetrics categories={categories} />
            <CategoriesFilterBar
              onSearch={handleSearch}
              onStatusFilter={handleStatusFilter}
              onSort={handleSort}
            />
            <CategoriesTable
              categories={filteredCategories}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
            />
          </>
        }
        rightColumn={
          <>
            <div className="flex justify-end">
              <Button onClick={handleAddCategory} icon="/icons/plus-icon.svg">
                Add New Category
              </Button>
            </div>
            {drawerOpen && (
              <CategoryEditDrawer
                mode={drawerMode}
                initialData={selectedCategory ? {
                  name: selectedCategory.name,
                  slug: selectedCategory.slug,
                  description: selectedCategory.description || '',
                  image: selectedCategory.image,
                  parentCategory: selectedCategory.parentCategory,
                  status: selectedCategory.status
                } : undefined}
                onSave={handleSaveCategory}
                onCancel={() => setDrawerOpen(false)}
              />
            )}
          </>
        }
      />
    </PageContainer>
  )
}
