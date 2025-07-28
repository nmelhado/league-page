import React from 'react'
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
  Chip,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { TrendingUp, TrendingDown, EmojiEvents } from '@mui/icons-material'
import { useStandings, useLeague } from '../hooks/useSleeperData'
import { sleeperHelpers } from '../services/sleeperApi'

const StandingsTable = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))

const RankCell = styled(TableCell)<{ $rank: number }>(({ theme, $rank }) => ({
  fontWeight: 'bold',
  backgroundColor: 
    $rank === 1 ? '#fff9c4' :
    $rank === 2 ? '#f3e5f5' :
    $rank === 3 ? '#fff3e0' :
    $rank <= 6 ? '#e8f5e8' :
    '#ffffff',
  color: 
    $rank === 1 ? '#f57f17' :
    $rank === 2 ? '#7b1fa2' :
    $rank === 3 ? '#ef6c00' :
    $rank <= 6 ? '#2e7d32' :
    'inherit',
}))

const TeamCell = styled(TableCell)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}))

const RecordChip = styled(Chip)<{ $winrate: number }>(({ theme, $winrate }) => ({
  backgroundColor: 
    $winrate >= 0.7 ? '#4caf50' :
    $winrate >= 0.5 ? '#ff9800' : '#f44336',
  color: 'white',
  fontWeight: 'bold',
}))

const StatCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
}))

export default function StandingsPage() {
  const { data: standings, isLoading, error } = useStandings()
  const { data: league } = useLeague()

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          League Standings
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Loading standings...
        </Typography>
        <LinearProgress />
      </Container>
    )
  }

  if (error || !standings?.length) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          League Standings
        </Typography>
        <Typography variant="body1" color="error">
          Unable to load standings data.
        </Typography>
      </Container>
    )
  }

  const playoffTeams = league?.settings?.playoff_teams || 6
  const totalTeams = standings.length

  const getPlayoffStatus = (rank: number) => {
    if (rank <= playoffTeams) {
      if (rank <= 2) return { status: 'Bye Week', color: 'primary' }
      return { status: 'Playoff Bound', color: 'success' }
    }
    return { status: 'Out of Playoffs', color: 'error' }
  }

  const getTrendIcon = (winPercentage: number) => {
    if (winPercentage >= 0.6) return <TrendingUp color="success" fontSize="small" />
    if (winPercentage <= 0.4) return <TrendingDown color="error" fontSize="small" />
    return null
  }

  // Calculate league averages
  const avgPointsFor = standings.reduce((acc, team) => acc + team.settings.fpts, 0) / standings.length
  const avgPointsAgainst = standings.reduce((acc, team) => acc + team.settings.fpts_against, 0) / standings.length

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        League Standings
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Current standings and playoff picture
      </Typography>

      {/* League Overview Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <CardContent>
              <Typography variant="h5" color="primary">
                {totalTeams}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Teams
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <CardContent>
              <Typography variant="h5" color="primary">
                {playoffTeams}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Playoff Teams
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <CardContent>
              <Typography variant="h5" color="primary">
                {avgPointsFor.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Points For
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard>
            <CardContent>
              <Typography variant="h5" color="primary">
                {avgPointsAgainst.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Points Against
              </Typography>
            </CardContent>
          </StatCard>
        </Grid>
      </Grid>

      {/* Standings Table */}
      <StandingsTable component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Rank</strong></TableCell>
              <TableCell><strong>Team</strong></TableCell>
              <TableCell align="center"><strong>Record</strong></TableCell>
              <TableCell align="center"><strong>Win %</strong></TableCell>
              <TableCell align="center"><strong>Points For</strong></TableCell>
              <TableCell align="center"><strong>Points Against</strong></TableCell>
              <TableCell align="center"><strong>Point Diff</strong></TableCell>
              <TableCell align="center"><strong>Playoff Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {standings.map((team, index) => {
              const rank = index + 1
              const playoffStatus = getPlayoffStatus(rank)
              const pointDiff = team.settings.fpts - team.settings.fpts_against
              
              return (
                <TableRow key={team.roster_id} hover>
                  <RankCell $rank={rank}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {rank <= 3 && <EmojiEvents fontSize="small" />}
                      {rank}
                    </Box>
                  </RankCell>
                  <TeamCell>
                    <Avatar
                      src={team.user?.avatar ? sleeperHelpers.getAvatarUrl(team.user.avatar) : undefined}
                      sx={{ width: 40, height: 40 }}
                    >
                      {team.teamName.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {team.teamNameCustom}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {team.teamName}
                      </Typography>
                    </Box>
                  </TeamCell>
                  <TableCell align="center">
                    <RecordChip
                      label={team.record}
                      size="small"
                      $winrate={team.winPercentage}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      {(team.winPercentage * 100).toFixed(1)}%
                      {getTrendIcon(team.winPercentage)}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography 
                      variant="body2"
                      color={team.settings.fpts > avgPointsFor ? 'success.main' : 'text.primary'}
                      fontWeight={team.settings.fpts > avgPointsFor ? 'bold' : 'normal'}
                    >
                      {team.settings.fpts.toFixed(1)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography 
                      variant="body2"
                      color={team.settings.fpts_against < avgPointsAgainst ? 'success.main' : 'text.primary'}
                      fontWeight={team.settings.fpts_against < avgPointsAgainst ? 'bold' : 'normal'}
                    >
                      {team.settings.fpts_against.toFixed(1)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography 
                      variant="body2"
                      color={pointDiff > 0 ? 'success.main' : pointDiff < 0 ? 'error.main' : 'text.primary'}
                      fontWeight="bold"
                    >
                      {pointDiff > 0 ? '+' : ''}{pointDiff.toFixed(1)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={playoffStatus.status}
                      size="small"
                      color={playoffStatus.color as any}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </StandingsTable>

      {/* Playoff Picture */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Playoff Picture
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                <EmojiEvents sx={{ mr: 1, verticalAlign: 'middle' }} />
                Currently In Playoffs ({playoffTeams} teams)
              </Typography>
              {standings.slice(0, playoffTeams).map((team, index) => (
                <Box key={team.roster_id} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {index + 1}.
                  </Typography>
                  <Avatar
                    src={team.user?.avatar ? sleeperHelpers.getAvatarUrl(team.user.avatar) : undefined}
                    sx={{ width: 24, height: 24 }}
                  >
                    {team.teamName.charAt(0)}
                  </Avatar>
                  <Typography variant="body2">
                    {team.teamNameCustom} ({team.record})
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" color="error" gutterBottom>
                On the Outside Looking In
              </Typography>
              {standings.slice(playoffTeams).map((team, index) => (
                <Box key={team.roster_id} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {playoffTeams + index + 1}.
                  </Typography>
                  <Avatar
                    src={team.user?.avatar ? sleeperHelpers.getAvatarUrl(team.user.avatar) : undefined}
                    sx={{ width: 24, height: 24 }}
                  >
                    {team.teamName.charAt(0)}
                  </Avatar>
                  <Typography variant="body2" color="text.secondary">
                    {team.teamNameCustom} ({team.record})
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}