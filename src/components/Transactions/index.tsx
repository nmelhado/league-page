import React from 'react'
import { Box, Typography, Paper } from '@mui/material'

export function Transactions() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Recent Transactions
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Transactions data will be displayed here.
      </Typography>
    </Paper>
  )
}