import React from 'react'
import { Box, Typography, Paper } from '@mui/material'

export function HomePost() {
  return (
    <Box sx={{ mt: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Latest Blog Post
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Blog post content will be displayed here when blog is enabled.
        </Typography>
      </Paper>
    </Box>
  )
}