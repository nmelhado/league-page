/*   STEP 1   */
export const leagueID = "922637695908737024"; // your league ID
export const leagueName = "Shulaces Out Dan"; // your league name
export const dues = 100; // (optional) used in template constitution page
export const dynasty = true; // true for dynasty leagues, false for redraft and keeper
export const enableBlog = false; // requires VITE_CONTENTFUL_ACCESS_TOKEN and VITE_CONTENTFUL_SPACE environment variables

/*   STEP 2   */
export const homepageText = `
  <p>Welcome to the Shulaces Out Dan Fantasy Football League site.</p>
  <p>Founded: 2023</p>
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
      "managerID": "325892484276170752",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      "name": "House",
      "location": "Coquitlam, CA", // (optional)
      "bio": "25 years in Fantasy Football with a career 57.0% win rate in Yahoo (19 seasons, 59 teams). 16 championships. A member of the Yahoo Platinum club.",
      "photo": "/managers/house.jpg", // square ratio recommended (no larger than 500x500) 
      "fantasyStart": 1998, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "mia", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Dynasty", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival":  {
        name: "Everyone", // Can be anything (usually your rival's name)
        link: , // manager array number within this array, or null to link back to all managers page
        image: "/managers/everyone.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
                },
    // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": "When you're in, you're ALL in!",
       "tradingScale": 8, // 1 - 10
       "preferredContact": "WhatsApp", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
      {
      "managerID": "862180378536976384",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      "name": "MJ",
      "location": "Delta, CA", // (optional)
      "bio": "Gambling degen who loves him a good Titans Tight End. A career 58.0% win rate in Yahoo Fantasy Football, he's currently a member of the Diamond Rating Club going into the 2023 season.",
      "photo": "/managers/mj.jpg", // square ratio recommended (no larger than 500x500) 
        //   "fantasyStart": 2000, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "ten", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Dynasty", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival":  {
         name: "Everyone", // Can be anything (usually your rival's name)
         link: , // manager array number within this array, or null to link back to all managers page
         image: "/managers/everyone.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
                },
    //   "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": "TE", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    //   "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": "Swing for the fences",
       "tradingScale": 5, // 1 - 10
       "preferredContact": "WhatsApp", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
      {
      "managerID": "737238894550130688",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
       "name": "Friesen",
       "location": "Vancouver, CA", // (optional)
       "bio": "Analytic who loves taking advantage during trades. Tends to build a solid core RB committee and runs to the title. A career 57.1% win rate according to Yahoo, he's a current member of the Diamond Club.",
       "photo": "/managers/friesen.jpg", // square ratio recommended (no larger than 500x500) 
       "fantasyStart": 1999, // (optional) when did the manager start playing fantasy football
       "favoriteTeam": "det", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "mode": "Dynasty", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
       "rival":   {
          name: "MJ", // Can be anything (usually your rival's name)
          link: 2, // manager array number within this array, or null to link back to all managers page
          image: "/managers/mj.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    //              },
    //   "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    //   "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": "Buy low, sell high",
       "tradingScale": 5, // 1 - 10
       "preferredContact": "WhatsApp", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
      {
      "managerID": "516138229067358208",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      "name": "Dino",
      "location": "Kelowna, CA", // (optional)
      "bio": "If he could only see through the fantasy predictions like he can see through a human body. A career 47.7% win rate and a Bronze club member, per Yahoo Fantasy.",
      "photo": "/managers/dino.jpg", // square ratio recommended (no larger than 500x500) 
    //   "fantasyStart": 2000, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "ind", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival":   {
          name: "House", // Can be anything (usually your rival's name)
          link: 1, // manager array number within this array, or null to link back to all managers page
          image: "/managers/house.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
                  },
    //   "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": "RB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    //   "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": "Quantity over quality",
       "tradingScale": 3, // 1 - 10
       "preferredContact": "WhatsApp", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },    
        {
      "managerID": "860600061682368512",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      "name": "Bryan",
      "location": "Brussells, BE", // (optional)
      "bio": "Between thrill seeking adventures this guy is found in a gym or behind the Bat Bar pondering his 56.3% win rate in Yahoo and his Yahoo Gold Club membership.",
      "photo": "/managers/bryan.jpg", // square ratio recommended (no larger than 500x500) 
    //   "fantasyStart": 2000, // (optional) when did the manager start playing fantasy football
       "favoriteTeam": "chi", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
       "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
       "rival":   {
         name: "Andrew", // Can be anything (usually your rival's name)
         link: 12, // manager array number within this array, or null to link back to all managers page
         image: "/managers/andrew.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
                  },
    //   "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": "RB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    //   "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": "If you're not a pro, you're not an athlete.",
       "tradingScale": 4, // 1 - 10
       "preferredContact": "WhatsApp", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
        {
      "managerID": "923033990964064256",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      "name": "Mark",
      "location": "Takamatsu, JP", // (optional)
      "bio": "This man will wager on anything sports related. Time zones don't matter - this guy is in. A career 52.5% win rate in Yahoo, he's a solid member of the Platinum club.",
      "photo": "/managers/mark.jpg", // square ratio recommended (no larger than 500x500) 
    //   "fantasyStart": 2000, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "min", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Dynasty", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival":   {
         name: "House", // Can be anything (usually your rival's name)
         link: 1, // manager array number within this array, or null to link back to all managers page
         image: "/managers/house.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
                  },
    //   "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
       "valuePosition": "RB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    //   "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
       "philosophy": "You betcha I'm in.",
       "tradingScale": 5, // 1 - 10
       "preferredContact": "WhatsApp", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
        {
      "managerID": "709158421466791936",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      "name": "Jas",
      "location": "Surrey, CA", // (optional)
      "bio": "Solid rosters year in year out - he's the Toronto Maple Leafs of Fantasy Football. A career 52.9% Win rate in Yahoo, he's a member of the Silver Club.",
      "photo": "/managers/Jas.jpg", // square ratio recommended (no larger than 500x500) 
//   "fantasyStart": 2000, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "sea", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival":   {
         name: "Friesen", // Can be anything (usually your rival's name)
         link: 3, // manager array number within this array, or null to link back to all managers page
         image: "/managers/friesen.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
                  },
    //   "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    //   "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": "Foundations are the key",
      "tradingScale": 6, // 1 - 10
      "preferredContact": "WhatsApp", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
        {
      "managerID": "561303290777518080",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      "name": "Craig B",
      "location": "Abbotsford, CA", // (optional)
      "bio": "<placeholder for more information",
      "photo": "/managers/rival.jpg", // square ratio recommended (no larger than 500x500) 
//      "fantasyStart": 2000, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "hou", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Rebuild", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival":   {
         name: "MJ", // Can be anything (usually your rival's name)
         link: 2, // manager array number within this array, or null to link back to all managers page
         image: "/managers/mj.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
                  },
    //   "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "QB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    //   "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": "I don't like drafting 1st",
      "tradingScale": 5, // 1 - 10
      "preferredContact": "WhatsApp", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
      {
      "managerID": "584245720849092608",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      "name": "Jesse",
      "location": "Delta, CA", // (optional)
      "bio": "<placeholder for more information",
      "photo": "/managers/rival.jpg", // square ratio recommended (no larger than 500x500) 
//      "fantasyStart": 2000, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "lav", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Dynasty", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival":   {
         name: "MJ", // Can be anything (usually your rival's name)
         link: 2, // manager array number within this array, or null to link back to all managers page
         image: "/managers/mj.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
                  },
    //   "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    //   "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": "I like em young!",
      "tradingScale": 8, // 1 - 10
      "preferredContact": "WhatsApp", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
        {
      "managerID": "923071576252178432",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      "name": "Simon",
      "location": "Vegreville, CA", // (optional)
      "bio": "Church mouse who loves fanstasy. The question is - can this mouse scare an elephant?",
      "photo": "/managers/simon.jpg", // square ratio recommended (no larger than 500x500) 
      "fantasyStart": 2017, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "sea", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival":   {
         name: "Friesen", // Can be anything (usually your rival's name)
         link: 3, // manager array number within this array, or null to link back to all managers page
         image: "/managers/friesen.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
                  },
    //   "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "K", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    //   "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": "Pick the best players and hope they play like the best players",
      "tradingScale": 3, // 1 - 10
      "preferredContact": "WhatsApp", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
          {
      "managerID": "737036675762548736",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      "name": "Andrew",
      "location": "Thunder Bay, CA", // (optional)
      "bio": "He's our highest flying manager and definitely the one with the most air miles. A career 54.5% win rate on Yahoo, he's a proud member of the Platinum Club (and the Mile High probably).",
      "photo": "/managers/andrew.jpg", // square ratio recommended (no larger than 500x500) 
      "fantasyStart": 2012, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "min", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival":   {
         name: "Bryan", // Can be anything (usually your rival's name)
         link: 5, // manager array number within this array, or null to link back to all managers page
         image: "/managers/bryan.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    //              },
    //   "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    //   "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": "Air Raid Offense!",
      "tradingScale": 5, // 1 - 10
      "preferredContact": "WhatsApp", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
          {
      "managerID": "923021999067283456",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
      "name": "Craig H",
      "location": "Vancouver, CA", // (optional)
      "bio": "<placeholder for bio>",
      "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "sf", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Rebuild", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival":   {
         name: "MJ", // Can be anything (usually your rival's name)
         link: 2, // manager array number within this array, or null to link back to all managers page
         image: "/managers/mj.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    //              },
    //   "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    //   "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": "Air Raid Offense!",
      "tradingScale": 5, // 1 - 10
      "preferredContact": "WhatsApp", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
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
    
