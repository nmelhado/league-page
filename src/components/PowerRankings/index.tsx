import React from 'react'
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar,
  LinearProgress,
  Chip 
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { usePowerRankings } from '../../hooks/useSleeperData'
import { sleeperHelpers } from '../../services/sleeperApi'

const PowerRankingsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
}))

const RankingItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingLeft: 0,
  paddingRight: 0,
}))

const RankNumber = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  marginRight: theme.spacing(2),
}))

const TeamInfo = styled(Box)({
  flex: 1,
})

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
  marginTop: theme.spacing(0.5),
}))

export function PowerRankings() {
  const { data: powerRankings, isLoading, error } = usePowerRankings()

  if (isLoading) {
    return (
      <PowerRankingsContainer>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Power Rankings
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Loading league standings...
          </Typography>
          <LinearProgress />
        </Paper>
      </PowerRankingsContainer>
    )
  }

  if (error || !powerRankings?.length) {
    return (
      <PowerRankingsContainer>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Power Rankings
          </Typography>
          <Typography variant="body2" color="error">
            Unable to load power rankings data.
          </Typography>
        </Paper>
      </PowerRankingsContainer>
    )
  }

  return (
    <PowerRankingsContainer>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Power Rankings
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Rankings based on record and total points scored
        </Typography>
        
        <List>
          {powerRankings.map((team) => (
            <RankingItem key={team.rosterId}>
              <RankNumber
                sx={{
                  backgroundColor: 
                    team.rank === 1 ? '#FFD700' : 
                    team.rank === 2 ? '#C0C0C0' : 
                    team.rank === 3 ? '#CD7F32' : 
                    '#00316b'
                }}
              >
                {team.rank}
              </RankNumber>
              
              <ListItemAvatar>
                <Avatar 
                  src={team.avatar ? sleeperHelpers.getAvatarUrl(team.avatar) : undefined}
                  sx={{ width: 50, height: 50 }}
                >
                  {team.teamName.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              
              <TeamInfo>
                <ListItemText
                  primary={
                    <Typography variant="h6" component="div">
                      {team.teamName}
                    </Typography>
                  }
                  secondary={
                    <StatsContainer>
                      <Chip 
                        label={team.record} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                      <Typography variant="body2" color="text.secondary">
                        {team.points.toFixed(1)} PF
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {team.pointsAgainst.toFixed(1)} PA
                      </Typography>
                    </StatsContainer>
                  }
                />
              </TeamInfo>
            </RankingItem>
          ))}
        </List>
      </Paper>
    </PowerRankingsContainer>
  )
}