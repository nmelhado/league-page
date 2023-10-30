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
    <h1 class="noUnderscore">The BMFFFL</h1>
    
    <h2 class="noUnderscore">'A new and better league' The Best Motherfucking Fantasy Football League. Established 2016.</h2>
    
    <h2 class="sectionHeading">The Constitution</h2>

<h3 class="noUnderscore clickable" on:click={() => goToSection(preamble)}>Preamble</h3>
<p>We, the members of the BMFFFL, in our desire for fair play, competition, and camaraderie, do hereby adopt and proclaim this Constitution to guide our league, entrusting the Commissioner with the ultimate executive power and authority over the rules and regulations of our league.</p>

<h3 class="noUnderscore clickable" on:click={() => goToSection(one)}>Section 1: Name and Purpose</h3>
<p>1.1 The league shall be named the Bragging Masters Fantasy Football League (BMFFFL). The purpose of the BMFFFL is to promote friendly competition, enhance the enjoyment of professional football, and strengthen bonds among its members.</p>

<h3 class="noUnderscore clickable" on:click={() => goToSection(two)}>Section 2: Membership</h3>
<p>2.1 Membership is open to those invited by existing members and approved by the Commissioner. All members have the right to participate, compete, and voice their opinions on league matters.</p>

<h3 class="noUnderscore clickable" on:click={() => goToSection(three)}>Section 3: The Commissioner</h3>
<p>3.1 The Commissioner shall serve as the chief executive officer of the BMFFFL. The Commissioner holds the ultimate authority in interpreting and enforcing the league's rules. All decisions made by the Commissioner are final, unless specified otherwise in this Constitution. The Commissioner has the right to delegate responsibilities to other members as deemed necessary.</p>

<h3 class="noUnderscore clickable" on:click={() => goToSection(four)}>Section 4: Powers of the Commissioner</h3>
<p>4.1 The Commissioner shall have the authority to:</p>
<ul>
    <li>a) Amend, interpret, and enforce the rules of the BMFFFL.</li>
    <li>b) Settle disputes between members.</li>
    <li>c) Approve trades, acquisitions, and other transactions.</li>
    <li>d) Impose sanctions on members for violations of league rules.</li>
    <li>e) Appoint and oversee subcommittees or assistants for specific tasks.</li>
</ul>

<h3 class="noUnderscore clickable" on:click={() => goToSection(five)}>Section 5: Decision Making</h3>
<p>5.1 While the Commissioner holds ultimate authority, they should consider the opinions and suggestions of league members. The Commissioner may call for a league vote on certain matters. However, the Commissioner retains the right to make the final decision, even if it goes against the majority vote.</p>

<h3 class="noUnderscore clickable" on:click={() => goToSection(six)}>Section 6: Amendments to the Constitution</h3>
<p>6.1 Proposals to amend the Constitution may be submitted by any league member. Amendments require a two-thirds majority vote from the league members to pass. Upon passing, the Commissioner will decide on the final wording and implementation of the amendment.</p>

<h3 class="noUnderscore clickable" on:click={() => goToSection(seven)}>Section 7: Season and Playoffs</h3>
<p>7.1 The regular season and playoff structure will be determined annually by the Commissioner. The Commissioner has the authority to make changes to the season and playoff format as deemed necessary.</p>

<h3 class="noUnderscore clickable" on:click={() => goToSection(eight)}>Section 8: Conclusion</h3>
<p>8.1 By participating in the BMFFFL, all members agree to abide by this Constitution and respect the authority of the Commissioner. This Constitution serves to ensure the smooth operation, fairness, and enjoyment of the league for all its members.</p>

</div>
