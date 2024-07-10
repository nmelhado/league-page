/*   STEP 1   */
export const leagueID = "1064167002723422208"; // your league ID
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
const sBioPhilipp = "Treffen Sie Philipp, den leidenschaftlichen und manchmal aufbrausenden Fantasy Football Manager! 🏈💥 Philipp ist bekannt dafür, dass er sich häufig über Niederlagen ärgert und dann gerne mal aus der WhatsApp Gruppe'rage quittet'. In der Saison 2023 setzte er alles auf einen möglichen Sieg und tradete fast alle seine Picks für 2024 weg, nur um am Ende in der Rebuild-Phase zu landen. Philipp investiert enorm viel Zeit in Vorbereitungen und Lesestoff, um sein Team optimal aufzustellen. Trotzdem läuft es meistens schief und er schafft es nicht in die Playoffs. Seine Season endet oft mit Frustration, aber er gibt niemals auf und plant bereits für die nächste Saison. Mit seiner Leidenschaft und seinem Engagement ist Philipp ein fester Bestandteil der Liga, der immer wieder für Gesprächsstoff sorgt. Auf eine neue Season voller Überraschungen und Hoffnungen, Philipp!"
const sBioAndy = "Treffen Sie Andy, den ehemaligen Titanen der Fantasy Football Liga. 🏈✨ Nach der Saison 2023 hat Andy beschlossen, seine virtuelle Krone abzulegen und sich wichtigeren Dingen im Leben zu widmen. Obwohl seine Abwesenheit eine große Lücke hinterlässt, erinnern wir uns alle gern an seine strategischen Meisterleistungen und sein unnachahmliches Spielgespür. Andy hat uns gezeigt, dass es im Leben mehr gibt als nur Fantasy Football. Seine Entscheidung, die Liga zu verlassen, um sich auf bedeutendere Aufgaben zu konzentrieren, verdient höchsten Respekt. Wir wünschen ihm alles Gute und hoffen, dass er eines Tages vielleicht doch wieder den Weg zurück zu uns findet. Cheers, Andy!🍻🌟"
const sBioIngo = "Treffen Sie Ingo, den unerschütterlichen Optimisten und humorvollen Pechvogel der Fantasy Football Liga! 🏈😂 Trotz einer Serie von unglücklichen Zufällen und einem scheinbar endlosen Strom von Verletzungspech bleibt Ingo stets der gute Laune Typ, der jedem Rückschlag mit einem Lächeln begegnet. Kurz bevor er vor der Saison 2024 fast das Handtuch warf, entdeckte Ingo das Juwel Sam LaPorta und sicherte sich damit vermutlich den besten Keeper für 2024. Mit neuem Elan und einem Funken Hoffnung ist er bereit, das Spielfeld zurückzuerobern. Auf geht’s, Ingo – wir glauben an dich und dein Comeback!"
const sBioMathis = "Treffen Sie Mathis, den Fantasy Football Enthusiasten und leidenschaftlichen Dallas Cowboys Fan! 🏈🌍⭐ Mathis ist nicht nur ein Fan, er ist ein echter Fanatiker des Spiels. Seine Hingabe kennt keine Grenzen – buchstäblich! Einmal hat er sich sogar aus den USA zugeschaltet, nur um live beim Draft dabei zu sein und sicherzustellen, dass seine Cowboys nicht zu kurz kommen. Mathis' strategisches Geschick und sein unermüdlicher Einsatz machen ihn zu einem gefürchteten Gegner und geschätzten Mitspieler. Egal wo auf der Welt er sich befindet, er ist immer bereit, sein Team zum Sieg zu führen. Mathis, du bist ein wahrer Draft-Day-Held, und die Liga wäre ohne dich nicht dieselbe!"
const sBioCarsten = "Treffen Sie Carsten, den wandernden Fantasy Football Meister mit einer Leidenschaft für das Spiel! 🏈 Ursprünglich von der idyllischen Insel Rügen, zog Carsten für sein Studium nach Heidelberg und später nach Mainz. Carsten ist nicht nur im Fantasy Football aktiv, sondern auch ein echter Football-Enthusiast. Als großer Fan der Seattle Seahawks und mit seinem umfassenden Wissen über das Spiel, ist er ein geschätzter Mitspieler und Gegner. Egal, ob er auf Rügen den frischen Meereswind genießt oder in Mainz den Stadttrubel erlebt, Carsten bleibt immer dem Football treu. Ungebrochene Leidenschaft und strategisches Geschick – das ist Carsten!"
const sBioJan = "Treffen Sie Jan, den Arzt, der nicht nur Menschen heilt, sondern auch Football-Herzen höherschlagen lässt! 🏈⚽ Dieser Mainzer Mediziner jongliert gekonnt zwischen Stethoskop und Fantasy Football. Wenn er nicht gerade Bälle auf dem Fußballplatz kickt, genießt er es, das Gridiron-Spektakel zu verfolgen und sein Fantasy-Team zu managen. Ein Highlight der Liga war 2019, als Jan seinen ersten Draft-Pick auf unvergessliche Weise verkündete: im Saquon Barkley Trikot! Ein echter Showman, der wusste, wie man einen Auftritt hinlegt. Mit seiner humorvollen Art und seiner Leidenschaft sorgt Jan immer für spannende und unterhaltsame Spiele. Auch wenn es vorkommen kann, dass er den Draft verpasst und stattdessen auf einem Geburtstag an einem Badesee teilnimmt!"
const sBioThomas = "Treffen Sie Thomas, den alteingesessenen Seahawks-Fan und Football-Veteranen! 🏈🦅 Thomas ist schon dabei, seit Football noch auf Ran NFL im Fernsehen lief und bringt diese Erfahrung mit in jede Saison. Thomas ist nicht nur ein langjähriges Mitglied der Liga, sondern auch ein talentierter Scout, der immer wieder neue Mitspieler anwirbt. Mit seinem tiefen Wissen und seiner Leidenschaft für das Spiel sorgt er für frischen Wind und spannende Wettbewerbe. Cheers, Thomas – auf viele weitere Seasons voller Football-Fieber und großartiger Freundschaften!"
const sBioYannik = "Treffen Sie Yannik, den Fantasy Football Enthusiasten und stillen Strategen! 🏈🌍 Einmal hat Yannik sogar aus Kanada per Handy am Draft teilgenommen – wahre Hingabe kennt keine Grenzen! Yannik liebt es, Football zu schauen und ist stets engagiert dabei, wenn es um das Spiel geht. Mit seiner ruhigen und überlegten Art sorgt er für clevere Deals und spannende Wendungen in der Liga. Cheers, Yannik – auf viele weitere internationale Draft-Abenteuer und packende Football-Momente!"
const sBioKhalil = "Treffen Sie Khalil, den Fantasy Football Taktiker und virtuellen Kriegshelden! 🏈🎮 Wenn er nicht gerade in der Warzone von Urzikstan sein Unwesen treibt, genießt Khalil es, Football und Fußball zu schauen. Bekannt für seine wohlüberlegten Trades, hat Khalil in der Saison 2023 die meisten seiner Spieler für Picks weggetradet. Jetzt ist er im 'Win Now'-Modus und bereit, alles zu geben, um den Sieg zu holen. Mit seiner strategischen Denkweise und seinem unermüdlichen Ehrgeiz ist Khalil ein ernstzunehmender Gegner in der Liga. Cheers, Khalil – auf viele Siege und spannende Spieltage!"
const sBioMax = "Treffen Sie Max, das neueste Mitglied der Liga und den Blitzstarter der Saison 2023! 🏈🚀 Max stieg 2023 ein und holte sich direkt den Titel – eine beeindruckende Leistung, die alle sprachlos machte. Neben seiner Fantasy Football Leidenschaft ist Max auch ein begeisterter Langstreckenläufer und Marathon-Teilnehmer. Mit Ausdauer und einem unerschütterlichen Willen meistert er sowohl die Rennstrecke als auch das virtuelle Spielfeld. Willkommen in der Liga, Max – auf viele weitere Titel und persönliche Bestzeiten!"
const sBioMarco = "Treffen Sie Marco, den passiven Meister des Fantasy Football! 🏈😎 Marco ist bekannt dafür, keine Keeper festzulegen und auf Trade-Anfragen selten zu reagieren. Dennoch stellt er jedes Jahr ein starkes Team auf die Beine und schafft es immer wieder in die Playoffs. Mit den wenigsten Transaktionen und einer Vorliebe dafür, seine Aufstellung in letzter Minute zu setzen (oder es auch mal zu vergessen), bleibt Marco der entspannte Underdog der Liga. Wie auch immer er es macht, er schafft es stets, seine Mitspieler zu überraschen. Cheers, Marco – auf weitere überraschende Erfolge und entspanntes Management!"
const sBioToni = "Treffen Sie Toni, das Urgestein der Fantasy Football Liga – er war schon dabei, als die Dinosaurier noch auf dem Gridiron herumstampften! 🏈 2017 gehörte er zu den Gründungsmitgliedern, aber der Stress wurde ihm zu viel, und er konnte das Footballschauen nicht mehr in vollen Zügen genießen. Doch 2024 ist er zurückgekehrt, bereit, wieder ins Spiel einzusteigen und die Liga mit seiner Erfahrung zu bereichern. Mit einer Mischung aus nostalgischem Flair und einer frischen Perspektive ist Toni wieder voll im Fantasy Football Fieber. Seine Rückkehr verspricht nicht nur spannende Matches, sondern auch jede Menge Geschichten aus den alten Zeiten. Willkommen zurück, Toni – auf eine neue Ära voller Touchdowns, Trades und Triumph!"


export const managers = [
    {
      "managerID": "451366557545656320",
      "name": "Uli",
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
    {
      "managerID": "466576389869400064",
      "name": "Jan",
      "location": "Mainz", // (optional)
      "bio": sBioJan,
      "photo": "/managers/everyone.png", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2018, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "jax", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Rebuild", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": null,
      "favoritePlayer": 19766, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "RB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": null,
      "tradingScale": 5, // 1 - 10
      "preferredContact": "WhatsApp", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      "managerID": "467016163822399488",
      "name": "Thomas",
      "location": null, // (optional)
      "bio": sBioThomas,
      "photo": "/managers/everyone.png", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2018, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "sea", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Rebuild", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": null,
      "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "QB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": null,
      "tradingScale": 5, // 1 - 10
      "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      "managerID": "468037807059759104",
      "name": "Yannik",
      "location": null, // (optional)
      "bio": sBioYannik,
      "photo": "/managers/everyone.png", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2019, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "ne", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Rebuild", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": null,
      "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "TE", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": null,
      "tradingScale": 6, // 1 - 10
      "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      "managerID": "575117867750002688",
      "name": "Khalil",
      "location": "Karlsruhe", // (optional)
      "bio": sBioKhalil,
      "photo": "/managers/everyone.png", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2020, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "jax", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": null,
      "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "RB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": null,
      "tradingScale": 7, // 1 - 10
      "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      "managerID": "926989797925777408",
      "name": "Max",
      "location": "Heidelberg", // (optional)
      "bio": sBioMax,
      "photo": "/managers/everyone.png", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2023, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "gb", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Dynasty", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": null,
      "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "QB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": null,
      "tradingScale": 6, // 1 - 10
      "preferredContact": "Carrier Pigeon", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      "managerID": "455459734028283904",
      "name": "Marco",
      "location": "Au am Rhein", // (optional)
      "bio": sBioMarco,
      "photo": "/managers/everyone.png", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2018, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "ne", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Dynasty", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": null,
      "favoritePlayer": null, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "C", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": null,
      "tradingScale": 1, // 1 - 10
      "preferredContact": "Phone", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      "managerID": "1004418725535170560",
      "name": "Toni",
      "location": "Durmersheim", // (optional)
      "bio": sBioToni,
      "photo": "/managers/everyone.png", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "sea", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Dynasty", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": null,
      "favoritePlayer": 167, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "QB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": null,
      "tradingScale": 6, // 1 - 10
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
    