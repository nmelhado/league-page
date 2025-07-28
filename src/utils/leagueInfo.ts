/*   STEP 1   */
export const leagueID = "987565605387567104"; // your league ID
export const leagueName = "National Chivos Fantasy League"; // your league name
export const dues = 100; // (optional) used in template constitution page
export const dynasty = true; // true for dynasty leagues, false for redraft and keeper
export const enableBlog = true; // requires VITE_CONTENTFUL_ACCESS_TOKEN and VITE_CONTENTFUL_SPACE environment variables

/*   STEP 2   */
export const homepageText = `
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
`;

export interface Manager {
  managerID: string;
  name: string;
  tookOver?: number | null;
  location?: string;
  bio?: string;
  photo?: string;
  fantasyStart?: number;
  favoriteTeam?: string;
  mode?: string;
  rival?: {
    name: string;
    link: number | null;
    image: string;
  };
  favoritePlayer?: number;
  valuePosition?: string;
  rookieOrVets?: string;
  philosophy?: string;
  tradingScale?: number;
  preferredContact?: string;
}

/*   STEP 3   */
export const managers: Manager[] = [
  {
    "managerID": "825182685528989696",
    "name": "Riff",
    "location": "Brooklyn",
    "bio": "Commish",
    "photo": "/managers/riff.jpg",
    "fantasyStart": 2023,
    "favoriteTeam": "cin",
    "mode": "Win Now",
    "rival": {
      name: "TBD",
      link: null,
      image: "/managers/question.jpg",
    },
    "philosophy": "Your fantasy team's philosophy",
    "tradingScale": 10,
    "preferredContact": "WhatsApp",
  },
  {
    "managerID": "990681730120015872",
    "name": "Migz",
    "location": "The Heights",
    "bio": "Heinenken",
    "photo": "/managers/migz.jpg",
    "fantasyStart": 2023,
    "favoriteTeam": "nyj",
    "mode": "Win Now",
    "rival": {
      name: "Angel",
      link: 2,
      image: "/managers/angel.jpg",
    },
    "philosophy": "Drink Beer, Kick Ass",
    "tradingScale": 3,
    "preferredContact": "Carrier Pigeon",
  },
  {
    "managerID": "994670697622343680",
    "name": "Angel",
    "location": "Seattle",
    "bio": "Navy",
    "photo": "/managers/angel.jpg",
    "fantasyStart": 2023,
    "favoriteTeam": "ne",
    "mode": "Rebuild",
    "rival": {
      name: "Migz",
      link: 1,
      image: "/managers/migz.jpg",
    },
    "philosophy": "Your fantasy team's philosophy",
    "tradingScale": 8,
    "preferredContact": "Phone",
  },
];