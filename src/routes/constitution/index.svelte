<script context="module">
	export const prerender = true;
</script>

<script>
    import { dues } from '$lib/utils/helper';
    let totalPot = dues * 12
    let weeklyPayoutInstances = 17
    let weeklyPayoutAmount = 15
    let weeklyPot = weeklyPayoutAmount * weeklyPayoutInstances
    let regSeasonChamp = dues / 2
    let playoffPot = totalPot - weeklyPot - regSeasonChamp

    let one, oneOne, oneOneOne, oneTwo, oneTwoOne, oneTwoTwo, oneTwoThree, oneTwoFour, oneTwoFive, oneThree;
    let two, twoOne, twoTwo, twoThree;
    let three, threeOne, threeTwo;
    let four, fourOne, fourTwo;
    let five, fiveOne;
    let six, sixOne, sixTwo, sixThree;
    let seven, sevenOne, sevenTwo, sevenThree, sevenFour;

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
    <h1 class="noUnderscore">LEGENDS LEAGUE CONSTITUTION</h1>
    
    <h2 class="noUnderscore">TABLE OF CONTENTS</h2>
    
    <h3 class="noUnderscore clickable" on:click={() => goToSection(one)}>Section 1: Roster</h3>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(oneOne)}>1.1 Positional Breakdown</h4>
            <h5 class="noUnderscore clickable" on:click={() => goToSection(oneOneOne)}>1.1.1 Position Maximums</h5>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(oneTwo)}>1.2 Trading</h4>
            <h5 class="noUnderscore clickable" on:click={() => goToSection(oneTwoOne)}>1.2.1 Trade Collusion</h5>
            <h5 class="noUnderscore clickable" on:click={() => goToSection(oneTwoTwo)}>1.2.2 Lending Players Prohibition</h5>
            <h5 class="noUnderscore clickable" on:click={() => goToSection(oneTwoThree)}>1.2.3 Trade Deadline</h5>
            <h5 class="noUnderscore clickable" on:click={() => goToSection(oneTwoFour)}>1.2.4 Trade Restrictions</h5>
            <h5 class="noUnderscore clickable" on:click={() => goToSection(oneTwoFive)}>1.2.5 Veto/Trade Process</h5>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(oneThree)}>1.3 Waiver Wire</h4>
    
    <h3 class="noUnderscore clickable" on:click={() => goToSection(two)}>Section 2: Drafting</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(twoOne)}>2.1 Draft Order</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(twoTwo)}>2.2 Draft Day Trades</h4>
    
    <h3 class="noUnderscore clickable" on:click={() => goToSection(three)}>Section 3: Scoring and Matchups</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(threeOne)}>3.1 Scoring System</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(threeTwo)}>3.2 Matchups</h4>
    
    <h3 class="noUnderscore clickable" on:click={() => goToSection(four)}>Section 4: Postseason</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(fourOne)}>4.1 Playoffs</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(fourTwo)}>4.2 Playoff Tiebreakers</h4>

    <h3 class="noUnderscore clickable" on:click={() => goToSection(five)}>Section 5: Tanking Policy</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(fiveOne)}>5.1 League Tanking Policy</h4>

    <h3 class="noUnderscore clickable" on:click={() => goToSection(six)}>Section 6: Replacing Managers</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sixOne)}>6.1 Removing Managers</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sixTwo)}>6.2 Replacing Managers</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sixThree)}>6.3 Replacement Incentive</h4>

    <h3 class="noUnderscore clickable" on:click={() => goToSection(seven)}>Section 7: League Finances</h3>
    
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sevenOne)}>7.1 League Dues</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sevenTwo)}>7.2 Weekly Payout</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sevenThree)}>7.3 Season Payouts</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(sevenFour)}>7.4 Raising Dues</h4>
    
    
    <hr />
    
    <h2 class="sectionHeading" bind:this={one}>Section 1 Roster Breakdown</h2>
    
    <h3 class="subSectionHeading" bind:this={oneOne}>1.1 Positional Breakdown</h3>
    
    <p>28 Total Players</p>
    
    <p class="underscore">Starters</p>
    <ul>
        <li>QB</li>
        <li>RB</li>
        <li>RB</li>
        <li>WR</li>
        <li>WR</li>
        <li>WR</li>
        <li>TE</li>
        <li>FLEX (RB/WR/TE)</li>
        <li>FLEX (RB/WR/TE/QB)</li>
        <li>D/ST</li>
    </ul>
    
    <p>6 Bench </p>

    <p>2 IR Spots (Player must be labeled as IR or Out in the Sleeper App)</p>
    
        <h4 bind:this={oneOneOne}>1.1.1 Position Maximums</h4>
        
        <div class="subBlock">
            <table class="positionMaximums">
                <tr><td>QB</td><td class="right">3</td></tr>
                <tr><td>RB</td><td class="right">6</td></tr>
                <tr><td>WR</td><td class="right">9</td></tr>
                <tr><td>TE</td><td class="right">3</td></tr>
                <tr><td>D/ST</td><td class="right">3</td></tr>
            </table>
        </div>


    <h3 class="subSectionHeading" bind:this={oneTwo}>1.2 Trading</h3>
    
    <p>Trading of players and draft picks (up to 3 drafts away) are allowed. Trades will process immediately and will be reversed if vetoed or under investigation for collusion. Tradable assets include players, draft picks, and FAAB $.</p>
    
    <h4 bind:this={oneTwoOne}>1.2.1 Trade Collusion</h4>
    <div class="subBlock">
        <p>If any owners are suspected of accepting bribes/offering bribes to enhance their/another owners team via trade, trading any assets other than fantasy players, draft picks, FAAB $, or otherwise found guilty of engaging in any form of collusion*, all parties involved in the trade will be susceptible to punishment. The punishments will go as follows:</p>
        
        <ul>
            <li>First Offense – League vote on expulsion</li>
        </ul>

        <p>All trades that are found guilty of collusion, will be reversed/denied. If the trade had affected the outcome of previous games, the results of those games will be revised.  </p>

        <p>*Collusion includes the organizing of veto votes against an acceptable trade.</p>

        <p>The commissioner will err on the side of letting owners manage their teams the way they see fit. Any collusion will need to be clear. The commissioner reserves the right to step in and at the very least assess the thinking of any team involved in a heavily lop-sided trade. </p>
    </div>

    <h4 bind:this={oneTwoTwo}>1.2.2 Lending Players Prohibition</h4>
    <div class="subBlock">
        <p>Any player traded from a team may not be re-acquired via trade within 6 weeks of the original trade. Any teams involved in this behavior will be subject to the aforementioned collusion punishments.</p>
    </div>
    
    <h4 bind:this={oneTwoThree}>1.2.3 Trade Deadline</h4>
    <div class="subBlock">
        <p>The trade deadline will be set for the Saturday of the week 11 games of the NFL season.</p>
    </div>
    
    <h4 bind:this={oneTwoFour}>1.2.4 Trade Restrictions</h4>
    <div class="subBlock">
        <p>You will not be able to trade draft picks that are more than 3 drafts away. For example, during the 2022 season you cannot trade any picks in or after the 2026 draft. You may only trade FAAB $ from the current season.</p>
    </div>
    
    <h4 bind:this={oneTwoFive}>1.2.5 Veto/Trade Process</h4>
    <div class="subBlock">
        <p>A total of 7 veto votes are required to veto a trade. Vetoes are only appropriate in instances of collusion or an egregious mismatch of value (i.e. CMC for a D/ST). Not liking a trade does not warrant a veto.</p>
    </div>
    
    
    
    <h3 bind:this={oneThree}>1.3 Waiver Wire</h3>
    
    <p>FAAB Waiver wire system. Each team will begin the season with $100. $0 bids are allowed. Bids will process Thursdays, Saturdays, and Sundays at 9AM CST.</p>

    <p>FAAB budgets will reset each season in January.</p>
    
    
    <h2 class="sectionHeading" bind:this={two}>Section 2 Drafting</h2>
    
    <h3 bind:this={twoOne}>2.1 Nomination Order</h3>
    <p>The nomination order each year will be randomized.</p>

    <h3 bind:this={twoTwo}>2.2 Draft Day Trades</h3>
    <p>If a trade is being made during the draft, one or both parties must alert the commissioner when the trade is finished. The commissioner will pause the draft to announce the trade to the league channel and adjust rosters to allow for proper position limits, etc. for the remainder of the draft.</p>
    
    <h2 class="sectionHeading" bind:this={three}>Section 3 Scoring and Matchups</h2>

    <h3 bind:this={threeOne}>3.1 Scoring System</h3>
    <p>The league scoring system breakdown is listed on the <a href="https://sleeper.com/leagues/854978776533184512" target="_blank" >Sleeper fantasy app</a> (for the most part, it follows typical .5PPR Scoring). The scoring system will never change without a majority (7/12) league vote.</p>
    <p>Exceptions include:</p>
    <div class="subBlock">
        <table class="positionMaximums">
            <tr class="font-weight:bold"><td>Bonus</td><td class="right">Points</td></tr>
            <tr><td>100-199 rush yds</td><td class="right">1.0</td></tr>
            <tr><td>200+ rush yds*</td><td class="right">3.0</td></tr>
            <tr><td>100-199 rec yds</td><td class="right">1.0</td></tr>
            <tr><td>200+ rec yds*</td><td class="right">3.0</td></tr>
            <tr><td>300-399 pass yds</td><td class="right">1.0</td></tr>
            <tr><td>400+ pass yds*</td><td class="right">3.0</td></tr>
            <tr><td>First down (pass, rush, rec)</td><td class="right">0.5</td></tr>
        </table>
    </div>
   <p>* Yardage bonuses do not stack within kind. Some examples:</p>
   <ul>
    <li>David Montgomery rushes for 220 yards: <b>3.0 point bonus</b></li>
    <li>Justin Fields passes for 450 yards and runs for 150 yards: 3.0 + 1.0 = <b>4.0 point bonus</b></li>
    <li>Darnell Mooney 188 yards receiving and 105 yards rushing: 1.0 + 1.0 = <b>2.0 point bonus</b></li>
   </ul>
   <h3 bind:this={threeTwo}>3.2 Matchups</h3>
   <p>Each week will consist of two matchups:</p>
   <ul>
    <li><b>Head-to-Head</b> -- One win/loss will be recorded for weekly head-to-head matchup</li>
    <li><b>Top 6/Bottom 6</b> -- One win/loss will be recorded for the player's score against the league median for the week. I.e. top 6 scores receive a win and bottom 6 scores receive a loss</li>
   </ul>


    <h2 class="sectionHeading" bind:this={four}>Section 4 Postseason</h2>
    
    <h3 bind:this={fourOne}>4.1 Playoffs</h3>
    <p>At the end of the season 6 teams will make the playoffs. The first round of playoffs will commence in week 15. The top two records will receive a bye week in the first round of the playoffs. Each playoff matchup will only last one week and the winner will advance. Week 18 will not be used.</p>
    
    <h3 bind:this={fourTwo}>4.2 Seeding Tiebreakers</h3>
    <p>If two teams finish with the same record the tiebreakers will go as followed:</p>

    <ol>
        <li>Total points for</li>
        <li>Total weekly top 6 finishes</li>
        <li>Total matchup wins</li>
        <li>Total weekly top 1 finishes</li>
        <li>Coin flip</li>
    </ol>

    <h2 class="sectionHeading" bind:this={five}>Section 5 Tanking Policy</h2>
    
    <h3 bind:this={fiveOne}>5.1 League Tanking Policy</h3>
    <p>No team may intentionally leave starting roster spots empty. Any evidence of intentionally leaving roster spots empty in order to improve your draft position may be subject to punishment, including but not limited to the forfeiture of draft assets (keepers, salary cap budget, roster slots, etc.).</p>

    <h2 class="sectionHeading" bind:this={six}>Section 6 Replacing Managers</h2>
    
    <h3 bind:this={sixOne}>6.1 Removing Managers</h3>
    <p>Short of continuously failing to set a valid lineup, or confirmed collusion, no manager can be removed against their will. Participation, through the league chat, trade offers, and the waiver wire, is strongly encouraged but is not generally grounds for removal.</p>
    
    <h3 bind:this={sixTwo}>6.2 Replacing Managers</h3>
    <p>When a manager needs to be replaced, the commissioner will try to find a suitable candidate with some connection to at least a portion of the existing managers. Priority will be placed on managers who are eager to take on a multi-year commitment and will be very active within the league.</p>
    
    <h2 class="sectionHeading" bind:this={seven}>Section 7 League Finances</h2>
    
    <h3 bind:this={sevenOne}>7.1 League Dues</h3>
    <p>League dues are set at ${dues}. Dues are paid through Chase Quickpay/Zelle to the commissioner (Matt Reddy - username reddy1023@gmail.com) <b>no later than August 28th at 11:59pm CST</b>. If you don't have access to Zelle, please contact the commissioner to work out a different method (Commissioner's note: I can't set up Venmo with a European phone number, please don't ask). All managers must be fully paid up before the start of regular season.</p>
    <p>In the event that a manager fails to pay before the deadline, they will face a $10 salary cap draft budget reduction per day (CST timezone).</p>
    <p>Every day late from draft finish will incur a $3 FAAB reduction leading up to and through kickoff day.</p>
    <p>In the event that a manager fails to pay before kickoff of the 1st game of the season, they will be ineligible to receive weekly payouts until dues have been received. Continued truancy may also be grounds for a league expulsion vote.</p>
    
    <h3 bind:this={sevenTwo}>7.2 Weekly Payout</h3>
    <p>Weekly payouts of ${weeklyPayoutAmount} will be offered to the top score for eligible managers from each week, including the playoffs (${weeklyPayoutInstances} total).</p>
    
    <h3 bind:this={sevenThree}>7.3 Season Payouts</h3>
    <p>Regular season champ payout is ${regSeasonChamp} (same as the 1-seed in playoffs)</p>
    <p>Postseason payout is structured as follows:</p>
    <ul>
        <li>1st place: ${(playoffPot * .6).toFixed(2)}</li>
        <li>2nd place: ${(playoffPot * .3).toFixed(2)}</li>
        <li>3rd place: ${(playoffPot * .1).toFixed(2)}</li>
    </ul>
    
    <h3 bind:this={sevenFour}>7.4 Raising Dues</h3>
    <p>A ⅔ majority vote is required in order to raise league dues. In the event that a manager is no longer financially comfortable with the buyin, finding a co-manager to split the cost is reccomended.</p>

</div>