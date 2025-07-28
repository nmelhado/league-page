import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  DarkMode,
  LightMode,
} from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { NavLarge } from './NavLarge'
import { NavSmall } from './NavSmall'
import { tabs } from '../../utils/tabs'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#fff',
  color: theme.palette.text.primary,
  position: 'relative',
  zIndex: 2,
  borderBottom: '1px solid #00316b',
  boxShadow: '0 0 8px 0 #00316b',
}))

const LogoContainer = styled(Link)({
  display: 'table',
  margin: '0 auto',
  textDecoration: 'none',
})

const Logo = styled('img')({
  width: '80px',
  display: 'block',
  margin: '0 auto',
  padding: '10px',
})

const ThemeToggleContainer = styled(Box)({
  position: 'absolute',
  top: '0.25em',
  right: '0.25em',
})

const LargeNavContainer = styled(Box)(({ theme }) => ({
  display: 'block',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

const SmallNavContainer = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}))

export function Nav() {
  const theme = useTheme()
  const location = useLocation()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return !window.matchMedia('(prefers-color-scheme: light)').matches
    }
    return false
  })

  const currentTab = tabs.find(
    tab =>
      tab.dest === location.pathname ||
      (tab.nest && tab.children?.find(subTab => subTab.dest === location.pathname))
  )

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
    // In a real app, you'd update your theme provider here
    // For now, we'll just toggle the state
  }

  useEffect(() => {
    // Update document title based on current route
    const pathName = location.pathname
    const title = !pathName.slice(1) 
      ? 'Home' 
      : pathName.charAt(1).toUpperCase() + pathName.slice(2)
    document.title = `${title} | League Page`
  }, [location.pathname])

  return (
    <StyledAppBar position="static" elevation={0}>
      <Toolbar sx={{ padding: 0, minHeight: 'auto !important' }}>
        <Box sx={{ width: '100%', position: 'relative' }}>
          <LogoContainer to="/">
            <Logo alt="league logo" src="/badge.png" />
          </LogoContainer>

          <ThemeToggleContainer>
            <IconButton
              onClick={handleThemeToggle}
              color="inherit"
              size="small"
            >
              {isDarkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </ThemeToggleContainer>

          <LargeNavContainer>
            <NavLarge tabs={tabs} currentTab={currentTab} />
          </LargeNavContainer>

          <SmallNavContainer>
            <NavSmall tabs={tabs} currentPath={location.pathname} />
          </SmallNavContainer>
        </Box>
      </Toolbar>
    </StyledAppBar>
  )
}