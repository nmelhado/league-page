import React from 'react'
import { 
  Box, 
  Button,
  Typography,
  Divider
} from '@mui/material'
import { Launch } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import { Tab } from '../../utils/tabs'
import { leagueID } from '../../utils/leagueInfo'

interface NavLargeProps {
  tabs: Tab[]
  currentTab?: Tab
}

export function NavLarge({ tabs, currentTab }: NavLargeProps) {
  const location = useLocation()

  const openSleeperApp = () => {
    window.open(`https://sleeper.app/leagues/${leagueID}`, '_blank')
  }

  const leagueInfoItems = [
    { label: '📋 Rosters', path: '/rosters' },
    { label: '👥 All Managers', path: '/managers' },
    { label: '📊 Standings', path: '/standings' },
    { label: '🔥 Rivalry', path: '/rivalry' },
    { label: '📝 Drafts', path: '/drafts' },
    { label: '🏆 Trophy Room', path: '/awards' },
    { label: '📈 Records', path: '/records' },
    { label: '📜 By Laws', path: '/constitution' },
  ]

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      {/* Main Navigation Row */}
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 1, backgroundColor: '#f8f9fa' }}>
        {/* Regular tabs */}
        {tabs.filter(tab => !tab.nest).map((tab) => (
          <Button
            key={tab.dest}
            component={Link}
            to={tab.dest}
            sx={{ 
              margin: 1,
              textTransform: 'none',
              color: 'inherit',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            {tab.label}
          </Button>
        ))}

        {/* League Info Button (Visual Only) */}
        <Button
          sx={{ 
            margin: 1,
            textTransform: 'none',
            color: 'primary.main',
            fontWeight: 'bold',
            backgroundColor: 'rgba(0, 49, 107, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(0, 49, 107, 0.2)'
            }
          }}
        >
          📊 League Info ⬇️
        </Button>

        {/* Resources */}
        <Button
          component={Link}
          to="/resources"
          sx={{ 
            margin: 1,
            textTransform: 'none',
            color: 'inherit',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          Resources
        </Button>
      </Box>

      {/* League Info Submenu - Always Visible */}
      <Box sx={{ 
        backgroundColor: '#ffffff', 
        borderTop: '1px solid #e0e0e0',
        padding: '8px 16px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        justifyContent: 'center'
      }}>
        <Typography variant="caption" color="text.secondary" sx={{ width: '100%', textAlign: 'center', mb: 1 }}>
          League Info Pages:
        </Typography>
        
        {leagueInfoItems.map((item) => (
          <Button
            key={item.path}
            component={Link}
            to={item.path}
            size="small"
            variant={location.pathname === item.path ? "contained" : "outlined"}
            sx={{ 
              textTransform: 'none',
              fontSize: '0.8rem',
              minWidth: 'auto',
              padding: '4px 8px'
            }}
          >
            {item.label}
          </Button>
        ))}
        
        <Button
          onClick={openSleeperApp}
          size="small"
          variant="outlined"
          sx={{ 
            textTransform: 'none',
            fontSize: '0.8rem',
            minWidth: 'auto',
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          🚀 Open Sleeper App
          <Launch fontSize="small" />
        </Button>
      </Box>
    </Box>
  )
}