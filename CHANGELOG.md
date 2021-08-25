# Changelog

All notable changes to this project will be documented in this file.

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