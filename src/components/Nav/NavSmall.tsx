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
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { Tab } from '../../utils/tabs'

interface NavSmallProps {
  tabs: Tab[]
  currentPath: string
}

export function NavSmall({ tabs, currentPath }: NavSmallProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
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
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <List>
            {tabs.map((tab) => (
              <ListItem key={tab.dest} disablePadding>
                <ListItemButton
                  component={tab.dest.startsWith('http') ? 'a' : Link}
                  to={tab.dest.startsWith('http') ? undefined : tab.dest}
                  href={tab.dest.startsWith('http') ? tab.dest : undefined}
                  target={tab.dest.startsWith('http') ? '_blank' : undefined}
                  selected={currentPath === tab.dest}
                >
                  <ListItemText primary={tab.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}