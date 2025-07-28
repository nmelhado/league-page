import React from 'react'
import { Box, Typography, Paper } from '@mui/material'

export function PowerRankings() {
  return (
    <Box sx={{ mt: 4, px: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Power Rankings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Power rankings component will be implemented here.
        </Typography>
      </Paper>
    </Box>
  )
}