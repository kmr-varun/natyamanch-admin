import CategoriesMetrics from '../components/CategoriesMetrics'
import CategoriesFilterBar from '../components/CategoriesFilterBar'
import CategoriesTable from '../components/CategoriesTable'
import CategoryEditDrawer from '../components/CategoryEditDrawer'

export default function Categories() {
  return (
    <div className="p-8">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - 8 cols */}
        <div className="col-span-8 flex flex-col gap-6">
          <CategoriesMetrics />
          <CategoriesFilterBar />
          <CategoriesTable />
        </div>

        {/* Right Column - 4 cols */}
        <div className="col-span-4 flex flex-col gap-6">
          <div className="flex justify-end">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-[#7f28bc] rounded-lg text-xs font-semibold text-white leading-4 shadow-[0px_1px_1px_rgba(88,28,135,0.2)] hover:bg-[#6d1fa3] transition-colors">
              <img src="/icons/plus-icon.svg" alt="" className="w-4 h-4" />
              Add New Category
            </button>
          </div>
          <CategoryEditDrawer />
        </div>
      </div>
    </div>
  )
}
