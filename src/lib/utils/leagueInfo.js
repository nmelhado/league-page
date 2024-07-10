/*   STEP 1   */
export const leagueID = "926935881716428800"; // your league ID
export const leagueName = "No Punt Intended"; // your league name
export const dues = 0; // (optional) used in template constitution page
export const dynasty = false; // true for dynasty leagues, false for redraft and keeper
export const enableBlog = false; // requires VITE_CONTENTFUL_ACCESS_TOKEN and VITE_CONTENTFUL_SPACE environment variables

/*   STEP 2   */
export const homepageText = `
<p>Welcome to the legendary realm of <span class="highlight">"No Punt Intended"</p>
<p>A fantasy football league that has been the epicenter of thrill, strategy, and camaraderie since its inception in the year 2017.</p>
<p>In a world where the pigskin is the holy grail, and the gridiron is the battlefield, <span class="highlight">"No Punt Intended"</span> stands as a testament to the spirit of competition and the love for the game. This league has seen managers come and go, each leaving their unique imprint on the annals of our history. Yet, the core of our league, the stalwart managers from year one, remain, their fantasy prowess undiminished, their thirst for victory unquenched.</p>
<p><span class="highlight">"No Punt Intended"</span> is more than just a league; it's a saga of epic proportions, a rollercoaster ride of emotions, a test of wits and will. It's where underdogs rise to the occasion, where titans are humbled, and where every decision can lead to glory or despair.</p>
<p>But amidst the intense competition, there's a lighter side to <span class="highlight">"No Punt Intended"</span>. It's a place where puns fly as freely as Hail Mary passes, where the banter is as entertaining as a last-second touchdown, and where the friendships forged are as enduring as our love for the sport.</p>
<p>So, gear up for another season of <span class="highlight">"No Punt Intended"</span>, where every game is a battle, every week is an adventure, and every season writes a new chapter in our epic tale. Remember, in this league, we don't just play fantasy football, we live it!</p>
`;

/*   STEP 3   */
/*
3 managers as an example. Uncomment (remove the //) before each line to make it live code
If you're having trouble, reference the Training Wheels' Manager Section
https://github.com/nmelhado/league-page/blob/master/TRAINING_WHEELS.md#ii-adding-managers-and-changing-the-homepage-text
*/

// To omit an optional field, set it's value to null

const sBioUli = "Treffen Sie Uli, den Fantasy Football Guru und heimlichen König des Sofa-Super-Bowl! 🏈🔥 Mit der Intuition eines Orakels und der Präzision eines Chirurgen analysiert Uli jeden Spielerwechsel, jede Verletzung und jeden Wetterbericht, um sein Team zur Unbesiegbarkeit zu führen. Während andere noch ihre ersten Kaffees schlürfen, hat Uli bereits seine Aufstellung optimiert und seinen Gegnern psychologisch ins Handwerk gepfuscht. Uli ist ein Zauberer der Motivation und ein Meister der Strategie. Seine Spieler laufen für ihn die Extra-Meile, nur um in den Genuss seines überirdischen Lobes zu kommen. Und das Beste daran? Er macht das alles mit einer lässigen Coolness, als hätte er gerade erst die Fernbedienung in die Hand genommen. Möge der Fantasy Football Epos niemals enden, und möge Uli für immer unser Meister und Anführer sein!"
const sBioPhilipp = "Lernen Sie Philipp kennen, den leidenschaftlichsten Fantasy Football Manager, den die Liga je gesehen hat! Philipp lebt für den Nervenkitzel des Spiels, und wenn die Dinge nicht so laufen, wie er will, zeigt er seine Emotionen mit vollem Einsatz. Ein verlorenes Match? Keine Sorge, die Gruppe weiß Bescheid, denn Philipp ist der Meister des Rage-Quits in WhatsApp. In der Saison 2023 setzte Philipp alles auf eine Karte und tradete fast alle seine Picks aus 2024, um den großen Sieg zu holen. Leider blieb der Triumph aus, und jetzt befindet er sich in der Rebuild-Phase. Doch Philipp gibt nicht auf – er schmiedet Pläne, um stärker und klüger zurückzukommen. Mit seinem unbändigen Willen und seiner unerschütterlichen Leidenschaft wird er sich bald wieder an die Spitze kämpfen und alle überraschen."
const sBioAndy = "Treffen Sie Andy, den ehemaligen Titanen der Fantasy Football Liga. 🏈✨ Nach der Saison 2023 hat Andy beschlossen, seine virtuelle Krone abzulegen und sich wichtigeren Dingen im Leben zu widmen. Obwohl seine Abwesenheit eine große Lücke hinterlässt, erinnern wir uns alle gern an seine strategischen Meisterleistungen und sein unnachahmliches Spielgespür. Andy hat uns gezeigt, dass es im Leben mehr gibt als nur Fantasy Football. Seine Entscheidung, die Liga zu verlassen, um sich auf bedeutendere Aufgaben zu konzentrieren, verdient höchsten Respekt. Wir wünschen ihm alles Gute und hoffen, dass er eines Tages vielleicht doch wieder den Weg zurück zu uns findet. Cheers, Andy!🍻🌟"
const sBioIngo = "Treffen Sie Ingo, den unerschütterlichen Optimisten und humorvollen Pechvogel der Fantasy Football Liga! 🏈😂 Trotz einer Serie von unglücklichen Zufällen und einem scheinbar endlosen Strom von Verletzungspech bleibt Ingo stets der gute Laune Typ, der jedem Rückschlag mit einem Lächeln begegnet. Kurz bevor er vor der Saison 2024 fast das Handtuch warf, entdeckte Ingo das Juwel Sam LaPorta und sicherte sich damit vermutlich den besten Keeper für 2024. Mit neuem Elan und einem Funken Hoffnung ist er bereit, das Spielfeld zurückzuerobern. Auf geht’s, Ingo – wir glauben an dich und dein Comeback!"
const sBioMathis = "Treffen Sie Mathis, den Fantasy Football Enthusiasten und leidenschaftlichen Dallas Cowboys Fan! 🏈🌍⭐ Mathis ist nicht nur ein Fan, er ist ein echter Fanatiker des Spiels. Seine Hingabe kennt keine Grenzen – buchstäblich! Einmal hat er sich sogar aus den USA zugeschaltet, nur um live beim Draft dabei zu sein und sicherzustellen, dass seine Cowboys nicht zu kurz kommen. Mathis' strategisches Geschick und sein unermüdlicher Einsatz machen ihn zu einem gefürchteten Gegner und geschätzten Mitspieler. Egal wo auf der Welt er sich befindet, er ist immer bereit, sein Team zum Sieg zu führen. Mathis, du bist ein wahrer Draft-Day-Held, und die Liga wäre ohne dich nicht dieselbe!"
const sBioCarsten = "Treffen Sie Carsten, den wandernden Fantasy Football Meister mit einer Leidenschaft für das Spiel! 🏈 Ursprünglich von der idyllischen Insel Rügen, zog Carsten für sein Studium nach Heidelberg und später nach Mainz. Carsten ist nicht nur im Fantasy Football aktiv, sondern auch ein echter Football-Enthusiast. Als großer Fan der Seattle Seahawks und mit seinem umfassenden Wissen über das Spiel, ist er ein geschätzter Mitspieler und Gegner. Egal, ob er auf Rügen den frischen Meereswind genießt oder in Mainz den Stadttrubel erlebt, Carsten bleibt immer dem Football treu. Ungebrochene Leidenschaft und strategisches Geschick – das ist Carsten! "


export const managers = [
    {
      "managerID": "451366557545656320",
      "name": "Uli",
      "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "Heidelberg", // (optional)
      "bio": sBioUli,
      "photo": "/managers/Uli.jpeg", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2017, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "lar", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": {
        name: "Philipp", // Can be anything (usually your rival's name)
        link: 1, // manager array number within this array, or null to link back to all managers page
        image: "/managers/everyone.png", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      },
      "favoritePlayer": 2227, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "RB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": null,
      "tradingScale": 8, // 1 - 10
      "preferredContact": "Carrier Pigeon", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      "managerID": "455042750820118528",
      "name": "Philipp",
      "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "Lichtenau", // (optional)
      "bio": sBioPhilipp,
      "photo": "/managers/everyone.png", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2017, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "phi", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Rebuild", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": {
        name: "Uli", // Can be anything (usually your rival's name)
        link: 0, // manager array number within this array, or null to link back to all managers page
        image: "/managers/Uli.jpeg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      },
      "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "TE", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": null,
      "tradingScale": 10, // 1 - 10
      "preferredContact": "WhatsApp", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      "managerID": "467948916562718720",
      "name": "Andy",
      "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "Öschelbronn", // (optional)
      "bio": sBioAndy,
      "photo": "/managers/everyone.png", // square ratio recommended (no larger than 500x500)
      "fantasyStart": null, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "bal", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": null, // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": null,
      "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "QB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": null,
      "tradingScale": 0, // 1 - 10
      "preferredContact": "WhatsApp", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      "managerID": "454370194505068544",
      "name": "Ingo",
      "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "Rheinstetten", // (optional)
      "bio": sBioIngo,
      "photo": "/managers/everyone.png", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2019, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "atl", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Dynasty", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": {
        name: "Philipp", // Can be anything (usually your rival's name)
        link: 1, // manager array number within this array, or null to link back to all managers page
        image: "/managers/everyone.png", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      },
      "favoritePlayer": 167, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "LB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": null,
      "tradingScale": 4, // 1 - 10
      "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      "managerID": "454386420170092544",
      "name": "Mathis",
      "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "Durmersheim", // (optional)
      "bio": sBioMathis,
      "photo": "/managers/everyone.png", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2019, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "dal", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Dynasty", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": null,
      "favoritePlayer": 167, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "LB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": null,
      "tradingScale": 6, // 1 - 10
      "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      "managerID": "464450266649849856",
      "name": "Carsten",
      "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "Mainz", // (optional)
      "bio": sBioCarsten,
      "photo": "/managers/everyone.png", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2019, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "sea", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Rebuild", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": null,
      "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": null,
      "tradingScale": 4, // 1 - 10
      "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
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
    