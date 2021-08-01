export const managers = [
  {
    "timestamp": "7/17/2021 18:46:41",
    "roster": 3,
    "tookOver": 2020,
    "name": "Andrew Shapiro",
    "location": "Brooklyn",
    "bio": "I joined the league last year.  I went to high school and college with nick and we were roommates for 3 years.  I have 2 kids both boys one is almost 3 and the other is 6 months.  I love to trade.\nMy favorite teams are: 1) my fantasy team 2) I was a jets fan but dumped them for the dolphins last year",
    "photo": "/managers/andrew.jpg", // done
    "fantasyStart": 2010,
    "favoriteTeam": "mia",
    "phone": 3478859760,
    "email": "Shapsandrew@gmail.com",
    "sleeperID": "Shapsandrew",
    "mode": "Win Now",
    "rival": {
      name: "Clayton",
      link: 6,
      image: "/managers/clayton.jpg"
    },
    "favoritePlayer": 2449,
    "valuePosition": "WR",
    "rookieOrVets": "Rookies",
    "philosophy": "Next man up.",
    "tradingScale": 10,
    "contactMethods": "Text, WhatsApp, email, Blind Sleeper offer",
    "prefferedContact": "Text",
  },
  {
    "roster": 4,  // ID of the roster that the manager manages
    "name": "Nick Melhado", // (optional) used if a manager took over a team, null or omit otherwise
    "location": "Brooklyn",
    "bio": "I grew up in New York City and know most of the people in the league from Southampton. I also went to high school with Andrew, Stef, and Rory and went to college and roomed with Seamus and Andrew. I've been married since 2016 and have a son, Grayson, and a daughter on the way.",
    "photo": "/managers/nick.jpg", // done
    "fantasyStart": 2014, // when did the manager start playing fantasy football
    "favoriteTeam": "nyj", // favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    "mode": "Win Now", // 'Win Now' or 'Rebuild'
    "rival": {
      name: "Clayton", // Can be anything (usually your rival's name)
      link: 6, // manager array number within this array, or null to link back to all managers page
      image: "/managers/clayton.jpg", // either a specific manager photo or 'everyone' or 'question'
    },
    "favoritePlayer": 1426, // this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    "valuePosition": "WR", // Favorite position (QB, WR, RB, TE, etc.)
    "rookieOrVets": "Rookies", // 'Rookies' or 'Vets'
    "philosophy": "Quality over quantity. The team policy is to trade depth for stars, and win on a knife's edge where a single injury can completely derail a season.",
    "tradingScale": 10, // 1 - 10
    "prefferedContact": "Text", // 'Text', 'WhatsApp', and 'Carrier Pigeon' are currently supplied in the template
  },
  {
    "timestamp": "7/20/2021 11:25:49",
    "roster": 6,
    "name": "Charles McConnell",
    "location": "Hong Kong",
    "bio": "Diehard Jets fan, most talented manager out there, and mortal enemy of Clayton Almeida.",
    "photo": "/managers/charles.jpg", // done
    "fantasyStart": 2015,
    "favoriteTeam": "nyj",
    "phone": "+85296301790",
    "email": "cenmcconnell@gmail.com",
    "sleeperID": "therealbigchaz",
    "mode": "Win Now",
    "rival": {
      name: "Clayton",
      link: 6,
      image: "/managers/clayton.jpg"
    },
    "favoritePlayer": 96,
    "valuePosition": "RB",
    "rookieOrVets": "Vets",
    "philosophy": "My team's philosophy is to win at all costs, which will turn into a culture that will lead to many victories.",
    "tradingScale": 7,
    "contactMethods": "WhatsApp, Blind Sleeper offer, Carrier pigeon",
    "prefferedContact": "WhatsApp",
  },
  {
    "timestamp": "7/21/2021 1:29:22",
    "roster": 7,
    "tookOver": 2021,
    "name": "Stefano Vaccarino",
    "location": "Brooklyn",
    "bio": "Just a man who loves to win in the trenches",
    "photo": "/managers/stef.jpg", // done
    "fantasyStart": 2000,
    "favoriteTeam": "nyj",
    "phone": 9176605259,
    "email": "Stefanovaccarino@gmail.com",
    "sleeperID": "Stefanovaccarino",
    "mode": "Rebuild",
    "rival": {
      name: "Everyone",
      link: null,
      image: "/managers/everyone.png"
    },
    "favoritePlayer": 6796,
    "valuePosition": "Picks",
    "rookieOrVets": "Rookies",
    "philosophy": "We dominate the trenches",
    "tradingScale": 10,
    "contactMethods": "Text, WhatsApp, Call, email, Blind Sleeper offer, Have someone click the \"interested in\" button on sleeper, Carrier pigeon",
    "prefferedContact": "WhatsApp",
  },
  {
    "timestamp": "7/20/2021 21:56:13",
    "roster": 7,
    "tookOver": 2021,
    "name": "Seamus Kerin",
    "location": "New York",
    "bio": "#serious about fitness",
    "photo": "/managers/seamus.jpg", // done
    "fantasyStart": 2005,
    "favoriteTeam": "ne",
    "phone": 8609851505,
    "email": "seamus.kerin@gmail.com",
    "sleeperID": "SprintEastwood",
    "mode": "Rebuild",
    "rival": {
      name: "TBD",
      link: null,
      image: "/managers/question.jpg"
    },
    "favoritePlayer": 6770,
    "valuePosition": "TE",
    "rookieOrVets": "Rookies",
    "philosophy": "Fantasy is won in the trenches",
    "tradingScale": 7,
    "contactMethods": "Text, email, Blind Sleeper offer, Have someone click the \"interested in\" button on sleeper, Carrier pigeon",
    "prefferedContact": "Text",
  },
  {
    "timestamp": "7/20/2021 21:56:13",
    "roster": 7,
    "tookOver": 2021,
    "name": "Rory Kirwan",
    "location": "New York",
    "bio": "CO-MANAGER OF THE HOGS ",
    "photo": "/managers/rory.jpg", // done
    "fantasyStart": 1955,
    "favoriteTeam": "nyg",
    "phone": 6467612803,
    "email": "Rkirwan212@gmail.com",
    "sleeperID": "RoryGettlemon",
    "mode": "Rebuild",
    "rival": {
      name: "Mike",
      link: null,
      image: "/managers/question.jpg"
    },
    "favoritePlayer": 6810,
    "valuePosition": "RB",
    "rookieOrVets": "Rookies",
    "philosophy": "DOMINATE THE TRENCHES ",
    "tradingScale": 7,
    "contactMethods": "Text",
    "prefferedContact": "Text",
  },
  {
    "timestamp": "7/20/2021 22:43:40",
    "roster": 1,
    "name": "Clayton Almeida",
    "location": "West Palm Beach",
    "bio": "Dual citizen that has been in the USA since 2002. Moved around quite a bit because that's what immigrants do. One of the Founding Fathers of the Legends League. Equally decent at coaching and playing tennis. Vast knowledge about useless or not so useless facts. Never shy away from an argument/discussion. Oh and 3 time fantasy football champion that might retire if I win this year again. Also like financial markets and trading (stocks not players)",
    "photo": "/managers/clayton.jpg", // done
    "fantasyStart": 2010,
    "favoriteTeam": "phi",
    "phone": "(803)984 0106 ",
    "email": "claytonalmeida80@gmail.com",
    "sleeperID": "TheAlmeida",
    "mode": "Win Now",
    "rival": {
      name: "Myself",
      link: 6,
      image: "/managers/clayton.jpg"
    },
    "favoritePlayer": 947,
    "valuePosition": "RB",
    "rookieOrVets": "Vets",
    "philosophy": "Back to back champ....and you are asking me this question? Well you can buy my book \"How to Dominate your Fantasy League\" to know the secrets but I will give you a little taste here: all about leadership. Starts with the Owner/GM/Manager...",
    "tradingScale": 9,
    "contactMethods": "Text, Blind Sleeper offer, Have someone click the \"interested in\" button on sleeper",
    "prefferedContact": "Text",
  },
  {
    "timestamp": "7/20/2021 22:43:40",
    "roster": 12,
    "name": "Tom Barth",
    "location": "Solon, Ohio",
    "bio": "The Browns are going to the Super Bowl this year!",
    "photo": "/managers/tom.jpg", // done
    "fantasyStart": 2009,
    "favoriteTeam": "cle",
    "phone": "330-559-3073",
    "email": "tjbarth84@gmail.com",
    "sleeperID": "Clevesteam6",
    "mode": "Win Now",
    "rival": {
      name: "Every last one of you",
      link: null,
      image: "/managers/everyone.png"
    },
    "favoritePlayer": 4988,
    "valuePosition": "RB",
    "rookieOrVets": "Rookies",
    "philosophy": "Do exactly what Clayton does.",
    "tradingScale": 2,
    "contactMethods": "WhatsApp",
    "prefferedContact": "WhatsApp",
  },
  {
    "timestamp": "7/21/2021 13:09:32", // done
    "roster": 5,
    "name": "Joel Trudel", // done
    "location": "Newton, MA", // done
    "bio": "While I live in New England now, I will never be a fan of any of the Boston teams (the Celtics are good, I like Brown/Tatum); my allegiance will always live in Seattle, and ANY of the teams, including the return of the SuperSonics (RIP) and the Kraken!! My co-manager and I got married about a year and ½ ago and bought a house in December, setting up roots in the Boston area. Any of you are welcome to visit, though I couldn’t even get Clayton to come up from CT when he was there… 🤔 Though I don’t work in tennis anymore, it’s been great to me as my wife and I met through tennis, and is also how I know many of you.", // done
    "photo": "/managers/joel.jpg", // done
    "fantasyStart": 2014, // done
    "favoriteTeam": "sea", // done
    "phone": 3609904564,
    "email": "Trudeljb@gmail.com",
    "sleeperID": "trudeljb",
    "mode": "Win Now", // done
    "rival": {
      name: "Clayton",
      link: 6,
      image: "/managers/clayton.jpg"
    },
    "favoritePlayer": 4046, // Mahomes
    "valuePosition": "QB", // done
    "rookieOrVets": "Rookies", // done
    "philosophy": "I don’t see us crushing anyone over the next decade, but the team is certainly willing to go as far as Mahomes and Jefferson will take us…or the draft capital we receive in return for them….! Let’s be honest, one look at my squad, and my team building skills could be called into question. However, team culture is something we’ve never lacked in Seattle (see Pete Carrol and the Super Bowl 47 Champion Seahawks!), and it’s clear that guys love being a part of our team", // done
    "tradingScale": 6, // done
    "contactMethods": "Text, WhatsApp",
    "prefferedContact": "WhatsApp",
  },
  {
    "timestamp": "7/21/2021 21:01:49",
    "roster": 11,
    "name": "Shea Thomas",
    "location": "Lynchburg, VA",
    "bio": "I’m 29 years old and have been married to my beautiful wife for a little over a year. I played tennis at Liberty University from 2010-14 and was ranked top 20 for doubles. I have been teaching tennis ever since I graduated. I won the inaugural season of the Legends League  and look to dominate the league over the next 10 years and create a dynasty!",
    "photo": "/managers/shea.jpg", // done
    "fantasyStart": 2008,
    "favoriteTeam": "sf",
    "phone": "707-338-8038",
    "email": "Sheathomas14@gmail.com",
    "sleeperID": "ToucheToushea",
    "mode": "Win Now",
    "rival": {
      name: "Clayton",
      link: 6,
      image: "/managers/clayton.jpg"
    },
    "favoritePlayer": 4046,
    "valuePosition": "RB",
    "rookieOrVets": "Vets",
    "philosophy": "Our teams philosophy is to play as a team. Every player plays their hardest and their best because they play for each other and not for themselves. They all push each other to be better. My team is also extremely young so they’ll be dominating for the next decade!",
    "tradingScale": 7,
    "contactMethods": "Text, WhatsApp, Blind Sleeper offer",
    "prefferedContact": "WhatsApp",
  },
  {
    "timestamp": "7/20/2021 22:43:40",
    "roster": 8,
    "tookOver": 2021,
    "name": "Tim Sanford",
    "location": "Fairfield, CT",
    "bio": "Up early. Up late.",
    "photo": "/managers/tim.jpg", // done
    "fantasyStart": 2010,
    "favoriteTeam": "nyg",
    "phone": "203-895-7664",
    "email": "Ts7sanford10@gmail.com",
    "sleeperID": "Tsanford7",
    "mode": "Rebuild",
    "rival": {
      name: "I Am My Own Nightmare",
      link: 10,
      image: "/managers/tim.jpg"
    },
    "favoritePlayer": 4034,
    "valuePosition": "RB",
    "rookieOrVets": "Rookies",
    "philosophy": "Spread the wealth and always Run deep on RBs",
    "tradingScale": 7,
    "contactMethods": "Text, WhatsApp, Blind Sleeper offer, Carrier pigeon",
    "prefferedContact": "WhatsApp",
  },
  {
    "timestamp": "7/20/2021 22:43:45",
    "roster": 10,
    "name": "Sebastian Becker",
    "location": "New York",
    "bio": "I am the second-best South American fantasy football manager in this league but the best South American tennis player.",
    "photo": "/managers/sebastian.jpg", // done
    "fantasyStart": 2018,
    "favoriteTeam": "nyg",
    "phone": "917-797-7616",
    "email": "jsbecker92@gmail.com",
    "sleeperID": "jsbecker92",
    "mode": "Rebuild",
    "rival": {
      name: "Clayton",
      link: 6,
      image: "/managers/clayton.jpg"
    },
    "favoritePlayer": 3198,
    "valuePosition": "RB",
    "rookieOrVets": "Rookies",
    "philosophy": "Better to be lucky than good",
    "tradingScale": 8,
    "contactMethods": "Text, WhatsApp",
    "prefferedContact": "Text",
  },
  {
    "timestamp": "7/20/2021 22:43:40",
    "roster": 2,
    "name": "Harry Jones",
    "location": "New York",
    "bio": "Lorem Ipsum",
    "photo": "/managers/harry.jpg", // done
    "fantasyStart": 2018,
    "favoriteTeam": "nyg",
    "phone": "9177511589",
    "email": "ahenryjones@gmail.com",
    "sleeperID": "ahenryjones",
    "mode": "Win Now",
    "rival": {
      name: "My co-manager",
      link: 13,
      image: "/managers/siim.jpg"
    },
    "favoritePlayer": 1141,
    "valuePosition": "TE",
    "rookieOrVets": "Vets",
    "philosophy": "Pacifist",
    "tradingScale": 3,
    "contactMethods": "Text, WhatsApp",
    "prefferedContact": "WhatsApp",
  },
  {
    "timestamp": "7/20/2021 22:43:40",
    "roster": 2,
    "name": "Siim Tuus",
    "location": "Rakvere, Estonia",
    "bio": "31-year-old Estonian, once played tennis at a decent level, now playing padel",
    "photo": "/managers/siim.jpg", // done
    "fantasyStart": 2014,
    "favoriteTeam": "sea",
    "phone": "+3725171779",
    "email": "siimtuus@gmail.com",
    "sleeperID": "siimtuus",
    "mode": "Win Now",
    "rival": {
      name: "Clayton",
      link: 6,
      image: "/managers/clayton.jpg"
    },
    "favoritePlayer": 96,
    "valuePosition": "TE",
    "rookieOrVets": "Vets",
    "philosophy": "No need to over analyze, pick the best players and beat everyone ",
    "tradingScale": 1,
    "contactMethods": "Carrier Pigeon",
    "prefferedContact": "Carrier Pigeon",
  },
]