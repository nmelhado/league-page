import { useQuery } from '@tanstack/react-query';
import { sleeperApi, SleeperUser, SleeperLeague, SleeperRoster, SleeperMatchup, SleeperTransaction, SleeperPlayer, NFLState } from '../services/sleeperApi';

// Hook for NFL state
export const useNFLState = () => {
  return useQuery({
    queryKey: ['nflState'],
    queryFn: sleeperApi.getNFLState,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for league info
export const useLeague = () => {
  return useQuery({
    queryKey: ['league'],
    queryFn: sleeperApi.getLeague,
    staleTime: 30 * 60 * 1000, // 30 minutes (league info doesn't change often)
  });
};

// Hook for league users
export const useLeagueUsers = () => {
  return useQuery({
    queryKey: ['leagueUsers'],
    queryFn: sleeperApi.getLeagueUsers,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook for rosters
export const useRosters = () => {
  return useQuery({
    queryKey: ['rosters'],
    queryFn: sleeperApi.getRosters,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for matchups by week
export const useMatchups = (week: number) => {
  return useQuery({
    queryKey: ['matchups', week],
    queryFn: () => sleeperApi.getMatchups(week),
    enabled: week > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for transactions by week
export const useTransactions = (week: number) => {
  return useQuery({
    queryKey: ['transactions', week],
    queryFn: () => sleeperApi.getTransactions(week),
    enabled: week > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook for all players (this is a large dataset)
export const usePlayers = () => {
  return useQuery({
    queryKey: ['players'],
    queryFn: sleeperApi.getPlayers,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours (player data doesn't change often)
  });
};

// Hook for league drafts
export const useLeagueDrafts = () => {
  return useQuery({
    queryKey: ['leagueDrafts'],
    queryFn: sleeperApi.getLeagueDrafts,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

// Combined hook for standings (combines rosters and users)
export const useStandings = () => {
  const { data: rosters, isLoading: rostersLoading } = useRosters();
  const { data: users, isLoading: usersLoading } = useLeagueUsers();

  const standings = rosters && users ? 
    rosters
      .map(roster => {
        const user = users.find(u => u.user_id === roster.owner_id);
        return {
          ...roster,
          user,
          teamName: user?.display_name || user?.username || 'Unknown Team',
          record: `${roster.settings.wins}-${roster.settings.losses}${roster.settings.ties ? `-${roster.settings.ties}` : ''}`,
          winPercentage: ((roster.settings.wins + roster.settings.ties * 0.5) / 
            (roster.settings.wins + roster.settings.losses + roster.settings.ties)) || 0,
        };
      })
      .sort((a, b) => {
        // Sort by win percentage, then by total points
        if (b.winPercentage !== a.winPercentage) {
          return b.winPercentage - a.winPercentage;
        }
        return b.settings.fpts - a.settings.fpts;
      }) 
    : [];

  return {
    data: standings,
    isLoading: rostersLoading || usersLoading,
    error: null,
  };
};

// Hook for recent transactions across multiple weeks
export const useRecentTransactions = (weeks: number = 3) => {
  const { data: nflState } = useNFLState();
  const currentWeek = nflState?.week || 1;
  
  // Get transactions for the last few weeks
  const transactionQueries = Array.from({ length: weeks }, (_, i) => {
    const week = Math.max(1, currentWeek - i);
    return useTransactions(week);
  });

  const allTransactions = transactionQueries
    .flatMap(query => query.data || [])
    .sort((a, b) => b.created - a.created)
    .slice(0, 10); // Get most recent 10 transactions

  const isLoading = transactionQueries.some(query => query.isLoading);

  return {
    data: allTransactions,
    isLoading,
    error: null,
  };
};

// Hook for power rankings (combines multiple data sources)
export const usePowerRankings = () => {
  const { data: rosters, isLoading: rostersLoading } = useRosters();
  const { data: users, isLoading: usersLoading } = useLeagueUsers();
  const { data: nflState } = useNFLState();

  const powerRankings = rosters && users ? 
    rosters
      .map((roster, index) => {
        const user = users.find(u => u.user_id === roster.owner_id);
        const winPercentage = ((roster.settings.wins + roster.settings.ties * 0.5) / 
          (roster.settings.wins + roster.settings.losses + roster.settings.ties)) || 0;
        
        // Simple power ranking calculation (you can make this more sophisticated)
        const powerScore = (winPercentage * 0.6) + ((roster.settings.fpts / 1500) * 0.4);
        
        return {
          rosterId: roster.roster_id,
          teamName: user?.display_name || user?.username || 'Unknown Team',
          avatar: user?.avatar,
          record: `${roster.settings.wins}-${roster.settings.losses}${roster.settings.ties ? `-${roster.settings.ties}` : ''}`,
          points: roster.settings.fpts,
          pointsAgainst: roster.settings.fpts_against,
          powerScore,
          rank: index + 1, // Will be updated after sorting
        };
      })
      .sort((a, b) => b.powerScore - a.powerScore)
      .map((team, index) => ({ ...team, rank: index + 1 }))
    : [];

  return {
    data: powerRankings,
    isLoading: rostersLoading || usersLoading,
    error: null,
  };
};

// Hook for league champion (from previous season or current standings)
export const useLeagueChampion = () => {
  const { data: league } = useLeague();
  const { data: standings } = useStandings();

  // If season is over, the champion would be first in standings
  // For playoff tracking, you'd need to check playoff brackets
  const champion = standings?.data?.[0] || null;

  return {
    data: champion,
    isLoading: standings?.isLoading || false,
    error: null,
  };
};