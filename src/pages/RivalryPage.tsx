import React, { useState } from 'react'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Alert,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { SportsMma } from '@mui/icons-material'
import { useManagerProfiles, useRivalryData } from '../hooks/useSleeperData'
import { sleeperHelpers } from '../services/sleeperApi'

const RivalryCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  height: '100%',
}))

const VersusBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(3),
  margin: theme.spacing(3, 0),
}))

const TeamSelector = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  minWidth: '200px',
}))

const RecordChip = styled(Chip)<{ $isWinner: boolean }>(({ theme, $isWinner }) => ({
  backgroundColor: $isWinner ? '#4caf50' : '#f44336',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1.1rem',
}))

export default function RivalryPage() {
  const { data: managers, isLoading: managersLoading } = useManagerProfiles()
  const [team1Id, setTeam1Id] = useState<number | ''>('')
  const [team2Id, setTeam2Id] = useState<number | ''>('')
  
  const { data: rivalryData, isLoading: rivalryLoading } = useRivalryData(
    team1Id as number, 
    team2Id as number
  )

  if (managersLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Team Rivalry
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Loading team data...
        </Typography>
        <LinearProgress />
      </Container>
    )
  }

  if (!managers?.length) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Team Rivalry
        </Typography>
        <Typography variant="body1" color="error">
          Unable to load team data.
        </Typography>
      </Container>
    )
  }

  const team1 = managers.find(m => m.rosterId === team1Id)
  const team2 = managers.find(m => m.rosterId === team2Id)

  const getAvailableTeams = (excludeId?: number) => {
    return managers.filter(m => m.rosterId !== excludeId)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Team Rivalry Analysis
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Compare head-to-head records between any two teams
      </Typography>

      {/* Team Selectors */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={5}>
          <FormControl fullWidth>
            <InputLabel>Select Team 1</InputLabel>
            <Select
              value={team1Id}
              label="Select Team 1"
              onChange={(e) => setTeam1Id(e.target.value as number)}
            >
              {getAvailableTeams(team2Id as number).map((manager) => (
                <MenuItem key={manager.rosterId} value={manager.rosterId}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      src={manager.avatar ? sleeperHelpers.getAvatarUrl(manager.avatar) : undefined}
                      sx={{ width: 32, height: 32 }}
                    >
                      {manager.teamName.charAt(0)}
                    </Avatar>
                    {manager.teamNameCustom}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SportsMma sx={{ fontSize: 40, color: 'primary.main' }} />
        </Grid>

        <Grid item xs={12} md={5}>
          <FormControl fullWidth>
            <InputLabel>Select Team 2</InputLabel>
            <Select
              value={team2Id}
              label="Select Team 2"
              onChange={(e) => setTeam2Id(e.target.value as number)}
            >
              {getAvailableTeams(team1Id as number).map((manager) => (
                <MenuItem key={manager.rosterId} value={manager.rosterId}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      src={manager.avatar ? sleeperHelpers.getAvatarUrl(manager.avatar) : undefined}
                      sx={{ width: 32, height: 32 }}
                    >
                      {manager.teamName.charAt(0)}
                    </Avatar>
                    {manager.teamNameCustom}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Rivalry Analysis */}
      {team1 && team2 && (
        <Grid container spacing={3}>
          {/* Head-to-Head Record */}
          <Grid item xs={12}>
            <RivalryCard>
              <CardContent>
                <VersusBox>
                  <TeamSelector>
                    <Avatar
                      src={team1.avatar ? sleeperHelpers.getAvatarUrl(team1.avatar) : undefined}
                      sx={{ width: 80, height: 80 }}
                    >
                      {team1.teamName.charAt(0)}
                    </Avatar>
                    <Typography variant="h6">{team1.teamNameCustom}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {team1.record}
                    </Typography>
                  </TeamSelector>

                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" gutterBottom>
                      VS
                    </Typography>
                    {rivalryLoading ? (
                      <LinearProgress />
                    ) : rivalryData ? (
                      <Box>
                        <Typography variant="h3" gutterBottom>
                          {rivalryData.team1Wins} - {rivalryData.team2Wins}
                          {rivalryData.ties > 0 && ` - ${rivalryData.ties}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {rivalryData.totalGames} total matchups
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No head-to-head matchups found
                      </Typography>
                    )}
                  </Box>

                  <TeamSelector>
                    <Avatar
                      src={team2.avatar ? sleeperHelpers.getAvatarUrl(team2.avatar) : undefined}
                      sx={{ width: 80, height: 80 }}
                    >
                      {team2.teamName.charAt(0)}
                    </Avatar>
                    <Typography variant="h6">{team2.teamNameCustom}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {team2.record}
                    </Typography>
                  </TeamSelector>
                </VersusBox>

                {rivalryData && rivalryData.totalGames > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Head-to-Head Statistics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <RecordChip
                          label={`${team1.teamNameCustom}: ${rivalryData.team1Wins} wins`}
                          $isWinner={rivalryData.team1Wins > rivalryData.team2Wins}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <RecordChip
                          label={`${team2.teamNameCustom}: ${rivalryData.team2Wins} wins`}
                          $isWinner={rivalryData.team2Wins > rivalryData.team1Wins}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </CardContent>
            </RivalryCard>
          </Grid>

          {/* Season Comparison */}
          <Grid item xs={12} md={6}>
            <RivalryCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {team1.teamNameCustom} - Season Stats
                </Typography>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Record</TableCell>
                      <TableCell align="right">{team1.record}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Points For</TableCell>
                      <TableCell align="right">{team1.pointsFor.toFixed(1)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Points Against</TableCell>
                      <TableCell align="right">{team1.pointsAgainst.toFixed(1)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Win Rate</TableCell>
                      <TableCell align="right">{(team1.winPercentage * 100).toFixed(1)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Moves</TableCell>
                      <TableCell align="right">{team1.totalMoves}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </RivalryCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <RivalryCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {team2.teamNameCustom} - Season Stats
                </Typography>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>Record</TableCell>
                      <TableCell align="right">{team2.record}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Points For</TableCell>
                      <TableCell align="right">{team2.pointsFor.toFixed(1)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Points Against</TableCell>
                      <TableCell align="right">{team2.pointsAgainst.toFixed(1)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Win Rate</TableCell>
                      <TableCell align="right">{(team2.winPercentage * 100).toFixed(1)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Moves</TableCell>
                      <TableCell align="right">{team2.totalMoves}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </RivalryCard>
          </Grid>
        </Grid>
      )}

      {/* Instructions */}
      {(!team1 || !team2) && (
        <Alert severity="info" sx={{ mt: 3 }}>
          Select two teams above to view their head-to-head rivalry statistics and season comparison.
        </Alert>
      )}
    </Container>
  )
}