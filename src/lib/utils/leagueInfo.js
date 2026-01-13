/*   STEP 1   */
export const leagueID = "1245800211851255808"; // your league ID
export const leagueName = "Veto City"; // your league name
export const dues = 50; // (optional) used in template constitution page
export const dynasty = false; // true for dynasty leagues, false for redraft and keeper

/*   STEP 2   */
export const homepageText = `
<p>  </p>
`;

/*   STEP 3   */
/*
3 managers as an example. Uncomment (remove the //) before each line to make it live code
If you're having trouble, reference the Training Wheels' Manager Section
https://github.com/nmelhado/league-page/blob/master/TRAINING_WHEELS.md#ii-adding-managers-and-changing-the-homepage-text
*/

// To omit an optional field, set it's value to null

export const managers = [
//     {
//       "roster": 1,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       // "managerID": "96721947358281728",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       "name": "Kamrul",
//       // "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
//       // "location": "Brooklyn", // (optional)
//       // "bio": "Bitch Ass Kam",
//       "photo": "/managers/kam.png", // square ratio recommended (no larger than 500x500)
//       // "fantasyStart": 2005, // (optional) when did the manager start playing fantasy football
//       "favoriteTeam": "nyg", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
//       "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
//       "rival": {
//         name: "Adil", // Can be anything (usually your rival's name)
//         link: 6, // manager array number within this array, or null to link back to all managers page
//         image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
//       },
//       // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
//       // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
//       "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
//       // "philosophy": "Your fantasy team's philosophy",
//       "tradingScale": 5, // 1 - 10
//       "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
//     },
//     {
//       "roster": 2,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       // "managerID": "96721947358281728",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       "name": "Abbas",
//       // "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
//       // "location": "Brooklyn", // (optional)
//       // "bio": "Bitch Ass Kam",
//       // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
//       // "fantasyStart": 2005, // (optional) when did the manager start playing fantasy football
//       "favoriteTeam": "nyg", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
//       "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
//       "rival": {
//         name: "Adil", // Can be anything (usually your rival's name)
//         link: 6, // manager array number within this array, or null to link back to all managers page
//         image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
//       },
//       // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
//       // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
//       "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
//       // "philosophy": "Your fantasy team's philosophy",
//       "tradingScale": 1, // 1 - 10
//       "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
//     },
//     {
//       "roster": 3,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       // "managerID": "96721947358281728",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       "name": "Adil",
//       // "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
//       // "location": "Brooklyn", // (optional)
//       // "bio": "Bitch Ass Kam",
//       "photo": "/managers/Adil.png", // square ratio recommended (no larger than 500x500)
//       // "fantasyStart": 2005, // (optional) when did the manager start playing fantasy football
//       "favoriteTeam": "nyg", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
//       "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
//       "rival": {
//         name: "Anik", // Can be anything (usually your rival's name)
//         link: 6, // manager array number within this array, or null to link back to all managers page
//         image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
//       },
//       // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
//       // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
//       "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
//       // "philosophy": "Your fantasy team's philosophy",
//       "tradingScale": 10, // 1 - 10
//       "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
//     },
//       {
//       "roster": 4,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       // "managerID": "96721947358281728",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       "name": "Sunny",
//       // "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
//       // "location": "Brooklyn", // (optional)
//       // "bio": "Bitch Ass Kam",
//       "photo": "/managers/sunny.png", // square ratio recommended (no larger than 500x500)
//       // "fantasyStart": 2005, // (optional) when did the manager start playing fantasy football
//       "favoriteTeam": "hou", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
//       "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
//       "rival": {
//         name: "Anik", // Can be anything (usually your rival's name)
//         link: 6, // manager array number within this array, or null to link back to all managers page
//         image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
//       },
//       // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
//       // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
//       "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
//       // "philosophy": "Your fantasy team's philosophy",
//       "tradingScale": 10, // 1 - 10
//       "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
//     },
//         {
//       "roster": 5,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       // "managerID": "96721947358281728",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       "name": "Q",
//       // "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
//       // "location": "Brooklyn", // (optional)
//       // "bio": "Bitch Ass Kam",
//       "photo": "/managers/Q.png", // square ratio recommended (no larger than 500x500)
//       // "fantasyStart": 2005, // (optional) when did the manager start playing fantasy football
//       "favoriteTeam": "nyg", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
//       "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
//       "rival": {
//         name: "Everybody", // Can be anything (usually your rival's name)
//         link: 6, // manager array number within this array, or null to link back to all managers page
//         image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
//       },
//       // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
//       // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
//       "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
//       // "philosophy": "Your fantasy team's philosophy",
//       "tradingScale": 2, // 1 - 10
//       "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
//     },
//         {
//       "roster": 6,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       // "managerID": "96721947358281728",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       "name": "Russ",
//       // "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
//       // "location": "Brooklyn", // (optional)
//       // "bio": "Bitch Ass Kam",
//       // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
//       // "fantasyStart": 2005, // (optional) when did the manager start playing fantasy football
//       "favoriteTeam": "sea", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
//       "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
//       "rival": {
//         name: "His Draft", // Can be anything (usually your rival's name)
//         link: 6, // manager array number within this array, or null to link back to all managers page
//         image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
//       },
//       // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
//       // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
//       "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
//       // "philosophy": "Your fantasy team's philosophy",
//       "tradingScale": 10, // 1 - 10
//       "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
//     },
//             {
//       "roster": 7,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       // "managerID": "96721947358281728",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       "name": "Meshu",
//       // "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
//       // "location": "Brooklyn", // (optional)
//       // "bio": "Bitch Ass Kam",
//       "photo": "/managers/Meshu.png", // square ratio recommended (no larger than 500x500)
//       // "fantasyStart": 2005, // (optional) when did the manager start playing fantasy football
//       "favoriteTeam": "nyg", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
//       "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
//       "rival": {
//         name: "Abbas", // Can be anything (usually your rival's name)
//         link: 6, // manager array number within this array, or null to link back to all managers page
//         image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
//       },
//       // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
//       // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
//       "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
//       // "philosophy": "Your fantasy team's philosophy",
//       "tradingScale": 6, // 1 - 10
//       "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
//     },
//        {
//       "roster": 8,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       // "managerID": "96721947358281728",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       "name": "Bak",
//       // "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
//       // "location": "Brooklyn", // (optional)
//       // "bio": "Bitch Ass Kam",
//       // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
//       // "fantasyStart": 2005, // (optional) when did the manager start playing fantasy football
//       "favoriteTeam": "nyg", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
//       "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
//       "rival": {
//         name: "Meshu", // Can be anything (usually your rival's name)
//         link: 6, // manager array number within this array, or null to link back to all managers page
//         image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
//       },
//       // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
//       // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
//       "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
//       // "philosophy": "Your fantasy team's philosophy",
//       "tradingScale": 10, // 1 - 10
//       "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
//     },
//         {
//       "roster": 9,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       // "managerID": "96721947358281728",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       "name": "Bilal",
//       // "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
//       // "location": "Brooklyn", // (optional)
//       // "bio": "Bitch Ass Kam",
//       "photo": "/managers/Bilal.png", // square ratio recommended (no larger than 500x500)
//       // "fantasyStart": 2005, // (optional) when did the manager start playing fantasy football
//       "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
//       "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
//       "rival": {
//         name: "Abbas", // Can be anything (usually your rival's name)
//         link: 6, // manager array number within this array, or null to link back to all managers page
//         image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
//       },
//       // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
//       // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
//       "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
//       // "philosophy": "Your fantasy team's philosophy",
//       "tradingScale": 10, // 1 - 10
//       "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
//     },
//      {
//       "roster": 10,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       // "managerID": "96721947358281728",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       "name": "Mizan",
//       // "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
//       // "location": "Brooklyn", // (optional)
//       // "bio": "Bitch Ass Kam",
//       "photo": "/managers/mizan.png", // square ratio recommended (no larger than 500x500)
//       // "fantasyStart": 2005, // (optional) when did the manager start playing fantasy football
//       "favoriteTeam": "nyg", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
//       "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
//       "rival": {
//         name: "Anik", // Can be anything (usually your rival's name)
//         link: 6, // manager array number within this array, or null to link back to all managers page
//         image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
//       },
//       // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
//       // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
//       "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
//       // "philosophy": "Your fantasy team's philosophy",
//       "tradingScale": 4, // 1 - 10
//       "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
//     },
//         {
//       "roster": 11,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       // "managerID": "96721947358281728",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       "name": "Imrule",
//       // "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
//       // "location": "Brooklyn", // (optional)
//       // "bio": "Bitch Ass Kam",
//       // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
//       // "fantasyStart": 2005, // (optional) when did the manager start playing fantasy football
//       "favoriteTeam": "nyg", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
//       "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
//       "rival": {
//         name: "Nobody", // Can be anything (usually your rival's name)
//         link: 6, // manager array number within this array, or null to link back to all managers page
//         image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
//       },
//       // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
//       // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
//       "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
//       // "philosophy": "Your fantasy team's philosophy",
//       "tradingScale": 2, // 1 - 10
//       "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
//     },
//         {
//       "roster": 12,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       // "managerID": "96721947358281728",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
//       "name": "Anik",
//       // "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
//       // "location": "Brooklyn", // (optional)
//       // "bio": "Bitch Ass Kam",
//       // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
//       // "fantasyStart": 2005, // (optional) when did the manager start playing fantasy football
//       "favoriteTeam": "mia", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
//       "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
//       "rival": {
//         name: "The Chip", // Can be anything (usually your rival's name)
//         link: 6, // manager array number within this array, or null to link back to all managers page
//         image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
//       },
//       // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
//       // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
//       "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
//       // "philosophy": "Your fantasy team's philosophy",
//       "tradingScale": 10, // 1 - 10
//       "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
//     },
  ]
  
  
//   /*   !!  !!  IMPORTANT  !!  !! */
//   /*
//   Below is the most up to-date version of a manager. Please leave this commented out
//   and don't delete it. This will be updated if any fields are added, removed or changed
//   and will allow updates without causing merge conflicts
//   */
  
    // {
    //   "roster": 3,  // (DEPRECATED! Don't use this anymore) ID of the roster that the manager manages (look at the order of the power rankings graph)
    //   "managerID": "12345678",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
    //   "name": "Your Name",
    //   "tookOver": 2020, // (DEPRECATED! You don't need to use this anymore) (optional) used if a manager took over a team, delete this line or change to null otherwise
    //   "location": "Brooklyn", // (optional)
    //   "bio": "Lorem ipsum...",
    //   "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
    //   "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
    //   "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    //   "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    //   "rival": {
    //     name: "Rival", // Can be anything (usually your rival's name)
    //     link: 6, // manager array number within this array, or null to link back to all managers page
    //     image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    //   },
    //   "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    //   "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    //   "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    //   "philosophy": "Your fantasy team's philosophy", // (optional)
    //   "tradingScale": 10, // 1 - 10 (optional)
    //   "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    // },
    
