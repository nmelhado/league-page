<script context="module">
	export const prerender = true;
</script>

<script>
    import { dues } from '$lib/utils/helper';
    let a, a_1, a_2, a_3, a_4;
    let b, b_1, b_2, b_3, b_4;
    let c_1, c_2, c_3, c_4;
    let d;
    let e, e_1, e_2;
    let f, f_1, f_2, f_3;
    let g, g_1, g_2, g_3;
    let h, h_1, h_2;

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

    ol {
        list-style-type: lower-alpha;
    }

    ol ol {
        list-style-type: lower-roman;
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
    <h1 class="noUnderscore">TOMCAT DYNASTY LEAGUE CONSTITUTION</h1>
    <h1 class="noUnderscore">RULE #1: Be nice to Scott.</h1>
    
    <h2 class="noUnderscore">TABLE OF CONTENTS</h2>
    
    <h3 class="noUnderscore clickable" on:click={() => goToSection(a)}>Section A: League Introduction & Integrity</h3>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(a_1)}>A.1 Intro & League Service</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(a_2)}>A.2 League Integrity</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(a_3)}>A.3 Comissioner Responsibilities</h4>
	
    <h3 class="noUnderscore clickable" on:click={() => goToSection(b)}>Section B: Roster, Draft & Important Dates</h3>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(b_1)}>B.1 Roster</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(b_2)}>B.2 Inaugural Draft</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(b_3)}>B.3 Annual Rookie Draft</h4>
	    <h4 class="noUnderscore clickable" on:click={() => goToSection(b_4)}>B.4 Important Dates</h4>
	
    <h3 class="noUnderscore clickable" on:click={() => goToSection(c)}>Section C: Divisions, Schedule & Playoff Brackets</h3>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(c_1)}>C.1 Divisions</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(c_2)}>C.2 Regular Season Schedule</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(c_3)}>C.3 Loser's Bracket</h4>
	<h4 class="noUnderscore clickable" on:click={() => goToSection(c_4)}>C.4 Winner's Bracket</h4>
	
    <h3 class="noUnderscore clickable" on:click={() => goToSection(d)}>Section D: Buy-In & Pay Outs</h3>
	
    <h3 class="noUnderscore clickable" on:click={() => goToSection(e)}>Section E: Waivers & Free Agency</h3>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(e_1)}>E.1 In Season Waivers</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(e_2)}>E.2 Off-Season Free Agency</h4>
	
    <h3 class="noUnderscore clickable" on:click={() => goToSection(f)}>Section F: Trading</h3>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(f_1)}>F.1 General Rules</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(f_2)}>F.2 Conditional Trades</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(f_3)}>F.3 Trade Vetoing</h4>
	<h4 class="noUnderscore clickable" on:click={() => goToSection(f_4)}>F.4 Trading Draft Picks</h4>
	
    <h3 class="noUnderscore clickable" on:click={() => goToSection(g)}>Section G: Tie Breakers</h3>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(g_1)}>G.1 General Tiebreakers</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(g_2)}>G.2 Waiver Bid Tie Breakers</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(g_3)}>G.3 Playoff Tiebreakers</h4>
	
    <h3 class="noUnderscore clickable" on:click={() => goToSection(h)}>Section H: Lineups & Scoring</h3>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(h_1)}>H.1 Lineups</h4>
        <h4 class="noUnderscore clickable" on:click={() => goToSection(h_2)}>H.2 Scoring Settings</h4>
    
    <hr />
    
    <h2 class="sectionHeading" bind:this={a}>Section A: League Introduction & Integrity/h2>
    
    <h3 class="subSectionHeading" bind:this={a_1}>A.1 Intro & League Service</h3>

    <ol>
        <li>
            This is a DYNASTY Fantasy Football league. It requires commitment over multiple seasons. You’re in it for the long haul. Players remain on the same Franchise from one season to the next unless they are traded or released.
        </li>
        <li>
            Be active. Be involved. Set lineups. Propose trades. Respond to trades promptly. Send messages in group chat. It makes the experience better for everyone and increases league longevity.
        </li>
        <li>
            Roster & Scoring settings are fairly different from default settings. Make sure to read up on those sections below to be prepared.
        </li>
        <li>
            The league will be hosted on Sleeper. It is the best, free dynasty focused app for fantasy football on the market currently. Depending on the draft format, myfantasyleague may be used for the draft and exported.
        </li>
    </ol>


    <h3 class="subSectionHeading" bind:this={a_2}>A.2 League Integrity</h3>
    
   <ol>
        <li>
            It is in the best interest of the league that all teams compete for all weeks of the year, when a team does not submit a competitive line up (resets each year):
            <ol>
                <li>
                    First Offense: Warning
                </li>
                <li>
                    Second Offense: Loss of 25% of total FAAB budget for the following season
                </li>
                <li>
                    Third Offense: Loss of 3rd round rookie pick (theirs, or other’s they own) or the latest draft pick they own, otherwise.
                </li>
                <li>
                    4th Offense: Removal from league
                </li>
            </ol>
        </li>
        <li>
            Noncompetitive means when an owner submits a lineup that includes:
            <ol>
                <li>
                    Any player that is a Free Agent
                </li>
                <li>
                    Any player that is Suspended
                </li>
                <li>
                    Any player that is on Injured Reserve 
                </li>
                <li>
                    A lineup with less than required starters
                </li>
                <li>
                    Any player that is OUT for multiple weeks. 
                    <ul><li>
                        If a player gets downgraded to out on the same day of the game, that is allowed. If it becomes a trend then it may be looked at as an issue.
                    </li></ul>
                </li>
                <li>
                    The intent to lose a matchup on purpose (automatically elevates to 2nd offense)
                </li>
            </ol>
        </li>
        <li>
            It would be nice to see all owners return year to year; however we know that things happen so if an owner should choose not to return, the commissioner will find a replacement GM using whatever means necessary to keep the league stable.
        </li>
        <li>
            If a team is abandoned mid-season, the commissioner will assume control of setting lineups for the team until a new GM can be found. While under control of the commissioner, this team will be barred from making trades, and any monetary winnings it may make will be put towards the dynasty pool. GM’s taking over an orphaned team mid season are not expected to pay an additional buy in.
        </li>
        <li>
            When ownership of a franchise changes, the new owner will keep the same players held by the previous owner. The new GM will also keep the drafting position held by the previous owner.
        </li>
        <li>
            Some things that will not be tolerated at all are collusion, cheating and hacking. 
        </li>
        <li>
            All of these rules are set and any changes will require a vote for the next season only. Any GM can propose rules changes in the off-season. A ⅔ majority vote is required to make a rule change.
        </li>
        <li>
            Scoring is not subject to change, as it would cause changes of player values that owners would not have been expecting.
        </li>
    </ol>
    

    <h3 class="subSectionHeading" bind:this={a_3}>A.3 Comissioner Responsibilities</h3>

    <ol>
        <li>
            Because of the inability to account for all possible scenarios, the commissioner will assume a governing position for the league.
        </li>
        <li>
            The commissioner is responsible for interpreting league rules, settling league disputes, and handling day-to-day operations.
        </li>
        <li>
            The commissioner reserves the right to protect the integrity of the league, especially in cases of clear collusion, cheating, or intentional sabotage of the league.
        </li>
        <li>
            If any situation arises that is not covered by these rules, the commissioner will use their discretion to determine the best course of action, and enforce whatever action is necessary to maintain fair, fun, and honest play.
        </li>
        <li>
            The commissioner will act in the best interest of the league at all times.
        </li>
    </ol>

    <h3 class="subSectionHeading" bind:this={a_4}>A.4 General Manager Responsibilities</h3>

    <ol>
        <li>
            Each GM shall behave in a responsible manner that would not harm other owners or the league.
        </li>
        <li>
            It is the responsibility of each GM to refrain from participating in collusion or anti-competitive behavior.
        </li>
        <li>
            Each GM must keep their contact information updated with the commissioner and the rest of the league
        </li>
        <li>
            Each GM may only control one team in the league.
        </li>
        <li>
            Penalty for violating any GM responsibilities not outlined elsewhere in the ruleset
            <ol>
                <li>
                    1st offense: Warning
                </li>
                <li>
                    2nd offense or particularly severe incident: Loss of earliest owned rookie pick and forfeit the right to any prize winnings for the season.
                </li>
                <li>
                    3rd offense or extremely severe incident: Removed from league and forfeit the right to the team and any prize winnings
                </li>
            </ol>
        </li>
    </ol>


    <h2 class="sectionHeading" bind:this={b}>Section B: Roster, Draft & Important Dates</h2>
    
    <h3 bind:this={b_1}>B.1 Roster</h3>

    <ol>
        <li>
            30 Player In-Season Roster [Starters + Bench]
        </li>
        <li>
            No Taxi Squad, No IR
        </li>
        <li>
            10 Starters  [1 QB | 2 RB | 3 WR | 3 FLEX| 1 SUPERFLEX]
        </li>
        <li>
            35 Player Off-Season Roster
            <ol>
                <li>
                    Roster Size Increased after Week 16
                </li>
                <li>
                    Roster Size cut down back to 30 the Monday after Final Preseason Weekend l
                </li>
            </ol>
        </li>
        <li>
            No positional roster requirements/maximums
        </li>
    </ol>

    <h3 bind:this={b_2}>B.2 Inaugural Draft</h3>
    <ol>
        <li>
            The Inaugural Draft consists of 30 rounds, and includes both NFL veterans AND rookies that have been drafted or signed to rookie free agent contracts by NFL teams.
        </li>
        <li>
            The Inaugural draft must be scheduled to take place after the NFL rookie draft.
        </li>
        <li>
            3rd Round Reversal is in effect.
        </li>
        <li>
            Trading of later inaugural draft picks as well as future rookie draft picks is allowed.
        </li>
        <li>
            Draft order determined by 2k16 sim
        </li>
        <li>
            5 minute soft-cap timer per draft pick. Draft picks should be prompt but not stressful
        </li>
    </ol>
    
    <h3 bind:this={b_3}>B.3 Annual Rookie Draft</h3>
    <ol>
        <li>
            4 rounds
        </li>
        <li>
            Straight Format (i.e. 1-2-3, 1-2-3)
        </li>
        <li>
            Rookies and Free Agents are both available to be drafted.
        </li>
        <li>
            Rookie draft picks will be granted to all teams for the current and future seasons.
        </li>
        <li>
            The draft order is determined by the “Potential Points” ranking (the highest possible points you could have gotten), which is to prevent tanking.
        </li>
        <li>
            The rookie draft will be a long-running online draft, using the league software, starting on 1st Sunday of June at 12:00 PM EST. Owners are expected to plan around being available on this date and in the subsequent days / weeks to ensure an expeditious draft.
        </li>
        <li>
            GMs are allowed a 24 hour selection time limit. This time limit is for "just in case" scenarios and should not be abused. No one should continually hold up the draft or use the full allotted amount of time in a given round if they can help it.
        </li>
        <li>
            Teams that exceed their 24-hour selection time limit will have their pick skipped
        </li>
        <li>
            In such a scenario, it is the responsibility of the team GM to then contact the commissioners with the player they wish to select and said selection will be approved and processed if the player is still available
        </li>
        <li>
            If a GM misses two picks in a row, the draft will be stopped and the commissioner will try to contact the GM to discuss the situation.
        </li>
    </ol>

    <h3 bind:this={b_4}>B.4 Important Dates</h3>

    <ol>
        <li>
            Tuesday after Week 17  – Rule Changes Discussion Begins
        </li>
        <li>
            Tuesday after Week 17  – Free Agents are locked, Roster expanded to 35 players
        </li>
        <li>
            1st Sunday of June – Rookie Draft begins Annually, Dues must be paid
        </li>
        <li>
            After completion of Rookie Draft, auctions turned on
        </li>
        <li>
            Monday after Final Preseason Weekend – Roster cut to 30 players
        </li>
        <li>
            NFL Week 17 – Championship
        </li>
        <li>
            End of Week 17 – Rookie Draft order determined
        </li>
        <li>
            After NFL week 18 – Payouts are paid
        </li>
        <li>
            Weekly Event – Wednesday – 3:15AM ET – Waivers Run
        </li>
    </ol>
    
    <h2 class="sectionHeading" bind:this={c}>Section C: Divisions, Schedule & Playoff Brackets</h2>

    <h3 bind:this={c_1}>C.1 Divisions</h3>
        <ol>
        <li>
            3 divisions of 4 teams.
        </li>
        <li>
            Divisions are randomized each season with 1 team from each quartile from the previous season’s finishes.
        </li>
    </ol>

    <h3 bind:this={c_2}>C.2 Regular Season Schedule</h3>
    <ol>
        <li>
            14 Weekly Match ups
        </li>
        <li>
            Each team will play the other 2 teams in their division twice and all other teams once.
        </li>
    </ol>

    <h3 bind:this={c_3}>C.3 Loser's Bracket</h3>
    <ol>
        <li>
            3 Round Playoff
        </li>
        <li>
            Remaining 6 teams qualify
        </li>
        <li>
            Single Elimination
        </li>
        <li>
            Draft order is already determined at this point
        </li>
        <li>
            Schedule (Seeding is based off pick placement)
            <ol>
                <li>
                    Week 15: 6th & 5th pick Receive BYE
                </li>
                <li>
                    Week 15: 2nd vs 3rd | 1st vs 4th 
                </li>
                <li>
                    Week 16: 1st vs. lowest remaining | 2nd vs. highest remaining
                </li>
                <li>
                    Week 17; ROOKIE BOWL: Winner Receives 2nd Round rookie pick (2.13)
                </li>
            </ol>
        </li>
    </ol>

    <h3 bind:this={c_4}>C.4 Winner's Bracket</h3>
    <ol>
        <li>
            3 Round Playoff
        </li>
        <li>
            6 teams advance
        </li>
        <li>
            Single Elimination
        </li>
        <li>
            Seeding
            <ol>
                <li>
                    First 3 seeds are division winners.
                </li>
                <li>
                    4th and 5th seed determined by record first with applicable tiebreakers listed below.
                </li>
                <li>
                    6th seed determined by points for, with applicable tiebreakers listed below.
                </li>
            </ol>
        </li>
        <li>
            Schedule
            <ol>
                <li>
                    Week 15: 1st  & 2nd seed Receive BYE
                </li>
                <li>
                    Week 15: 5th vs 4th | 6th vs 3rd
                </li>
                <li>
                    Week 16: 1st vs. lowest remaining | 2nd vs. highest remaining
                </li>
                <li>
                    Week 17; CHAMPIONSHIP
                </li>
            </ol>
        </li>
    </ol>
    
    <h2 class="sectionHeading" bind:this={d}>Section D: Buy-In & Pay Outs/h2>
    <ol>
        <li>
            Money is due 1 week prior to rookie draft at the latest.
        </li>
        <li>
            Offseason trades can’t be made until dues are paid.
        </li>
        <li>
            Future assets cannot be traded until 50% of that year’s buy in has been paid
        </li>
        <li>
            Commissioner will give a 24 hour warning for when payment will need to be made.
        </li>
        <li>
            Offending owners will lose their least valuable remaining pick if they still haven’t paid after the warning.
        </li>
        <li>
            $20 each week goes to Highest Weekly Score (excluding Championship week 16) = $300
        </li>
        <li>
            $500 goes to the First Place Champion
        </li>
        <li>
            $200 goes to 2nd Place
        </li>
        <li>
            $100 goes to 3rd Place
        </li>

        <li>
            $100 goes in DYNASTY pool.
            <ol>
                <li>
                    The DYNASTY pool is collected annually
                </li>
                <li>
                    Will be awarded to the Franchise that wins ‘back-to-back’ Championships. 
                </li>
                <li>
                    If the league is disbanded and there is money in the dynasty pool, it will be divided evenly amongst the GM’s
                </li>
            </ol>
        </li>
    </ol>

    <h2 class="sectionHeading" bind:this={e}>Section E: Waivers & Free Agency</h2>
    
    <h3 bind:this={e_1}>E.1 In-Season Waivers</h3>
    <ol>
        <li>
            Each team has a FAAB budget of $100
        </li>
        <li>
            Free agents will be processed by Sleeper’s automated waiver window system. Waivers will be processed on Wednesday morning (3:15am ET), during the regular season starting at the completion of week one.
        </li>
        <li>
            Players not claimed by waivers will be available to be picked up for free until the start of their next game, or the first kickoff on Sunday if on Bye.
        </li>
        <li>
            There is a $1 minimum bid and bids are done in increments of $1 (i.e. - no decimals).
        </li>
        <li>
            Once a player is dropped, he is locked until the next time waivers are processed.
        </li>
        <li>
            Waivers are available from the start of Week 1 until Wednesday on Week 16.
        </li>
    </ol>

    <h3 bind:this={e_2}>E.2 Off-Season Free Agency</h3>
    <ol>
        <li>
            Free Agency is locked from the conclusion of Week 16 until the Rookie draft.
        </li>
        <li>
            This is meant as a way to allow owners to unplug from Fantasy/NFL during the offseason for a time without a loss of competitive advantage.
        </li>

    <h2 class="sectionHeading" bind:this={f}>Section F: Trading</h2>
    
    <h3 bind:this={f_1}>F.1 General Rules</h3>
    <ol>
        <li>
            Trades are processed immediately when accepted
        </li>
        <li>
            There is no trade deadline, including into the playoffs.
        </li>
        <li>
            Trade proposals are valid for up to 7 days. Take your time.
        </li>
        <li>
            FAAB budget may be obtained via trade.
        </li>
        <li>
            No trades may be made that include real cash, future considerations, a player to be named later, or anything outside the realm of the fantasy league.
        </li>
        <li>
            From kickoff of Week 1 through the league championship, a traded player cannot be traded between the same two teams for at least four (4) weeks.
            <ul><li>
                If an owner observes a trade they suspect to be in violation of this rule, please report it to the commissioner.
            </li></ul>
        </li>
    </ol>
    
    <h3 bind:this={f_2}>F.2 Conditional Trades</h3>
    <ol>
        <li>
            Commissioner must be made aware, with explicit approval from both parties on the conditional nature of the trade prior to it being executed.
        </li>
        <li>
            Commissioner may veto conditional nature of trades if deemed ambiguous.
        </li>
        <li>
            Assets included in conditional trades are locked up and may not be included in other trades.
        </li>
        <li>
            Examples
            <ul>
                <li>
                    Top 3 protected 2021 1st Rounder, Unprotected in 2022
                </li>
                <li>
                    2nd round 2021 pick if player starts X games. 3rd round 2021 pick otherwise.
                </li>
            </ul>
        </li>
    </ol>

    <h3 bind:this={f_3}>F.3 Trade Vetoing</h3>
    <ol>
        <li>
            This league supports the spirit of “Trades will not be vetoed, except in clear cases of collusion.” However, for the integrity and longevity of the league, there must be a mechanism to handle ‘league breaking’ trades.
        <li>
            Commissioner reserves the right to deem a trade “league breaking” and reverse said trade.
        </li>
        <li>
            The term “league breaking” is an extremely high bar, and is not to be taken lightly.
        </li>
        <li>
            This mechanism isn’t meant to handle trades where people have different player values and it isn’t intended to impose the commissioner’s player values on other people.
        </li>
    </ol>

    <h3 bind:this={f_4}>F.4 Trading Draft Picks</h3>
    <ol>
        <li>
            You are allowed to trade up to 1-3 years in advance draft picks
        <li>
            If a player decides to trade a future draft pick, 50% of that season’s dues must be paid before doing so
        </li>

    <h2 class="sectionHeading" bind:this={g}>Section G: Tie Breakers</h2>
    
    <h3 bind:this={g_1}>G.1 General Tiebreakers</h3>
     <ol>
        <li>
            Head-to-Head Winning %
        <li>
            Division Winning %
        </li>
        <li>
            Total Points Scored
        </li>
        <li>
            Total Points Against
        </li>
        <li>
            Rap Battle
        </li>
    </ol>
    
    <h3 bind:this={g_2}>G.2 Waiver Bid Tie Breakers</h3>
    <ol>
        <li>
            Overall winning % (favoring lower)
        </li>
        <li>
            Total Points Scored (favoring lower)
        </li>
    </ol>

  
    <h3 bind:this={g_3}>G.3 Playoff Tiebreakers</h3>
   <ol>
        <li>
            QB Scoring
        </li>
        <li>
            Top RB + Top WR Combo Scoring
        </li>
        <li>
            Rap Battle
        </li>
    </ol>

     <h2 class="sectionHeading" bind:this={h}>Section H: Lineups & Scoring</h2>
    
    <h3 bind:this={h_1}>H.1 Lineups</h3>
    <ol>
        <li>
            10 Starters  [1 QB | 2 RB | 3 WR | 3 FLEX| 1 SUPERFLEX]
        </li>
        <li>
            Conditional Lineup Requests
            <ol>
                <li>
                    Owners may submit to the commissioner conditional lineup requests based on player availability and scheduling that makes fully informed decision making impossible.
                </li>
                <li>
                    Owner’s must specify their request prior to the start of either potential players’ games, and with enough time for the commissioner to approve it before said games begin.
                </li>
                <li>
                    The conditional nature is based solely on the availability of the given player or the occurrence of a game. The conditional nature cannot be based on the availability of any other player, and a player need only be available to be played - starting nor even playing a snap is required.
                </li>
                <li>
                    Conditional lineup requests may be made in batch form i.e. setting multiple replacements, or replacements for any player of a position type. Examples include.
                    <ul>
                        <li>
                            Start: Alvin Kamara\n
                            Conditional: Latavius Murray
                        </li>
                        <li>
                            Start: Chris Carson, Austin Ekeler\n
                            Conditional: Ronald Jones
                        </li>
                        <li>
                            Start: Julio Jones, Mike Evans, Keenan Allen\n
                            Conditional: Brandin Cooks, Marvin Jones Jr
                        </li>
                    </ul>
                </li>
            </ol>
        </li>
        <li>
            Trade proposals are valid for up to 7 days. Take your time.
        </li>
        <li>
            FAAB budget may be obtained via trade.
        </li>
        <li>
            No trades may be made that include real cash, future considerations, a player to be named later, or anything outside the realm of the fantasy league.
        </li>
        <li>
            From kickoff of Week 1 through the league championship, a traded player cannot be traded between the same two teams for at least four (4) weeks.
            <ul><li>
                If an owner observes a trade they suspect to be in violation of this rule, please report it to the commissioner.
            </li></ul>
        </li>
    </ol>
    
    <h3 bind:this={h_2}>H.1 Scoring Settings</h3>
    <ol>
        <li>
            Number of Passing TDs [6 points each]
        <li>
            Passing Yards [.04 point for every 1]
        </li>
        <li>
            Completion [.2 points for each]
        </li>
        <li>
            Incompletions [-.4 for each]
        </li>
        <li>
            Interceptions Thrown [-4 for each]
        </li>
        <li>
            Passing 2 Pointers [2 points each]
        </li>
        <li>
            Number of Rushing TDs [6 points each]
        </li>
        <li>
            Rushing Yards [.1 point for every 1]
        </li>
        <li>
            Rushing 2 Pointers [2 points each]
        </li>
        <li>
            Number of Receiving TDs [6 points each]
        </li>
        <li>
            Receiving Yards [.1 point for every 1]
        </li>
        <li>
            First downs [1 point]
        </li>
        <li>
            Receptions [1 point, 2 points for TE]
        </li>
        <li>
            Receiving 2 Pointers [2 points each]
        </li>
        <li>
            Punt Return for Touchdown [6 points each]
        </li>
        <li>
            Kickoff Return for Touchdown [6 points each]
        </li>
        <li>
            Fumbles [-1 point]
        </li>
        <li>
            Fumbles lost [-1 point, total of -2]
        </li>
    </ol>

</div>
