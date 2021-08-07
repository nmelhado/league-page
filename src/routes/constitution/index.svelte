<script context="module">
	export const prerender = true;
</script>

<script>
    import { dues } from '$lib/utils/helper';
    let one, oneOne, oneOneOne, oneTwo, oneTwoOne, oneTwoTwo, oneTwoThree, oneTwoFour, oneTwoFive, oneThree;
    let two, twoOne, twoTwo, twoThree;
    let three, threeOne;
    let four, fourOne, fourTwo;
    let five, fiveOne;
    let six, sixOne, sixTwo, sixThree;
    let seven, sevenOne, sevenTwo, sevenThree;

    const goToSection = (section) => {
        const top = section.getBoundingClientRect().top;
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
    <h1 class="noUnderscore">AFFLOIAF LEAGUE CONSTITUTION</h1>
    
<p><b>A few rules to get started:</b></p>
<p><b>Rule 1:</b>  Have fun. Trash talk, trading, and activity all-around is encouraged. </p> 
<p><b>Rule 2:</b>  Participation required, because it’s no fun if people don’t play (even after you’re out).</p>
<p><b>Rule 3:</b> Commissioner has final say on things. We often ask for opinions through polls and
league chat. Occasionally we even vote to decide things, which will be specified when
we do a majority rules, or unanimous required poll.</p>
<p><b>Prizes:</b>  Buy-in is $100 per person.</p>
<p><1st place:  $900 | 2nd place: $200 | 3rd place:  $100</p>
<p>1st overall pick in the next year’s draft: Winner of Toilet Bowl (7 th Place)</p>
<p>Loser Trophy (License Plate Holder): Loser of the Toilet Bowl (12 th Place)</p>
<p>Trophies will be sent to the winner or “winner” by the previous owner.  
<p><b>Scoring/Rosters:</b>  .5 PPR, Redraft snake draft league. 1QB/2RB/2WR/2FLX/1TE/1DEF
<p>Maximum 2 Keepers per year. No kickers, because kickers suck.</p>
Keeper Rules: You can have up to 2 keepers, however you do not have to keep anyone. You
can keep a player up to 2 times (meaning they could be on your team for 3 years total before
going back into the draft). Trades do not reset this. </p>
	
<p>Your 1st keeper can be kept between rounds 1-5</p>
<p>If you have a keeper value above round 5, it can be rounded down to 5, this cannot
occur in the reverse direction.</p>
<p>Your 2 nd keeper can be kept between rounds 6-10</p>
<p>If you have a keeper value above round 10, it can be rounded down to 10.</p>
<p>Determine your keeper value by looking at round drafted in the previous year and subtract 1.</p>
<p>Examples: If I drafted a player in Round 4, the keeper value the next year would be
round 3. If I drafted a player in round 12, they could be kept for a round 10, or round 5
pick depending on my preference.</p>
<p>No zero round keeps: If I drafted a player in round 1, then I would have to use a 0
round pick to keep them, and this is not allowed.</p>
<p>Waiver players: If a player is undrafted, or drafted in rounds 12 or later, then they
simply become a round 10 value.</p>

<p><b>Declaring Keepers:</b> Declare your keepers 48 hours before draft day on Sleeper. You can
declare them earlier and it is recommended that you do so to avoid losing your keeper.</p>
<p><b>Draft:</b>  We always draft the night before the first game of the season in the evening around 7-9
PM MST. This means it is always a Wednesday night. We have some folks on both coasts, let
me know ahead of time if this day or time does not work for you.</p>
<p><b>Draft Order:</b></p>
<p>1st Overall Pick: Goes to the winner of the Toilet Bowl (coveted booster to a
championship run)</p>
<p>2nd thru 6 th picks: Randomized Toilet Bowl runner ups</p>
<p>7th thru 9 th Picks: Teams finishing 4-6 in final standings are randomized (No money)</p>
<p>10 th thru 12 th Picks: Teams finishing 1-3 in final standings are randomized ($Winners)</p>

<p><b>Trades:</b>  Trades go through immediately.  Collusion (meaning teams deliberately taking a bad
deal to help others) will be reviewed by the commissioner and trades may be reversed, but a
minimalist approach will be used. Rosters are locked at the end of the Championship week and
trades, waiver wire pickups, etc. are no longer allowed (Prepare your keepers at end of
playoffs).</p>
<p>In season Trade Deadline will be Week 9. Shoot your shots early or don’t shoot them at all.
New in 2022! Draft pick trading for keepers will be allowed 1 week before the draft in
2022, and before every year’s draft moving forward. I recently discovered a button that
allows manual locking of rosters from the commissioner, so I can personally manage
open and closed season for trades/roster moves.</p>
<p>In summary: You can make trades with players between 1 week before the regular
season starts and the trade deadline. Rosters are then locked at the end of Week 18
until the following year, 1 week before the regular season starts.</p>
<p><b>Draft Pick Trading:</b> Introduced a couple years before first being used in 2020. We are still
discovering the effects and the value to place on draft pick trading.</p>
<p>Rule #1: You can only trade picks in rounds 4-14</p>
<p>Rule #2 (New in 2021): You can only trade draft picks two year out
For example: In 2021 I cannot trade my 2024 draft picks, only my 2022 and
2023</p>
<p>Rule #3 (New in 2021): You must pay in advance for the years you trade out
For example: If you trade away, or for, draft picks in 2020 for the 2022 season,
then you, and your trade partner, must pay the commissioner for the next two
seasons before that trade can go through.</p>

<p><b>Waiver wire:</b>  FAAB bidding will be used, $1000 budget. Budget resets every season. That
means each team has a budget of fake money they use over the season to acquire players when the wire goes through Tuesday night.  See here for more info:
https://www.thefantasyfootballers.com/articles/league-needs-change-waiver-system-asap/ </p>
<p><b>Playoffs:</b>  The top 6 records will make the playoffs. 1st and 2nd seed byes.  Week 17
championship (now that there’s a 17-game season).</p>
<p><b>Abandoned/unmanned teams (New in 2021):</b>  If for any reason a team is not being managed
(meaning no roster moves or activity for a period of 7 days or longer), the commish will begin to
set lineups purely by best platform projections.  If a waiver wire player is better than a player in
the unmanned teams’ lineup, before games the player will be added by the commish off free
agency only (no faab bids).  As an aside, managers that don’t manage their teams need to see
rule 2.</p>
<p><b>Disputes:</b>  Commish will handle any disputes. Occasionally commish will ask the league for a
majority vote, or some other required % of vote. Any appeals go to the reddit FFL
commish/rules issues section for voting (⅔ majority to overturn).  Changes to scoring/rules mid-
season will be avoided if at all possible.</p>
<p><b>Covid Provisos:</b> Two IR spots were added in 2020. In 2021 we will have only 1 IR spot, and
this is likely the case moving forward.  If there’s major disputes due to changes in the NFL
season, dues will be refunded. Otherwise, we’ll do our best to roll with the punches as they
come.
Considering for 2022: I am considering adding a 2 nd IR spot permanently. I am warming
to the idea of the flexibility it adds and less concerned about the exploitation of it. I will
see if 1 IR spot is enough or not this year and consider a 2 nd next year</p>.
<p><b>Balanced schedule/Rivalry week:</b> Fantasy football has always had an unbalanced schedule
due to number of games vs. number of teams. We have done away with this by introducing
rivalry week to balance the number of Head-to-head (H2H) matchups with the number of teams
in the league. On 3 weeks of the schedule, usually weeks 5, 10, and 14 (Determined by
commissioner well in advance of regular season and league draft), you will play the team next to
you in the standings.  This makes it so you play every team once by schedule, and your three
“multi-plays” will be dictated by your record.</p>
</div>
