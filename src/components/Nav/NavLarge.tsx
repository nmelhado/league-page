import React from 'react'
import { 
  Box, 
  Button,
  Typography,
  Paper,
  MenuList,
  MenuItem
} from '@mui/material'
import { ExpandMore, Launch } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import { Tab } from '../../utils/tabs'
import { leagueID } from '../../utils/leagueInfo'
import { styled } from '@mui/material/styles'

interface NavLargeProps {
  tabs: Tab[]
  currentTab?: Tab
}

const DropdownContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  '&:hover .dropdown-menu': {
    display: 'block',
  }
}))

const DropdownMenu = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  display: 'none',
  minWidth: '200px',
  zIndex: 1000,
  marginTop: theme.spacing(0.5),
  boxShadow: theme.shadows[3],
}))

export function NavLarge({ tabs, currentTab }: NavLargeProps) {
  const location = useLocation()

  const openSleeperApp = () => {
    window.open(`https://sleeper.app/leagues/${leagueID}`, '_blank')
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
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

        {/* League Info Hover Dropdown */}
        <DropdownContainer>
          <Button
            endIcon={<ExpandMore />}
            sx={{ 
              margin: 1,
              textTransform: 'none',
              color: 'inherit',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            League Info
          </Button>
          
          <DropdownMenu className="dropdown-menu">
            <MenuList>
              <MenuItem component={Link} to="/rosters">
                Rosters
              </MenuItem>
              <MenuItem component={Link} to="/managers">
                All Managers
              </MenuItem>
              <MenuItem component={Link} to="/standings">
                Standings
              </MenuItem>
              <MenuItem component={Link} to="/rivalry">
                Rivalry
              </MenuItem>
              <MenuItem component={Link} to="/drafts">
                Drafts
              </MenuItem>
              <MenuItem component={Link} to="/awards">
                Trophy Room
              </MenuItem>
              <MenuItem component={Link} to="/records">
                Records
              </MenuItem>
              <MenuItem component={Link} to="/constitution">
                By Laws
              </MenuItem>
              <MenuItem 
                onClick={openSleeperApp}
                sx={{ cursor: 'pointer' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Open Sleeper App
                  <Launch fontSize="small" />
                </Box>
              </MenuItem>
            </MenuList>
          </DropdownMenu>
        </DropdownContainer>

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
    </Box>
  )
}