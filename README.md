<div align="center">
  <img alt="League Page logo" src="https://storage.googleapis.com/nfl-player-data/League%20Page.png" width="100px" />

  **[(Unofficial) Sleeper League Page Template](https://github.com/nmelhado/league-page/)**


Generate a custom league page for your Sleeper fantasy football league in just a few steps
</div>


![League Page demo](https://storage.googleapis.com/nfl-player-data/league-page-demo.png)

## [Live demo](https://www.legendsleagueff.com/)
-----------
<div align="center">
<i>If you and your league like League Page, please consider supporting the project (and encouraging your leaguemates to too!)</i><br>
    <a href="https://www.buymeacoffee.com/nmelhado" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png" alt="Buy Me A Coffee" style="height: 60px !important; width: 217px !important;" width="217px" height="60px" ></a>
</div>

## Features
- Up-to-date league information
- Easy to navigate trade and waiver history
- Awards and accolades
- Records and rankings for every season
- Current season power rankings
- Previous drafts and upcoming draft preview
- Season matchups
- Manager bio pages
- League constitution
- Helpful fantasy football resources and news<br><br>
- Built using [Svelte](https://svelte.dev/docs) and [SvelteKit](https://kit.svelte.dev/docs)
- Desktop, Mobile and PWA compatible 
- League information generated from [Sleeper API](https://docs.sleeper.app/)


## Roadmap
  - [ ] Add integration tests
  - [ ] Cleanup repo
  - [ ] Test redraft leagues
  - [ ] Playoff matchups and current bracket
  - [ ] Dynasty power rankings
  - [ ] Hyperlink all manager references
  - [ ] Fix all css issues when actively resizing the window
  <!-- - [x] ~~performance optimizations~~ -->

## Some real-life League Pages
- [Legends League](https://www.legendsleagueff.com/)

### 1. Setup your own League Page
- Fork this repo
- Replace `your_league_name` and `your_league_id` with your Sleeper league name and ID in `/src/lib/utils/helperFunctions/leagueData.js`:
![league ID instructions](https://storage.googleapis.com/nfl-player-data/league_id_instructions.png)
- Fill out and uncomment (delete the `// ` at the beginning of each line) the information in `/src/routes/managers/managers.js`, there should be one for each manager
![manager object](https://storage.googleapis.com/nfl-player-data/managersObj.png)
![manager rendering](https://storage.googleapis.com/nfl-player-data/managerRendering.png)
- Add corresponding images for managers to the `/static/managers/` directory and make the sure the name matches with what was provided above
- Fill out the manager to roster ID mapping object in `/src/lib/utils/rosterManagers.js` (fill out the appropriate managers array number for each roster ID)
- Customize your league constitution `/src/routes/constitution/index.svelte` (remember to adjust the table of contents accordingly)
- Write your homepage text (league intro/bio) `/src/routes/index.svelte` (remember to adjust the table of contents accordingly)
![homepage text](https://storage.googleapis.com/nfl-player-data/homepage_text.png)
-----------
## For local developing [npm](https://docs.npmjs.com/getting-started/what-is-npm):

    npm install
    npm run dev --
    npm run dev -- --host` (to test on other devices locally)
## To deploy on [Vercel](https://vercel.com/) for free:
- Push up your changes
- [Link your github repo to Vercel](https://vercel.com/guides/deploying-svelte-with-vercel#step-2:-deploying-your-svelte-app-with-vercel)
- That's it!

<!-- ## Development
see [CONTRIBUTING.md](.github/CONTRIBUTING.md) -->