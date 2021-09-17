# Changelog

All notable changes to this project will be documented in this file.

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