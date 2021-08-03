// 3 managers as an example (remove the // before each line to make it live code)
export const managers = [
  {
    "roster": 1,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "James Watts",
    // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    "location": "Little Rock",
    "bio": "Lorem ipsum...",
    "photo": "/managers/question.jpg", // done
    "fantasyStart": 2014, // when did the manager start playing fantasy football
    "favoriteTeam": "mia", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    "mode": "Win Now", // 'Win Now' or 'Rebuild'
    "rival": {
      name: "Rival", // Can be anything (usually your rival's name)
      link: null, // manager array number within this array, or null to link back to all managers page
      image: "/managers/question.jpg", // either a specific manager photo or 'everyone' or 'question'
    },
    "favoritePlayer": 1426, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    "valuePosition": "WR", // Favorite position (QB, WR, RB, TE, etc.)
    "rookieOrVets": "Vets", // 'Rookies' or 'Vets'
    "philosophy": "Your fantasy team's philosophy",
    "tradingScale": 3, // 1 - 10
    "prefferedContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
  },
  // {
  //   "roster": 2,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
  //   "name": "Your Name",
  //   "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
  //   "location": "Brooklyn",
  //   "bio": "Lorem ipsum...",
  //   "photo": "/managers/name.jpg", // done
  //   "fantasyStart": 2014, // when did the manager start playing fantasy football
  //   "favoriteTeam": "nyj", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
  //   "mode": "Win Now", // 'Win Now' or 'Rebuild'
  //   "rival": {
  //     name: "Rival", // Can be anything (usually your rival's name)
  //     link: 6, // manager array number within this array, or null to link back to all managers page
  //     image: "/managers/rival.jpg", // either a specific manager photo or 'everyone' or 'question'
  //   },
  //   "favoritePlayer": 1426, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
  //   "valuePosition": "WR", // Favorite position (QB, WR, RB, TE, etc.)
  //   "rookieOrVets": "Rookies", // 'Rookies' or 'Vets'
  //   "philosophy": "Your fantasy team's philosophy",
  //   "tradingScale": 10, // 1 - 10
  //   "prefferedContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
  // },
  // {
  //   "roster": 3,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
  //   "name": "Your Name",
  //   "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
  //   "location": "Brooklyn",
  //   "bio": "Lorem ipsum...",
  //   "photo": "/managers/name.jpg", // done
  //   "fantasyStart": 2014, // when did the manager start playing fantasy football
  //   "favoriteTeam": "nyj", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
  //   "mode": "Win Now", // 'Win Now' or 'Rebuild'
  //   "rival": {
  //     name: "Rival", // Can be anything (usually your rival's name)
  //     link: 6, // manager array number within this array, or null to link back to all managers page
  //     image: "/managers/rival.jpg", // either a specific manager photo or 'everyone' or 'question'
  //   },
  //   "favoritePlayer": 1426, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
  //   "valuePosition": "WR", // Favorite position (QB, WR, RB, TE, etc.)
  //   "rookieOrVets": "Rookies", // 'Rookies' or 'Vets'
  //   "philosophy": "Your fantasy team's philosophy",
  //   "tradingScale": 10, // 1 - 10
  //   "prefferedContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
  // },
]