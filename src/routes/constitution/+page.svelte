<script>
    import { dues } from '$lib/utils/helper';
    let one, oneOne, oneTwo, oneThree;
    let two;
    let three;
    let four;
    let five;
    let six, sixOne, sixTwo, sixThree, sixFour, sixFive, sixSix;
    let seven, sevenOne, sevenTwo, sevenThree, sevenFour;
    let eight, eightOne, eightTwo, eightThree, eightFour, eightFive, eightSix;
    let nine;
    let ten;
    let eleven;
    let twelve;

    const goToSection = (section) => {
        const top = section.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({left: 0, top, behavior: 'smooth'});
    }
</script>

<style>
    .constitution {
        position: relative;
        z-index: 1;
        width: 92%;
        max-width: 800px;
        margin: 8em auto 10em;
    }

    h1 {
        font-size: 2em;
        line-height: 1.2em;
        text-align: center;
        margin: 2em 0 1.5em;
    }

    h2 {
        font-size: 1.5em;
        line-height: 1.2em;
    }

    h3 {
        text-decoration: underline;
        font-size: 1.3em;
        line-height: 1.2em;
    }

    h4 {
        text-decoration: underline;
        margin-left: 2em;
        font-size: 1.2em;
        line-height: 1.2em;
    }

    h5 {
        margin-left: 6em;
        font-size: 0.8em;
        line-height: 1.1em;
    }

    .subBlock {
        margin-left: 2.4em;
    }

    .sectionHeading {
        margin: 4em 0 1.5em;
    }

    .subSectionHeading {
        margin: 1.5em 0 1.5em;
    }

    .underscore {
        text-decoration: underline;
    }

    .right {
        text-align: right;
    }

    .positionMaximums td {
        min-width: 3em;
    }

    .noUnderscore {
        text-decoration: none;
    }

    .clickable {
        cursor: pointer;
    }

    .clickable:hover {
        color: #00316b;
    }

    p {
        color: #777;
    }
</style>

<div class="constitution">
    <h1 class="noUnderscore">The Cascadian Dynastic League of Legends</h1>
    
    <h2 class="noUnderscore">Table of Contents</h2>
    
    <h3 class="noUnderscore clickable" onclick={() => goToSection(one)}>Section 1: General League Setup</h3>

        <h4 class="noUnderscore clickable" onclick={() => goToSection(oneOne)}>1.1 League Affiliation</h4>
        <h4 class="noUnderscore clickable" onclick={() => goToSection(oneTwo)}>1.2 League Hosting</h4>
        <h4 class="noUnderscore clickable" onclick={() => goToSection(oneThree)}>1.3 Franchises</h4>
    
    <h3 class="noUnderscore clickable" onclick={() => goToSection(two)}>Section 2: Entry Fee</h3>
    
    <h3 class="noUnderscore clickable" onclick={() => goToSection(three)}>Section 3: Seasonal Pay-out</h3>
    
    <h3 class="noUnderscore clickable" onclick={() => goToSection(four)}>Section 4: League Schedule</h3>

    <h3 class="noUnderscore clickable" onclick={() => goToSection(five)}>Section 5: Playoffs</h3>

    <h3 class="noUnderscore clickable" onclick={() => goToSection(six)}>Section 6: Team Rosters</h3>
    
        <h4 class="noUnderscore clickable" onclick={() => goToSection(sixOne)}>6.1 Starters</h4>
        <h4 class="noUnderscore clickable" onclick={() => goToSection(sixTwo)}>6.2 Auto Subs</h4>
        <h4 class="noUnderscore clickable" onclick={() => goToSection(sixThree)}>6.3 Bench</h4>
        <h4 class="noUnderscore clickable" onclick={() => goToSection(sixFour)}>6.4 Injured Reserve Slot</h4>
        <h4 class="noUnderscore clickable" onclick={() => goToSection(sixFive)}>6.5 Taxi Team</h4>
        <h4 class="noUnderscore clickable" onclick={() => goToSection(sixSix)}>6.6 Taxi Team Player Eligibility</h4>

    <h3 class="noUnderscore clickable" onclick={() => goToSection(seven)}>Section 7: Scoring</h3>
    
        <h4 class="noUnderscore clickable" onclick={() => goToSection(sevenOne)}>7.1 Passing</h4>
        <h4 class="noUnderscore clickable" onclick={() => goToSection(sevenTwo)}>7.2 Rushing</h4>
        <h4 class="noUnderscore clickable" onclick={() => goToSection(sevenThree)}>7.3 Receiving</h4>
        <h4 class="noUnderscore clickable" onclick={() => goToSection(sevenFour)}>7.4 Bonus</h4>

    <h3 class="noUnderscore clickable" onclick={() => goToSection(eight)}>Section 8: Rookie Draft</h3>
    
        <h4 class="noUnderscore clickable" onclick={() => goToSection(eightOne)}>8.1 Draft Type</h4>
        <h4 class="noUnderscore clickable" onclick={() => goToSection(eightTwo)}>8.2 Pick Order</h4>
        <h4 class="noUnderscore clickable" onclick={() => goToSection(eightThree)}>8.3 Draft Schedule</h4>
        <h4 class="noUnderscore clickable" onclick={() => goToSection(eightFour)}>8.4 Pick Clock</h4>
        <h4 class="noUnderscore clickable" onclick={() => goToSection(eightFive)}>8.5 Draft Pause</h4>
        <h4 class="noUnderscore clickable" onclick={() => goToSection(eightSix)}>8.6 Draft Pick Trades</h4>

    <h3 class="noUnderscore clickable" onclick={() => goToSection(nine)}>Section 9: Waivers</h3>

    <h3 class="noUnderscore clickable" onclick={() => goToSection(ten)}>Section 10: Trades</h3>

    <h3 class="noUnderscore clickable" onclick={() => goToSection(eleven)}>Section 11: League Renewal</h3>

    <h3 class="noUnderscore clickable" onclick={() => goToSection(twelve)}>Section 12: General</h3>    
    
    <hr />
    
    <h2 class="sectionHeading" bind:this={one}>Section 1 General League Setup</h2>
    
    <h3 class="subSectionHeading" bind:this={oneOne}>1.1 League Affiliation</h3>
    
    <p>This league will replace The Cascadian Regular Re-Draft League, previously hosted on <a href="https://football.fantasysports.yahoo.com/league/cascadiansuperbowl">Yahoo</a>.</p>
    
    <h3 class="subSectionHeading" bind:this={oneTwo}>1.2 League Hosting</h3>
    
    <p>Due to the complexities of dynasty leagues and the restrictions on Yahoo drafting types and scheduling, the league shall be hosted on <a href="https://sleeper.com/leagues/1050870072245342208">Sleeper</a>.</p>
    
    <h3 bind:this={oneThree}>1.3 Franchises</h3>
    
    <p>The League will be made up of 10 Franchises.</p>
  
    <h2 class="sectionHeading" bind:this={two}>Section 2 Entry Fee</h2>
    
    <p>The league shall unanimously vote via poll the appropriate entry fee each Franchise will pay at the beginning of each new season. Season 1 League dues shall be {dues}$ per Franchise.</p>
    <p>League dues will be payable to the Commissioner, or Commissioner appointed person by the beginning of the NFL’s Hall of Fame game each season.</p>
    <p>Any dues not received by the deadline will result in your team being frozen until paid.</p>
    
    <h2 class="sectionHeading" bind:this={three}>Section 3 Seasonal Pay-out</h2>

    <p>The winner of the Playoff Championship game, aka. The Superb Owl will be awarded 75% of the total entry fee collected for that season.</p>
    <p>The regular season winner will receive the remaining 25% of the total entry fee collected for that season.</p>
    <p>Pay-out will be sent via requested means within 7 days of the completion of the Superb Owl.</p>

    <h2 class="sectionHeading" bind:this={four}>Section 4 League Schedule</h2>

    <p>The regular season will be made up of 14 playing weeks, starting Week 1 and ending with the conclusion of Week 14.</p>
    <p>Each team will play each other a minimum of once.</p>
    <p>Where multiple head to heads are required based on league size the duplicate fixtures will be scheduled based on a strength of schedule in reverse of the league power rankings. i.e. 1st v 2nd and 9th v 10th will play each other more frequently than 1st v 10th and 2nd v 9th etc.</p>
        
    <h2 class="sectionHeading" bind:this={five}>Section 5 Playoffs</h2>

    <p>The playoffs run from week 15 through 17 of the NFL regular season.</p>
    <p>The playoffs will be made up of the top 6 Franchises, 1st and 2nd placed Franchises will receive a bye in week 15.</p>
    <p>Playoffs will not be re-seeded between rounds. Franchises will be seeded based on the final league standings.</p>
    <p>A consolation bracket will be held for all non-qualifying teams but will not impact standing order for the following season’s rookie draft.</p>

    <h2 class="sectionHeading" bind:this={six}>Section 6 Team Rosters</h2>
    
    <h3 bind:this={sixOne}>6.1 Starters</h3>
    <p>The roster shall be considered as a Super Flex league to increase the importance of Passers. There will be no Kickers or D/Special Teams. The Starting Roster shall be composed of the following skill positions for a total 10 starters:</p>
    <ul>
        <li>QB</li>
        <li>RB</li>
        <li>RB</li>
        <li>WR</li>
        <li>WR</li>
        <li>WR</li>
        <li>TE</li>
        <li>FLEX (RB/WR/TE)</li>
        <li>R.FLEX (WR/TE)</li>
        <li>S.FLEX (QB/RB/WR/TE)</li>
    </ul>
  
    <h3 bind:this={sixTwo}>6.2 Auto Subs</h3>
    <p>Updated for season 2025</p>
    <p>Each Franchise shall have the option to nominate up to three auto subs per game week.</p>
    <p>If a starter is inactive for their game, a franchise may designate a substitute to be automatically placed in the starting lineup in their place. The Auto Sub may not play before the starter and the sub's position must be eligible for the starter's roster position. Each sub may only be matched to a maximum of one starter.</p>

    <h3 bind:this={sixThree}>6.3 Bench</h3>
    <p>Each Franchise shall have a bench in addition to their weekly starters, bench size will be 15, for a total of 25 players per Franchise. Except during the off-season, see Section 6.4 Injured Reserve Slot</p>
    
    <h3 bind:this={sixFour}>6.4 Injured Reserve Slot</h3>
    <p>Updated for season 2025.</p>
    <p>Each Franchise shall have up to 3 IR slots for eligible players. Eligible players shall be on the NFL IR list, NA or Holdouts. Out or Doubtful players are not eligible.</p>
    <p>During the Off-Season, between the NFL Super Bowl and the beginning of the next regular season, the roster bench will increase by 3 from 15 to 18 spots in order to allow teams to move their IR players to the regular roster.</p>
    <p>Roster Cut deadline day, where the roster bench spots will be restored to the regular 15 spots, will occur the same day and time as the NFL 53-man roster deadline.</p>

    <h3 bind:this={sixFive}>6.5 Taxi Team</h3>
    <p>Beginning in Season 2025, prior to the start of the Rookie Draft, each Franchise will receive four taxi slots</p>

    <h3 bind:this={sixSix}>6.6 Taxi Team Player Eligibility</h3>
    <p>To be added to and remain on a Franchise’s Taxi Team a player must accrue no more than 2 seasons NFL experience.</p>
    <p>A player may not be demoted to the Taxi Team after the start of the regular season and once promoted can no longer be demoted back to the Taxi Team.</p>
    <p>If a Taxi player is traded to a new Franchise, the eligibility rules will be reset for the time of the trade, i.e., if a current Taxi player is traded to a new Franchise but has NFL experience of less than 2 seasons when the trade completed, they will be eligible to be added to the new Franchise’s Taxi team.</p>

    <h2 class="sectionHeading" bind:this={seven}>Section 7 Scoring</h2>
    
    <h3 bind:this={sevenOne}>7.1 Passing</h3>
    <ul>
        <li>1 point per 25 yards</li>
        <li>4 points per TD</li>
        <li>-1 point per interception</li>
    </ul>
   
    <h3 bind:this={sevenTwo}>7.2 Rushing</h3>
    <ul>
        <li>1 point per 10 yards</li>
        <li>6 points per TD</li>
    </ul>

    <h3 bind:this={sevenThree}>7.3 Receiving</h3>
    <ul>
        <li>0.5 points per reception</li>
        <li>1 point per 10 yards</li>
        <li>6 points per TD</li>
    </ul>

    <h3 bind:this={sevenFour}>7.4 Bonus</h3>
    <ul>
        <li>0.5 points per reception per Tight End</li>
        <li>2 points per 2pt conversion (passing, receiving, rushing)</li>
        <li>6 points per fumble recovered TD</li>
        <li>-2 points per fumble lost</li>
    </ul>

    <h2 class="sectionHeading" bind:this={eight}>Section 8 Rookie Draft</h2>
    
    <h3 bind:this={eightOne}>8.1 Draft Type</h3>
    <p>The Rookie draft will be a Linear Draft consisting of four rounds.</p>
  
    <h3 bind:this={eightTwo}>8.2 Pick Order</h3>
    <p>Updated for season 2025</p>
    <p>The Rookie Draft Pick order will be determined as follows: Picks 1 through 4 will be made of the four teams that did not make the previous season’s playoffs and will be assigned in reverse order of their theoretical maximum points for (max. PF) from the previous season. Pick 5 and 6 will be assigned to the 5th 6th playoff teams in reverse order of their regular season standings. Pick 7 and 8 will be assigned to the 3rd 4th place playoff teams in reverse order of their regular season standings. Pick 10 will be assigned to the winner of the Superb Owl with the runner up getting pick 9.</p>
    
    <h3 bind:this={eightThree}>8.3 Draft Schedule</h3>
    <p>The Rookie Draft will commence seven weeks prior to the Saturday before the kick-off of the NFL season’s game 1 of week 1 of the regular season.</p>

    <h3 bind:this={eightFour}>8.4 Pick Clock</h3>
    <p>The Pick Clock will start at 2pm PST on Draft Day. Each Franchise will have 24 hours to make their selection. If a Franchise does not pick a player within the allotted time an automatic selection will be made based on rank of available players. If a Franchise completes their pick before the elapsed 24 hour pick clock, the next team's pick clock will start immediately. It is the responsibility of each Franchise manager to know when they are on the clock.</p>

    <h3 bind:this={eightFive}>8.5 Draft Pause</h3>
    <p>Should a Franchise need to request a pause to the draft for any reason, e.g., known multi-day absence, the Franchise may request a pause to the draft via league chat specifying the reason and required pause length. If all Franchises agree, the commissioner will pause the draft for the requested set amount of time. A new request will need to be made to extend the pause or any future pauses.</p>

    <h3 bind:this={eightSix}>8.6 Draft Pick Trades</h3>
    <p>Rookie Draft Picks can be traded at any time following the completion of the Franchise rank order for season 1 and at any time for all future seasons.</p>
    <p>Up to a maximum of three seasons of Rookie Draft Picks are available to trade.</p>

    <h2 class="sectionHeading" bind:this={nine}>Section 9 Waivers</h2>

    <p>Updated for season 2025</p>
    <p>Waivers will start immediately following the renewal of the season and will run continuously throughout the entire year until the end of the regular season, except where waivers will be paused for the duration of the rookie draft.</p>
    <p>Waivers will be processed based on current league standing, i.e. last place will receive first priority. Waiver priority will reset with the beginning of each game week. Except during the offseason where priority will be rolling until the completion of week 1 of the season.</p>
    <p>Waivers will process once per week during the offseason, 9am PST on Saturday, and twice per week at the commencement of week 1 of the regular season, 9am PST on Wednesday and 9am PST on Saturday.</p>
    <p>All dropped players and unselected players will remain locked until the next Waivers processing window. No free agents may be picked up at any time.</p>

    <h2 class="sectionHeading" bind:this={ten}>Section 10 Trades</h2>

    <p>Trades will be allowed following the league renewal and will run continuously throughout the year until week 13 of the regular season.</p>
    <p>Trades may consist of any combination of player/players, rookie draft picks up to three years in advance.</p>
    <p>Trades may involve any number of Franchises.</p>
    <p>All trades must comply with the current league roster restrictions upon completion.</p>
    <p>Trades will process immediately; however, a trade protest may be lodged with the league commissioner by any Franchise in the league, including the trading teams, within 24 hours of the trade processing.</p>
    <p>If a trade is protested, the league commissioner will gather evidence from the trading teams to be reviewed by the league within 24 hours. When all evidence is received, it will be presented to the league and a vote will be held to confirm the trade.</p>
    <p>A trade will be successfully protested if the number of vetoing teams is equal to 2/3rds the league size -2, rounded down.</p>
    <p>If a trade is vetoed, the Franchises involved in the trade will revert to their starting rosters before the trade occurred and any points earned by players involved in the trade will be removed from their weekly points total.</p>

    <h2 class="sectionHeading" bind:this={eleven}>Section 11 League Renewal</h2>

    <p>Updated for season 2025</p>
    <p>The league will automatically renew 24 hours after completion of that season’s NFL Super Bowl.</p>
    <p>The period between the completion of the Superb Owl and the NFL Super Bowl will allow managers to propose any rule changes and amendments for the coming season.</p>
    <p>All Rule proposals shall be voted on via poll with a simple majority required to pass unless it is with regards to League Dues or manager changes which require unanimous approval.</p>
    <p>The Commissioner may cast a deciding vote to break any ties in poll voting</p>

    <h2 class="sectionHeading" bind:this={twelve}>Section 12 General</h2>

    <p>Updated for season 2025</p>
    <p>Rules are not open to interpretation. Any clarification must be confirmed by the commissioner.</p>
    <p>Any amendments required to any rules during the season shall be voted on by all Franchises, amendments will pass with a simple majority unless otherwise stated.</p>
    <p>A vote of confidence in the commissioner may be had at any time with a simple majority required to continue.</p>
        
</div>
