# ghreleases

[![Build Status](https://secure.travis-ci.org/ralphtheninja/ghreleases.png)](http://travis-ci.org/ralphtheninja/ghreleases)

**A node library to interact with the GitHub releases API**

[![NPM](https://nodei.co/npm/ghreleases.png?mini=true)](https://nodei.co/npm/ghreleases/)

## API

### list(auth, org, repo[, options], callback)

List all releases for a repo. Calls back with an array of releases.

```js
const gh   = require('ghreleases')
    , auth = {
        token : '90230948aef88723eca2309880fea09789234'
      }
gh.list(auth, 'level', 'leveldown', function (err, list) {
  console.log(list)
})
```

GitHub [docs](https://developer.github.com/v3/repos/releases/#list-releases-for-a-repository).

### getLatest(auth, org, repo[, options], callback)

Get latest release.

```js
gh.getLatest(auth, 'level', 'leveldown', function (err, release) {
  console.log(release)
})
```

GitHub [docs](https://developer.github.com/v3/repos/releases/#get-the-latest-release).

### getById(auth, org, repo, id[, options], callback)

Get data for a single release.

```js
gh.getById(auth, 'level', 'leveldown', '1363866', function (err, release) {
  console.log(release)
})
```

GitHub [docs](https://developer.github.com/v3/repos/releases/#get-a-single-release).

### getByTag(auth, org, repo, tag[, options], callback)

Get release by tag.

```js
gh.getByTag(auth, 'level', 'leveldown', 'v1.2.2', function (err, release) {
  console.log(release)
})
```

GitHub [docs](https://developer.github.com/v3/repos/releases/#get-a-release-by-tag-name).

### create(auth, org, repo, data[, options], callback)

Create a release.

```js
var data = {
  tag_name: '1.2.3-test',
  name: 'Release name for 1.2.3-test',
  body: 'Body text of release goes here'
}
gh.create(auth, 'level', 'leveldown', data, function (err, release) {
  console.log(release)
})
```

The release on GitHub would then look as follows:

![1.2.3-test release](/images/github-release.png?raw=true "1.2.3-test release")

GitHub [docs](https://developer.github.com/v3/repos/releases/#create-a-release)

## Community

For interacting with other parts of the GitHub API, also see the following repositories/modules:

* [`ghissues`](https://github.com/rvagg/ghissues)
* [`ghusers`](https://github.com/rvagg/ghusers)
* [`ghteams`](https://github.com/rvagg/ghteams)
* [`ghrepos`](https://github.com/rvagg/ghrepos)
* [`ghpulls`](https://github.com/rvagg/ghpulls)
* [`ghauth`](https://github.com/rvagg/ghauth)
* [`ghutils`](https://github.com/rvagg/ghutils)

## License

MIT
