import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import HomePage from './pages/HomePage'
import AwardsPage from './pages/AwardsPage'
import RostersPage from './pages/RostersPage'
import ManagerPage from './pages/ManagerPage'
import ManagersPage from './pages/ManagersPage'
import MatchupsPage from './pages/MatchupsPage'
import RecordsPage from './pages/RecordsPage'
import ResourcesPage from './pages/ResourcesPage'
import RivalryPage from './pages/RivalryPage'
import StandingsPage from './pages/StandingsPage'
import TransactionsPage from './pages/TransactionsPage'
import DraftsPage from './pages/DraftsPage'
import BlogPage from './pages/BlogPage'
import PostPage from './pages/PostPage'
import ConstitutionPage from './pages/ConstitutionPage'

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />
      
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/rosters" element={<RostersPage />} />
          <Route path="/manager/:managerId" element={<ManagerPage />} />
          <Route path="/managers" element={<ManagersPage />} />
          <Route path="/matchups" element={<MatchupsPage />} />
          <Route path="/records" element={<RecordsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/rivalry" element={<RivalryPage />} />
          <Route path="/standings" element={<StandingsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/drafts" element={<DraftsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:postId" element={<PostPage />} />
          <Route path="/constitution" element={<ConstitutionPage />} />
        </Routes>
      </Box>

      <Footer />
    </Box>
  )
}

export default App