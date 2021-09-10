# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2021-09-10

### Added

- Blog capabilities using [contentful](contentful.com)
- Requires the use of api secrets and a contentful account (as well as a specific content-type configuration)

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