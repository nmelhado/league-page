const { test, match, sort: fuzzySort, filter: fuzzyFilter } = require('../dist/index.umd')

let cities = require('./cities.json')

cities = cities.map((city, i) => ({ id: i, ...city }))

cities.sort(fuzzySort('ah', { sourcePath: 'city' }))

cities.sort(fuzzySort('ah', { sourcePath: 'city', idPath: 'id' }))

cities.filter(fuzzyFilter('ah', { sourcePath: 'city' }))

match('av', cities[0].city, { withRanges: true, withScore: true })

test('av', cities[0].city)
