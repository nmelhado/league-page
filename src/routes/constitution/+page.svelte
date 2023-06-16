<script>
    import { dues } from '$lib/utils/helper';
    let one, oneOne, oneOneOne, oneTwo, oneTwoOne, oneTwoTwo, oneTwoThree, oneTwoFour, oneTwoFive, oneThree;
    let two, twoOne, twoTwo, twoThree;
    let three, threeOne;
    let four, fourOne, fourTwo;
    let five, fiveOne;
    let six, sixOne, sixTwo, sixThree;
    let seven, sevenOne, sevenTwo, sevenThree;
    let eight;

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
        font-weight:bold;
        line-height: 1.2em;
        color: 008E97;
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
    <h1 class="noUnderscore">SHULACES OUT DAN LEAGUE CONSTITUTION</h1>
    <h2 class="noUnderscore clickable" on:click={() => goToSection(one)}>Section 1: Roster Requirements</h2>
        <h3 class="noUnderscore clickable" on:click={() => goToSection(oneOne)}>1.1 Positional Breakdown</h3>
            <h4 class="noUnderscore clickable" on:click={() => goToSection(oneOneOne)}>1.1.1 Position Maximums</h4>
        <h3 class="noUnderscore clickable" on:click={() => goToSection(oneTwo)}>1.2 Trading</h3>
            <h4 class="noUnderscore clickable" on:click={() => goToSection(oneTwoOne)}>1.2.1 Trade Collusion</h4>
            <h4 class="noUnderscore clickable" on:click={() => goToSection(oneTwoTwo)}>1.2.2 Lending Players Prohibition</h4>
            <h4 class="noUnderscore clickable" on:click={() => goToSection(oneTwoThree)}>1.2.3 Trade Deadline</h4>
            <h4 class="noUnderscore clickable" on:click={() => goToSection(oneTwoFour)}>1.2.4 Trade Restrictions</h4>
            <h4 class="noUnderscore clickable" on:click={() => goToSection(oneTwoFive)}>1.2.5 Veto/Trade Process</h4>
        <h3 class="noUnderscore clickable" on:click={() => goToSection(oneThree)}>1.3 Waiver Wire</h3>
<br/>
    <h2 class="noUnderscore clickable" on:click={() => goToSection(two)}>Section 2: Drafting</h2>
        <h3 class="noUnderscore clickable" on:click={() => goToSection(twoOne)}>2.1 Draft Order</h3>
        <h3 class="noUnderscore clickable" on:click={() => goToSection(twoTwo)}>2.2 Rookie Drafts</h3>
        <h3 class="noUnderscore clickable" on:click={() => goToSection(twoThree)}>2.3 Draft Day Trades</h3>
<br/>
    <h2 class="noUnderscore clickable" on:click={() => goToSection(three)}>Section 3: Scoring System</h2>
        <h3 class="noUnderscore clickable" on:click={() => goToSection(threeOne)}>3.1 Voting on Scoring System</h3>
<br/>
    <h2 class="noUnderscore clickable" on:click={() => goToSection(four)}>Section 4: Postseason</h2>
        <h3 class="noUnderscore clickable" on:click={() => goToSection(fourOne)}>4.1 Playoffs</h3>
        <h3 class="noUnderscore clickable" on:click={() => goToSection(fourTwo)}>4.2 Playoff Tiebreakers</h3>
<br/>
    <h2 class="noUnderscore clickable" on:click={() => goToSection(five)}>Section 5: Tanking Policy</h2>
        <h3 class="noUnderscore clickable" on:click={() => goToSection(fiveOne)}>5.1 League Tanking Policy</h3>
<br/>
    <h2 class="noUnderscore clickable" on:click={() => goToSection(six)}>Section 6: Manager Turnover</h2>
        <h3 class="noUnderscore clickable" on:click={() => goToSection(sixOne)}>6.1 Manager Leaving</h3>
<br/>
    <h2 class="noUnderscore clickable" on:click={() => goToSection(seven)}>Section 7: League Finances</h2>
        <h3 class="noUnderscore clickable" on:click={() => goToSection(sevenOne)}>7.1 League Dues</h3>
        <h3 class="noUnderscore clickable" on:click={() => goToSection(sevenTwo)}>7.2 Payout</h3>
        <h3 class="noUnderscore clickable" on:click={() => goToSection(sevenThree)}>7.3 Raising Dues</h3>
<br/>
    <h2 class="noUnderscore clickable" on:click={() => goToSection(eight)}>Section 8: League Calendar</h2>
    
    <p></p>

    <hr />
    
    <h2 class="sectionHeading" bind:this={one}>Section 1 Roster Requirements</h2>
    
    <h3 class="subSectionHeading" bind:this={oneOne}>1.1 Positional Breakdown</h3>
    
    <p>25 Total Players</p>
    
    <p class="underscore">Starters</p>
    <ul>
        <li>QB</li>
        <li>RB</li>
        <li>RB</li>
        <li>WR</li>
        <li>WR</li>
        <li>WR</li>
        <li>TE</li>
        <li>FLEX (WRT)</li>
        <li>SFLEX (QWRT)</li>
    </ul>
    
    <p>16 Bench (Expanded by 5 between the annual Rookie draft and Labour Day Monday)</p>

    <p>2 IR Spots (Player must be labeled as IR, or NFI-R in the Sleeper App)</p>
    
    <p>No players are allowed in IR spots between March 1st and Labour Day Monday each year.</p>
    
        <h4 bind:this={oneOneOne}>1.1.1 Position Maximums</h4>
        
        <div class="subBlock">
            <table class="positionMaximums">
                <tr><td>QB</td><td class="right">No maximum</td></tr>
                <tr><td>RB</td><td class="right">No maximum</td></tr>
                <tr><td>WR</td><td class="right">No maximum</td></tr>
                <tr><td>TE</td><td class="right">No maximum</td></tr>
            </table>
        </div>


    <h3 class="subSectionHeading" bind:this={oneTwo}>1.2 Trading</h3>
    
    <p>Trading of players and draft picks (up to 2 drafts away) are allowed. Trades will require Commissioner approval. If deemed unfair or imbalanced, the trade will be reversed if vetoed or under investigation is suspicion of collusion. Tradable assets include players, draft picks, and FAAB $.</p>
    
    <p>Trades involving draft picks will require a non-refundable deposit for the league dues foe each year impacted. If the managers trades a pick for the following season, he or she pays $200 (or the current league dues) and plays the following season tha tmanager will be considered paid in full for that upcoming season (ex. Oct 2023 trades the 1st round for May 2024; Manager pays $200 for the 2024 season; If that manager reamins in the league come March 1st, 2024, that manager will be considered paid in full for the 2024 season; If that Manager was to leave the league after the 2023 season, the $200 for the following season in non-refundable and will remain as payment for the new owner for the 2024 season)</p>
    
    <p>If a Manager trades draft picks for multiple years (ex. 1st Rounder in 2024 and 2nd rounder in 2025, that manager is required to pay 2 full non-refundable payments, one for 2024, one for 2025. If that manager leaves the league before the 2024 season, that manager forfeits both season's dues (ex. $400). If that manager leaves after the 2024 season, but before the 2025 season, that manager forfeits the 2025 dues (ex. $200).</p>
    
    <p>Deposits for trades must be made within 24-hours of the trade's acceptance for the trade to be approved and finalized. Any delay will result in the trade being reversed, unless approved by the Commissioner.</p>
    
    <p>The inseason Trade Deadline will be the end of Week 11 (Tuesday before US Thanksgiving is the last day a trade may be accepted - it must still be approved).</p>
    
    <p>Trades do not require an equal number of players and/or draft picks to be exchanged, but roster limits must be adhered to upcon the completion of the trade.</p>
    
    <h4 bind:this={oneTwoOne}>1.2.1 Trade Collusion</h4>
    <div class="subBlock">
        <p>If any owners are suspected of accepting bribes/offering bribes to enhance their/another owners team via trade, trading any assets other than fantasy players, draft picks, FAAB $, or otherwise found guilty of engaging in any form of collusion*, all parties involved in the trade will be susceptible to punishment. The punishments will go as followed:</p>
        
        <ul>
            <li>First Offense – Immediate reduction of FAAB budget by 80%</li>
            <li>Second Offense – Immediate freeze on all transaction types for the next 18 weeks of regular season and playoff fantasy football games, including trades and waiver wire bids</li>
            <li>Third Offense – A league meeting of all members not involved in any of the improper trades/activity in question will take place to discuss next steps.</li>
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
        <p>The trade deadline will be set for the Tuesday after Week 11 games of the NFL season. The last day a trade can be accepted is that Tuesday - it must still be approved.</p>
    </div>
    
    <h4 bind:this={oneTwoFour}>1.2.4 Trade Restrictions</h4>
    <div class="subBlock">
        <p>You will not be able to trade draft picks that are more than 2 drafts away. For example, during the 2023 season you cannot trade any picks in the 2026 draft - you may only trade picks from the 2024 and the 2025 draft.</p>
        <p>You may only trade FAAB $ from the current season.</p>
    </div>
    
    <h4 bind:this={oneTwoFive}>1.2.5 Veto/Trade Process</h4>
    <div class="subBlock">
        <p>The Commissioner will be responsible for handling any and all Trade Vetos.</p>
    </div>
    
    
    
    <h3 bind:this={oneThree}>1.3 Waiver Wire</h3>
    
    <p>FAAB Waiver wire system. Each team will begin the season with $1000. $0 bids are allowed. Bids will process Wednesdays at 6am PT.</p>

    <p>FAAB budgets will reset each season on the Thursday after Week 17 (ex. Jan 11, 2024).</p>
    
    
    <h2 class="sectionHeading" bind:this={two}>Section 2: Drafting</h2>
    
    <h3 bind:this={twoOne}>2.1 Draft Order</h3>
    <p>The Annual Rookie Draft is a Linear draft.</p>
    <p>The Annual Rookie Draft consists of 5 rounds and will include all rookies.</p>
    <p>It will take place approximately 2 weeks after the actual NFL draft. The date may fluctuate due to unforeseen circumstances, but dates will be set by the end of March each year.</p>
    <p>The order will be:</p>
    <ul>
        <li>1st: Winner of Toilet Bowl</li>
        <li>2nd: Loser of Toiler Bowl</li>
        <li>3rd: Winner of Draft Bonanza Playoffs</li>
        <li>4th: Runner Up of Draft Bonanza Playoffs</li>
        <li>5th: Winner of Draft Bonanza Consolation</li>
        <li>6th: Loser of Draft Bonanza Consolation</li>
        <li>7th: Team finishing 6th in the Regular Season</li>
        <li>8th: Team finishing 5th in the Regular Season</li>
        <li>9th: Team finishing 4th in the Regular Season</li>
        <li>10th: Team finishing 3rd in the Regular Season</li>
        <li>11th: Team finishing 2nd in the Regular Season</li>
        <li>12th: Team finishing 1st in the Regular Season</li>
    </ul>

    <h3 bind:this={twoTwo}>2.2 Annual Rookie Drafts</h3>
    <p>Rookie drafts will consist of 5 rounds of drafting, with 5 minutes alotted for each pick.</p>
    <p>To make room for the incoming players, benches will be expanded by (5) spots.</p>
    <p>These spots will be removed on Labour Day Monday.</p>
    <p>Any spots not filled during the draft, can be filled immediately afterwards from the waiver wire.</p>
    <p> Please refer to the League Calendar for Roster Size Maximums and corresponding dates for when these values change.</p>
    
    <h3 bind:this={twoThree}>2.3 Draft Day Trades</h3>
    <p>If a trade is being made during the draft, one or both parties can alert the commissioner to pause the draft to allow for extra time to negotiate the trade.</p>
    
    <h2 class="sectionHeading" bind:this={three}>Section 3: Scoring System</h2>

    <h3 bind:this={threeOne}>3.1 Scoring System</h3>
    <p>The league scoring system breakdown is listed on the Sleeper fantasy app (for the most part, it follows typical 1.0 PPR Scoring). The scoring system will never change without a super majority league vote (9 votes to pass).</p>
    
    <h2 class="sectionHeading" bind:this={four}>Section 4: Postseason</h2>
    
    <h3 bind:this={fourOne}>4.1 Playoffs</h3>
    <p>At the end of the season, 6 teams will make the playoffs.<p>
    <p>Teams will be seeded 1-6 based on the regular season finish, tie broken per the tiebreakers.</p>
    <p>Top 2 seeds get a bye in week 15</p>
    <p>Week 15: Seed 3 vs Seed 6; Seed 4 vs Seed 5</p>
    <p>Reseeding occurs after the first round of the playoffs where the #1 seed plays the lowest remaining seed (ex. if #6 upsets #3, #1 plays #6; if #3 wins, #3 plays #2 and the winner of teh #4 vs #5 match plays #1). 
    <p>Week 18 will not be used.</p>
    
    <h3 bind:this={fourTwo}>4.2 Seeding Tiebreakers</h3>
    <p>If two teams finish with the same record the tiebreakers will go as followed:</p>

    <ol>
        <li>Points For - Most Points For is awarded the highest spot available of the teams tied and second most is awarded the second highest spot available, and so on.</li>
        <li>Head to Head Record - the team with the better head to head record (highest winning percent amongst the teams tied) will prevail.</li>
        <li>Total Points Scored in Head to Head matches - Most Points scored in head to head matches amongst the teams still tied,  totalling all matches played (ex. If two matches played, total points for both matches combined; if two versus one team and one versus the other, all three matches are combined)</li>
        <li>Higher Points Against - Most Points Against is awarded the higher spot available of the teams tied and second most is awarded the next highest spot available, and so on.</li>
        <li>The winner of the coin flip will be automatically awarded the lower seed (1st is lower than 2nd; 2nd is lower than 3rd, and so)</li>
    </ol>

    <h2 class="sectionHeading" bind:this={five}>Section 5: Tanking Policy</h2>
    
    <h3 bind:this={fiveOne}>5.1 League Tanking Policy</h3>
    <p>No team may intentionally leave starting roster spots empty. Any evidence of intentionally leaving roster spots empty in order to improve your draft position may be subject to punishment, including but not limited to the forfeiture of draft selections.</p>
    <p>The Commissioner can be made aware of efforts to tank on purpose and will review each case individually.</p>
    <p>The penalty for tanking will be loss of 1st round pick (1st round would only have 11 picks if a team was deemed to be tanking).</p>
    <p>A second case of tanking would be removal from the league with no refunds for any future league fees paid or any deposits made for leaving the league.</p>

    <h2 class="sectionHeading" bind:this={six}>Section 6: Manager Turnover</h2>
    
    <h3 bind:this={sixOne}>6.1 Manager Leaving</h3>
    <p>If a manager wants to leave the league, they must give 24 months notice in order to acquire their full deposit back without penalty.</p>
    <p>If a manager wants to leave the league in less than 24 months notice, the following will take place:<br/>
    - New Owner and Outgoing Owner will agree to a portion of the deposit ($0-100) that the Outgoing Manager gets back, while the new owner will use the remaining amount towards their own deposit (ex. $50 to outgoing manager means $50 for deposit of New Owner and New Owner tops up with $50) as well as paying their own dues (assuming no future draft pick trades have been made by the outgoing  manager). </p>
    <p>Keep in mind that any funds paid for any future draft picks that have been traded away in the future (next year or two years down the road) are not refundable at all.</p>
    <p>The Commissioner will review all trades for that outgoing manager with additional scrutiny to ensure they are not screwing the franchise over for the new owner.</p>
    <p>The exception to receiving future deposits back would occur if the league dues were increased in the meantime and the manager chose to withdraw from the league (see 7.3)</p>

    <p><b><u>Simple Example</u></b><br/>
    February 2023<br/>
    All owners pay a $100 deposit. <br/><br/>

    November 20, 2025<br/>
    Owner 1 indicates they are leaving the league. <br/>
    Owner 1 has not made any trades involving future draft picks.<br/> 
    Owner 1 wants to leave immediately following this 2025 season (which ends technically February 28th, 2026)<br/><br/>

    February 15, 2026<br/>
    League agrees on New Owner for the franchise.<br/>
    Owner 1 (outgoing) and New Owner (incoming) agree that Owner 1 gets $50 of their deposit back. <br/>
    Owner 1 receives $50 and is no longer in the league. <br/>
    New owner pays $50 deposit. ($50 from Owner 1's deposit + $50 of their own)<br/>
    New owners pays $200 for 2026 season.<br/><br/>

    Everything going forward for New Owner is like everyone else.</p>
    
    <p><b><u>Complex Example</u></b><br/>
    February 2023<br/>
    All owners pay $200 league dues for 2023 season <br/>
    All owners pay a $100 deposit. <br/><br/>

    November 20, 2025<br/>
    Owner 1 indicates they are leaving the league. <br/>
    Owner 1 has made a trade in the past that involved draft picks for the May 2027 Rookie Draft ($200 paid and is non-refundable). <br/>
    Owner 1 wants to leave immediately following this 2025 season (which ends technically February 28th, 2026). <br/><br/>

    February 15, 2026<br/>
    League agrees on New Owner for the franchise.<br/>
    Owner 1 (outgoing) and New Owner (incoming) agree that Owner 1 gets $50 of their deposit back. <br/>
    Owner 1 receives $50 and is no longer in the league. <br/>
    New owner pays $50 deposit. ($50 from Owner 1's deposit + $50 of their own)<br/>
    New owners pays $200 for 2026 season. <br/>
    New owner does not make any trades for picks in the future during the 2026 season. <br/><br/>

    February 27, 2027<br/>
    New Owner pays $0 for 2027 season due to non-refundable future draft pick trade involving May 2027 Rookie Draft <br/><br/>

    February 25, 2028<br/>
    New owner pays $200 for the 2028 season (like everyone else)</p>
    


    <h2 class="sectionHeading" bind:this={seven}>Section 7: League Finances</h2>
    
    <h3 bind:this={sevenOne}>7.1 League Dues</h3>
    <p>League dues are set at {dues}$. Dues are collected via e-transfer and all dues are required to be made by February 28th.</p>
    <p>In the event that a manager fails to pay before the deadline, a 10% penalty will be added to their outstanding payment and will go towards the payouts at the end of the year.</p>
    
    <h3 bind:this={sevenTwo}>7.2 Payouts</h3>
    <p>There are 3 levels of payouts - Regular Season, Playoffs, and Regular Season Most Points For.</p>
    <p>Regular Season</p>
    <ul>
        <li>1st place: $360</li>
        <li>2nd place: $240</li>
        <li>3rd place: $170</li>
    </ul>
    <p>Playoffs</p>
    <ul>
        <li>1st place: $1,000</li>
        <li>2nd place: $290</li>
        <li>3rd place: $215</li>
    </ul>
    <p>Most Points For - Regular Season</p>
    <ul>
        <li>$125</li>
    </ul>
    
    <p>In the event that a manager was fined due to late payment, their extra fee will be added to the Regular Season 1st place finisher's payout.</p>
    
    <h3 bind:this={sevenThree}>7.3 Raising Dues</h3>
    <p>A ⅔ majority vote is required in order to raise league dues. In the event that a manager is no longer financially comfortable with the buy-in, they can opt to find a co-manager or withdraw from the league with all deposits returned in full, including deposits made for trades.</p>

    <h2 class="sectionHeading" bind:this={eight}>Section 8: League Calendar</h2>
<iframe height=3500 width=380 src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS1pHBWpmtq9r-pTqfp3_rgfriIMGW-qNWTmMvcnxASyt2jrj4OImOuKSUojhJlBN3qNji_yUnIq7Hp/pubhtml?gid=715003089&amp;single=true&amp;widget=true&amp;headers=false"></iframe>
</div>
