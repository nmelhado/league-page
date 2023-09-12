/*   STEP 1   */
export const leagueID = "992181047900819456"; // your league ID
export const leagueName = "Fantasies 🤪😋"; // your league name
export const dues = 50; // (optional) used in template constitution page
export const dynasty = false; // true for dynasty leagues, false for redraft and keeper
export const enableBlog = false; // requires VITE_CONTENTFUL_ACCESS_TOKEN and VITE_CONTENTFUL_SPACE environment variables

/*   STEP 2   */
export const homepageText = `
  <p> Welcome to our fantasy league website, where intelligence is elusive, where diversity is nearly non-existent,
  and where some of us still haven't realized Demarco Murray is no longer in the league.</P>

  <p>This site has detailed power rankings, standings, waiver/trade transactions, past records, and a head-to-head past matchup analyzer</p>
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
      // "roster": 1,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "733787214386958336",
      "name": "Mr. Commissioner",
      "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "ATL/PDX/HOES", // (optional)
      "bio": "Commissioner by day, Four Roses Bourbon spokesperson by night. Treat this man wih integrity, and he will [mostly] reciprocate. Approach with caution when the drinks start flowing",
      "photo": "/managers/austin2.jpg", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2019, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "atl", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": {
        name: "Austin", // Can be anything (usually your rival's name)
        link: 0, // manager array number within this array, or null to link back to all managers page
        image: "/managers/austin.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      },
      "favoritePlayer": 96, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": "Where the hoes at?",
      // "tradingScale": 10, // 1 - 10
      // "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      // "roster": 2,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "867629698715406336",
      "name": "Blake",
      "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "The Clouds", // (optional)
      "bio": "In the world of numbers, he's a maestro. In the world of fantasy football, he's the king of mediocrity, and he wouldn't have it any other way. When the smoke clears, you'll find him laughing his way to the sacko",
      "photo": "/managers/blake.png", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2019, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "atl", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": {
        name: "Poorly Rolled Joint", // Can be anything (usually your rival's name)
        link: null, // manager array number within this array, or null to link back to all managers page
        image: "/managers/joint.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      },
      "favoritePlayer": 6904, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": "Blehhh",
      // "tradingScale": 10, // 1 - 10
      // "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      // "roster": 3,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "869714383398473728",
      "name": "Nikhil",
      "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "Atlanta, GA", // (optional)
      "bio": "Our resident data bitch, wielding spreadsheets like a sorcerer, but using them for decisions that would make a Magic 8-Ball blush",
      "photo": "/managers/nikhil.png", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2019, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "atl", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": {
        name: "Mousa", // Can be anything (usually your rival's name)
        link: null, // manager array number within this array, or null to link back to all managers page
        image: "/managers/mousa.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      },
      "favoritePlayer": 4981, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": "I don't believe in that kind of thing",
      // "tradingScale": 10, // 1 - 10
      // "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
  {
      // "roster": 4,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "867632113271320576",
      "name": "Connor",
      "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "Ron Desanctimonious' State", // (optional)
      "bio": "Conner (Connor?) rides his one championship like a Bentley when it's really a Hyundai. That asterisk may never fade, but neither will his smug grin",
      "photo": "/managers/connor2.png", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2019, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "atl", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": {
        name: "Austin", // Can be anything (usually your rival's name)
        link: 0, // manager array number within this array, or null to link back to all managers page
        image: "/managers/austin2.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      },
      "favoritePlayer": 4984, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": "I follow my players on OnlyFans",
      // "tradingScale": 10, // 1 - 10
      // "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      // "roster": 5,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "869734008970534912",
      "name": "Moose",
      "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "Wherever He Has Family", // (optional)
      "bio": "Hailing from the heart of rural Alabama with the cleanest fade this side of the Mason-Dixon, Moose is our doctor friend. We implore Moose to get in contact with his various fatherless children -- they deserve to know their daddy's our reigning champion",
      "photo": "/managers/mousa.jpg", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2019, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "no", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": {
        name: "Nikhil", // Can be anything (usually your rival's name)
        link: 2, // manager array number within this array, or null to link back to all managers page
        image: "/managers/nikhil.png", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 3199, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Draft Michael Thomas as early as I can",
        // "tradingScale": 10, // 1 - 10
        // "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      // "roster": 6,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "871869773343039488",
      "name": "Brian",
      "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "Atlanta, GA", // (optional)
      "bio": "Although he'd like to say he's cooking on and off the [fantasy] field, Brian should stick to the kitchen and let his hopes for fantasy expire like his hopes that the Steelers will ever be relevant again",
      "photo": "/managers/brian.jpg", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2019, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "pit", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": {
        name: "John", // Can be anything (usually your rival's name)
        link: 7, // manager array number within this array, or null to link back to all managers page
        image: "/managers/john.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 138, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Support the Steelers, but stay away from them",
        // "tradingScale": 10, // 1 - 10
        // "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      // "roster": 7,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "869986599868534784",
      "name": "Tyler",
      "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "Atlanta, GA", // (optional)
      "bio": "Prior to 2019, Tyler couldn't tell you what a touchdown was or how to unclasp a bra. Since then, he's undergone a major transformation, placing him in the top 12 of our league every year.",
      "photo": "/managers/tyler.jpg", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2019, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "atl", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": {
        name: "Connor", // Can be anything (usually your rival's name)
        link: 3, // manager array number within this array, or null to link back to all managers page
        image: "/managers/connor2.png", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 6789, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Only draft players who watch anime",
        // "tradingScale": 10, // 1 - 10
        // "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
     {
      // "roster": 8,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID": "870467687942356992",
      "name": "John",
      "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "Who Knows", // (optional)
      "bio": "John currently holds the title for most sackos. We've asked him to do his sacko punishments, but he said he needs to ask Maddie first",
      "photo": "/managers/john.jpg", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2019, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "atl", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": {
        name: "The Chip", // Can be anything (usually your rival's name)
        link: null, // manager array number within this array, or null to link back to all managers page
        image: "/managers/chip.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 4273, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Almost missed the draft cause I couldn't figure out how to get there",
        // "tradingScale": 10, // 1 - 10
        // "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      // "roster": 9,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "871850810273869824",
      "name": "Braxton",
      "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "Atlanta, GA", // (optional)
      "bio": "Most leagues don't operate with a handicap, but we, unfortunately, do.",
      "photo": "/managers/braxton.jpg", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2019, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "ari", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": {
        name: "Himself", // Can be anything (usually your rival's name)
        link: 8, // manager array number within this array, or null to link back to all managers page
        image: "/managers/braxton.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 5849, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "BAUW Kyler Murrary in the first",
        // "tradingScale": 10, // 1 - 10
        // "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      // "roster": 10,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "867629698715406336",
      "name": "Dicky",
      "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "His Parents' Basement", // (optional)
      "bio": "Getting angry texts from Manthena for calling him Dicky in 3..2..1..In all reality, Manthena is the nicest guy you'll ever meet. He must be compensating for something",
      "photo": "/managers/manthena.png", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2019, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "la", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": {
        name: "Nikhil", // Can be anything (usually your rival's name)
        link: 2, // manager array number within this array, or null to link back to all managers page
        image: "/managers/nikhil.png", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 167, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Wait, what team is Lebron on?",
        // "tradingScale": 10, // 1 - 10
        // "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
     {
      // "roster": 11,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
       "managerID": "1004148649644904448",
      "name": "Austin H",
      "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "Also His Parents' Basement", // (optional)
      "bio": "[No bio, just like the man's go no neck]",
      "photo": "/managers/austinh.jpg", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2023, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "atl", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": {
        name: "This giraffe", // Can be anything (usually your rival's name)
        link: 2, // manager array number within this array, or null to link back to all managers page
        image: "/managers/giraffe.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        // "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "I watch ESPN every single day",
        // "tradingScale": 10, // 1 - 10
        // "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      // "roster": 12,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
      "managerID": "1004157565439209472",
      "name": "Michael",
      "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "Also His Parents' Basement", // (optional)
      "bio": "Tripod Mike is a boomeranger to this league. Here's to hoping he doesn't offer any trades he might later regret!",
      "photo": "/managers/michael.png", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2023, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "nyg", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": {
        name: "Connor", // Can be anything (usually your rival's name)
        link: 3, // manager array number within this array, or null to link back to all managers page
        image: "/managers/connor2.png", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 4866, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        // "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        // "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "I draft whoever's popular right now",
        // "tradingScale": 10, // 1 - 10
        // "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
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
    


