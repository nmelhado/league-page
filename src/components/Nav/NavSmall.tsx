import React, { useState } from 'react'
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Collapse,
  Typography,
} from '@mui/material'
import { Menu as MenuIcon, ExpandLess, ExpandMore, Launch } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { Tab } from '../../utils/tabs'
import { leagueID } from '../../utils/leagueInfo'

interface NavSmallProps {
  tabs: Tab[]
  currentPath: string
}

export function NavSmall({ tabs, currentPath }: NavSmallProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [leagueInfoOpen, setLeagueInfoOpen] = useState(true) // Keep League Info expanded by default

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleLeagueInfoToggle = () => {
    setLeagueInfoOpen(!leagueInfoOpen)
  }

  const openSleeperApp = () => {
    window.open(`https://sleeper.app/leagues/${leagueID}`, '_blank')
    setDrawerOpen(false)
  }

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ position: 'absolute', left: 16, top: 16 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {/* Regular tabs */}
            {tabs.filter(tab => !tab.nest).map((tab) => (
              <ListItem key={tab.dest} disablePadding>
                <ListItemButton
                  component={Link}
                  to={tab.dest}
                  selected={currentPath === tab.dest}
                  onClick={handleDrawerToggle}
                >
                  <ListItemText primary={tab.label} />
                </ListItemButton>
              </ListItem>
            ))}

            {/* League Info Section */}
            <ListItem disablePadding>
              <ListItemButton onClick={handleLeagueInfoToggle}>
                <ListItemText primary="League Info" />
                {leagueInfoOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={leagueInfoOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/rosters"
                    sx={{ pl: 4 }}
                    selected={currentPath === "/rosters"}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary="Rosters" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/managers"
                    sx={{ pl: 4 }}
                    selected={currentPath === "/managers"}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary="All Managers" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/standings"
                    sx={{ pl: 4 }}
                    selected={currentPath === "/standings"}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary="Standings" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/rivalry"
                    sx={{ pl: 4 }}
                    selected={currentPath === "/rivalry"}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary="Rivalry" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/drafts"
                    sx={{ pl: 4 }}
                    selected={currentPath === "/drafts"}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary="Drafts" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/awards"
                    sx={{ pl: 4 }}
                    selected={currentPath === "/awards"}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary="Trophy Room" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/records"
                    sx={{ pl: 4 }}
                    selected={currentPath === "/records"}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary="Records" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/constitution"
                    sx={{ pl: 4 }}
                    selected={currentPath === "/constitution"}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary="By Laws" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={openSleeperApp}
                  >
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2">Open Sleeper App</Typography>
                          <Launch fontSize="small" />
                        </Box>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>

            {/* Resources */}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/resources"
                selected={currentPath === "/resources"}
                onClick={handleDrawerToggle}
              >
                <ListItemText primary="Resources" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}