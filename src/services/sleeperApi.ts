import axios from 'axios';
import { leagueID } from '../utils/leagueInfo';

const SLEEPER_BASE_URL = 'https://api.sleeper.app/v1';

// Create axios instance
const api = axios.create({
  baseURL: SLEEPER_BASE_URL,
  timeout: 10000,
});

// Types for Sleeper API responses
export interface SleeperUser {
  user_id: string;
  username: string;
  display_name: string;
  avatar: string;
}

export interface SleeperLeague {
  total_rosters: number;
  status: string;
  sport: string;
  settings: {
    playoff_teams: number;
    playoff_rounds: number;
    playoff_week_start: number;
    leg: number;
    divisions: number;
    [key: string]: any;
  };
  season_type: string;
  season: string;
  scoring_settings: Record<string, number>;
  roster_positions: string[];
  previous_league_id: string;
  name: string;
  league_id: string;
  dynasty: string;
  avatar: string;
}

export interface SleeperRoster {
  starters: string[];
  settings: {
    wins: number;
    waiver_position: number;
    waiver_budget_used: number;
    total_moves: number;
    ties: number;
    losses: number;
    fpts: number;
    fpts_decimal: number;
    fpts_against: number;
    fpts_against_decimal: number;
  };
  roster_id: number;
  reserve: string[];
  players: string[];
  owner_id: string;
  league_id: string;
}

export interface SleeperMatchup {
  starters: string[];
  roster_id: number;
  players: string[];
  matchup_id: number;
  custom_points: number;
  points: number;
}

export interface SleeperTransaction {
  type: 'trade' | 'waiver' | 'free_agent';
  transaction_id: string;
  status_updated: number;
  status: string;
  settings: any;
  roster_ids: number[];
  metadata: any;
  leg: number;
  drops: Record<string, number>;
  draft_picks: any[];
  creator: string;
  created: number;
  adds: Record<string, number>;
}

export interface SleeperPlayer {
  player_id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  position: string;
  team: string;
  status: string;
  injury_status: string;
  fantasy_positions: string[];
}

export interface NFLState {
  week: number;
  season_type: string;
  season: string;
  leg: number;
  display_week: number;
}

// API Functions
export const sleeperApi = {
  // Get NFL state
  getNFLState: async (): Promise<NFLState> => {
    const response = await api.get('/state/nfl');
    return response.data;
  },

  // Get league info
  getLeague: async (): Promise<SleeperLeague> => {
    const response = await api.get(`/league/${leagueID}`);
    return response.data;
  },

  // Get league users
  getLeagueUsers: async (): Promise<SleeperUser[]> => {
    const response = await api.get(`/league/${leagueID}/users`);
    return response.data;
  },

  // Get league rosters
  getRosters: async (): Promise<SleeperRoster[]> => {
    const response = await api.get(`/league/${leagueID}/rosters`);
    return response.data;
  },

  // Get matchups for a specific week
  getMatchups: async (week: number): Promise<SleeperMatchup[]> => {
    const response = await api.get(`/league/${leagueID}/matchups/${week}`);
    return response.data;
  },

  // Get transactions for a specific week
  getTransactions: async (week: number): Promise<SleeperTransaction[]> => {
    const response = await api.get(`/league/${leagueID}/transactions/${week}`);
    return response.data;
  },

  // Get all players
  getPlayers: async (): Promise<Record<string, SleeperPlayer>> => {
    const response = await api.get('/players/nfl');
    return response.data;
  },

  // Get user by ID
  getUser: async (userId: string): Promise<SleeperUser> => {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  },

  // Get league winners (for previous seasons)
  getLeagueWinners: async (previousLeagueId: string): Promise<any> => {
    const response = await api.get(`/league/${previousLeagueId}/winners_bracket`);
    return response.data;
  },

  // Get league drafts
  getLeagueDrafts: async (): Promise<any[]> => {
    const response = await api.get(`/league/${leagueID}/drafts`);
    return response.data;
  },

  // Get draft picks for a specific draft
  getDraftPicks: async (draftId: string): Promise<any[]> => {
    const response = await api.get(`/draft/${draftId}/picks`);
    return response.data;
  },

  // Get playoff bracket
  getPlayoffBracket: async (bracket: 'winners' | 'losers'): Promise<any[]> => {
    const response = await api.get(`/league/${leagueID}/${bracket}_bracket`);
    return response.data;
  },
};

// Helper functions
export const sleeperHelpers = {
  // Get player name from ID
  getPlayerName: (playerId: string, players: Record<string, SleeperPlayer>): string => {
    const player = players[playerId];
    return player ? `${player.first_name} ${player.last_name}` : 'Unknown Player';
  },

  // Get team name from roster ID and users
  getTeamName: (rosterId: number, rosters: SleeperRoster[], users: SleeperUser[]): string => {
    const roster = rosters.find(r => r.roster_id === rosterId);
    if (!roster) return 'Unknown Team';
    
    const user = users.find(u => u.user_id === roster.owner_id);
    return user?.display_name || user?.username || 'Unknown Team';
  },

  // Get user avatar URL
  getAvatarUrl: (avatar: string | null): string => {
    if (!avatar) return '/managers/question.jpg';
    return `https://sleepercdn.com/avatars/thumbs/${avatar}`;
  },

  // Calculate total points for a roster
  getTotalPoints: (roster: SleeperRoster): number => {
    return roster.settings?.fpts || 0;
  },

  // Get win percentage
  getWinPercentage: (roster: SleeperRoster): number => {
    const wins = roster.settings?.wins || 0;
    const losses = roster.settings?.losses || 0;
    const ties = roster.settings?.ties || 0;
    const totalGames = wins + losses + ties;
    
    if (totalGames === 0) return 0;
    return (wins + ties * 0.5) / totalGames;
  },

  // Format transaction for display
  formatTransaction: (
    transaction: SleeperTransaction, 
    players: Record<string, SleeperPlayer>,
    rosters: SleeperRoster[],
    users: SleeperUser[]
  ) => {
    const getTeamName = (rosterId: number) => 
      sleeperHelpers.getTeamName(rosterId, rosters, users);
    
    const getPlayerName = (playerId: string) => 
      sleeperHelpers.getPlayerName(playerId, players);

    if (transaction.type === 'trade') {
      return {
        type: 'Trade',
        description: `Trade between ${transaction.roster_ids.map(getTeamName).join(' and ')}`,
        details: {
          adds: Object.keys(transaction.adds || {}).map(getPlayerName),
          drops: Object.keys(transaction.drops || {}).map(getPlayerName),
        },
        timestamp: transaction.created,
      };
    }

    if (transaction.type === 'waiver' || transaction.type === 'free_agent') {
      const rosterId = transaction.roster_ids[0];
      const teamName = getTeamName(rosterId);
      const addedPlayers = Object.keys(transaction.adds || {}).map(getPlayerName);
      const droppedPlayers = Object.keys(transaction.drops || {}).map(getPlayerName);
      
      return {
        type: transaction.type === 'waiver' ? 'Waiver' : 'Free Agent',
        description: `${teamName} ${addedPlayers.length ? `added ${addedPlayers.join(', ')}` : ''}${addedPlayers.length && droppedPlayers.length ? ' and ' : ''}${droppedPlayers.length ? `dropped ${droppedPlayers.join(', ')}` : ''}`,
        timestamp: transaction.created,
      };
    }

    return {
      type: 'Transaction',
      description: 'Unknown transaction type',
      timestamp: transaction.created,
    };
  },
};

export default sleeperApi;