import React from 'react'
import { Container, Typography } from '@mui/material'

export default function DraftsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Drafts
      </Typography>
      <Typography variant="body1">
        Drafts page content will be implemented here.
      </Typography>
    </Container>
  )
}