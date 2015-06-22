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
