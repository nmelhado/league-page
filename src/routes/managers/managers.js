// 3 managers as an example (remove the // before each line to make it live code)
export const managers = [
  {
    "roster": 1,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Matt Lawson",
    "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    "location": "Allentown",
    "bio": "A die hard fantasy player who can never seem to win anything.",
    "photo": "/managers/name.jpg", // done
    "fantasyStart": 2014, // when did the manager start playing fantasy football
    "favoriteTeam": "jax", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    "mode": "Win Now", // 'Win Now' or 'Rebuild'
    "rival": {
      name: "Mooch", // Can be anything (usually your rival's name)
      link: 4, // manager array number within this array, or null to link back to all managers page
      image: "/managers/rival.jpg", // either a specific manager photo or 'everyone' or 'question'
    },
    "favoritePlayer": 7543, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    "valuePosition": "RB", // Favorite position (QB, WR, RB, TE, etc.)
    "rookieOrVets": "Rookies", // 'Rookies' or 'Vets'
    "philosophy": "I will not be the one to eat the Limp Biscuit",
    "tradingScale": 10, // 1 - 10
    "prefferedContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    "roster": 2,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Tristan",
    "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    "location": "Brass Rail",
    "bio": "Tristan does not answer his phone",
    "photo": "/managers/name.jpg", // done
    "fantasyStart": 2013, // when did the manager start playing fantasy football
    "favoriteTeam": "phi", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    "mode": "Win Now", // 'Win Now' or 'Rebuild'
    "rival": {
      name: "Himself", // Can be anything (usually your rival's name)
      link: 2, // manager array number within this array, or null to link back to all managers page
      image: "/managers/rival.jpg", // either a specific manager photo or 'everyone' or 'question'
    },
    "favoritePlayer": 6904, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    "valuePosition": "WR", // Favorite position (QB, WR, RB, TE, etc.)
    "rookieOrVets": "Vets", // 'Rookies' or 'Vets'
    "philosophy": "Hope Alex sends you shitty offers.",
    "tradingScale": 7, // 1 - 10
    "prefferedContact": "Good Luck", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    "roster": 3,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Josh Schaller",
    "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    "location": "Pittsburgh",
    "bio": "Strong willed hard working trader. Josh does not just day trade stocks, but he excells in trading players even more.",
    "photo": "/managers/name.jpg", // done
    "fantasyStart": 2016, // when did the manager start playing fantasy football
    "favoriteTeam": "was", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    "mode": "Win Now", // 'Win Now' or 'Rebuild'
    "rival": {
      name: "Wolfe", // Can be anything (usually your rival's name)
      link: 9, // manager array number within this array, or null to link back to all managers page
      image: "/managers/rival.jpg", // either a specific manager photo or 'everyone' or 'question'
    },
    "favoritePlayer": 5927, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    "valuePosition": "WR", // Favorite position (QB, WR, RB, TE, etc.)
    "rookieOrVets": "Rookies", // 'Rookies' or 'Vets'
    "philosophy": "You can't comeback if you dont go down.",
    "tradingScale": 6, // 1 - 10
    "prefferedContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    "roster": 4,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Mooch",
    "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    "location": "Penn State",
    "bio": "Believes he is the best but has not proved himself.",
    "photo": "/managers/name.jpg", // done
    "fantasyStart": 2016, // when did the manager start playing fantasy football
    "favoriteTeam": "gb", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    "mode": "Win Now", // 'Win Now' or 'Rebuild'
    "rival": {
      name: "Sam", // Can be anything (usually your rival's name)
      link: 6, // manager array number within this array, or null to link back to all managers page
      image: "/managers/rival.jpg", // either a specific manager photo or 'everyone' or 'question'
    },
    "favoritePlayer": 2593, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    "valuePosition": "Flex", // Favorite position (QB, WR, RB, TE, etc.)
    "rookieOrVets": "No Discrimination", // 'Rookies' or 'Vets'
    "philosophy": "Next man up.",
    "tradingScale": 7, // 1 - 10
    "prefferedContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    "roster": 5,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Dylan Rahm",
    "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    "location": "Baltimore",
    "bio": "Jack of all trades, master of none. Rahm can not decide if wants to win now or rebuild. Very good Warzone player though.",
    "photo": "/managers/name.jpg", // done
    "fantasyStart": 2017, // when did the manager start playing fantasy football
    "favoriteTeam": "pit", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    "mode": "Rebuild", // 'Win Now' or 'Rebuild'
    "rival": {
      name: "Wolfe", // Can be anything (usually your rival's name)
      link: 9, // manager array number within this array, or null to link back to all managers page
      image: "/managers/rival.jpg", // either a specific manager photo or 'everyone' or 'question'
    },
    "favoritePlayer": 3807, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    "valuePosition": "QB", // Favorite position (QB, WR, RB, TE, etc.)
    "rookieOrVets": "Rookies", // 'Rookies' or 'Vets'
    "philosophy": "Big Ben is innocent.",
    "tradingScale": 7, // 1 - 10
    "prefferedContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    "roster": 6,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Sam Schmitt",
    "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    "location": "Wilkes-Barre",
    "bio": "Sam is the reigning champion. It was a fluke.",
    "photo": "/managers/name.jpg", // done
    "fantasyStart": 2016, // when did the manager start playing fantasy football
    "favoriteTeam": "phi", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    "mode": "Win Now", // 'Win Now' or 'Rebuild'
    "rival": {
      name: "Matt", // Can be anything (usually your rival's name)
      link: 1, // manager array number within this array, or null to link back to all managers page
      image: "/managers/rival.jpg", // either a specific manager photo or 'everyone' or 'question'
    },
    "favoritePlayer": 5927, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    "valuePosition": "WR", // Favorite position (QB, WR, RB, TE, etc.)
    "rookieOrVets": "Rookies", // 'Rookies' or 'Vets'
    "philosophy": "GET SOME. (Go Every Time So Others May Everytime)",
    "tradingScale": 10, // 1 - 10
    "prefferedContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    "roster": 7,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Dillon",
    "tookOver": 2021, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    "location": "Pittsburgh",
    "bio": "Some would call him a taco but he has had more fantasy success then anyone else. Is he just faking it?",
    "photo": "/managers/name.jpg", // done
    "fantasyStart": 2019, // when did the manager start playing fantasy football
    "favoriteTeam": "dal", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    "mode": "Win Now", // 'Win Now' or 'Rebuild'
    "rival": {
      name: "Dith", // Can be anything (usually your rival's name)
      link: 8, // manager array number within this array, or null to link back to all managers page
      image: "/managers/rival.jpg", // either a specific manager photo or 'everyone' or 'question'
    },
    "favoritePlayer": 4314, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    "valuePosition": "WR", // Favorite position (QB, WR, RB, TE, etc.)
    "rookieOrVets": "Rookies", // 'Rookies' or 'Vets'
    "philosophy": "I have no clue what is hapening.",
    "tradingScale": 4, // 1 - 10
    "prefferedContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    "roster": 8,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Meredith Hartman",
    "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    "location": "West Chester",
    "bio": "The poster child for gender equality in our league, meredith looks to crush everyones hopes and dreams and be the Kamala Harris of fantasy football.",
    "photo": "/managers/name.jpg", // done
    "fantasyStart": 2020, // when did the manager start playing fantasy football
    "favoriteTeam": "lar", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    "mode": "Win Now", // 'Win Now' or 'Rebuild'
    "rival": {
      name: "Everyone", // Can be anything (usually your rival's name)
      link: null, // manager array number within this array, or null to link back to all managers page
      image: "/managers/rival.jpg", // either a specific manager photo or 'everyone' or 'question'
    },
    "favoritePlayer": 2227, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    "valuePosition": "QB", // Favorite position (QB, WR, RB, TE, etc.)
    "rookieOrVets": "Rookies", // 'Rookies' or 'Vets'
    "philosophy": "Trust your gut.",
    "tradingScale": 1, // 1 - 10
    "prefferedContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    "roster": 9,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Jacob Wolfe",
    "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    "location": "A-Town",
    "bio": "Jacob is the kindest soul in our league.Nicest dude you'll ever meet until the trash talk comes out.",
    "photo": "/managers/name.jpg", // done
    "fantasyStart": 2017, // when did the manager start playing fantasy football
    "favoriteTeam": "dal", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    "mode": "Rebuild", // 'Win Now' or 'Rebuild'
    "rival": {
      name: "Josh", // Can be anything (usually your rival's name)
      link: 2, // manager array number within this array, or null to link back to all managers page
      image: "/managers/rival.jpg", // either a specific manager photo or 'everyone' or 'question'
    },
    "favoritePlayer": 6809, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    "valuePosition": "TE", // Favorite position (QB, WR, RB, TE, etc.)
    "rookieOrVets": "Vets", // 'Rookies' or 'Vets'
    "philosophy": "Kick ass and have fun.",
    "tradingScale": 5, // 1 - 10
    "prefferedContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    "roster": 10,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Andrew Lee",
    "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    "location": "Wilkes-Barre",
    "bio": "Lee shows up when it is game time.",
    "photo": "/managers/name.jpg", // done
    "fantasyStart": 2018 // when did the manager start playing fantasy football
    "favoriteTeam": "phi// favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    "mode": "Win Now", // 'Win Now' or 'Rebuild'
    "rival": {
      name: "Rahm", // Can be anything (usually your rival's name)
      link: 5, // manager array number within this array, or null to link back to all managers page
      image: "/managers/rival.jpg", // either a specific manager photo or 'everyone' or 'question'
    },
    "favoritePlayer": 3198, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    "valuePosition": "WR", // Favorite position (QB, WR, RB, TE, etc.)
    "rookieOrVets": "Rookies", // 'Rookies' or 'Vets'
    "philosophy": "Go hard"
    "tradingScale": 5// 1 - 10
    "prefferedContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
  },
]
