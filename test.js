const ghutils    = require('ghutils/test-util')
    , ghreleases = require('./')
    , test       = require('tape')
    , xtend      = require('xtend')


test('test list releases for org/repo with multi-page', function (t) {
  t.plan(13)

  var auth     = { user: 'authuser', token: 'authtoken' }
    , org      = 'testorg'
    , repo     = 'testrepo'
    , testData = [
          {
              response : [ { test3: 'data3' }, { test4: 'data4' } ]
            , headers  : { link: '<https://somenexturl>; rel="next"' }
          }
        , {
              response : [ { test5: 'data5' }, { test6: 'data6' } ]
            , headers  : { link: '<https://somenexturl2>; rel="next"' }
          }
        , []
      ]
    , server

  server = ghutils.makeServer(testData)
    .on('ready', function () {
      var result = testData[0].response.concat(testData[1].response)
      ghreleases.list(xtend(auth), org, repo, ghutils.verifyData(t, result))
    })
    .on('request', ghutils.verifyRequest(t, auth))
    .on('get', ghutils.verifyUrl(t, [
        'https://api.github.com/repos/' + org + '/' + repo + '/releases'
      , 'https://somenexturl'
      , 'https://somenexturl2'
    ]))
    .on('close'  , ghutils.verifyClose(t))
})

test('get latest release', function (t) {
  t.plan(7)

  var auth     = { user: 'authuser', token: 'authtoken' }
    , org      = 'testorg'
    , repo     = 'testrepo'
    , testData = { test: 'data' }
    , server

  server = ghutils.makeServer(testData)
    .on('ready', function () {
      ghreleases.getLatest(xtend(auth), org, repo, ghutils.verifyData(t, testData))
    })
    .on('request', ghutils.verifyRequest(t, auth))
    .on('get', ghutils.verifyUrl(t, [
      'https://api.github.com/repos/' + org + '/' + repo + '/releases/latest'
    ]))
    .on('close'  , ghutils.verifyClose(t))
})

test('get release by id', function (t) {
  t.plan(7)

  var auth     = { user: 'authuser', token: 'authtoken' }
    , org      = 'testorg'
    , repo     = 'testrepo'
    , testData = { test: 'data' }
    , id       = 314
    , server

  server = ghutils.makeServer(testData)
    .on('ready', function () {
      ghreleases.getById(xtend(auth), org, repo, id, ghutils.verifyData(t, testData))
    })
    .on('request', ghutils.verifyRequest(t, auth))
    .on('get', ghutils.verifyUrl(t, [
      'https://api.github.com/repos/' + org + '/' + repo + '/releases/' + id
    ]))
    .on('close'  , ghutils.verifyClose(t))
})

test('get release by tag', function (t) {
  t.plan(7)

  var auth     = { user: 'authuser', token: 'authtoken' }
    , org      = 'testorg'
    , repo     = 'testrepo'
    , testData = { test: 'data' }
    , tag      = 'v1.0.0'
    , server

  server = ghutils.makeServer(testData)
    .on('ready', function () {
      ghreleases.getByTag(xtend(auth), org, repo, tag, ghutils.verifyData(t, testData))
    })
    .on('request', ghutils.verifyRequest(t, auth))
    .on('get', ghutils.verifyUrl(t, [
      'https://api.github.com/repos/' + org + '/' + repo + '/releases/tags/' + tag
    ]))
    .on('close'  , ghutils.verifyClose(t))
})

test('create release', function (t) {
  t.plan(8)

  var auth     = { user: 'authuser', token: 'authtoken' }
    , org      = 'testorg'
    , repo     = 'testrepo'
    , testData = {
          tag_name : '1.2.3-test'
        , name     : 'Release name for 1.2.3-test'
        , body     : 'Body text of release goes here'
      }
    , server

  server = ghutils.makeServer(testData)
    .on('ready', function () {
      ghreleases.create(xtend(auth), org, repo, testData, ghutils.verifyData(t, testData))
    })
    .on('request', ghutils.verifyRequest(t, auth))
    .on('post', ghutils.verifyUrl(t, [
      'https://api.github.com/repos/' + org + '/' + repo + '/releases'
    ]))
    .on('post', function (url, data) {
      t.deepEqual(data, testData)
    })
    .on('close'  , ghutils.verifyClose(t))
})
