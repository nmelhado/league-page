import React from 'react'
import { Container, Typography } from '@mui/material'

export default function PostPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Post
      </Typography>
      <Typography variant="body1">
        Post page content will be implemented here.
      </Typography>
    </Container>
  )
}