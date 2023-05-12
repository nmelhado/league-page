/*   STEP 1   */
export const leagueID = "917076977020940288"; // your league ID
export const leagueName = "Soup Hat Dynasty"; // your league name
export const dues = 50; // (optional) used in template constitution page
export const dynasty = true; // true for dynasty leagues, false for redraft and keeper
export const enableBlog = false; // requires VITE_CONTENTFUL_ACCESS_TOKEN and VITE_CONTENTFUL_SPACE environment variables

/*   STEP 2   */
export const homepageText = `
  <p>Soup Hat Dynasty League</p>
`;

/*   STEP 3   */
/*
3 managers as an example. Uncomment (remove the //) before each line to make it live code
If you're having trouble, reference the Training Wheels' Manager Section
https://github.com/nmelhado/league-page/blob/master/TRAINING_WHEELS.md#ii-adding-managers-and-changing-the-homepage-text
*/

// To omit an optional field, set it's value to null

export const managers = [
    {
        "roster": 1,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "managerID": "474795970639425536",
        "name": "der32",
        "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Buffalo", // (optional)
        "bio": "Lorem ipsum...",
        "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2020, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "nyg", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Rebuild", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival":
        {
            name: "Rival", // Can be anything (usually your rival's name)
            link: 6, // manager array number within this array, or null to link back to all managers page
            image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 5870, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Your fantasy team's philosophy",
        "tradingScale": 10, // 1 - 10
        "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
        "roster": 2,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "managerID": "602972278925365248",
        "name": "gpgawrys",
        "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Buffalo", // (optional)
        "bio": "Lorem ipsum...",
        "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2020, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "buf", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival":
        {
            name: "The Don", // Can be anything (usually your rival's name)
            link: 7, // manager array number within this array, or null to link back to all managers page
            image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 4984, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Your fantasy team's philosophy",
        "tradingScale": 10, // 1 - 10
        "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
        "roster": 3,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "managerID": "603289027633819648",
        "name": "Dhennessy36",
        "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Rochester", // (optional)
        "bio": "Lorem ipsum...",
        "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2020, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "buf", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival":
        {
            name: "Rival", // Can be anything (usually your rival's name)
            link: 6, // manager array number within this array, or null to link back to all managers page
            image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 4984, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Your fantasy team's philosophy",
        "tradingScale": 10, // 1 - 10
        "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
        "roster": 4,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "managerID": "606907889956761600",
        "name": "zacwerner69",
        "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Buffalo", // (optional)
        "bio": "Lorem ipsum...",
        "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2020, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "buf", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival":
        {
            name: "Rival", // Can be anything (usually your rival's name)
            link: 6, // manager array number within this array, or null to link back to all managers page
            image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 4984, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Your fantasy team's philosophy",
        "tradingScale": 10, // 1 - 10
        "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
        "roster": 5,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "managerID": "602638975307415552",
        "name": "whez",
        "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Rochester", // (optional)
        "bio": "Lorem ipsum...",
        "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2020, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "buf", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival":
        {
            name: "Rival", // Can be anything (usually your rival's name)
            link: 6, // manager array number within this array, or null to link back to all managers page
            image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 4984, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Your fantasy team's philosophy",
        "tradingScale": 10, // 1 - 10
        "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
        "roster": 6,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "managerID": "603292971504320512",
        "name": "PoolBoyQ",
        "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Buffalo", // (optional)
        "bio": "Lorem ipsum...",
        "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2020, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "buf", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival":
        {
            name: "Rival", // Can be anything (usually your rival's name)
            link: 6, // manager array number within this array, or null to link back to all managers page
            image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 4984, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Your fantasy team's philosophy",
        "tradingScale": 10, // 1 - 10
        "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
        "roster": 7,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "managerID": "602645028082368512",
        "name": "sawyerflandreau",
        "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Long Island", // (optional)
        "bio": "Lorem ipsum...",
        "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2020, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "buf", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Rebuild", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival":
        {
            name: "Don's Daddy", // Can be anything (usually your rival's name)
            link: 2, // manager array number within this array, or null to link back to all managers page
            image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 4984, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Your fantasy team's philosophy",
        "tradingScale": 10, // 1 - 10
        "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
        "roster": 8,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "managerID": "474794296587841536",
        "name": "RookieMove",
        "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Buffalo", // (optional)
        "bio": "Lorem ipsum...",
        "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2020, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "ind", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival":
        {
            name: "Rival", // Can be anything (usually your rival's name)
            link: 6, // manager array number within this array, or null to link back to all managers page
            image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 6813, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Your fantasy team's philosophy",
        "tradingScale": 10, // 1 - 10
        "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
        "roster": 9,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "managerID": "711740597546852352",
        "name": "pmann8",
        "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Buffalo", // (optional)
        "bio": "Lorem ipsum...",
        "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2020, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "ne", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival":
        {
            name: "Rival", // Can be anything (usually your rival's name)
            link: 6, // manager array number within this array, or null to link back to all managers page
            image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 167, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Your fantasy team's philosophy",
        "tradingScale": 10, // 1 - 10
        "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
        "roster": 10,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "managerID": "474318957063434240",
        "name": "zjsteeve",
        "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Philadelphia", // (optional)
        "bio": "Lorem ipsum...",
        "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2020, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "phi", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival":
        {
            name: "Rival", // Can be anything (usually your rival's name)
            link: 6, // manager array number within this array, or null to link back to all managers page
            image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 6904, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Your fantasy team's philosophy",
        "tradingScale": 10, // 1 - 10
        "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
  ]
  
  
  /*   !!  !!  IMPORTANT  !!  !! */
  /*
  Below is the most up to-date version of a manager. Please leave this commented out
  and don't delete it. This will be updated if any fields are added, removed or changed
  and will allow updates without causing merge conflicts
  */
  
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
    
