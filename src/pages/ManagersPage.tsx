import React from 'react'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
  Chip,
  LinearProgress,
  Button,
  Divider,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Star, TrendingUp, TrendingDown, Remove } from '@mui/icons-material'
import { useManagerProfiles } from '../hooks/useSleeperData'
import { sleeperHelpers } from '../services/sleeperApi'

const ManagerCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}))

const ManagerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

const StatsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}))

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.shape.borderRadius,
}))

const RecordChip = styled(Chip)<{ $winrate: number }>(({ theme, $winrate }) => ({
  backgroundColor: 
    $winrate >= 0.7 ? '#4caf50' :
    $winrate >= 0.5 ? '#ff9800' : '#f44336',
  color: 'white',
  fontWeight: 'bold',
}))

export default function ManagersPage() {
  const { data: managers, isLoading, error } = useManagerProfiles()

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          All Managers
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Loading manager profiles...
        </Typography>
        <LinearProgress />
      </Container>
    )
  }

  if (error || !managers?.length) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          All Managers
        </Typography>
        <Typography variant="body1" color="error">
          Unable to load manager data.
        </Typography>
      </Container>
    )
  }

  const getTrendIcon = (winPercentage: number) => {
    if (winPercentage >= 0.6) return <TrendingUp color="success" />
    if (winPercentage <= 0.4) return <TrendingDown color="error" />
    return <Remove color="disabled" />
  }

  const getPerformanceLabel = (winPercentage: number) => {
    if (winPercentage >= 0.7) return 'Excellent'
    if (winPercentage >= 0.6) return 'Good'
    if (winPercentage >= 0.5) return 'Average'
    if (winPercentage >= 0.4) return 'Below Average'
    return 'Struggling'
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Managers
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Complete profiles for all league managers
      </Typography>

      <Grid container spacing={3}>
        {managers.map((manager, index) => (
          <Grid item xs={12} sm={6} md={4} key={manager.rosterId}>
            <ManagerCard>
              <CardContent>
                <ManagerHeader>
                  <Avatar
                    src={manager.avatar ? sleeperHelpers.getAvatarUrl(manager.avatar) : undefined}
                    sx={{ width: 60, height: 60 }}
                  >
                    {manager.teamName.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">
                        {manager.teamNameCustom}
                      </Typography>
                      {manager.isOwner && (
                        <Star color="primary" fontSize="small" />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {manager.teamName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <RecordChip
                        label={manager.record}
                        size="small"
                        $winrate={manager.winPercentage}
                      />
                      {getTrendIcon(manager.winPercentage)}
                    </Box>
                  </Box>
                </ManagerHeader>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" color="primary" gutterBottom>
                  Season Performance: {getPerformanceLabel(manager.winPercentage)}
                </Typography>

                <StatsGrid>
                  <StatItem>
                    <Typography variant="h6" color="primary">
                      {manager.wins}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Wins
                    </Typography>
                  </StatItem>
                  <StatItem>
                    <Typography variant="h6" color="error">
                      {manager.losses}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Losses
                    </Typography>
                  </StatItem>
                  <StatItem>
                    <Typography variant="h6">
                      {manager.pointsFor.toFixed(1)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Points For
                    </Typography>
                  </StatItem>
                  <StatItem>
                    <Typography variant="h6">
                      {manager.pointsAgainst.toFixed(1)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Points Against
                    </Typography>
                  </StatItem>
                </StatsGrid>

                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2">
                    <strong>Win Rate:</strong> {(manager.winPercentage * 100).toFixed(1)}%
                  </Typography>
                  <Typography variant="body2">
                    <strong>Moves Made:</strong> {manager.totalMoves}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Waiver Position:</strong> {manager.waiverPosition}
                  </Typography>
                  <Typography variant="body2">
                    <strong>FAAB Used:</strong> ${manager.waiverBudgetUsed || 0}
                  </Typography>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={() => {
                      // Navigate to individual manager page
                      console.log('Navigate to manager:', manager.teamName)
                    }}
                  >
                    View Full Profile
                  </Button>
                </Box>
              </CardContent>
            </ManagerCard>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, p: 3, backgroundColor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          League Overview
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <StatItem>
              <Typography variant="h5" color="primary">
                {managers.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Managers
              </Typography>
            </StatItem>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatItem>
              <Typography variant="h5" color="primary">
                {managers.reduce((acc, m) => acc + m.totalMoves, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Moves
              </Typography>
            </StatItem>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatItem>
              <Typography variant="h5" color="primary">
                {managers.reduce((acc, m) => acc + m.pointsFor, 0).toFixed(0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Points
              </Typography>
            </StatItem>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatItem>
              <Typography variant="h5" color="primary">
                {(managers.reduce((acc, m) => acc + m.pointsFor, 0) / managers.length).toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Points/Team
              </Typography>
            </StatItem>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}