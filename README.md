<div align="center">
  <img alt="League Page logo" src="https://storage.googleapis.com/nfl-player-data/League%20Page.png" width="100px" />

  **[(Unofficial) Sleeper League Page Template](https://github.com/nmelhado/league-page/)**


Generate a custom league page for your Sleeper fantasy football league in just a few steps
  <br />
  ![GitHub](https://img.shields.io/github/license/nmelhado/league-page) [![node](https://img.shields.io/badge/node-%3E%3D14-brightgreen)](https://github.com/nmelhado/league-page) ![GitHub top language](https://img.shields.io/github/languages/top/nmelhado/league-page?color=ff3e00) ![Lines of code](https://img.shields.io/tokei/lines/github/nmelhado/league-page?label=lines%20of%20code) ![GitHub forks](https://img.shields.io/github/forks/nmelhado/league-page) ![GitHub pull requests](https://img.shields.io/github/issues-pr/nmelhado/league-page) ![GitHub issues](https://img.shields.io/github/issues-raw/nmelhado/league-page)
</div>


![League Page demo](https://storage.googleapis.com/nfl-player-data/league-page-demo.png)

<div align="center">
<a href="https://www.legendsleagueff.com/" style="font-size:2em; text-decoration: underline;" >Live demo</a>
</div>

<br>
<br>

-----------
<div align="center">

<i>If you and your league like League Page, please consider <b><a href="https://www.buymeacoffee.com/nmelhado" target="_blank">donating</a></b> (and encouraging your league-mates to too!)</i>
<br>
    <a href="https://www.buymeacoffee.com/nmelhado" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png" alt="Buy Me A Coffee" style="height: 60px !important; width: 217px !important;" width="217px" height="60px" ></a>
</div>

-----------

<br>
<br>

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
- Desktop, Mobile and [PWA](https://mobilesyrup.com/2020/05/24/how-install-progressive-web-app-pwa-android-ios-pc-mac/) compatible 
- League information generated from [Sleeper API](https://docs.sleeper.app/)


## Roadmap
  - [ ] Add integration tests
  - [ ] Cleanup repo
  - [x] ~~Test redraft leagues~~
  - [x] ~~Playoff matchups and current bracket~~
  - [ ] Dynasty power rankings
  - [ ] Hyperlink all manager references
  - [x] ~~Fix all css issues when actively resizing the window~~

## Some real-life League Pages
- [Legends League](https://www.legendsleagueff.com/)

### Setup your own League Page
*If you've never touched a line of code, use the [Training Wheels Guide](./TRAINING_WHEELS.md) instead*
- Fork this repo
- Go to `/src/lib/utils/leagueInfo.js` and replace `your_league_id` (line 2) and `your_league_name` (line 3) with your Sleeper league ID and league name. (Optionally, also fill out the dues, and dynasty fields):
![league ID instructions](https://storage.googleapis.com/nfl-player-data/league_id_instructions.png)
- Write your homepage text (league intro/bio) `/src/lib/utils/leagueInfo.js` (lines 9-14)
![homepage text](https://storage.googleapis.com/nfl-player-data/homepage_text.png)
- Next, fill out and uncomment (delete the `// ` at the beginning of each line) the managers' object (lines 27 - 92), also located in `/src/lib/utils/leagueInfo.js`, there should be one object for each manager (for assistance, consult the [Training Wheels guide](https://github.com/nmelhado/league-page/blob/master/TRAINING_WHEELS.md#2-add-managers))
![manager object](https://storage.googleapis.com/nfl-player-data/managersObj.png)
![manager rendering](https://storage.googleapis.com/nfl-player-data/managerRendering.png)
- Add corresponding images for managers to the `/static/managers/` directory and make the sure the name matches with what was provided above
- If you run into trouble adding managers, reference the [Training Wheels' Manager section](https://github.com/nmelhado/league-page/blob/master/TRAINING_WHEELS.md#2-add-managers)
- Customize your league constitution `/src/routes/constitution/index.svelte` (remember to adjust the table of contents accordingly)
-----------
## For local developing [npm](https://docs.npmjs.com/getting-started/what-is-npm):

    npm install
    npm run dev --
    npm run dev -- --host (to test on other devices locally)
## To deploy on [Vercel](https://vercel.com/) for free:
- Push up your changes
- [Link your github repo to Vercel](https://vercel.com/guides/deploying-svelte-with-vercel#step-2:-deploying-your-svelte-app-with-vercel)
- That's it!

<!-- ## Development
see [CONTRIBUTING.md](.github/CONTRIBUTING.md) -->