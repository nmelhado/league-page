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
    event.preventDefault()
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const openSleeperApp = () => {
    window.open(`https://sleeper.app/leagues/${leagueID}`, '_blank')
    handleClose()
  }

  // Filter out nested tabs for the main Tabs component
  const mainTabs = tabs.filter(tab => !tab.nest)
  const leagueInfoTab = tabs.find(tab => tab.nest)

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tabs value={location.pathname} variant="scrollable" scrollButtons="auto" sx={{ flex: 1 }}>
          {mainTabs.map((tab) => (
            <MuiTab
              key={tab.dest}
              label={tab.label}
              value={tab.dest}
              component={tab.dest.startsWith('http') ? 'a' : Link}
              to={tab.dest.startsWith('http') ? undefined : tab.dest}
              href={tab.dest.startsWith('http') ? tab.dest : undefined}
              target={tab.dest.startsWith('http') ? '_blank' : undefined}
            />
          ))}
        </Tabs>

        {/* League Info Dropdown */}
        {leagueInfoTab && (
          <Box sx={{ px: 1 }}>
            <Button
              onClick={handleLeagueInfoClick}
              endIcon={<ExpandMore />}
              sx={{ 
                textTransform: 'none',
                color: 'inherit',
                minHeight: '48px',
                px: 2,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              {leagueInfoTab.label}
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
              PaperProps={{
                sx: {
                  mt: 1,
                  minWidth: 200,
                }
              }}
            >
              {leagueInfoTab.children?.map((childTab) => {
                if (childTab.dest.startsWith('http')) {
                  return (
                    <MenuItem 
                      key={childTab.dest}
                      onClick={openSleeperApp}
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <Typography>{childTab.label}</Typography>
                      <Launch fontSize="small" />
                    </MenuItem>
                  )
                }
                return (
                  <MenuItem 
                    key={childTab.dest}
                    component={Link}
                    to={childTab.dest}
                    onClick={handleClose}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(0, 49, 107, 0.08)'
                      }
                    }}
                  >
                    {childTab.label}
                  </MenuItem>
                )
              })}
            </Menu>
          </Box>
        )}

        {/* Add remaining tabs after League Info */}
        <Tabs value={false} variant="scrollable" scrollButtons="auto">
          {tabs.filter(tab => tab.label === 'Resources').map((tab) => (
            <MuiTab
              key={tab.dest}
              label={tab.label}
              value={tab.dest}
              component={Link}
              to={tab.dest}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  )
}