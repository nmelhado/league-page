# v1.0.3

- Fix published types

# v1.0.2

- Include TypeScript declaration file (`.d.ts`)

# v1.0.1

- Make sure we manually emit an event for a directory when one of its direct children is updated

# v1.0.0

- Internal rewrite in TypeScript
- Git tag is now the built version, for easier direct installation without the npm registry

# v0.3.0

- Rename `.files` to `.paths`, as it contains directories, not just files
- Include an additional `isNew` boolean in `+` events, indicating whether this is a new or an updated file/directory
- No longer call the `filter` function on the root watched directory
- No longer include the root watched directory under the `''` in the `Map`, nor emit `+` events for it

# v0.2.2

- Rollup was erroneously added as a dependency and is now a dev dependency as it should be

# v0.2.1

- Add some more type checking
- Ignore `error` events from `FSWatcher`, as Windows seems to like emitting these sometimes

# v0.2.0

- Report directory stats and events
- Expose latest stats for all files and directories as `watch.files`
- Expose pre-deletion stats for deleted files and directories as part of `-` event
- `watch.init()` simply returns a `Promise` resolving to `undefined` now that `watch.files` is available

# v0.1.0

- Initial release
