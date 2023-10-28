<div align="center">
  <img alt="League Page logo" src="https://storage.googleapis.com/nfl-player-data/League%20Page.png" width="100px" />

  **[(Unofficial) Sleeper League Page Template](https://github.com/nmelhado/league-page/)**


Generate a custom league page for your Sleeper fantasy football league in just a few steps
  <br />

  ![GitHub](https://img.shields.io/github/license/nmelhado/league-page) [![node](https://img.shields.io/badge/node-%3E%3D14-brightgreen)](https://github.com/nmelhado/league-page) ![GitHub top language](https://img.shields.io/github/languages/top/nmelhado/league-page?color=ff3e00) ![Lines of code](https://img.shields.io/tokei/lines/github/nmelhado/league-page?label=lines%20of%20code) ![GitHub forks](https://img.shields.io/github/forks/nmelhado/league-page) ![GitHub pull requests](https://img.shields.io/github/issues-pr/nmelhado/league-page) ![GitHub issues](https://img.shields.io/github/issues-raw/nmelhado/league-page)
</div>

<div align="center">
  <h1>Training Wheels Instructions</h1>
  <span>Keep this open in a separate tab, to make setup as easy as possible</span>
</div>

## I. Initial Setup

### 1. Fork This Repo to Your GitHub Account
- If you don't already have a Github account, [make a free account](https://github.com/join)
- Go to [League Page (https://github.com/nmelhado/league-page)](https://github.com/nmelhado/league-page)
- Click on the Fork button
> ![Fork](https://storage.googleapis.com/nfl-player-data/fork.png)

<br />

- You now have your own League Page!

### 2. Configure your League
- In your league page, go to `/src/lib/utils/leagueInfo.js`
> ![src](https://storage.googleapis.com/nfl-player-data/src.png)
![lib](https://storage.googleapis.com/nfl-player-data/lib.png)
![utils](https://storage.googleapis.com/nfl-player-data/utils.png)
![leagueInfo](https://storage.googleapis.com/nfl-player-data/leagueInfo.png)

<br />

- Click the edit button
> ![editLeagueData](https://storage.googleapis.com/nfl-player-data/editLeagueData.png)

<br />

- Replace `your_league_name` and `your_league_id` with your Sleeper league name and ID *[(how to find your league ID)](https://support.sleeper.app/en/articles/4121798-how-do-i-find-my-league-id#:~:text=Go%20toward%20the%20bottom%20of,email%20support%40sleeper.app.)* :
> ![league ID instructions](https://storage.googleapis.com/nfl-player-data/editLeagueID.jpg)
- Scroll down to the bottom of the page and commit your changes
> ![Commit your changes](https://storage.googleapis.com/nfl-player-data/commitLeagueID.png)

<br />

- Your league has been configured!
### 3. Deploy your League Page
- Go to Vercel, and [sign up using your GitHub account](https://vercel.com/signup)
- Now link your Github account to your Vercel account
> ![Link GitHub account](https://storage.googleapis.com/nfl-player-data/linkAccounts.png)

<br />

- `Import` League Page
> ![import league page](https://storage.googleapis.com/nfl-player-data/importLeaguePage.png)

<br />

- Skip the Create a Team step
- Leave all setting as they are, and click `Deploy`
> ![deploy](https://storage.googleapis.com/nfl-player-data/deploy.png)

<br />

- Wait for Vercel to deploy your League Page (should take about a minute)
- Click on `Go to Dashboard`
- Now click on `Visit` to visit your page (and then keep your league website open in that tab)
- You have officially built a website!

## II. Adding Managers and Changing the Homepage Text

### 1. Now that you have a league website, it's time to personalize your homepage
- Go back to GitHub, and scroll back to the top of `/src/lib/utils/leagueInfo.js`
- Click edit
> ![edit index](https://storage.googleapis.com/nfl-player-data/editLeagueData.png)

<br />

- Scroll down to lines 9-14
> ![scroll down](https://storage.googleapis.com/nfl-player-data/scrollDown.png)

<br />

- Each line (which is sandwiched by a `<p>` and a `</p>`) creates a new paragraph on your homepage. Replace those paragraphs with the text you want to use to introduce your league
- If you want fewer paragraphs, delete one of the lines. If you want more, copy a line and paste it below the last `<p>...</p>` in this area
> ![example text](https://storage.googleapis.com/nfl-player-data/exampleText.png)

<br />

- Scroll down to the bottom of the page when you're done and `Commit changes`
- Now go back to your league website, wait a minute or two, and then refresh!
> ![text preview](https://storage.googleapis.com/nfl-player-data/textRendered.png)


### 2. Add Managers
- You now have a functioning website, with a personalized homepage. But you're missing one of League Page's best features, Managers!
- Go back to GitHub and scroll back up to the top of `/src/lib/utils/leagueInfo.js`
- Click the edit button
- Highlight lines 27-92
> ![highlight](https://storage.googleapis.com/nfl-player-data/highlight.png)

<br />

- On Mac, click: `⌘ Command` + `/`, on Windows, click: `Ctrl` + `/`. This will remove the `// ` or, in coding terminology, `uncomment` these lines, so the code should now look like this:
> ![uncomment](https://storage.googleapis.com/nfl-player-data/uncomment.png)

<br />

- Each `object` (shown highlighted below) corresponds to one manager
> ![single manager](https://storage.googleapis.com/nfl-player-data/singleManager.png)

<br />

- Fill each one out as follows:
    - `"roster" :` **This has been deprecated! You can ignore this field as long as you provide a managerID**
        - ~~To find the roster ID for the manager, go back to your website and scroll down to the `Power Rankings` graph (or to any of the graphs in your records page)~~ (Power Rankings are no longer in order)
    - `"managerID" :` the user ID of the manager
        - To find a manager's user ID, go to `https://api.sleeper.app/v1/league/<your_league_id/users` (for example: https://api.sleeper.app/v1/league/784583295500464128/users) and find the corresponding userID for each manager
        - This feld was added in version 2.1.0, so you will have to add it manually. Remember when adding it, to place the id within quotes (i.e. `"managerID" : "12345678",`)
    - `"name" :` The name of this manager
    - `"tookOver" :` **This has been deprecated! You can ignore this field as long as you provide a managerID**
        - If this manager took over an orphaned team in your league, give the year they took over. Otherwise set this to `null`
    - `"location" :` Where is this manager based out of (City, State, Country, whatever floats your boat)
    - `"bio" :` This manager's bio. If you don't have a bio yet, leave it as is and come back and edit this again when you have the bio.
    - `"photo" :` This manager's photo. To upload a photo:
        - Open up your repo's root in a new tab
        > ![newTab](https://storage.googleapis.com/nfl-player-data/newTab.png)

        <br />

        - Got to `/static/managers/`
        > ![static](https://storage.googleapis.com/nfl-player-data/static.png)
        ![managersDir](https://storage.googleapis.com/nfl-player-data/managersDir.png)

        <br />

        - Click on `Add file` then `Upload files`
        > ![managersDir](https://storage.googleapis.com/nfl-player-data/upload.png)

        <br />

        - Add one or all of the manager photos
        - When you're done, click `Commit changes` at the bottom of the page
        - Back in `/src/routes/managers/managers.js` tab, use the filename (please note that this IS case sensitive) to fill out the photo field. For the below file, you would fill out `"photo" : "/managers/nick.jpg",`
        > ![managersDir](https://storage.googleapis.com/nfl-player-data/nickExample.png)
    - `"fantasyStart" :` what year did the manager start playing fantasy
    - `"favoriteTeam" :` supply the lowercase shorthand for a manager's favorite NFL team (i.e. `"nyj"`, `"cle"`, `"sf"`, `"ne"`, etc.)
    - `"mode" :` There are three options currently: `"Win Now"`, `"Dynasty"`, or `"Rebuild"`
    - `"rival" :` This has a nested object that should be filled out as follows:
        - `"name" :` The name of this manager's rival (can also be themselves, everyone, or nobody)
        - `"link" :` This corresponds to the other managers on this list. 
            - If the manager's rival is the first manager you created in this list, you would supply `0`, if their rival is the second manager, you would supply `1`, if it's the 10th manager, you would supply `9`, etc.
            - If the rival is nobody or everyone, then supply `null`
            - If the rival is themselves, and they are the third manager in this list, supply `2`
        - `"image" :` Fill this out the same way you did for the manger photo above (you can upload and use specific rival photos if you want) 
    - `"favoritePlayer" :` This is possibly the trickiest step
        - Go to [https://api.sleeper.app/v1/players/nfl](https://api.sleeper.app/v1/players/nfl) in a new tab
        - Use `⌘ Command` + `F` (on Mac), or `Ctrl` + `F` on Windows to search for the player you are looking for and then copy down that player's `player_id`
        > ![player selection](https://storage.googleapis.com/nfl-player-data/playerSelection.jpg)
        <br />

        - Supply that number (i.e. `1426`)
    - `"favoritePlayer" :` This is possibly the trickiest step.
    - `"valuePosition" :` Does the manager prefer `"WR"`, `"RB"`, `"QB"`, `"TE"`, etc. for fantasy
    - `"rookiesOrVets" :` Two options, does the manager prefer `"Rookies"` or `"Vets"`
    - `"philosophy" :` The fantasy manager's fantasy football philosophy
    - `"tradingScale" :` a number 1-10 representing how much the manager likes to trade
    - `"preferredContact" :` `"Text"`, `"WhatsApp"`, and `"Carrier Pigeon"` are the only options supplied by default

- You have finished your first manager! Now repeat the process for each manager in your league. Here's [an example](https://github.com/nmelhado2/league-page/blob/master/src/routes/managers/managers.js) of a finished 12 team `managers.js`
- When you're done, scroll down and click `Commit changes`
- Go back to your league website tab, wait a minute or two, and then refresh. Now you'll have a Managers tab (located in `LEAGUE INFO` on desktop)
- Click on `Managers` and you'll see all the managers you just added!

> ![managers preview](https://storage.googleapis.com/nfl-player-data/managersRendered.png)

## III. Add a Blog

- Add blog capabilities to your League Page with [contenful](https://contentful.com/)
    - [Make a free contentful account](https://www.contentful.com/sign-up/)
    - Click on `Content model` in the top bar and create Blog Post (id: `blog_post`) and Blog Comment (id: `blog_comment`) content models that matches the specs below **(All fields are required)**:
    ![content model](https://storage.googleapis.com/nfl-player-data/contentModel.jpg)
    ![comment model](https://storage.googleapis.com/nfl-player-data/commentModel.jpg)
        - Use sleeper your sleeper username for the author field when creating posts
    - Copy your `Space ID`
    ![Space ID](https://storage.googleapis.com/nfl-player-data/getSpaceID.jpg)
    - Create a Content Management API key and copy down the value
    ![API key settings](https://storage.googleapis.com/nfl-player-data/apiKeySettings.jpg)
    ![add Content Management API key](https://storage.googleapis.com/nfl-player-data/addApiKey.jpg)
    ![API key](https://storage.googleapis.com/nfl-player-data/generatePersonalToken.jpg)
    ![API key](https://storage.googleapis.com/nfl-player-data/generate.jpg)
    ![API key](https://storage.googleapis.com/nfl-player-data/copyPersonalToken.jpg)
    - Create a Content Delivery / Preview API key and copy down the `Content Delivery API - access token` value
    ![API key settings](https://storage.googleapis.com/nfl-player-data/apiKeySettings.jpg)
    ![add Content Delivery / Preview API API key](https://storage.googleapis.com/nfl-player-data/content-delivery-step-1-min.jpg)
    ![Copy](https://storage.googleapis.com/nfl-player-data/content-delivery-step-2-min.jpg)
    - Now, go back to Vercel go to your project settings
    ![project settings](https://storage.googleapis.com/nfl-player-data/projectSettings.jpg)
    - Go to the environment variables section
    ![environment variables](https://storage.googleapis.com/nfl-player-data/envVariables.jpg)
    - Add the values using the following names
        - name: `VITE_CONTENTFUL_SPACE` value: `Space ID (from contentful)`
        - name: `VITE_CONTENTFUL_ACCESS_TOKEN` value: `Content Management API - access token (from contentful)`
        - name: `VITE_CONTENTFUL_CLIENT_ACCESS_TOKEN` value: `Content Delivery API - access token (from contentful)`
    ![contentful space](https://storage.googleapis.com/nfl-player-data/contentfulSpace.jpg)
    ![contentful API token](https://storage.googleapis.com/nfl-player-data/contentfulAPIKey.jpg)
    ![contentful delivery API token](https://storage.googleapis.com/nfl-player-data/vercel%20step%203-min.jpg)
    - Go back to GitHub and scroll back up to the top of `/src/lib/utils/leagueInfo.js`
    - Click the edit button and set `enableBlog` to true
    - Scroll down and click `Commit changes`

## IV. Updates

- League Page is constantly being updated and improved. Check back on your repo periodically and whenever you see the `fetch update` button, click `fetch update` and commit the changes to get the upgrades
> ![fetch upstream](https://storage.googleapis.com/nfl-player-data/fetchUpstream.jpg)

<br />

- Another way to know there's an update available is if you see the following notification on your League Page:
    > ![update notification](https://storage.googleapis.com/nfl-player-data/updateNotification.jpg)
    
    <br />

    - To see what's changed in the newest updates (bugs fixed, features added, etc.), check the [CHANGELOG](https://github.com/nmelhado/league-page/blob/master/CHANGELOG.md)

    <br />

    - **If you first created your league before August 7th, 2021**, you may encounter `merge conflicts` when trying to fetch upstream.
        - In that situation (if you are new to coding), copy the contents of your managers page and your homepage text and delete your repo. Re-follow this guide and re-deploy your page.
        - There should be **NO merge conflicts going forward**.

    - **WARNING:** There may be merge conflicts in `package-lock.json`. *This should be very rare.*
        - Follow these instructions to [resolve the conflict](https://docs.github.com/en/github/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github). For the most part, you'll most likely want to keep the changes from master (the second change)


## V. Wrapping up

- That's it. You've built out your own league website!
- If you want to replace the league page logo with your league's own logo, replece `static/badge.png` with your own 120px x 120px png file (using the same name)
- If  you want to delve further, you can also edit your league constitution page `/src/routes/constitution/+page.svelte`
    - This page is primarily HTML, so you can edit this in a similar way to how you edited the homepage
- If you and your league like League Page, please consider <b><a href="https://www.buymeacoffee.com/nmelhado" target="_blank">donating</a></b> (and encouraging your league-mates to too!)
<div align="center">
    <a href="https://www.buymeacoffee.com/nmelhado" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png" alt="Buy Me A Coffee" style="height: 60px !important; width: 217px !important;" width="217px" height="60px" ></a>
</div>

- **If you run into any issues**, go back to [the original League Page repo](https://github.com/nmelhado/league-page) and open an [issue](https://github.com/nmelhado/league-page/issues/new?assignees=nmelhado&labels=bug&template=bug_report.md&title=%5BBUG%5D)
- **If you have any recommendations**, go back to [the original League Page repo](https://github.com/nmelhado/league-page) and open a [feature request](https://github.com/nmelhado/league-page/issues/new?assignees=nmelhado&labels=enhancement&template=feature_request.md&title=%5BENHANCEMENT%5D)

<br>
<br>