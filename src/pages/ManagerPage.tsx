import React from 'react'
import { Container, Typography } from '@mui/material'

export default function ManagerPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manager
      </Typography>
      <Typography variant="body1">
        Manager page content will be implemented here.
      </Typography>
    </Container>
  )
}