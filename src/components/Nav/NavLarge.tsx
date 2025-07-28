import React from 'react'
import { Box, Tab as MuiTab, Tabs } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { Tab } from '../../utils/tabs'

interface NavLargeProps {
  tabs: Tab[]
  currentTab?: Tab
}

export function NavLarge({ tabs, currentTab }: NavLargeProps) {
  const location = useLocation()

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={location.pathname} variant="scrollable" scrollButtons="auto">
        {tabs.map((tab) => (
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
    </Box>
  )
}