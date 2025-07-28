import { leagueID } from './leagueInfo'

export interface Tab {
  icon: string
  label: string
  dest: string
  nest?: boolean
  children?: Tab[]
}

export const tabs: Tab[] = [
  {
    icon: 'home',
    label: 'Home',
    dest: '/',
  },
  {
    icon: 'sports',
    label: 'Matchups',
    dest: '/matchups',
  },
  {
    icon: 'swap_horiz',
    label: 'Trades & Waivers',
    dest: '/transactions',
  },
  {
    icon: 'article',
    label: 'Blog',
    dest: '/blog',
  },
  {
    icon: 'view_comfy',
    label: 'League Info',
    dest: '/league-info',
    nest: true,
    children: [
      {
        icon: 'storage',
        label: 'Rosters',
        dest: '/rosters',
      },
      {
        icon: 'groups',
        label: 'All Managers',
        dest: '/managers',
      },
      {
        icon: 'local_fire_department',
        label: 'Rivalry',
        dest: '/rivalry',
      },
      {
        icon: 'leaderboard',
        label: 'Standings',
        dest: '/standings',
      },
      {
        icon: 'view_comfy',
        label: 'Drafts',
        dest: '/drafts',
      },
      {
        icon: 'emoji_events',
        label: 'Trophy Room',
        dest: '/awards',
      },
      {
        icon: 'military_tech',
        label: 'Records',
        dest: '/records',
      },
      {
        icon: 'history_edu',
        label: 'By Laws',
        dest: '/constitution',
      },
      {
        icon: 'sports_football',
        label: 'Open Sleeper App',
        dest: `https://sleeper.app/leagues/${leagueID}`,
      },
    ]
  },
  {
    icon: 'lightbulb',
    label: 'Resources',
    dest: '/resources',
  },
]