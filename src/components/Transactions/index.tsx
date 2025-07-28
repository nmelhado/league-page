import React from 'react'
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  LinearProgress,
  Chip,
  Divider 
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRecentTransactions, usePlayers, useRosters, useLeagueUsers } from '../../hooks/useSleeperData'
import { sleeperHelpers } from '../../services/sleeperApi'

const TransactionItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: 0,
  paddingRight: 0,
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}))

const TransactionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
}))

const TimeStamp = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
}))

export function Transactions() {
  const { data: transactions, isLoading: transactionsLoading } = useRecentTransactions()
  const { data: players } = usePlayers()
  const { data: rosters } = useRosters()
  const { data: users } = useLeagueUsers()

  if (transactionsLoading) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Recent Transactions
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Loading recent activity...
        </Typography>
        <LinearProgress />
      </Paper>
    )
  }

  if (!transactions?.length || !players || !rosters || !users) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Recent Transactions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No recent transactions available.
        </Typography>
      </Paper>
    )
  }

  const formatTransactions = () => {
    return transactions.slice(0, 5).map(transaction => {
      return sleeperHelpers.formatTransaction(transaction, players, rosters, users)
    })
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'trade':
        return 'secondary'
      case 'waiver':
        return 'warning'
      case 'free agent':
        return 'success'
      default:
        return 'default'
    }
  }

  const formattedTransactions = formatTransactions()

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Recent Transactions
      </Typography>
      
      {formattedTransactions.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No recent transactions found.
        </Typography>
      ) : (
        <List dense>
          {formattedTransactions.map((transaction, index) => (
            <TransactionItem key={index}>
              <ListItemText
                primary={
                  <TransactionHeader>
                    <Chip
                      label={transaction.type}
                      size="small"
                      color={getTransactionColor(transaction.type)}
                      variant="outlined"
                    />
                  </TransactionHeader>
                }
                secondary={
                  <>
                    <Typography variant="body2" component="div">
                      {transaction.description}
                    </Typography>
                    <TimeStamp>
                      {formatTimestamp(transaction.timestamp)}
                    </TimeStamp>
                  </>
                }
              />
            </TransactionItem>
          ))}
        </List>
      )}
      
      <Divider sx={{ my: 1 }} />
      <Typography variant="caption" color="text.secondary" align="center" display="block">
        Showing last 5 transactions
      </Typography>
    </Paper>
  )
}