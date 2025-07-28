import React from 'react'
import {
  Box,
  Typography,
  LinearProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { leagueName, homepageText, enableBlog } from '../utils/leagueInfo'
import { PowerRankings } from '../components/PowerRankings'
import { Transactions } from '../components/Transactions'
import { HomePost } from '../components/BlogPosts/HomePost'
import { useNFLState, useLeagueChampion } from '../hooks/useSleeperData'
import { sleeperHelpers } from '../services/sleeperApi'

const HomeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'nowrap',
  position: 'relative',
  overflowY: 'hidden',
  zIndex: 1,
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
  },
}))

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  minWidth: '320px',
  margin: '0 auto',
  padding: '60px 0',
}))

const TextSection = styled(Box)({
  padding: '0 30px',
  maxWidth: '620px',
  margin: '0 auto',
})

const LeagueDataPanel = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  width: '100%',
  minWidth: '470px',
  maxWidth: '470px',
  minHeight: '100%',
  backgroundColor: '#ebebeb',
  borderLeft: '1px solid #eee',
  boxShadow: 'inset 8px 0px 6px -6px rgb(0 0 0 / 24%)',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    minWidth: '100%',
    width: '100%',
    boxShadow: 'none',
  },
}))

const HomeBanner = styled(Box)({
  backgroundColor: '#00316b',
  color: '#fff',
  padding: '0.5em 0',
  fontWeight: 500,
  fontSize: '1.5em',
  textAlign: 'center',
})

const CurrentChampSection = styled(Box)({
  padding: '25px 0',
  backgroundColor: '#f3f3f3',
  boxShadow: '5px 0 8px rgba(0,0,0,0.1)',
  borderLeft: '1px solid #ddd',
  textAlign: 'center',
})

const ChampContainer = styled(Box)({
  position: 'relative',
  width: '150px',
  height: '150px',
  margin: '0 auto',
  cursor: 'pointer',
})

const ChampImage = styled('img')({
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  width: '80px',
  height: '80px',
  borderRadius: '100%',
  border: '1px solid #ccc',
  left: '50%',
  top: '43%',
})

const LaurelImage = styled('img')({
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  width: '135px',
  height: 'auto',
  left: '50%',
  top: '50%',
})

const ChampTitle = styled(Typography)({
  textAlign: 'center',
  fontSize: '1.8em',
  margin: '10px',
  fontStyle: 'italic',
})

const ChampLabel = styled(Typography)({
  display: 'table',
  textAlign: 'center',
  lineHeight: '1.1em',
  fontSize: '1.7em',
  margin: '6px auto 10px',
  cursor: 'pointer',
})

const TransactionsContainer = styled(Box)({
  display: 'block',
  width: '95%',
  margin: '10px auto',
})

export default function HomePage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  // Use real Sleeper data
  const { data: nflState, isLoading: nflLoading, error: nflError } = useNFLState()
  const { data: champion, isLoading: championLoading } = useLeagueChampion()

  const handleChampionClick = () => {
    if (champion) {
      // Navigate to manager page - you can implement this with React Router
      console.log('Navigate to champion page:', champion.teamName)
    }
  }

  const renderNFLState = () => {
    if (nflLoading) {
      return (
        <>
          <div>Retrieving NFL state...</div>
          <LinearProgress />
        </>
      )
    }

    if (nflError || !nflState) {
      return <div>Something went wrong loading NFL state</div>
    }

    let seasonText = `NFL ${nflState.season} `
    if (nflState.season_type === 'pre') {
      seasonText += 'Preseason'
    } else if (nflState.season_type === 'post') {
      seasonText += 'Postseason'
    } else {
      seasonText += nflState.week > 0 ? `Season - Week ${nflState.week}` : 'Preseason'
    }

    return <div>{seasonText}</div>
  }

  const renderChampion = () => {
    if (championLoading) {
      return (
        <>
          <Typography>Retrieving league leader...</Typography>
          <LinearProgress />
        </>
      )
    }

    if (!champion) {
      return <Typography>No league data available.</Typography>
    }

    // For current season, show current leader instead of "champion"
    const isCurrentSeason = nflState?.season === new Date().getFullYear().toString()
    const title = isCurrentSeason ? `${nflState?.season} League Leader` : `${nflState?.season} Fantasy Champion`

    return (
      <>
        <ChampTitle variant="h4">{title}</ChampTitle>
        <ChampContainer onClick={handleChampionClick}>
          <ChampImage
            src={champion.user?.avatar ? sleeperHelpers.getAvatarUrl(champion.user.avatar) : '/managers/question.jpg'}
            alt="champion"
          />
          <LaurelImage src="/laurel.png" alt="laurel" />
        </ChampContainer>
        <ChampLabel onClick={handleChampionClick}>
          {champion.teamName}
        </ChampLabel>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          {champion.record} • {champion.settings.fpts.toFixed(1)} pts
        </Typography>
      </>
    )
  }

  return (
    <HomeContainer>
      <MainContent>
        <TextSection>
          <Typography variant="h6" align="center" gutterBottom>
            {leagueName}
          </Typography>
          <Box dangerouslySetInnerHTML={{ __html: homepageText }} />
          {enableBlog && <HomePost />}
        </TextSection>
        <PowerRankings />
      </MainContent>

      <LeagueDataPanel>
        <HomeBanner>{renderNFLState()}</HomeBanner>

        <CurrentChampSection>{renderChampion()}</CurrentChampSection>

        <TransactionsContainer>
          <Transactions />
        </TransactionsContainer>
      </LeagueDataPanel>
    </HomeContainer>
  )
}