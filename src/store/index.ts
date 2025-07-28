import { create } from 'zustand'

interface Award {
  year: number
  champion: string
  // Add other award properties as needed
}

interface LeagueData {
  // Define league data structure
  [key: string]: any
}

interface MatchupData {
  // Define matchup structure
  [key: string]: any
}

interface RosterData {
  // Define roster structure
  [key: string]: any
}

interface TransactionData {
  // Define transaction structure
  [key: string]: any
}

interface TeamManager {
  // Define team manager structure
  [key: string]: any
}

interface NFLState {
  season: number
  season_type: string
  week: number
}

interface Player {
  // Define player structure
  [key: string]: any
}

interface NewsItem {
  // Define news structure
  [key: string]: any
}

interface Post {
  // Define blog post structure
  [key: string]: any
}

interface Bracket {
  // Define bracket structure
  [key: string]: any
}

interface Standing {
  // Define standing structure
  [key: string]: any
}

interface AppState {
  awards: Record<string, Award>
  leagueData: LeagueData
  upcomingDraft: any
  previousDrafts: any[]
  matchups: Record<string, MatchupData>
  records: Record<string, any>
  rosters: Record<string, RosterData>
  transactions: Record<string, TransactionData>
  teamManagers: Record<string, TeamManager>
  nflState: NFLState | null
  players: Record<string, Player>
  news: NewsItem[]
  posts: Post[]
  brackets: Record<string, Bracket>
  standings: Record<string, Standing>
  
  // Actions
  setAwards: (awards: Record<string, Award>) => void
  setLeagueData: (data: LeagueData) => void
  setUpcomingDraft: (draft: any) => void
  setPreviousDrafts: (drafts: any[]) => void
  setMatchups: (matchups: Record<string, MatchupData>) => void
  setRecords: (records: Record<string, any>) => void
  setRosters: (rosters: Record<string, RosterData>) => void
  setTransactions: (transactions: Record<string, TransactionData>) => void
  setTeamManagers: (managers: Record<string, TeamManager>) => void
  setNflState: (state: NFLState) => void
  setPlayers: (players: Record<string, Player>) => void
  setNews: (news: NewsItem[]) => void
  setPosts: (posts: Post[]) => void
  setBrackets: (brackets: Record<string, Bracket>) => void
  setStandings: (standings: Record<string, Standing>) => void
}

export const useAppStore = create<AppState>((set) => ({
  awards: {},
  leagueData: {},
  upcomingDraft: null,
  previousDrafts: [],
  matchups: {},
  records: {},
  rosters: {},
  transactions: {},
  teamManagers: {},
  nflState: null,
  players: {},
  news: [],
  posts: [],
  brackets: {},
  standings: {},

  setAwards: (awards) => set({ awards }),
  setLeagueData: (leagueData) => set({ leagueData }),
  setUpcomingDraft: (upcomingDraft) => set({ upcomingDraft }),
  setPreviousDrafts: (previousDrafts) => set({ previousDrafts }),
  setMatchups: (matchups) => set({ matchups }),
  setRecords: (records) => set({ records }),
  setRosters: (rosters) => set({ rosters }),
  setTransactions: (transactions) => set({ transactions }),
  setTeamManagers: (teamManagers) => set({ teamManagers }),
  setNflState: (nflState) => set({ nflState }),
  setPlayers: (players) => set({ players }),
  setNews: (news) => set({ news }),
  setPosts: (posts) => set({ posts }),
  setBrackets: (brackets) => set({ brackets }),
  setStandings: (standings) => set({ standings }),
}))