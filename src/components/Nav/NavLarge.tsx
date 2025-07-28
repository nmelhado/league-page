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
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const openSleeperApp = () => {
    window.open(`https://sleeper.app/leagues/${leagueID}`, '_blank')
    handleClose()
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={false} variant="scrollable" scrollButtons="auto">
        {tabs.map((tab) => {
          if (tab.nest && tab.children) {
            // Special handling for League Info dropdown
            return (
              <Box key={tab.dest} sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  onClick={handleLeagueInfoClick}
                  endIcon={<ExpandMore />}
                  sx={{ 
                    textTransform: 'none',
                    color: 'inherit',
                    minHeight: '48px',
                    px: 2
                  }}
                >
                  {tab.label}
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
                  {tab.children.map((childTab) => {
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
                      >
                        {childTab.label}
                      </MenuItem>
                    )
                  })}
                </Menu>
              </Box>
            )
          }

          return (
            <MuiTab
              key={tab.dest}
              label={tab.label}
              value={tab.dest}
              component={tab.dest.startsWith('http') ? 'a' : Link}
              to={tab.dest.startsWith('http') ? undefined : tab.dest}
              href={tab.dest.startsWith('http') ? tab.dest : undefined}
              target={tab.dest.startsWith('http') ? '_blank' : undefined}
            />
          )
        })}
      </Tabs>
    </Box>
  )
}