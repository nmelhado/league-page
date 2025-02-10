# Changelog

All notable changes to this project will be documented in this file.

## [2.3.5] - 2024-04-27

### Fixed

- Resorces page wouldn't load. [(issue #296)](https://github.com/nmelhado/league-page/issues/296)
- Sleeper now include median match in standings API, so we ended up double counting. Removed the median match logic [(issue #272)](https://github.com/nmelhado/league-page/issues/296) and [(issue #276)](https://github.com/nmelhado/league-page/issues/276)
- In playoff matches, the bye weeks had a non-valid manager ID whick broke due to poor error handling [(issue #289)](https://github.com/nmelhado/league-page/issues/289)
- Vercel was weirdly tring to force node 20 despite the fact that Vercel doesn't support node 20 [(issue #294)](https://github.com/nmelhado/league-page/issues/294)
- gotoManagers wasn't working on the Records page because of a bad year value being passed in. Made gotoManagers more error tollerant and also fixed the bug

## [2.3.4] - 2023-09-13

### Fixed

- Users were unable to add comments. [(issue #268)](https://github.com/nmelhado/league-page/issues/268)

## [2.3.3] - 2023-09-08

### Fixed

- Use most recent user avatar for author and comment image

### Added

- Add positional key to rosters. [(enhancement #261)](https://github.com/nmelhado/league-page/issues/261)
    - Aso added team logo and removed the large team text to better use the space

## [2.3.2] - 2023-09-07

### Fixed

- Correctly display author and commenter names and images

## [2.3.1] - 2023-09-06

### Fixed

- Darkmode fix for blog post preview

## [2.3.0] - 2023-09-06

### Fixed

- Auction leagues weren't correctly displaying the bid amount. [(issue #254)](https://github.com/nmelhado/league-page/issues/254)

### Changed

- Blogs are now displayed as previews. This umproves the UI by avoiding massive walls of text. I've also added dedicated full blog post pages to display the full post and comments. This gives individual blog posts their own links for improved shareability.

## [2.2.8] - 2023-08-21

### Fixed

- If a league did multiple drafts in the same season (startup and rookie for example), only the most recent was displayed. This ensures that all drafts from a particular season are displayed. [(issue #240)](https://github.com/nmelhado/league-page/issues/240)

## [2.2.7] - 2023-08-21

### Fixed

- Some matchups only had one team in the matchup (playing themselves ????), which caused bugs in any page that touched league records [(issue #244)](https://github.com/nmelhado/league-page/issues/244)

## [2.2.6] - 2023-07-25

### Fixed

- Small bug that was causing the performance comparisson to not always show up in the rivalry page

## [2.2.5] - 2023-06-30

### Fixed

- Fix resources bug. NBC Sports Edge API no longer works and was breaking the resources page [(issue #230)](https://github.com/nmelhado/league-page/issues/230)
    - Removed it for now. Will try to add it back if I can find the new API

## [2.2.4] - 2023-06-25

### Fixed

- Fix weird bug where stats comparisson dissapeared from rivalry page

## [2.2.3] - 2023-06-25

### Added

- Added fpts/game and win % to the rivalry page as well as emphasizing which manager is leading in each category

## [2.2.2] - 2023-06-25

### Fixed

- Fix edge case from transactions in the calendar year before the first fantasy season [(issue #206)](https://github.com/nmelhado/league-page/issues/206)

- Fix navigation when clicking on rival [(issue #212)](https://github.com/nmelhado/league-page/issues/212)

- Fix page freeze on records > playoffs > season records [(issue #213)](https://github.com/nmelhado/league-page/issues/213)

- Fix standings page during preseason [(issue #221)](https://github.com/nmelhado/league-page/issues/221)

### Changed

- Use name from managers array (if available) instead of username [(issue #227)](https://github.com/nmelhado/league-page/issues/227)

## [2.2.1] - 2023-04-30

### Fixed

- Fix the error thrown on the rivalry page when the pevious league ID is 0 [(issue #204)](https://github.com/nmelhado/league-page/issues/204)

- Fix transaction search bar to debounce the ur change (focus was changing after every letter typed)

## [2.2.0] - 2023-04-17

### Added

- Added the all new Rivalry page! ([(feature #160)](https://github.com/nmelhado/league-page/issues/160) & [(issue #181)](https://github.com/nmelhado/league-page/issues/181))
    - The Rivalry page renders a comparisson between any 2 managers (past or prsent in the league)
    - Possibly the best page on League Page...

### Fixed

- Fix error thrown when no blog is present [(issue #202)](https://github.com/nmelhado/league-page/issues/202)
    - Turn rosters into a map instead of an array in order to deliver the correct data

## [2.1.6] - 2023-04-15

### Changed

- Upgraded Vite and SvelteKit due to vulnerability issue
- Fixed bugs due to Sleeper division bug 
    - Bug broke roster, records, and awards pages

### Fixed

- Fix standings order issue[(issue #199)](https://github.com/nmelhado/league-page/issues/199)
    - Turn rosters into a map instead of an array in order to deliver the correct data

## [2.1.5] - 2023-01-14

### Fixed

- Fix standings order issue
    - Turn rosters into a map instead of an array in order to deliver the correct data

## [2.1.4] - 2023-01-13

### Fixed

- Minor css bug related to transactions on mobile

## [2.1.3] - 2023-01-13

### Changed

- Updated trades to look similar to the new waiver style for better consistency

## [2.1.2] - 2023-01-10

### Fixed

- Bug related to displaying transactions for a manager

## [2.1.1] - 2023-01-10

### Fixed

- Bug related to going to the correct managaer from the records page

## [2.1.0] - 2023-01-10

### Changed

- Rankings are now organize by manager instead of team! [(issue #164)](https://github.com/nmelhado/league-page/issues/164)
    - This means that if managers have changed throughout the years, you will now see accurate rankings for a given manager
    - **To take full advantage of this you need to add managerIDs to the managers object in leagueInfo`src/lib/utils/leagueInfo.js`**
        - More instructions in the updated [Training Wheels managers instructions](https://github.com/nmelhado/league-page/blob/master/TRAINING_WHEELS.md#2-add-managers)
- Use league specific avatar if avilable [(issue #156)](https://github.com/nmelhado/league-page/issues/156)

### Fixed

- Standings order issue [(issue #179)](https://github.com/nmelhado/league-page/issues/179)
    - The re-implememntation of how team and user data is rendered should have fixed this

## [2.0.2] - 2022-09-29

### Fixed

- Fixed modifier handling in blogs

## [2.0.1] - 2022-09-28

### Fixed

- Fixed header handling in blogs
- Updated TRAINING WHEELS re: blog instructions [(issue #166)](https://github.com/nmelhado/league-page/issues/166)

## [2.0.0] - 2022-09-18

### Changed

- Upgraded Vite and SvelteKit [(issue #149)](https://github.com/nmelhado/league-page/issues/149)
    - **This may be a breaking change. It required a very significant rewrite**

### Fixed

- Blog being anabled crashing pages [(issue #141)](https://github.com/nmelhado/league-page/issues/141)
- Support images and tables in blogs [(issue #140)](https://github.com/nmelhado/league-page/issues/140)
    - **This is a breaking change for previous blog integrations as it now requires an additional API key!!**
    - Follow the README or [TRAINING_WHEELS](https://github.com/nmelhado/league-page/blob/master/TRAINING_WHEELS.md#iii-add-a-blog) guide to add the additional key and re-enable your blog
- Roster ID mismatch [(issue #155)](https://github.com/nmelhado/league-page/issues/155)

## [1.3.4] - 2022-07-09

### Fixed

- NBC Sports Edge changed it's API format which introduced a bug that broke the Resources page [(issue #129)](https://github.com/nmelhado/league-page/issues/129)

## [1.3.3] - 2022-05-29

### Fixed

- Empty points were causing a bug in the rankings page. Also, the standings page is throwing an undefined in the preseason. [issue #119](https://github.com/nmelhado/league-page/issues/119)

## [1.3.2] - 2022-05-20

### Fixed

- When clicking on a manager from the managers page, the manager indefinitely loads. [issue #117](https://github.com/nmelhado/league-page/issues/117)
    - RC: [PR #114 Adds playoff records and rankings to the records page](https://github.com/nmelhado/league-page/pull/114)

## [1.3.1] - 2022-04-28

### Fixed

- Scroll to was not functioning properly on the constitution page, reported in [issue #109](https://github.com/nmelhado/league-page/issues/109)
    - Added an additional offset to counteract the current scroll position

## [1.3.0] - 2022-04-27

### Added

- Playoff records and rankings [feature suggestion #80](https://github.com/nmelhado/league-page/issues/80)
    - Only looks at playoff bracket, not toilet bowl
    - Big thank you to [OldNewsBlues](https://github.com/OldNewsBlues) for the suggestion and investigation

### Fixed

- FTN News changed it's format and broke the news page, the change has been addressed and the news feed is working as expected
- Bug in blog posts, better error handling to catch issues

### Changed

- Refactored a significant amount of the record logic to make it easier to follow/maintain/upgrade

### Removed

- Removed the `_helper/vite-workaround.js` directory, as it is no longer needed with the current version of Svelte Material UI

## [1.2.17] - 2022-04-13

### Fixed

- Brackets now account for two week per round leagues [issue #97](https://github.com/nmelhado/league-page/issues/97)

## [1.2.16] - 2022-01-06

### Fixed

- Bug that would freeze pages if an incomplete draft blog post exists

## [1.2.15] - 2022-01-06

### Changed

- Upgraded [SMUI](https://sveltematerialui.com/) version from 4 to 6
    - This gives better compatibility with windows deployments and improves some functionality
    - Removes the need for the VITE workaround script
    - Adds TS compatibility for those interested

## [1.2.14] - 2021-01-05

### Added

- Big thank you to [OldNewsBlues](https://github.com/OldNewsBlues) for implementing this
    - Added `Single Week Scoring Lows` and `Season-long Scoring Lows`
    - Cleaned up records interface

### Changed

- Season long record tables are now sorted by PPG (to offset the expanded NFL seasons and more accurately capture the rankings)

## [1.2.13] - 2022-01-05

### Fixed

- Trophies page bug reported in [issue #95](https://github.com/nmelhado/league-page/issues/95)

## [1.2.12] - 2022-01-05

### Fixed

- Minor bug fixes league in pre-season

## [1.2.11] - 2021-01-03

### Added

- PPG Records [#92](https://github.com/nmelhado/league-page/issues/92)
    - Big thank you to [OldNewsBlues](https://github.com/OldNewsBlues) for implementing this

## [1.2.10] - 2022-01-03

### Fixed

- Bug that affects playoff matchup and standings 
    - Reported in issue [#98](https://github.com/nmelhado/league-page/issues/98)

## [1.2.7] - 2021-10-20

### Fixed

- Bug that affects the draft page of keeper leagues 
    - Reported in issue [#85](https://github.com/nmelhado/league-page/issues/85)

## [1.2.6] - 2021-10-07

### Added

- Docker support to address feature request [#68](https://github.com/nmelhado/league-page/issues/68)
    - Big thank you to [1600dolo](https://github.com/1600dolo) for implementing this
- **WARNING:** This might cause merge conflicts in `package-lock.json`. Going forward shouldn't happen again.
    - Follow these instructions to [resolve the conflict](https://docs.github.com/en/github/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github). For the most part, you'll most likely want to keep the changes from master (the second change)

## [1.2.5] - 2021-09-27

### Fixed

- Bug in records
    - When the records tab was left and returned to multiple times, the total points column would eventually become NaN (as reported in issue [#77](https://github.com/nmelhado/league-page/issues/77) by [OldNewsBlues](https://github.com/OldNewsBlues))
    - This bug was also reported in the same issue below, however I missed it so I ended up having to re-open it.

## [1.2.4] - 2021-09-27

### Fixed

- Bug in records
    - Inverse of the correct week was shown (as reported in issue [#77](https://github.com/nmelhado/league-page/issues/77) by [OldNewsBlues](https://github.com/OldNewsBlues))

## [1.2.3] - 2021-09-26

### Fixed

- Bug in matchups

## [1.2.2] - 2021-09-26

### Added

- Added biggest blowout and narrowest victory records
- Now caching league records for performance
    - Cached records will load quickly and will be updated after new data is pulled in

### Fixed

- Loading message in blogs page read `Loading transactions` instead of `Loading blog posts`

### Announcement

- This will be the **real** last update for a while (*probably*)... couldn't help myself. I'm going on paternity leave! I will resume working on feature requests in November and will try to address bugs if they come up. Feel free to keep adding feature requests as they come to you though.

## [1.2.1] - 2021-09-23

### Fixed

- Search bar bug that unfocused the input bar after every character typed
    - If no input has been detected for 5 seconds, update query parameters in url string (updating will still unfocus the input, but (since 5 seconds have passed) the search should be complete)
- The matchups page was always starting on week 1
    - If no query parameter has been set, use the current week

### Changed

- The look of comments on blog posts

### Announcement

- This will be the last update for a while because I'm going on paternity leave! I will resume working on feature requests in November and will try to address bugs if they come up.

## [1.2.0] - 2021-09-20

### Added

- Ability to view and add comments to blog posts
- :warning: WARNING !:warning:
    - This will break previous contentful integrations because it requires you to change the type of API key to a [Content Management API key](https://www.contentful.com/developers/docs/references/authentication/#the-content-management-api)
    - Please refer to the [Training Wheels blog instructions](https://github.com/nmelhado/league-page/blob/master/TRAINING_WHEELS.md#iii-add-a-blog) to see how to get the new API key (and then replace the old environment variable with the new one)

## [1.1.2] - 2021-09-17

### Added

- Add standings tab with the current season standings (customizeable rankings by changing line 12 and/or 15 in `src/lib/Standings/index.svelte`)

## [1.1.1] - 2021-09-11

### Fixed

- Bug with the nav bar that would occur when you don't have the blog enabled and visit any of the nested tabs
- Bug with Inactive players breaking matchups and projections

## [1.1.0] - 2021-09-10

### Added

- Major feature added!
- Blog capabilities using [contentful](contentful.com)
- Requires the use of api secrets and a contentful account (as well as a specific content-type configuration)
- For directions, follow the [Training Wheels blog instructions](https://github.com/nmelhado/league-page/blob/master/TRAINING_WHEELS.md#iii-add-a-blog)

### Changed

- Hide pagination if there aren't enough results to paginate

- Preview (3) trades and (3) waivers instead of (2) on the homepage

### Fixed

- A bug that crated the wrong footer offset when an update is available (this used to obscure some of the page)

- If you there are no managers listed, return a 404 on the `/managers` pages instead of empty pages

- Removed static css files generated from smui (they are built at runtime and are unnecessary in the repo)

## [1.0.12] - 2021-09-09

### Fixed

- Pulling in the IDP projections overloaded Vercel's servers
    - Reduce the amount returned in player call by shortening variable names

## [1.0.11] - 2021-09-09

### Fixed

- Pulling in the IDP projections overloaded Vercel's servers
    - Split up the call into offensive and defensive projections and then combine them afterwards

## [1.0.10] - 2021-09-08

### Fixed

- Fix for [issue #57](https://github.com/nmelhado/league-page/issues/57)
    - IDP projections were not being properly pulled in (this affected the matchups pages and Power Ranking graph)
        - Updated the projection URL to pull in IDP projections as well
    - Also addressed minor bug that caused the matchups page to not refresh projections when the players object refreshes in the background

## [1.0.9] - 2021-09-08

### Fixed

- Fixed bug with the trade arrows on the manager page, the bug was introduced in [pr #55](https://github.com/nmelhado/league-page/pull/55)

## [1.0.8] - 2021-09-08

### Fixed

- Fixed bug in manager pages introduced in [pr #55](https://github.com/nmelhado/league-page/pull/55)

## [1.0.7] - 2021-09-08

### Changed

- Refresh large data in the background
    - Both player data and transaction data can take a while to pull from Sleeper
    - Display the stale data first, while updating the data in the background
    - When the new data is available, update the UI to reflect the changes

## [1.0.6] - 2021-08-31

### Added

- Reversal round support
    - Feature support added by [scottiegarcia](https://github.com/scottiegarcia)
    - [PR #51](https://github.com/nmelhado/league-page/pull/51)

## [1.0.5] - 2021-08-26

### Fixed

- Some league rosters return null for the players, which breaks power rankings and the rosters page
    - Bug reported in [issue #49](https://github.com/nmelhado/league-page/issues/49)
    - For rosters, only compute the bench if the players field is valid
    - For power rankings, skip teams with no players (if no teams have players, don't display the graph)

## [1.0.4] - 2021-08-25

### Fixed

- Made location, favorite team, and preferred contact nullable for managers
    - Fallback displayed on all managers page (question mark image)
    - Fallback location of "Undisclosed location" displayed
    - Other fields are omitted in the Managers pages

## [1.0.3] - 2021-08-21

### Fixed

- Auction leagues did not display drafts correctly
    - Logic has been addded to handle auction leagues

### Changed

- Changed the display of draft boards in dark mode

## [1.0.2] - 2021-08-17

### Fixed

- Sleepr API increments the week value during preseason which created bugs in the homepage, rankings, managers, and matchup pages
    - Added a fix to only honor the Sleeper week during regular season
- Transactions were sometimes out of order (if a trade was recently accepted long after the original offer was sent)
    - League Page now sorts the transaction by update time

<!-- ### Added -->
<!-- ### Fixed -->
<!-- ### Changed -->
<!-- ### Removed -->