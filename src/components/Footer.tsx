import React from 'react'
import { Box, Typography } from '@mui/material'

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {'League Page © '}
        {new Date().getFullYear()}
        {'. Built with React and Material-UI.'}
      </Typography>
    </Box>
  )
}