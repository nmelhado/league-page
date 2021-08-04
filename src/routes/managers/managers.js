// 3 managers as an example (remove the // before each line to make it live code)
export const managers = [
  {
     "roster": 1,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
     "name": "Fraser",
     "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
     "location": "Fort Collins",
     "bio": "I run the best league ever, but I can't win my own league.",
     "photo": "/managers/Fraser.jpg", // done
     "fantasyStart": 2014, // when did the manager start playing fantasy football
     "favoriteTeam": "den", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     "mode": "Win Now", // 'Win Now' or 'Rebuild'
     "rival": {
       name: "Elliot", // Can be anything (usually your rival's name)
       link: 11, // manager array number within this array, or null to link back to all managers page
       image: "/managers/Elliot.jpg", // either a specific manager photo or 'everyone' or 'question'
     },
     "favoritePlayer": 5927, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
     "valuePosition": "RB", // Favorite position (QB, WR, RB, TE, etc.)
     "rookieOrVets": "Rookies", // 'Rookies' or 'Vets'
     "philosophy": "I like to drop Michael Thomas in his rookie year so Matt can grab him.",
     "tradingScale": 10, // 1 - 10
     "preferredContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
   },
   {
     "roster": 2,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
     "name": "Sam",
     "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
     "location": "Denver",
     "bio": "",
     "photo": "/managers/Sam.jpg", // done
     "fantasyStart": 2015, // when did the manager start playing fantasy football
     "favoriteTeam": "den", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     "mode": "Win Now", // 'Win Now' or 'Rebuild'
     "rival": {
       name: "Brandon", // Can be anything (usually your rival's name)
       link: 6, // manager array number within this array, or null to link back to all managers page
       image: "/managers/Brandon.jpg", // either a specific manager photo or 'everyone' or 'question'
     },
     "favoritePlayer": 2320, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
     "valuePosition": "RB", // Favorite position (QB, WR, RB, TE, etc.)
     "rookieOrVets": "Vets", // 'Rookies' or 'Vets'
     "philosophy": "Who needs depth?",
     "tradingScale": 8, // 1 - 10
     "preferredContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
   },
   {
     "roster": 3,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
     "name": "Ryan",
     "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
     "location": "A Whale's Vagina",
     "bio": "Guys, I work for Apple.",
     "photo": "/managers/Ryan.jpg", // done
     "fantasyStart": 2010, // when did the manager start playing fantasy football
     "favoriteTeam": "den", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     "mode": "Win Now", // 'Win Now' or 'Rebuild'
     "rival": {
       name: "Matt", // Can be anything (usually your rival's name)
       link: 4, // manager array number within this array, or null to link back to all managers page
       image: "/managers/Matt.jpg", // either a specific manager photo or 'everyone' or 'question'
     },
     "favoritePlayer": 1244, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
     "valuePosition": "TE", // Favorite position (QB, WR, RB, TE, etc.)
     "rookieOrVets": "Rookies", // 'Rookies' or 'Vets'
     "philosophy": "Trade raping Foster.",
     "tradingScale": 10, // 1 - 10
     "preferredContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
   },
   {
     "roster": 4,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
     "name": "Matt",
     "tookOver": 2017, // (optional) used if a manager took over a team, delete this line or change to null otherwise
     "location": "Fort Collins",
     "bio": "I am known for ultra confident but extremely wrong takes.",
     "photo": "/managers/Matt.jpg", // done
     "fantasyStart": 2016, // when did the manager start playing fantasy football
     "favoriteTeam": "den", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     "mode": "Win Now", // 'Win Now' or 'Rebuild'
     "rival": {
       name: "Kyle", // Can be anything (usually your rival's name)
       link: 8, // manager array number within this array, or null to link back to all managers page
       image: "/managers/Kyle.jpg", // either a specific manager photo or 'everyone' or 'question'
     },
     "favoritePlayer": 1123, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
     "valuePosition": "WR", // Favorite position (QB, WR, RB, TE, etc.)
     "rookieOrVets": "Rookies", // 'Rookies' or 'Vets'
     "philosophy": "Conservative choices that lead to stagnation.",
     "tradingScale": 7, // 1 - 10
     "preferredContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
   },
   {
     "roster": 5,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
     "name": "Brandon",
     "tookOver": 2018, // (optional) used if a manager took over a team, delete this line or change to null otherwise
     "location": "Colorado?",
     "bio": "I prefer to not talk in league chat much.  My impact is felt through...um...",
     "photo": "/managers/Matt.jpg", // done
     "fantasyStart": 2015, // when did the manager start playing fantasy football
     "favoriteTeam": "den", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     "mode": "Rebuild", // 'Win Now' or 'Rebuild'
     "rival": {
       name: "Everyone", // Can be anything (usually your rival's name)
       link: null, // manager array number within this array, or null to link back to all managers page
       image: "everyone", // either a specific manager photo or 'everyone' or 'question'
     },
     "favoritePlayer": 4319, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
     "valuePosition": "RB", // Favorite position (QB, WR, RB, TE, etc.)
     "rookieOrVets": "Rookies", // 'Rookies' or 'Vets'
     "philosophy": "Picking players that get injured.",
     "tradingScale": 2, // 1 - 10
     "preferredContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
   },
   {
     "roster": 6,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
     "name": "Trey",
     "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
     "location": "Florida",
     "bio": "FLORIDA MAN INJECTS SELF WITH SPRAY FOAM, DOES NOT HELP WITH FFL RESULTS",
     "photo": "/managers/Trey.jpg", // done
     "fantasyStart": 2012, // when did the manager start playing fantasy football
     "favoriteTeam": "den", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     "mode": "Rebuild", // 'Win Now' or 'Rebuild'
     "rival": {
       name: "Everyone", // Can be anything (usually your rival's name)
       link: null, // manager array number within this array, or null to link back to all managers page
       image: "everyone", // either a specific manager photo or 'everyone' or 'question'
     },
     "favoritePlayer": 3970, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
     "valuePosition": "QB", // Favorite position (QB, WR, RB, TE, etc.)
     "rookieOrVets": "Vets", // 'Rookies' or 'Vets'
     "philosophy": "Last minute prep is the only way to fly.",
     "tradingScale": 7, // 1 - 10
     "preferredContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
   },
   {
     "roster": 7,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
     "name": "Erik",
     "tookOver": 2021, // (optional) used if a manager took over a team, delete this line or change to null otherwise
     "location": "Earth",
     "bio": "???",
     "photo": "/managers/Erik.jpg", // done
     "fantasyStart": 2012, // when did the manager start playing fantasy football
     "favoriteTeam": "den", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     "mode": "Rebuild", // 'Win Now' or 'Rebuild'
     "rival": {
       name: "Everyone", // Can be anything (usually your rival's name)
       link: null, // manager array number within this array, or null to link back to all managers page
       image: "everyone", // either a specific manager photo or 'everyone' or 'question'
     },
     "favoritePlayer": 3970, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
     "valuePosition": "QB", // Favorite position (QB, WR, RB, TE, etc.)
     "rookieOrVets": "Vets", // 'Rookies' or 'Vets'
     "philosophy": "???",
     "tradingScale": 5, // 1 - 10
     "preferredContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
   },
   {
     "roster": 8,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
     "name": "Erik",
     "tookOver": 2021, // (optional) used if a manager took over a team, delete this line or change to null otherwise
     "location": "Earth",
     "bio": "???",
     "photo": "/managers/Erik.jpg", // done
     "fantasyStart": 2012, // when did the manager start playing fantasy football
     "favoriteTeam": "den", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     "mode": "Rebuild", // 'Win Now' or 'Rebuild'
     "rival": {
       name: "Everyone", // Can be anything (usually your rival's name)
       link: null, // manager array number within this array, or null to link back to all managers page
       image: "everyone", // either a specific manager photo or 'everyone' or 'question'
     },
     "favoritePlayer": 3970, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
     "valuePosition": "QB", // Favorite position (QB, WR, RB, TE, etc.)
     "rookieOrVets": "Vets", // 'Rookies' or 'Vets'
     "philosophy": "???",
     "tradingScale": 5, // 1 - 10
     "preferredContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
   },
   {
     "roster": 8,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
     "name": "Kyle",
     "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
     "location": "Canada or something I dunno",
     "bio": "I pay experts to run my teams.  Don't tell anyone.",
     "photo": "/managers/Kyle.jpg", // done
     "fantasyStart": 1932, // when did the manager start playing fantasy football
     "favoriteTeam": "nyj", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     "mode": "Win Now", // 'Win Now' or 'Rebuild'
     "rival": {
       name: "Matt", // Can be anything (usually your rival's name)
       link: 4, // manager array number within this array, or null to link back to all managers page
       image: "/managers/Matt.jpg", // either a specific manager photo or 'everyone' or 'question'
     },
     "favoritePlayer": 559, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
     "valuePosition": "QB", // Favorite position (QB, WR, RB, TE, etc.)
     "rookieOrVets": "Vets", // 'Rookies' or 'Vets'
     "philosophy": "Dumb luck.",
     "tradingScale": 4, // 1 - 10
     "preferredContact": "Carrier Pigeon", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
   },
   {
     "roster": 9,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
     "name": "Ward",
     "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
     "location": "Canuckistan",
     "bio": "I have giant hands.",
     "photo": "/managers/Ward.jpg", // done
     "fantasyStart": 1215, // when did the manager start playing fantasy football
     "favoriteTeam": "den", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     "mode": "Win Now", // 'Win Now' or 'Rebuild'
     "rival": {
       name: "Ward", // Can be anything (usually your rival's name)
       link: 9, // manager array number within this array, or null to link back to all managers page
       image: "/managers/Ward.jpg", // either a specific manager photo or 'everyone' or 'question'
     },
     "favoritePlayer": 6813, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
     "valuePosition": "RB", // Favorite position (QB, WR, RB, TE, etc.)
     "rookieOrVets": "Rookies", // 'Rookies' or 'Vets'
     "philosophy": "Experts?  More like fucking groupthink.",
     "tradingScale": 8, // 1 - 10
     "preferredContact": "Carrier Pigeon", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
   },
   {
     "roster": 10,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
     "name": "Connor",
     "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
     "location": "Fort Collins",
     "bio": "I freeze my pants instead of wash them.",
     "photo": "/managers/Connor.jpg", // done
     "fantasyStart": 1215, // when did the manager start playing fantasy football
     "favoriteTeam": "den", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     "mode": "Win Now", // 'Win Now' or 'Rebuild'
     "rival": {
       name: "Ward", // Can be anything (usually your rival's name)
       link: 9, // manager array number within this array, or null to link back to all managers page
       image: "/managers/Ward.jpg", // either a specific manager photo or 'everyone' or 'question'
     },
     "favoritePlayer": 867, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
     "valuePosition": "RB", // Favorite position (QB, WR, RB, TE, etc.)
     "rookieOrVets": "Vets", // 'Rookies' or 'Vets'
     "philosophy": "Experts?  More like fucking groupthink.",
     "tradingScale": 10, // 1 - 10
     "preferredContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
   },
   {
     "roster": 11,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
     "name": "Elliot",
     "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
     "location": "Colorado?",
     "bio": "I am tired of being confused with Mark Zuckerberg.",
     "photo": "/managers/Elliot.jpg", // done
     "fantasyStart": 2010, // when did the manager start playing fantasy football
     "favoriteTeam": "den", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     "mode": "Win Now", // 'Win Now' or 'Rebuild'
     "rival": {
       name: "Fraser", // Can be anything (usually your rival's name)
       link: 1, // manager array number within this array, or null to link back to all managers page
       image: "/managers/Fraser.jpg", // either a specific manager photo or 'everyone' or 'question'
     },
     "favoritePlayer": 1749, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
     "valuePosition": "WR", // Favorite position (QB, WR, RB, TE, etc.)
     "rookieOrVets": "Vets", // 'Rookies' or 'Vets'
     "philosophy": "I like to turn down trades.",
     "tradingScale": 1, // 1 - 10
     "preferredContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
   },
   {
     "roster": 12,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
     "name": "Foster",
     "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
     "location": "Colorado?",
     "bio": "Fortnite is LYFE.",
     "photo": "/managers/Foster.jpg", // done
     "fantasyStart": 2010, // when did the manager start playing fantasy football
     "favoriteTeam": "den", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
     "mode": "Win Now", // 'Win Now' or 'Rebuild'
     "rival": {
       name: "Fraser", // Can be anything (usually your rival's name)
       link: 1, // manager array number within this array, or null to link back to all managers page
       image: "/managers/Fraser.jpg", // either a specific manager photo or 'everyone' or 'question'
     },
     "favoritePlayer": 4084, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
     "valuePosition": "WR", // Favorite position (QB, WR, RB, TE, etc.)
     "rookieOrVets": "Vets", // 'Rookies' or 'Vets'
     "philosophy": "I know it says Win Now earlier but I meant Win Never.",
     "tradingScale": 3, // 1 - 10
     "preferredContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
   },
]
