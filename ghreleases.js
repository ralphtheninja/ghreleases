const ghrepos = require('ghrepos')
    , ghutils = require('ghutils')
    , baseUrl = ghrepos.baseUrl


function getById (auth, org, repo, id, options, callback) {
  return getBase(auth, org, repo, id, options, callback)
}

function getLatest (auth, org, repo, options, callback) {
  return getBase(auth, org, repo, 'latest', options, callback)
}

function getByTag (auth, org, repo, tag, options, callback) {
  return getBase(auth, org, repo, 'tags/' + tag, options, callback)
}

function create (auth, org, repo, data, options, callback) {
  if (typeof options == 'function') {
    callback = options
    options  = {}
  }
  var url = baseUrl(org, repo) + '/releases'
  ghutils.ghpost(auth, url, data, options, callback)
}

function getBase (auth, org, repo, tail, options, callback) {
  if (typeof options == 'function') {
    callback = options
    options  = {}
  }
  var url = baseUrl(org, repo) + '/releases/' + tail
  return ghutils.ghget(auth, url, options, callback)
}

module.exports.list      = ghrepos.createLister('releases')
module.exports.getById   = getById
module.exports.getLatest = getLatest
module.exports.getByTag  = getByTag
module.exports.create    = create
