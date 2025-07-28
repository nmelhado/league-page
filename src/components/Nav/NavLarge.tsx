import React, { useState } from 'react'
import { 
  Box, 
  Tab as MuiTab, 
  Tabs, 
  Menu, 
  MenuItem, 
  Button,
  Typography 
} from '@mui/material'
import { ExpandMore, Launch } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import { Tab } from '../../utils/tabs'
import { leagueID } from '../../utils/leagueInfo'

interface NavLargeProps {
  tabs: Tab[]
  currentTab?: Tab
}

export function NavLarge({ tabs, currentTab }: NavLargeProps) {
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleLeagueInfoClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log('League Info clicked!') // Debug log
    event.preventDefault()
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    console.log('Menu closing') // Debug log
    setAnchorEl(null)
  }

  const openSleeperApp = () => {
    window.open(`https://sleeper.app/leagues/${leagueID}`, '_blank')
    handleClose()
  }

  console.log('NavLarge rendering, tabs:', tabs) // Debug log

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
        {/* Regular tabs */}
        {tabs.filter(tab => !tab.nest).map((tab) => (
          <Button
            key={tab.dest}
            component={Link}
            to={tab.dest}
            sx={{ margin: 1 }}
          >
            {tab.label}
          </Button>
        ))}

        {/* League Info Dropdown */}
        <Box sx={{ position: 'relative' }}>
          <Button
            onClick={handleLeagueInfoClick}
            endIcon={<ExpandMore />}
            sx={{ 
              margin: 1,
              backgroundColor: anchorEl ? 'rgba(0, 0, 0, 0.1)' : 'transparent'
            }}
          >
            League Info
          </Button>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/rosters" style={{ textDecoration: 'none', color: 'inherit' }}>
                Rosters
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/managers" style={{ textDecoration: 'none', color: 'inherit' }}>
                All Managers
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/standings" style={{ textDecoration: 'none', color: 'inherit' }}>
                Standings
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/rivalry" style={{ textDecoration: 'none', color: 'inherit' }}>
                Rivalry
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/drafts" style={{ textDecoration: 'none', color: 'inherit' }}>
                Drafts
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/awards" style={{ textDecoration: 'none', color: 'inherit' }}>
                Trophy Room
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/records" style={{ textDecoration: 'none', color: 'inherit' }}>
                Records
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/constitution" style={{ textDecoration: 'none', color: 'inherit' }}>
                By Laws
              </Link>
            </MenuItem>
            <MenuItem onClick={openSleeperApp}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Open Sleeper App
                <Launch fontSize="small" />
              </Box>
            </MenuItem>
          </Menu>
        </Box>

        {/* Resources */}
        <Button
          component={Link}
          to="/resources"
          sx={{ margin: 1 }}
        >
          Resources
        </Button>
      </Box>
    </Box>
  )
}