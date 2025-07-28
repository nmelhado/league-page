import React, { useState } from 'react'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  LinearProgress,
  Divider,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDetailedRosters } from '../hooks/useSleeperData'
import { sleeperHelpers } from '../services/sleeperApi'

const RosterCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}))

const TeamHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

const PlayersList = styled(List)(({ theme }) => ({
  maxHeight: '400px',
  overflow: 'auto',
}))

const PositionChip = styled(Chip)(({ theme, position }: { position: string }) => ({
  fontSize: '0.7rem',
  height: '20px',
  backgroundColor: getPositionColor(position),
  color: 'white',
  fontWeight: 'bold',
}))

function getPositionColor(position: string): string {
  switch (position) {
    case 'QB': return '#8e24aa'
    case 'RB': return '#43a047'
    case 'WR': return '#1e88e5'
    case 'TE': return '#ff8f00'
    case 'K': return '#6d4c41'
    case 'DEF': return '#424242'
    default: return '#757575'
  }
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`roster-tabpanel-${index}`}
      aria-labelledby={`roster-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function RostersPage() {
  const { data: rosters, isLoading, error } = useDetailedRosters()
  const [selectedRoster, setSelectedRoster] = useState(0)

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Team Rosters
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Loading roster data...
        </Typography>
        <LinearProgress />
      </Container>
    )
  }

  if (error || !rosters?.length) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Team Rosters
        </Typography>
        <Typography variant="body1" color="error">
          Unable to load roster data.
        </Typography>
      </Container>
    )
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedRoster(newValue)
  }

  const selectedTeam = rosters[selectedRoster]

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Team Rosters
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        View complete rosters for all teams in your league
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={selectedRoster}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {rosters.map((roster, index) => (
            <Tab
              key={roster.roster_id}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    src={roster.avatar ? sleeperHelpers.getAvatarUrl(roster.avatar) : undefined}
                    sx={{ width: 24, height: 24 }}
                  >
                    {roster.teamName.charAt(0)}
                  </Avatar>
                  <Typography variant="body2">{roster.teamNameCustom}</Typography>
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>

      {selectedTeam && (
        <Grid container spacing={3}>
          {/* Team Info */}
          <Grid item xs={12} md={4}>
            <RosterCard>
              <CardContent>
                <TeamHeader>
                  <Avatar
                    src={selectedTeam.avatar ? sleeperHelpers.getAvatarUrl(selectedTeam.avatar) : undefined}
                    sx={{ width: 60, height: 60 }}
                  >
                    {selectedTeam.teamName.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">
                      {selectedTeam.teamNameCustom}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedTeam.teamName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Record: {selectedTeam.record}
                    </Typography>
                  </Box>
                </TeamHeader>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2">
                    <strong>Total Players:</strong> {selectedTeam.totalPlayers}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Starters:</strong> {selectedTeam.starters.length}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Bench:</strong> {selectedTeam.bench.length}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Points For:</strong> {selectedTeam.settings.fpts?.toFixed(1) || '0.0'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Points Against:</strong> {selectedTeam.settings.fpts_against?.toFixed(1) || '0.0'}
                  </Typography>
                </Box>
              </CardContent>
            </RosterCard>
          </Grid>

          {/* Starters */}
          <Grid item xs={12} md={4}>
            <RosterCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Starting Lineup
                </Typography>
                <PlayersList>
                  {selectedTeam.starters.map((player, index) => (
                    <ListItem key={player.player_id || index} divider>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PositionChip
                              position={player.position}
                              label={player.position}
                              size="small"
                            />
                            <Typography variant="body2">
                              {player.name}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {player.team} • {player.position}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </PlayersList>
              </CardContent>
            </RosterCard>
          </Grid>

          {/* Bench */}
          <Grid item xs={12} md={4}>
            <RosterCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Bench Players
                </Typography>
                <PlayersList>
                  {selectedTeam.bench.map((player, index) => (
                    <ListItem key={player.player_id || index} divider>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PositionChip
                              position={player.position}
                              label={player.position}
                              size="small"
                            />
                            <Typography variant="body2">
                              {player.name}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {player.team} • {player.position}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </PlayersList>
              </CardContent>
            </RosterCard>
          </Grid>
        </Grid>
      )}
    </Container>
  )
}