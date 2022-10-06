/*   STEP 1   */
export const leagueID = "787096830033924096"; // your league ID
export const leagueName = "RCL"; // your league name
export const dues = 100; // (optional) used in template constitution page
export const dynasty = true; // true for dynasty leagues, false for redraft and keeper
export const enableBlog = false; // requires VITE_CONTENTFUL_ACCESS_TOKEN and VITE_CONTENTFUL_SPACE environment variables
export const bannerImage = "bannerlogo.png";

/*   STEP 2   */
export const homepageText = `
  <p>Welcome to the Really Cool League (RCL). Founded in 2012, the Really Cool League has officially entered our second decade in existence, and barring nuclear annihilation, we’ll be around for many more.</p>
  <p>Our commitment to building the best league and the greatest dynasty franchises has never been stronger, despite facing many challenges over the years. From the league members (RIP Wildfyre), the struggles of a global pandemic, the YOTK, or the chaos of the replacement refs. Adversity has only made us stronger.</p>
  <p>Win the Championship. Avoid the Golden Poo. Fear the SAT. This is the RCL.</p>
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
    roster: 1, // ID of the roster that the manager manages (look at the order of the power rankings graph)
    name: "Jordy Altman",
    tookOver: null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    location: "Los Angeles", // (optional)
    bio: "Coach Jordy has been the commissioner of the RCL for over a decade. Despite many attempts to overthrow and usurp his title, he has held onto control. His teams, including The Storm, Death and Taxes and Disney's Buttkickers, are perennial powerhouses who despite having never won a title, have made many deep playoff runs.",
    photo: "/managers/jordy.png", // square ratio recommended (no larger than 500x500)
    fantasyStart: 2012, // (optional) when did the manager start playing fantasy football
    favoriteTeam: "kc", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    mode: "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    rival: {
      name: "Doug Altman", // Can be anything (usually your rival's name)
      link: 7, // manager array number within this array, or null to link back to all managers page
      image: "/managers/doug.png", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    },
    favoritePlayer: 232, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    valuePosition: "QB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    rookieOrVets: "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    philosophy: "Daytime Emmys are equally good!!",
    tradingScale: 10, // 1 - 10
    preferredContact: "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    roster: 2, // ID of the roster that the manager manages (look at the order of the power rankings graph)
    name: "Danny Shaw",
    tookOver: null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    location: "Kansas City", // (optional)
    bio: "Danny is a former member of the Up Awake All Night Party House, and former coach of the K9 Unit. An excellent evaluator of talent, and a patient manager, Coach Shaw is looking for his first championship title. With Patrick Mahomes leading his team, he may be closer than ever to winning one.",
    photo: "/managers/danny.png", // square ratio recommended (no larger than 500x500)
    fantasyStart: 2012, // (optional) when did the manager start playing fantasy football
    favoriteTeam: "kc", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    mode: "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    rival: {
      name: "Andi Porter", // Can be anything (usually your rival's name)
      link: 8, // manager array number within this array, or null to link back to all managers page
      image: "/managers/andi.png", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    },
    favoritePlayer: 421, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    valuePosition: "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    rookieOrVets: "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    philosophy: "The more you Chief, the more you win.",
    tradingScale: 9, // 1 - 10
    preferredContact: "Email", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    roster: 3, // ID of the roster that the manager manages (look at the order of the power rankings graph)
    name: "Ashvin Coca",
    tookOver: null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    location: "Los Angeles", // (optional)
    bio:
      "Coach Ashvin has two championship titles and has coached over 10 different franchies in the RCL, from Team Group Force 5 all the way up to Team Group Force 15. Who knows what team he'll be coaching 10 years from now!",
    photo: "/managers/ashvin.png", // square ratio recommended (no larger than 500x500)
    fantasyStart: 2012, // (optional) when did the manager start playing fantasy football
    favoriteTeam: "kc", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    mode: "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    rival: {
      name: "Nate Totten", // Can be anything (usually your rival's name)
      link: 9, // manager array number within this array, or null to link back to all managers page
      image: "/managers/nate.png", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    },
    favoritePlayer: 2449, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    valuePosition: "RB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    rookieOrVets: "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    philosophy: "Fantasy football is 90% luck, 10% being in the right place at the right time.",
    tradingScale: 5, // 1 - 10
    preferredContact: "Carrier Pigeon", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    roster: 4, // ID of the roster that the manager manages (look at the order of the power rankings graph)
    name: "Cali Gilman",
    tookOver: 2018, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    location: "Brooklyn", // (optional)
    bio: "Coach Gilman entered the league to replace Coach Erik Lapointe. Gilman would go on to shock the world when she took the last place place team and won a championship in her first year, earning her the Coach of the Year award. Her birthday is March 3rd.",
    photo: "/managers/cali.png", // square ratio recommended (no larger than 500x500)
    fantasyStart: 2014, // (optional) when did the manager start playing fantasy football
    favoriteTeam: "kc", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    mode: "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    rival: {
      name: "Kyle O'Neal", // Can be anything (usually your rival's name)
      link: 4, // manager array number within this array, or null to link back to all managers page
      image: "/managers/kyle.png", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    },
    favoritePlayer: 4034, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    valuePosition: "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    rookieOrVets: "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    philosophy: "Chompa chompa chompa",
    tradingScale: 7, // 1 - 10
    preferredContact: "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    roster: 5,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
    name: "Kyle O'Neal",
    tookOver: 2013, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    location: "Los Angeles", // (optional)
    bio: "Coach Kyle entered the league to replace Coach Brandon Michael Ford of Wildfyre. After immediately rebranding the team, Coach Kyle of Team KyleHarrisonO'Neal began the long arduous journey of rebuilding the shattered franchise - to great success! His teams have consistently made the playoffs and have won two championships.",
    photo: "/managers/kyle.png", // square ratio recommended (no larger than 500x500)
    fantasyStart: 2014, // (optional) when did the manager start playing fantasy football
    favoriteTeam: "kc", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    mode: "Dynasty", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    rival: {
      name: "Cali Gilman", // Can be anything (usually your rival's name)
      link: 3, // manager array number within this array, or null to link back to all managers page
      image: "/managers/cali.png", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    },
    favoritePlayer: 4199, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    valuePosition: "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    rookieOrVets: "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    philosophy: "Check out my accent wall.",
    tradingScale: 10, // 1 - 10
    preferredContact: "Phone", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    roster: 6, // ID of the roster that the manager manages (look at the order of the power rankings graph)
    name: "Drew Wagner",
    tookOver: null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    location: "Kansas City", // (optional)
    bio:
      "Coach Wags, celebrated for his popular recaps, is a championship winning coach who, according to local Tahoe legend, once drank an entire lake.",
    photo: "/managers/drew.png", // square ratio recommended (no larger than 500x500)
    fantasyStart: 2012, // (optional) when did the manager start playing fantasy football
    favoriteTeam: "kc", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    mode: "Rebuild", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    rival: {
      name: "Chris Hurte", // Can be anything (usually your rival's name)
      link: 6, // manager array number within this array, or null to link back to all managers page
      image: "/managers/chris.png", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    },
    favoritePlayer: 2505, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    valuePosition: "QB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    rookieOrVets: "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    philosophy: "Blitz every down.",
    tradingScale: 7, // 1 - 10
    preferredContact: "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    roster: 7, // ID of the roster that the manager manages (look at the order of the power rankings graph)
    name: "Chris Hurte",
    tookOver: null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    location: "Los Angeles", // (optional)
    bio:
      "Christopher Hurte, or 'Chris' as he is known by his friends is the coach of the Little Lebowski Urban Achievers. He is one of only two coaches to have stuck with a single franchise over the lifetime of the RCL.",
    photo: "/managers/chris.png", // square ratio recommended (no larger than 500x500)
    fantasyStart: 2012, // (optional) when did the manager start playing fantasy football
    favoriteTeam: "kc", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    mode: "Rebuild", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    rival: {
      name: "Drew Wagner", // Can be anything (usually your rival's name)
      link: 5, // manager array number within this array, or null to link back to all managers page
      image: "/managers/drew.png", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    },
    favoritePlayer: 240, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    valuePosition: "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    rookieOrVets: "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    philosophy: "With great hair comes great responsibility.",
    tradingScale: 8, // 1 - 10
    preferredContact: "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    roster: 8, // ID of the roster that the manager manages (look at the order of the power rankings graph)
    name: "Doug Altman",
    tookOver: null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    location: "San Francisco", // (optional)
    bio:
      "Doug Altman is a celebrated chili cookoff champion and coach of the Chili Beach All Stars. His teams have topped the power rankings for nearly half a decade, and though he is still looking for his first championship it is likely only a matter of time till he brings home the trophy.",
    photo: "/managers/doug.png", // square ratio recommended (no larger than 500x500)
    fantasyStart: 2012, // (optional) when did the manager start playing fantasy football
    favoriteTeam: "kc", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    mode: "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    rival: {
      name: "Jordy Altman", // Can be anything (usually your rival's name)
      link: 0, // manager array number within this array, or null to link back to all managers page
      image: "/managers/jordy.png", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    },
    favoritePlayer: 1466, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    valuePosition: "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    rookieOrVets: "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    philosophy: "Hot chili for hot people.",
    tradingScale: 8, // 1 - 10
    preferredContact: "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    roster: 9, // ID of the roster that the manager manages (look at the order of the power rankings graph)
    name: "Andi Porter",
    tookOver: null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    location: "Los Angeles", // (optional)
    bio: "Coach Porter and her Assistant Coach Otto(man) are still hunting for their first title, having come close with deep playoff runs and 2nd place finishes in the past.",
    photo: "/managers/andi.png", // square ratio recommended (no larger than 500x500)
    fantasyStart: 2012, // (optional) when did the manager start playing fantasy football
    favoriteTeam: "kc", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    mode: "Rebuild", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    rival: {
      name: "Danny Shaw", // Can be anything (usually your rival's name)
      link: 1, // manager array number within this array, or null to link back to all managers page
      image: "/managers/danny.png", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    },
    favoritePlayer: 3198, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    valuePosition: "TE", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    rookieOrVets: "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    philosophy: "Live, laugh, lose, drink.",
    tradingScale: 7, // 1 - 10
    preferredContact: "Phone", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    roster: 10, // ID of the roster that the manager manages (look at the order of the power rankings graph)
    name: "Nate Totten",
    tookOver: null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
    location: "Vancouver(ish)", // (optional)
    bio:
      "The creator of Paypalpy, Nate is the only league member with children and is actively grooming the next generation to take over his team. These mini managers are being heavily indoctrinated into the fantasy lifestyle and will be expected to take an active role as soon as they can successfully type out a coherent trade offer.",
    photo: "/managers/nate.png", // square ratio recommended (no larger than 500x500)
    fantasyStart: 2012, // (optional) when did the manager start playing fantasy football
    favoriteTeam: "min", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    mode: "Dynasty", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    rival: {
      name: "Ashvin", // Can be anything (usually your rival's name)
      link: 2, // manager array number within this array, or null to link back to all managers page
      image: "/managers/ashvin.png", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    },
    favoritePlayer: 4029, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    valuePosition: "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    rookieOrVets: "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    philosophy: "Crush, Kill, Destroy",
    tradingScale: 8, // 1 - 10
    preferredContact: "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  },

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
  //   "philosophy": "Your fantasy team's philosophy",
  //   "tradingScale": 10, // 1 - 10
  //   "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  // },
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
