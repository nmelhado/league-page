import React from 'react'
import { Container, Typography } from '@mui/material'

export default function BlogPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Blog
      </Typography>
      <Typography variant="body1">
        Blog page content will be implemented here.
      </Typography>
    </Container>
  )
}