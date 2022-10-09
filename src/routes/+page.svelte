<script>
  import LinearProgress from "@smui/linear-progress";
  import {
    getNflState,
    cleanName,
    leagueName,
    homepageText,
    managers,
    gotoManager,
    enableBlog,
    bannerImage,
    bannerComputer,
    bannerTrophy,
    bannerFootball,
  } from "$lib/utils/helper";
  import { Transactions, PowerRankings, HomePost } from "$lib/components";
  import { getAwards } from "$lib/utils/helper";
  import AllManagers from "$lib/Managers/AllManagers.svelte";

  let nflState = getNflState();
  let podiumsData = getAwards();

  const getNames = (name, rosterID, currentManagers) => {
    if (cleanName(name) != cleanName(currentManagers[rosterID].name)) {
      return `${name}<div class="curOwner">(${currentManagers[rosterID].name})</div>`;
    }
    return name;
  };

  let el, left;

  const resize = (w) => {
    left = el?.getBoundingClientRect() ? el?.getBoundingClientRect().left : 0;
  };

  $: resize(innerWidth);

  let innerWidth;
</script>

<svelte:window bind:innerWidth />

<div id="home">
  <div id="main">
    <div id="banner-flex">
      <div class="banner-wrapper">
        <i class="banner-image-2 icon-color" />
      </div>
      <div class="banner-wrapper">
        <i class="banner-image-1 icon-color" />
      </div>
      <div class="banner-wrapper">
        <i class="banner-image-3 icon-color" />
      </div>
    </div>
    <!-- <img class="banner" src={bannerImage} alt="banner-logo" /> -->
    <div class="text">
      <!-- <h6>{leagueName}</h6> -->
      <!-- homepageText contains the intro text for your league, this gets edited in /src/lib/utils/leagueInfo.js -->
      {@html homepageText}
      <!-- Most recent Blog Post (if enabled) -->
      {#if enableBlog}
        <HomePost />
      {/if}
    </div>
    <PowerRankings />
  </div>

  <div class="leagueData">
    <div class="homeBanner">
      {#await nflState}
        <p class="center">Retrieving NFL state...</p>
        <LinearProgress indeterminate />
      {:then nflStateData}
        <p class="center">
          NFL {nflStateData.season}
          {#if nflStateData.season_type == "pre"}
            Preseason
          {:else if nflStateData.season_type == "post"}
            Postseason
          {:else}
            {nflStateData.week > 0 ? `Week ${nflStateData.week}` : "Preseason"}
          {/if}
        </p>
      {:catch error}
        <p class="center">Something went wrong: {error.message}</p>
      {/await}
    </div>

    <div id="currentChamp">
      {#await podiumsData}
        <p class="center">Retrieving awards...</p>
        <LinearProgress indeterminate />
      {:then { podiums, currentManagers }}
        {#if podiums[0]}
          <h4>{podiums[0].year} Champ</h4>
          <div
            id="champ"
            on:click={() => {
              if (managers.length)
                gotoManager(parseInt(podiums[0].champion.rosterID));
            }}
          >
            <img
              src={podiums[0].champion.avatar}
              class="first"
              alt="champion"
            />
            <img src="./laurel.png" class="laurel" alt="laurel" />
          </div>
          <span
            class="label"
            on:click={() => gotoManager(parseInt(podiums[0].champion.rosterID))}
            >{@html getNames(
              podiums[0].champion.name,
              podiums[0].champion.rosterID,
              currentManagers
            )}</span
          >
        {:else}
          <p class="center">No former champs.</p>
        {/if}
      {:catch error}
        <p class="center">Something went wrong: {error.message}</p>
      {/await}
    </div>

    <div class="transactions" bind:this={el}>
      <Transactions masterOffset={left} />
    </div>
  </div>
</div>

<style>
  #home {
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    overflow-y: hidden;
    z-index: 1;
  }

  #main {
    flex-grow: 1;
    min-width: 320px;
    margin: 0 auto;
    padding: 60px 0;
  }

  .text {
    padding: 0 30px;
    max-width: 620px;
    margin: 0 auto;
  }

  .leagueData {
    position: relative;
    z-index: 1;
    width: 100%;
    min-width: 470px;
    max-width: 470px;
    min-height: 100%;
    background-color: var(--ebebeb);
    border-left: var(--eee);
    box-shadow: inset 0px 3px 3px -2px rgb(0 0 0 / 40%),
      inset 0px 3px 4px 0px rgb(0 0 0 / 28%),
      inset 0px 1px 8px 0px rgb(0 0 0 / 24%);
  }

  @media (max-width: 950px) {
    .leagueData {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
    }
    #home {
      flex-wrap: wrap;
    }
  }

  .transactions {
    display: block;
    width: 95%;
    margin: 10px auto;
  }

  .center {
    text-align: center;
  }

  /* h6 {
    text-align: center;
    font-size: 48px;
    margin: 80px 0;
    font-weight: 300;
    letter-spacing: 5px;
  } */

  /* champ styling */
  #currentChamp {
    padding: 25px 0;
    background-color: var(--f3f3f3);
    box-shadow: 5px 0 8px var(--champShadow);
    border-left: 1px solid var(--ddd);
  }

  #champ {
    position: relative;
    width: 150px;
    height: 150px;
    margin: 0 auto;
    cursor: pointer;
  }

  .first {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border-radius: 100%;
    border: 1px solid #ccc;
    left: 50%;
    top: 43%;
  }

  .laurel {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 135px;
    height: auto;
    left: 50%;
    top: 50%;
  }

  #banner-flex {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
  }

  .banner-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 25px;
    padding: 30px;
    border: 3px solid white;
    border-radius: 50%;
    background-color: rgba(22, 22, 22, 0.829);
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }

  @media (max-width: 950px) {
    .banner-image-1 {
      width: 50px !important;
      height: 50px !important;
      padding: 5px !important;
    }
    .banner-image-2 {
      width: 30px !important;
      height: 30px !important;
      padding: 5px !important;
    }
    .banner-image-3 {
      width: 30px !important;
      height: 30px !important;
      padding: 5px !important;
    }

    .banner-wrapper {
      margin: 7px;

    }
  }

  .banner-image-1 {
    width: 92px;
    height: 92px;
    padding: 10px;

    -webkit-mask: url("/banner-computer.svg") no-repeat 50% 50%;
    mask: url("/banner-computer.svg") no-repeat 50% 50%;
    -webkit-mask-size: contain;
    mask-size: contain;
  }

  .banner-image-2 {
    width: 72px;
    height: 72px;
    padding: 10px;

    -webkit-mask: url("/banner-football.svg") no-repeat 50% 50%;
    mask: url("/banner-football.svg") no-repeat 50% 50%;
    -webkit-mask-size: contain;
    mask-size: contain;
  }

  .banner-image-3 {
    width: 72px;
    height: 72px;
    padding: 10px;

    -webkit-mask: url("/banner-trophy.svg") no-repeat 50% 50%;
    mask: url("/banner-trophy.svg") no-repeat 50% 50%;
    -webkit-mask-size: contain;
    mask-size: contain;
  }

  .icon-color {
    background: linear-gradient(
      45deg,
      #f17c58,
      #e94584,
      #24aadb,
      #27dbb1,
      #ffdc18,
      #ff3706
    );
    background-size: 600% 100%;
    animation: gradient 10s linear infinite;
    animation-direction: alternate;
  }
  @keyframes gradient {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 100%;
    }
  }

  h4 {
    text-align: center;
    font-size: 1.6em;
    margin: 10px;
  }

  .label {
    display: table;
    text-align: center;
    line-height: 1.1em;
    padding: 6px 20px;
    background-color: var(--fff);
    border: 1px solid #aaa;
    margin: 10px auto 0;
    cursor: pointer;
  }

  :global(.curOwner) {
    font-size: 0.75em;
    color: #bbb;
    font-style: italic;
  }
</style>
