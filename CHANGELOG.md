# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2022-08-30

### Fixed

- Blog being anabled crashing pages [(issue #141)](https://github.com/nmelhado/league-page/issues/141)
- Support images and tables in blogs [(issue #140)](https://github.com/nmelhado/league-page/issues/140)
    - **This is a breaking change for previous blog integrations as it now requires an additional API key!!**
    - Follow the README or [TRAINING_WHEELS](https://github.com/nmelhado/league-page/blob/master/TRAINING_WHEELS.md#iii-add-a-blog) guide to add the additional key and re-enable your blog

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