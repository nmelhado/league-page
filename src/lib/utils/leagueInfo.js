/*   STEP 1   */
export const leagueID = "650004854466531329"; // your league ID
export const leagueName = "DOLO"; // your league name
export const dues = 0; // (optional) used in template constitution page
export const dynasty = true; // true for dynasty leagues, false for redraft and keeper
export const enableBlog = false; // requires VITE_CONTENTFUL_ACCESS_TOKEN and VITE_CONTENTFUL_SPACE environment variables

/*   STEP 2   */
export const homepageText = `
  <center>
    <img src="https://s3-media0.fl.yelpcdn.com/bphoto/G5xZL68r5bMquxU0goMxVA/o.jpg" alt="SHOTS" height="500">
  </center>
`;

/*   STEP 3   */
/*
3 managers as an example. Uncomment (remove the //) before each line to make it live code
If you're having trouble, reference the Training Wheels' Manager Section
https://github.com/nmelhado/league-page/blob/master/TRAINING_WHEELS.md#ii-adding-managers-and-changing-the-homepage-text
*/

function bryan() {
  return {
    "roster": 1,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Bryan",
    // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    // "location": "Brooklyn", // (optional)
    // "bio": "Lorem ipsum...",
    // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
    "photo": "/managers/dab.jpg", // square ratio recommended (no larger than 500x500)
    // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
    // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    // "rival": {
    //   name: "Rival", // Can be anything (usually your rival's name)
    //   link: 6, // manager array number within this array, or null to link back to all managers page
    //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    // },
    // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    // "philosophy": "Your fantasy team's philosophy", // (optional)
    // "tradingScale": 10, // 1 - 10 (optional)
    // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  }
}

function darious() {
  return {
    "roster": 2,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Darious",
    // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    // "location": "Brooklyn", // (optional)
    // "bio": "Lorem ipsum...",
    // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
    "photo": "/managers/dab.jpg", // square ratio recommended (no larger than 500x500)
    // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
    // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    // "rival": {
    //   name: "Rival", // Can be anything (usually your rival's name)
    //   link: 6, // manager array number within this array, or null to link back to all managers page
    //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    // },
    // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    // "philosophy": "Your fantasy team's philosophy", // (optional)
    // "tradingScale": 10, // 1 - 10 (optional)
    // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  }
}

function parthiv() {
  return {
    "roster": 3,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Parthiv",
    // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    "location": "Austin", // (optional)
    "bio": "SHOTS",
    "photo": "/managers/dab.jpg", // square ratio recommended (no larger than 500x500)
    "fantasyStart": 2020, // (optional) when did the manager start playing fantasy football
    // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    "rival": {
      name: "Mikey", // Can be anything (usually your rival's name)
      link: 5, // manager array number within this array, or null to link back to all managers page
      // image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    },
    // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    "philosophy": `<a href="https://www.howmanydayssincemichiganhasbeatenohiostate.com">https://www.howmanydayssincemichiganhasbeatenohiostate.com/</a>`, // (optional)
    // "tradingScale": 10, // 1 - 10 (optional)
    "preferredContact": "Carrier Pigeon",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  }
}

function jaime() {
  return {
    "roster": 4,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Jaime",
    // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    // "location": "Brooklyn", // (optional)
    // "bio": "Lorem ipsum...",
    // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
    "photo": "/managers/dab.jpg", // square ratio recommended (no larger than 500x500)
    // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
    // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    // "rival": {
    //   name: "Rival", // Can be anything (usually your rival's name)
    //   link: 6, // manager array number within this array, or null to link back to all managers page
    //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    // },
    // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    // "philosophy": "Your fantasy team's philosophy", // (optional)
    // "tradingScale": 10, // 1 - 10 (optional)
    // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  }
}

function mikey() {
  return {
    "roster": 5,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Mikey",
    // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    // "location": "Brooklyn", // (optional)
    // "bio": "Lorem ipsum...",
    // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
    "photo": "/managers/dab.jpg", // square ratio recommended (no larger than 500x500)
    // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
    // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    // "rival": {
    //   name: "Rival", // Can be anything (usually your rival's name)
    //   link: 6, // manager array number within this array, or null to link back to all managers page
    //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    // },
    // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    // "philosophy": "Your fantasy team's philosophy", // (optional)
    // "tradingScale": 10, // 1 - 10 (optional)
    // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  }
}

function damon() {
  return {
    "roster": 6,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Damon",
    // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    // "location": "Brooklyn", // (optional)
    // "bio": "Lorem ipsum...",
    // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
    "photo": "/managers/dab.jpg", // square ratio recommended (no larger than 500x500)
    // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
    // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    // "rival": {
    //   name: "Rival", // Can be anything (usually your rival's name)
    //   link: 6, // manager array number within this array, or null to link back to all managers page
    //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    // },
    // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    // "philosophy": "Your fantasy team's philosophy", // (optional)
    // "tradingScale": 10, // 1 - 10 (optional)
    // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  }
}

function devin() {
  return {
    "roster": 7,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Devin",
    // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    // "location": "Brooklyn", // (optional)
    // "bio": "Lorem ipsum...",
    // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
    "photo": "/managers/dab.jpg", // square ratio recommended (no larger than 500x500)
    // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
    // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    // "rival": {
    //   name: "Rival", // Can be anything (usually your rival's name)
    //   link: 6, // manager array number within this array, or null to link back to all managers page
    //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    // },
    // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    // "philosophy": "Your fantasy team's philosophy", // (optional)
    // "tradingScale": 10, // 1 - 10 (optional)
    // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  }
}

function sayan() {
  return {
    "roster": 8,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Sayan",
    // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    // "location": "Brooklyn", // (optional)
    // "bio": "Lorem ipsum...",
    // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
    "photo": "/managers/dab.jpg", // square ratio recommended (no larger than 500x500)
    // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
    // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    // "rival": {
    //   name: "Rival", // Can be anything (usually your rival's name)
    //   link: 6, // manager array number within this array, or null to link back to all managers page
    //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    // },
    // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    // "philosophy": "Your fantasy team's philosophy", // (optional)
    // "tradingScale": 10, // 1 - 10 (optional)
    // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  }
}

function gswSzn() {
  return {
    "roster": 9,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "GSW Season Ticket Holder",
    // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    // "location": "Brooklyn", // (optional)
    // "bio": "Lorem ipsum...",
    // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
    "photo": "/managers/dab.jpg", // square ratio recommended (no larger than 500x500)
    // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
    // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    // "rival": {
    //   name: "Rival", // Can be anything (usually your rival's name)
    //   link: 6, // manager array number within this array, or null to link back to all managers page
    //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    // },
    // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    // "philosophy": "Your fantasy team's philosophy", // (optional)
    // "tradingScale": 10, // 1 - 10 (optional)
    // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  }
}

function belliboy() {
  return {
    "roster": 10,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Belli Boy",
    // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    // "location": "Brooklyn", // (optional)
    // "bio": "Lorem ipsum...",
    // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
    "photo": "/managers/dab.jpg", // square ratio recommended (no larger than 500x500)
    // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
    // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    // "rival": {
    //   name: "Rival", // Can be anything (usually your rival's name)
    //   link: 6, // manager array number within this array, or null to link back to all managers page
    //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    // },
    // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    // "philosophy": "Your fantasy team's philosophy", // (optional)
    // "tradingScale": 10, // 1 - 10 (optional)
    // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  }
}

function mmfett() {
  return {
    "roster": 11,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "MM",
    // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    // "location": "Brooklyn", // (optional)
    // "bio": "Lorem ipsum...",
    // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
    "photo": "/managers/dab.jpg", // square ratio recommended (no larger than 500x500)
    // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
    // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    // "rival": {
    //   name: "Rival", // Can be anything (usually your rival's name)
    //   link: 6, // manager array number within this array, or null to link back to all managers page
    //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    // },
    // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    // "philosophy": "Your fantasy team's philosophy", // (optional)
    // "tradingScale": 10, // 1 - 10 (optional)
    // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  }
}

function devioustree() {
  return {
    "roster": 12,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    "name": "Devious Tree",
    // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    // "location": "Brooklyn", // (optional)
    // "bio": "Lorem ipsum...",
    // "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
    "photo": "/managers/dab.jpg", // square ratio recommended (no larger than 500x500)
    // "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
    // "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    // "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    // "rival": {
    //   name: "Rival", // Can be anything (usually your rival's name)
    //   link: 6, // manager array number within this array, or null to link back to all managers page
    //   image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    // },
    // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    // "philosophy": "Your fantasy team's philosophy", // (optional)
    // "tradingScale": 10, // 1 - 10 (optional)
    // "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  }
}

// To omit an optional field, set it's value to null

export const managers = [
  bryan(),
  darious(),
  parthiv(),
  jaime(),
  mikey(),
  damon(),
  devin(),
  sayan(),
  gswSzn(),
  belliboy(),
  mmfett(),
  devioustree(),
];
  
  
  /*   !!  !!  IMPORTANT  !!  !! */
  /*
  Below is the most up to-date version of a manager. Please leave this commented out
  and don't delete it. This will be updated if any fields are added, removed or changed
  and will allow updates without causing merge conflicts
  */
  
    // {
    //   "roster": 3,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    //   "name": "Your Name",
    //   "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
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
