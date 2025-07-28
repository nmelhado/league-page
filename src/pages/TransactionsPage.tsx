import React from 'react'
import { Container, Typography } from '@mui/material'

export default function TransactionsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>
      <Typography variant="body1">
        Transactions page content will be implemented here.
      </Typography>
    </Container>
  )
}