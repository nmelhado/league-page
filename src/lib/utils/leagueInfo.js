/*   STEP 1   */
export const leagueID = "1208621417810116608"; // your league ID
export const leagueName = "Eagan FFB"; // your league name
export const dues = 100; // (optional) used in template constitution page
export const dynasty = true; // true for dynasty leagues, false for redraft and keeper
export const enableBlog = true; // requires VITE_CONTENTFUL_ACCESS_TOKEN and VITE_CONTENTFUL_SPACE environment variables

/*   STEP 2   */
export const homepageText = `
<p>Established in 2008, we were ahead of the curve, and transitioned to dynasty in 2019. Since then, we have had a core group of active managers, passionate about the Consitution, competing for Lindberg's Retirement Portfolio (LRP™), and always, always, always trying to avoid the Load of Shame (LoS™). </p>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sortable Table</title>
    <style>
        body {
            font-family: 'Avenir', sans-serif;
            background-color: #1177cc;
            color: #00884;
            margin: 0;
            padding: 0;
        }
        header {
            background-color: #1177cc;
            padding: 20px;
            text-align: center;
        }
        header h1 {
            font-size: 2.5em;
            margin: 0;
        }
        .container {
            padding: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            padding: 10px;
            border: 1px solid #444;
            text-align: left;
        }
        th {
            cursor: pointer;
            background-color: #555;
        }
        th:hover {
            background-color: #08844;
        }
    </style>
</head>
<body>
    <header>
        <h1>Standings</h1>
    </header>
    <div style="text-align: center;">
        <p> Every effort will be made to keep the below standings up to date.
            However, <a href="https://sites.google.com/view/effb-sup/standings" target="_blank">here</a> are the official standings.
        </p>
    </div>

    <div class="container">
        <table id="sortableTable">
            <thead>
                <tr>
                    <th onclick="sortTable(0)">Player</th>
                    <th onclick="sortTable(1)"data-sort-default="desc">VP</th>
                    <th onclick="sortTable(2)">Points For</th>
                    <th onclick="sortTable(3)">Wins</th>
                    <th onclick="sortTable(4)">Loss</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Tsim</td><td>4</td><td>120.18</td><td>1</td><td>0</td></tr>
                <tr><td>John</td><td>4</td><td>119.86</td><td>1</td><td>0</td></tr>
                <tr><td>Vollmuth</td><td>4</td><td>119.08</td><td>1</td><td>0</td></tr>
                <tr><td>Charlie</td><td>3</td><td>109.72</td><td>1</td><td>0</td></tr>
                <tr><td>Gorman</td><td>3</td><td>99.92</td><td>1</td><td>0</td></tr>
                <tr><td>Tyler</td><td>2</td><td>118.66</td><td>0</td><td>1</td></tr>
                <tr><td>Newman</td><td>2</td><td>86.72</td><td>1</td><td>0</td></tr>
                <tr><td>Lindberg</td><td>1</td><td>104.42</td><td>0</td><td>1</td></tr>
                <tr><td>EVB</td><td>1</td><td>92.58</td><td>0</td><td>1</td></tr>
                <tr><td>Josh</td><td>0</td><td>86.62</td><td>0</td><td>1</td></tr>
                <tr><td>Smithers</td><td>0</td><td>85.18</td><td>0</td><td>1</td></tr>
                <tr><td>Henry</td><td>0</td><td>58.32</td><td>0</td><td>1</td></tr>
            </tbody>
        </table>
    </div>
    <script>
        function sortTable(columnIndex, ascending = false) {
            const table = document.getElementById("sortableTable");
            const rows = Array.from(table.rows).slice(1);
            const isNumeric = !isNaN(rows[0].cells[columnIndex].innerText);
            
            rows.sort((row1, row2) => {
                const cell1 = row1.cells[columnIndex].innerText;
                const cell2 = row2.cells[columnIndex].innerText;
                
                let comparison;
                if (isNumeric) {
                    comparison = parseFloat(cell1) - parseFloat(cell2);
                } else {
                    comparison = cell1.localeCompare(cell2);
                }
                
                return ascending ? comparison : -comparison;
                localStorage.setItem('sortColumnIndex', columnIndex);
                localStorage.setItem('sortAscending', ascending);
            });
            
            rows.forEach(row => table.appendChild(row));
        }

        document.addEventListener("DOMContentLoaded", () => {
            const defaultSortHeader = document.querySelector('th[data-sort-default]');
            if (defaultSortHeader) {
                const columnIndex = Array.from(defaultSortHeader.parentNode.children).indexOf(defaultSortHeader);
                const sortOrder = defaultSortHeader.getAttribute('data-sort-default') === 'desc' ? false : true;
                sortTable(columnIndex, sortOrder);
            }
        });
    </script>
</body>
</html>

<!-- irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> -->
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
      "managerID": "76934747653554176",
      "name": "Smithers",
      // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "Rosemount", // (optional)
      "bio": "The last of the OGs. Between himself and John, he is what is left of the first league established in 2008.<br><br>Breaking into the scene with a #1 regular season finish, he finally captured his 1st Schwanz in 2021, but faltered at his attempt to achieve the Lindberg retirement portfolio (LRP (™)) the following year. Attempting to recapture greatness, the injury bug derailed his season resulting in a complete Gorman-esque firesale to begin the 2024 season.<br><br>The Commissioner is an avid trader, if you haven’t received a trade from him, you probably aren't worthy… of anything. The biggest feather in his cap is probably <b>86.98% line up accuracy score</b>, good for first in the league and something he can strive for while rebuilding.<br><br> The commissioner isn’t the best drafter. To be fair, he’s only had first rounder in two drafts, but those 1st include: Jalen Reagor, Ladd McConkey, and Brian Thomas. While 2nd rounders+ don’t usually have a high hit rate, many of these players don’t have any fantasy impact. He lives on the waiver wire with 286 waiver moves a year.<br><br>It will be interesting to see, given the plethora of picks he has acquired, if he can get his drafts straight and get back within range of the Schwanz quicker than anticipated.",
      "photo": "/managers/smithers.jpg", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2009, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "gb", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Rebuild", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": {
        name: "Tim", // Can be anything (usually your rival's name)
        link: 9, // manager array number within this array, or null to link back to all managers page
        image: "/managers/tim.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      },
      "favoritePlayer": 4984, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": "Trade his way to relevance, with a sprinkle of waiver success.",
      "tradingScale": 10, // 1 - 10
      "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      "managerID": "513143086936379392",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
      "name": "Alex aka Newman",
      "tookOver": 2025, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "Eagan", // (optional)
      "bio": "A stalwart and champion from the triple-A Rochester league, Alex received the call to “The Show” when Anders gracefully bowed out of any more suffering, leaving Alex with the 1.01, and a decision to rebuild or attempt to be the first two design champion. He chose the former. Upon breaking into the league, he promptly started the rebuild (which Anders should have done ages ago), acquiring a slew of ‘26 and ‘27 picks while maintaining the 1.01.<br><br> Coming in with a solid commitment to being active and a plan to become the first orphan team to win the Schwanz, we look forward to his renegging of trades, and building a solid future for someone to burn down.",
      "photo": "/managers/newman.png", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2018, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "phi", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Rebuild", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": {
        name: "Smithers and  John", // Can be anything (usually your rival's name)
        link: 4, // manager array number within this array, or null to link back to all managers page
        image: "/managers/john.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      },
      "favoritePlayer": 6904, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "QB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": "Collect all of the 2026 and 2027 picks",
      "tradingScale": 9, // 1 - 10
      "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
      "managerID": "455488143940907008",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
      "name": "Charlie",
      // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
      "location": "San Diego?", // (optional)
      "bio": "Charlie played one year with the league before deciding that we were one of the best, most well run, wildly fun league in the continental United States, and taking the journey into dynasty with us. After seeing the throb of the LoS in our inaugural year, Charlie has competed for the Schwanz every year since. He had an excellent initial draft, nailing it with: Davante Adams, Dalvin Cook, and Ekeler. His lack of QB and drafting Derrious not-Guice probably hindered his initial year. But since then, bro has nailed his rookie drafts: Lamb, Lawrence, Daniels, Achane, Collins, Love – with the former four being his 1st rounders, going to prove that you can lose the league in the draft. Meaning that he didn’t lose the league because he draft so well, see?<br><br> Now, let’s talk about his downfall. Two big trades (which I might add have been ¼ of his trades, so a large amount) have led to his aging team hanging on by a thread: trading away Lamb (for Alcoholic Addisen and Rent-a-Zeke Pollard) and Nico Collins (for Sony Michel). To be fair, the latter was before a Collins explosion. But Charlie needs to trust himself and his draft expertise so he doesn’t wallow in 5th place purgatory for the foreseeable future.<br><br> Charlie, over the last five years has had the strongest team with his potential points leading the league at <b>10198.16</b>, which is nearly 200 more than Tim almost 400 more than the 3rd place team. Unfortunately, a lot of that was unrealized potential – his rate of 83.31% puts him less than one percentage point higher than the 10th place team.<br><br>Charlie is his own worst enemy, and his Bestest Mensch. Trust himself in the draft, but maybe take a page out of the commish’s book and maximize his potential.",
      "photo": "/managers/charlie.jpg", // square ratio recommended (no larger than 500x500)
      "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
      "favoriteTeam": "min", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
      "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
      "rival": {
        name: "Vollmuth", // Can be anything (usually your rival's name)
        link: 6, // manager array number within this array, or null to link back to all managers page
        image: "/managers/vollmuth.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
      },
      "favoritePlayer": 9226, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
      "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
      "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
      "philosophy": "Draft well, trade those picks, whine about trading for a defense, compete.",
      "tradingScale": 7, // 1 - 10
      "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    },
    {
        "managerID": "455488749686484992",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "name": "John",
        // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Rochester", // (optional)
        "bio": "John is the only other OG from the conception of the Eagan FFB back in 2009. He is also the <b>most winningest team</b> with 5 Championships – 4 from the standard days and 1 from dynasty, respectfully. He also is the only manager to win two times in a row, unfortunately he was the last int he standard and first in the dynasty, so Lindberg’s retirement is still safe.<br><br>After competing for three years, he blew up his team in 2022, taking the Load that year, but quickly rising to relevance with some savvy trades in the off season. 2024 may be the realization of one of the quickest rebuilds in history.<br><br>Speaking of trades, John has accounted for almost 15% (35 total) of all the league’s trades with the next being Gorman with 27. To be perfectly frank, he doesn’t lose many trades. The biggest ones he probably lost involved Tyreek Hill… twice. Besides that, he doesn’t lose, or destroys in the trades. This accounts for his quick turnaround. He is also the waiver wire king, finding diamonds in the rough – Kenyan Drake and Breshad Perriman come to mind as key contributors to his championship run.<br><br>His drafts have been decent, usually not losing value with his first rounders, and finding some true values in the later rounds: Brian Robinson, Jerome Ford, Darnell Mooney. His drafts have at least not busted enough to hamstring the rebuild attempts.<br><br> Now, where he struggles is implementing those nice transactions into maximizing points. He is in the bottom half of roster IQ at 82.40%. Which is only .7% more than perennial LoS and now defunct manager, Selby. Me thinks, perhaps a little more research into the week in and week out of his roster might prove more fruitful, perhaps with a bye or two in the coming years.<br><br>With that being said, the league would not be what it is without him. He is constantly engaged, bringing new and fruitful ideas to the forefront. Always responding to trades, and active. Maybe if the rest of you would trade as often as he does, you might be in line for a Schwanz as well.",
        "photo": "/managers/john.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2009, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "min", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Dynasty", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival": {
          name: "EVB", // Can be anything (usually your rival's name)
          link: 13, // manager array number within this array, or null to link back to all managers page
          image: "/managers/evb.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 4179, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Trade, trade trade. Make the playoffs and crush with absurd waiver pickups.",
        "tradingScale": 10, // 1 - 10
        "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
      },
      {
        "managerID": "455492628645933056",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "name": "Lindberg",
        // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Burnsville", // (optional)
        "bio": "The march towards his rightful retirement has been a struggle for his name sake. Since making the playoffs in the first year (via a technicality, and honorable acceptance of 2024’s champion), Lindberg has been on the struggle bus, racking up 5 of the top 10 lowest week totals and three of the lowest yearly totals.<br><br>Now, let’s try not to rag too hard on the Studberg, he is, afterall, a dynasty OG – and he has some good qualities too. He was instrumental in initiating the first amendment, followed up by more instrumentalness by setting the precedent of not having to receive punishments. He also sets his line up every week. Now, it’s not all doom and gloom, while hitting or missing on trades, they haven’t necessarily kept him from competing. But his drafts could use a bit of research/luck. In the initial rookie draft, he traded away his 1st for Leonard Fournette, followed up with two duds in Pitts and Rondale Moore, followed by Breece (who promptly destroyed his knee) and Skyy Moore. These bad picks and bad luck are probably the major reason for his suffering. But, on the flip side, he hits pretty well for non-1st rounders: Rashee Rice (2.01), Tank Dell (3.01), George Pickens (2.01), Antonio Gibson (2.07) – in fact, the only year he didn’t hit with a later round pick was 2021.<br><br>Things are looking up for Lindberg’s future. While still not the behemoth he could have been, he is in the playoff hunt for 2024 after making some savvy trades, and drafting safely. His 82.45% manager IQ is respectable. His waiver activity could use a bump and could aid in building a more secure roster.<br><br>If he can avoid total busts in his early round picks, and continue hitting on later picks, he might be strongly competing for his retirement faster than anticipated.",
        "photo": "/managers/lindberg.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "min", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Not Sure", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival": {
          name: "Anders", // Can be anything (usually your rival's name)
          link: 3, // manager array number within this array, or null to link back to all managers page
          image: "/managers/anders.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 4017, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "QB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Draft 1st round busts, hit gold in the later rounds, suffer, look down the barrel of the LoS, pray for his retirement",
        "tradingScale": 3, // 1 - 10
        "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
      },
      {
        "managerID": "455493031966011392",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "name": "Gorman",
        "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Minneapolis", // (optional)
        "bio": "Always the bridesmaid, never the bride. Kind of. You know what, no, that works. He is only the only manager to finish in 2nd place twice. And if he’s not competing, he’s competing for the LoS, which he has yet to gloriously receive.<br><br>After competing (or attempting to compete) for four years, Gorman blew up his team in for the 2023 season, finishing with the 2nd worst VPs all time. He has cautiously rebuilt his team in attempts to rub the stain of 2nd place off his record with a 2025 Schwanz run.<br><br>Gorman doesn’t shy away from not cutting lose with his team. He is (you guessed it), 2nd in waiver moves, and 2nd in trades. He also is pretty communist whilst trading, completing trades with half the league. Now, while we like Gorman for his engagement, we <b>love</b> him for his manager IQ, meaning it’s not great. The only non-defunct manager he outranks is Reno by .09%. Maybe a little more time crunching fantasy football and not numbers would result in a ‘ship or two for him.<br><br>Gorman is a pretty decent drafter. He’s like a coked up Lindberg sprinkled with a little Anders. His only true bust was Isaiah Spiller in 2022. One could argue Burrow in 2020, with Higgins, Pittman, and Aiyuk still on the board, but Burrow is hardly a bust – maybe a missed opportunity. Anyway, he has some good hits with Kincaid, Shakir, Stevenson, Khalil Herbert, Jalen Hurts, (maybe Bibgsy and Spears), in the later rounds.<br><br> Gorman is the only other repeat champion dating back to the inception of the league in 2009, granted those were both in re-draft. He’s also the most winningest manager… in redraft. The magic seemed to be lost when we transitioned ;). As Gorman transitions his team from rebuilding to contender, he’d do well to behave like this is re-draft and capture some of the magic that made him prolific in his early fantasy football years.",
        "photo": "/managers/gorman.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2013, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "min", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Rebuild", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival": {
          name: "Tom", // Can be anything (usually your rival's name)
          link: 9, // manager array number within this array, or null to link back to all managers page
          image: "/managers/tim.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 6943, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "Picks", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Get performance anxiety, blame it on his team. Slowly rebuild a behemoth.",
        "tradingScale": 10, // 1 - 10
        "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
      },
      {
        "managerID": "455981978773090304",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "name": "Vollmuth",
        // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Seattle", // (optional)
        "bio": "Vollmuth, our resident Chief Justice of the Constitution, 2023 champion, Agent of Chaos, and second most winningest team in the league will be entering his tenth season in the EFFB, perhaps it will result in the claim to the empire pot aka the LRP. While he suffered quite a bit in re-draft, dynasty has been his jam. Missing the playoffs only once (on a technicality that he honorably pointed out), he finally earned his stripes in 2023.<br><br>Without digging to deep in too deep, it seems Vollmuth has built his team through trading. His drafts have been, sub-par, even with the snag of Puka. He has captured, without the asterisks of trade rape: Pacheco, Nico Collins, Michael Pittman, Amari Cooper, Joe Mixon, Deebo Samuel, DeAndre Hopkins; with the former few having career years peaking during the playoffs to jetison him to his first Schwanz.<br><br>Vollmuth also is the <b>only manager to break the 200 pt on the week barrier</b>, and is 4th on the all time highest points scored in a season. My god, he also holds 4 of teh 10 biggest blowouts as well. He also has a top tier manager IQ with a nice round 84%. As much as I want to slander the champ and chalk all of his success up to an easy schedule, these last two points show that he may occasionally get the worst of some teams, but with the brilliance he shows in his weekly starters, he would most likely win all of those games anyways. Savvy picks in his chaos specialty   (defense and kickers) most likely lend their hand in his success, but that success has been earned, not given.",
        "photo": "/managers/vollmuth.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "min", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival": {
          name: "Everyone", // Can be anything (usually your rival's name)
          link: 6, // manager array number within this array, or null to link back to all managers page
          image: "/managers/_everyone.jpeg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 6797, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "RB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Win trades, embrace chaos, start strong rosters.",
        "tradingScale": 8, // 1 - 10
        "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
      },
      {
        "managerID": "456209254974484480",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "name": "TimTom",
        // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Minneapolis", // (optional)
        "bio": "Dare I say, the most prolific manager in the league? A stunning <b>.676 win percentage</b>, 3 VPs more than 2nd place, never missed the playoffs once, <b>the only manager with a finish of 1st, 2nd, 3rd, and 4th</b>, all while training only 7 times, and making less than 100 waiver moves. I’m not sure how he does it, he’s had like one “block buster” trade – 2023 for Tyreek. Looking at this, he’s still riding high off his initial draft in 2019: Connor, Jones, Henry, Lockett, Engram, Russel “DangeRuss” Wilson. And then a massive hit in Justin JEfferson and a trade for Tyreek really rounds out his starting line up in 2019… and 2024.<br><br>Tom has never had prolific drafts, but all you need to do is hit on Justin Jefferson and Sam LaPorta, and you’re golden. Now, he is getting up there in age, but for being the behemoth of a team that he is, he might as well ride off into the sunset, a few more ‘ships to his name and the LRP slung over his shoulders.<br><br> Did I mention how dominant Tim has been during his tenure? He holds 3 of the top 10 highest scoring weeks, 4 out of 10 for highest points ina  season (that’s almost every year…), boasts the 2nd highest manager IQ in the league at 86.04, has the <b>all time highest total fantasy points: 8621.97</b>, and <b>most wins</b>. He’s had an absurdly amazing five years, I mean if you look at his manager page, it’s riddled with awards. This may be the swan song for Tim, but I believe it was the apostle Theoden who said: <i>If this is to be our end, then I would have… such an end, as to be worthy of remembrance</i>.",
        "photo": "/managers/tim.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2012, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "min", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival": {
          name: "Gorman", // Can be anything (usually your rival's name)
          link: 7, // manager array number within this array, or null to link back to all managers page
          image: "/managers/gorman.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 6794, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Hit a few draft picks, make coordinated trades, destroy.",
        "tradingScale": 3, // 1 - 10
        "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
      },
      {
        "managerID": "545823705639251968",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "name": "Tyler",
        "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Rochester", // (optional)
        "bio": "Ah, our first orphan team take-over. Garrett, our first commissioner, mastermind behind the re-draft league, left his team high and dry in our first year, and he was promptly replaced by Tyler Broberg, a more attentive, loving, and wiley manager than Garrett could have ever hoped to be. After taking over for the 2020 season, Tyler went HAM and immediately began his rebuild, accepting the LoS that year. He proceeded to lay the blueprint for a slow and steady rebuild process. Since receiving the Load, he has steadily gained 2 wins per year, making the playoffs in 2023. Now, it might not have been as sexy as John’s immediate turn around, but this might be the blueprint for sustained success and a true shot at LRP. Bro has the WR4, WR6, WR11, and WR17, just an insane group of young studs. All done through the draft. No falling into it, no trade manipulation (unless you count using his brother as a lackey to acquire picks).<br><br>Speaking of drafts, Tyler might have the most successful drafts of all time. As we know, you can lose a league, or significantly set yourself back years by drafting poorly. Not only does he rarely bust, but he hit just about every single 1st rounder: Najee Harris, Drake London,Ja’marr  Chase, Garrett Wilson, JK Dobbins, Devonta Smith, Bryce Young. One could argue that Dobbins was/is a bust, but before the injury he was definitely an asset, and the jury is still our on Bryce. He has also hit on a few later picks: Pacheco, Pierce, Reed, Doubs.<br><br>The point is, that core of WRs will keep him in contention for the next 6 years. If he can build a solid RB troupe to be the supporting cast to his potentially behemoth of a team, he may be the first team to but the LRP in serious jeopardy.",
        "photo": "/managers/tyler.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2020, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "min", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Dynasty", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival": {
          name: "John", // Can be anything (usually your rival's name)
          link: 3, // manager array number within this array, or null to link back to all managers page
          image: "/managers/john.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 8146, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Both", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Calculated moves, researched draft picks, ride his WRs",
        "tradingScale": 8, // 1 - 10
        "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
      },
      {
        "managerID": "725717640638738432",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "name": "Josh",
        "tookOver": 2021, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Eagan?", // (optional)
        "bio": "Taking over for the god awful shit team that was Selbys, it has been an upward struggle to relevance for Reno With a flurry of trades, he has now set himself up for a serious run at the Schwanz. Much like Tyler, he too, drafts in a way that he doesn’t lose his progress with 1st round busts, snagging JSN, KWIII, James Cook, Christian Watson, and Travis Etienne. While not as prolific as Mr. Brobergs, they have all been major pieces in building a competitive team. Since bursting onto the scene in 2021, he ranks 2nd in trades and waiver moves per year, and was the orchestrator of the only (and most satisfying) threeway.<br><br>Unfortunately, for as active a trade partner and manager that he is, he ranks dead last (of active teams) in manager IQ – lower than Selby, lower than Lindberg, lower than Anders – all LoS recipients. It doesn’t matter how great of a thing you have is on paper, if you can’t use it properly, it’s all for naught – the motion of the ocean I believe they call it.<br><br>Now, according to many league rankers, Reno is near the top, making some team boosting trades during the 2024 offseason, he’s traded youth/picks for older, established players. While this most certainly strengthened his team into a contender, his ‘ship window has shrunk, and he will need near peak seasons from his aging vets to put some pressure on the current power rank leaders. That being said for the first 3-4 years, we have been pretty consistent in terms of who was competing, Reno is part of the new guard, fresh blood, hankering for a shot at the Schwanz. As established vets age out, as long as Reno raises his manager IQ, we could see him lead the charge of the new contenders – much like the Avengers. This new era will be “Phase 4”, not as new, sleek, or entertaining as the previous phases, but necessary for the survival of the franchise.",
        "photo": "/managers/reno.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2021, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "min", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Not Sure", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival": {
          name: "Gorman", // Can be anything (usually your rival's name)
          link: 5, // manager array number within this array, or null to link back to all managers page
          image: "/managers/gorman.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 7543, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Draft well, trade ok, manage poorly, fall into competing.",
        "tradingScale": 6, // 1 - 10
        "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
      },
      {
        "managerID": "1096469765155180544",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "name": "Henry",
        "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Mendota Heights", // (optional)
        "bio": "Back from the dead, Henry is now the third manager of this team – initially draft by Tyler Nelson, and ran into the ground by Zack, Henry makes his triumphant return to the League. He was one of teh OGs from 2009, but took a 7 year hiatus after the 2016 season. He immediately made a splash, trading away Tee Higgins for what turned into Caleb Williams – which oddly enough, followed in the same steps as his predecessor. Thank goodness he didn’t follow that dipshit’s TE obsession. Henry boasts the best QB room in the league with Stroud, Williams, Tua, and Rodgers – it’s a shame we’re not doing a super-super flex league.<br><br>Back in the redraft league, Henry was pretty competitive, while finishing at exactly .500, he did finished in 2nd once, 3rd once, and 4th twice – going for the career grand slam, the only thing missing from his mantel is the illustrious Schwanz.<br><br>As he begins is rebuild (I think), it’s hard to anticipate the next path forward for Hank. His last year he finished 4th, which shows some ability to set a solid line up. He also had a pretty solid draft – while Caleb <i>might’ve</i> been a reach, if Caleb hits his ceiling, we will look back favorably on that pick. Worthy was solid and has been getting buzz in camp, the Rice and Johnson picks were solid. Time will tell whether he is successful or not.<br><br>There is not enough data points to project how this team will be run. But as the third manager of the team, I doubt he could be any worse than the previous two. Hopefully he takes the team in stride and works some magic to bring this team tp the promised land.",
        "photo": "/managers/henry.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "min", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Rebuild", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival": {
          name: "EVB", // Can be anything (usually your rival's name)
          link: 13, // manager array number within this array, or null to link back to all managers page
          image: "/managers/evb.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 11560, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "QB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Get his guys, clean up 5 years of mess.",
        "tradingScale": 5, // 1 - 10
        "preferredContact": "Text", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
      },
      {
        "managerID": "455914869548380160",  // ID of the roster that the manager manages (look at the order of the power rankings graph)
        "name": "EVB",
        // "tookOver": 2020, // (optional) used if a manager took over a team, delete this line or change to null otherwise
        "location": "Seattle", // (optional)
        "bio": "Gracing our presence in 2011, EVB became the second most winningest team during our redraft days, he promptly reverted all of his hard work to receive the coveted Load in our inaugural season. It took three years of great draft and even more ballsy trading to get him into serious contention for the Schwanz. As with most successful teams, he’s hit on most of his first rounders, with only Henry Ruggs speeding off into bust land. He boasts a #6 ranked manager IQ which may be the reason he just hasn’t hit the peak yet – we’ll see coming into his third year actually competing.<br><br>Sniffing success in 2021, and a decent draft coming into the 2022 season, EVB was able to parlay his assets to achieve arguably the QB1 in Patrick Mahomes, and not so much arguably the RB1 in Christian McCaffery. He then has been able to pair that with Bijan and JTT, creating one of the most powerful RB rooms in the league – we’re talking three of the top five RBs. To put that in perspective, John has the second best RB room, and he’s sitting with Breece, Rachaad White, and Javonte Williams: RB2, RB15, and RB23, respectively.  He’s a bit thin and aging at WR position, but riding Mike Evans and DeAndre Hopkins into the dirt isn’t an awful strategy if the team is buoyed by three stallions. But if he truly wants to compete, strengthening his WR is a good place to start.<br><br> 2024 is ripe for the picking with the changing of the guard in full swing, leaving an opportunity for a mega team to come in and take what is rightfully Lindbergs. EVB has the future assets to improve his WR corp, I would do so with haste before the stock market crashes.",
        "photo": "/managers/evb.jpg", // square ratio recommended (no larger than 500x500)
        "fantasyStart": 2011, // (optional) when did the manager start playing fantasy football
        "favoriteTeam": "min", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
        "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
        "rival": {
          name: "Henry", // Can be anything (usually your rival's name)
          link: 12, // manager array number within this array, or null to link back to all managers page
          image: "/managers/henry.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
        },
        "favoritePlayer": 6794, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
        "valuePosition": "RB", // (optional) Favorite position (QB, WR, RB, TE, etc.)
        "rookieOrVets": "Vets", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
        "philosophy": "Hit draft picks, make mega trades, miss his potential, get 2nd place.",
        "tradingScale": 2, // 1 - 10
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
    
