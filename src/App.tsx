import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Videos from './pages/Videos'
import AddVideo from './pages/AddVideo'
import Categories from './pages/Categories'
import Subscriptions from './pages/Subscriptions'
import SubscriptionPlans from './pages/SubscriptionPlans'
import Mandals from './pages/Mandals'
import Orders from './pages/Orders'
import Content from './pages/Content'
import Analytics from './pages/Analytics'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="videos" element={<Videos />} />
          <Route path="videos/add" element={<AddVideo />} />
          <Route path="categories" element={<Categories />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="subscription-plans" element={<SubscriptionPlans />} />
          <Route path="mandals" element={<Mandals />} />
          <Route path="orders" element={<Orders />} />
          <Route path="content" element={<Content />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
