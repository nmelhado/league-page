# Cheap Watch: If it works, why use something else?

[![npm version](https://img.shields.io/npm/v/cheap-watch.svg?style=flat-square)](https://www.npmjs.com/package/cheap-watch) [![Build Status](https://travis-ci.org/Conduitry/cheap-watch.svg?branch=master)](https://travis-ci.org/Conduitry/cheap-watch)

**Cheap Watch** is a small, simple, dependency-free, cross-platform file system watcher for Node.js 8+.

## Constructor

### `new CheapWatch({ dir, filter, watch = true, debounce = 10 })`

- `dir` - The directory whose contents to watch. It's recommended, though not required, for this to be an absolute path, say one returned by `path.resolve`.
- `filter({ path, stats })` - _(optional)_ A function to decide whether a given file or directory should be watched. It's passed an object containing the file or directory's relative `path` and its `stats`. It should return `true` or `false` (or a `Promise` resolving to one of those). Returning `false` for a directory means that none of its contents will be watched.
- `watch` - _(optional)_ Whether to actually watch the directory for changes. Defaults to `true`. If `false`, you can retrieve all of the files and directories within a given directory along with their initial `Stats` but changes will not be monitored.
- `debounce` - _(optional)_ Length of timeout in milliseconds to use to debounce incoming events from `fs.watch`. Defaults to 10. Multiple events are often emitted for a single change, and events can also be emitted before `fs.stat` reports the changes. So we will wait until `debounce` milliseconds have passed since the last `fs.watch` event for a file or directory before handling it. The default of 10ms Works On My Machine.

## Methods

### `init()`

Initialize the watcher, traverse the directory to find the initial files and directories, and set up watchers to look for changes.

This returns a `Promise` that resolves once the initial contents of the directory have been traversed and all of the watchers have been set up.

### `close()`

Close all `FSWatcher` instances, and stop watching for file changes.

## Properties

### `paths`

A `Map` of the watched files and directories. Each key is a relative path from the `CheapWatch`'s `dir`, and each value is a `Stats` object for the file or directory. Paths are always separated by forward slashes, regardless of platform. This `Map` is kept up to date as files are changed on disk.

You can use `stats.isFile()` and `stats.isDirectory()` to determine whether something is a file or a directory.

## Events

A `CheapWatch` is an `EventEmitter`, and emits two events to report a new, updated, or deleted file or directory.

### `+` `{ path, stats, isNew }`

A `+` event is emitted whenever a watched file or directory is created or updated. It's emitted with an object containing a `path` string, a `stats` object, and an `isNew` boolean which will be `true` for newly created files and directories and `false` for updated ones.

### `-` `{ path, stats }`

A `-` event is emitted whenever a watched file or directory is deleted. It's emitted with an object containing a `path` string and a `stats` object. `stats` will be the most recent `Stats` collected for the file or directory before it was deleted.

## Usage

```javascript
import CheapWatch from 'cheap-watch';

const watch = new CheapWatch({ dir, /* ... */ });

await watch.init();

for (const [path, stats] of watch.paths) {
	/* ... */
}

watch.on('+', ({ path, stats, isNew }) => { /* ... */ });
watch.on('-', ({ path, stats }) => { /* ... */ });
```

## License

[MIT](LICENSE)
