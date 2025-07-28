import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { leagueName, homepageText, enableBlog, managers } from '../utils/leagueInfo'
import { useAppStore } from '../store'
import { PowerRankings } from '../components/PowerRankings'
import { Transactions } from '../components/Transactions'
import { HomePost } from '../components/BlogPosts/HomePost'

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

interface NFLState {
  season: number
  season_type: string
  week: number
}

interface Award {
  year: number
  champion: string
}

export default function HomePage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { nflState, awards } = useAppStore()
  const [nflStateData, setNflStateData] = useState<NFLState | null>(null)
  const [loading, setLoading] = useState(true)
  const [awardsData, setAwardsData] = useState<Award[]>([])

  useEffect(() => {
    // Simulate API calls - replace with actual API calls
    const fetchData = async () => {
      try {
        // This would be replaced with actual API calls
        const mockNflState: NFLState = {
          season: 2024,
          season_type: 'regular',
          week: 15,
        }
        setNflStateData(mockNflState)

        const mockAwards: Award[] = [
          { year: 2023, champion: '825182685528989696' },
        ]
        setAwardsData(mockAwards)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getTeamName = (rosterId: string): string => {
    const manager = managers.find(m => m.managerID === rosterId)
    return manager ? manager.name : 'Unknown Team'
  }

  const getAvatarUrl = (rosterId: string): string => {
    const manager = managers.find(m => m.managerID === rosterId)
    return manager?.photo || '/managers/question.jpg'
  }

  const handleChampionClick = () => {
    // Navigation logic for champion
    console.log('Navigate to champion page')
  }

  const renderNFLState = () => {
    if (loading) {
      return (
        <>
          <div>Retrieving NFL state...</div>
          <LinearProgress />
        </>
      )
    }

    if (!nflStateData) {
      return <div>Something went wrong loading NFL state</div>
    }

    let seasonText = `NFL ${nflStateData.season} `
    if (nflStateData.season_type === 'pre') {
      seasonText += 'Preseason'
    } else if (nflStateData.season_type === 'post') {
      seasonText += 'Postseason'
    } else {
      seasonText += nflStateData.week > 0 ? `Season - Week ${nflStateData.week}` : 'Preseason'
    }

    return <div>{seasonText}</div>
  }

  const renderChampion = () => {
    if (loading) {
      return (
        <>
          <Typography>Retrieving awards...</Typography>
          <LinearProgress />
        </>
      )
    }

    if (!awardsData.length) {
      return <Typography>No former champs.</Typography>
    }

    const latestChamp = awardsData[0]
    return (
      <>
        <ChampTitle variant="h4">{latestChamp.year} Fantasy Champ</ChampTitle>
        <ChampContainer onClick={handleChampionClick}>
          <ChampImage
            src={getAvatarUrl(latestChamp.champion)}
            alt="champion"
          />
          <LaurelImage src="/laurel.png" alt="laurel" />
        </ChampContainer>
        <ChampLabel onClick={handleChampionClick}>
          {getTeamName(latestChamp.champion)}
        </ChampLabel>
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