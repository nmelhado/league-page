/*   STEP 1   */
export const leagueID = "1201635512016699392"; // your league ID
export const leagueName = "National Chivos Fantasy Football League"; // your league name
export const dues = 100; // (optional) used in template constitution page
export const dynasty = true; // true for dynasty leagues, false for redraft and keeper
export const enableBlog = true; // requires VITE_CONTENTFUL_ACCESS_TOKEN and VITE_CONTENTFUL_SPACE environment variables

/*   STEP 2   */
export const homepageText = `
  <p>Welcome to the National Chivos Fantasy Football League! This is your home for all league information, standings, transactions, and more.</p>
  <p>Check out the power rankings, recent transactions, and league standings. Stay up to date with all the action in your fantasy league!</p>
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
    "name": "riffhawk",
    "location": "Brooklyn",
    "bio": "Commissioner",
    "photo": "/managers/riff.jpg",
    "fantasyStart": 2023,
    "favoriteTeam": "cin",
    "mode": "Win Now",
    "rival": {
      name: "TBD",
      link: null,
      image: "/managers/question.jpg",
    },
    "philosophy": "Bed, Bath & Bijan",
    "tradingScale": 10,
    "preferredContact": "WhatsApp",
  },
  {
    "managerID": "990681730120015872",
    "name": "TheHeineKing",
    "location": "The Heights",
    "bio": "Heineken Enthusiast",
    "photo": "/managers/migz.jpg",
    "fantasyStart": 2023,
    "favoriteTeam": "nyj",
    "mode": "Win Now",
    "rival": {
      name: "Angel",
      link: 2,
      image: "/managers/angel.jpg",
    },
    "philosophy": "The HeineKing",
    "tradingScale": 3,
    "preferredContact": "Carrier Pigeon",
  },
  {
    "managerID": "994670697622343680",
    "name": "NYCSTONKMAN",
    "location": "NYC",
    "bio": "Against All Odds",
    "photo": "/managers/angel.jpg",
    "fantasyStart": 2023,
    "favoriteTeam": "ne",
    "mode": "Rebuild",
    "rival": {
      name: "Migz",
      link: 1,
      image: "/managers/migz.jpg",
    },
    "philosophy": "Against All 42.71 Odds",
    "tradingScale": 8,
    "preferredContact": "Phone",
  },
];