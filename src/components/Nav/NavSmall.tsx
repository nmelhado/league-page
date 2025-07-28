import React, { useState } from 'react'
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
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
  const [leagueInfoOpen, setLeagueInfoOpen] = useState(false)

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
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
          <List>
            {tabs.map((tab) => {
              if (tab.nest && tab.children) {
                // Special handling for League Info nested menu
                return (
                  <React.Fragment key={tab.dest}>
                    <ListItem disablePadding>
                      <ListItemButton onClick={handleLeagueInfoToggle}>
                        <ListItemText primary={tab.label} />
                        {leagueInfoOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                    </ListItem>
                    <Collapse in={leagueInfoOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {tab.children.map((childTab) => {
                          if (childTab.dest.startsWith('http')) {
                            return (
                              <ListItem key={childTab.dest} disablePadding>
                                <ListItemButton
                                  sx={{ pl: 4 }}
                                  onClick={openSleeperApp}
                                >
                                  <ListItemText 
                                    primary={
                                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="body2">{childTab.label}</Typography>
                                        <Launch fontSize="small" />
                                      </Box>
                                    }
                                  />
                                </ListItemButton>
                              </ListItem>
                            )
                          }
                          return (
                            <ListItem key={childTab.dest} disablePadding>
                              <ListItemButton
                                component={Link}
                                to={childTab.dest}
                                sx={{ pl: 4 }}
                                selected={currentPath === childTab.dest}
                                onClick={handleDrawerToggle}
                              >
                                <ListItemText primary={childTab.label} />
                              </ListItemButton>
                            </ListItem>
                          )
                        })}
                      </List>
                    </Collapse>
                  </React.Fragment>
                )
              }

              return (
                <ListItem key={tab.dest} disablePadding>
                  <ListItemButton
                    component={tab.dest.startsWith('http') ? 'a' : Link}
                    to={tab.dest.startsWith('http') ? undefined : tab.dest}
                    href={tab.dest.startsWith('http') ? tab.dest : undefined}
                    target={tab.dest.startsWith('http') ? '_blank' : undefined}
                    selected={currentPath === tab.dest}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary={tab.label} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Drawer>
    </>
  )
}