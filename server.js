var express = require('express')
var fetch = require('node-fetch')
var port = process.env.PORT || 8001
var app = express()

var router = express.Router()

router.get('/', function (req, res, next) {
  res.url = '/index.html'
  next()
})

app.use(router)

var sideData = require('./bushouList.json')

var spellData = require('./pinyinList.json')

var bushou = sideData.result

var pinyin = spellData.result

var apiRouter = express.Router();

app.use('/api', apiRouter)

apiRouter.get('/pinyin', function (req, res) {
  res.json({
    error: 0,
    data: pinyin
  })
})

apiRouter.get('/bushou', function (req, res) {
  res.json({
    error: 0,
    data: bushou
  })
})

apiRouter.get('/sidedetail', function (req, res) {
  fetch(`http://v.juhe.cn/xhzd/querybs?key=beb8de4a1656916c4f69d79d1b641b4e&isxiangjie=0&isjijie=0&page=${req.query.page}&word=${req.query.word.replace(/(\w{2})/g, "%$1")}`)
    .then(res => res.json())
    .then(json => {
      res.json({
        error: 0,
        data: json.result
      })
    })
    .catch(err => console.error(err))
})

apiRouter.get('/spelldetail', function (req, res) {
  fetch(`http://v.juhe.cn/xhzd/querypy?key=beb8de4a1656916c4f69d79d1b641b4e&isxiangjie=0&isjijie=0&page=${req.query.page}&word=${req.query.spell}`)
    .then(res => res.json())
    .then(json => {
      res.json({
        error: 0,
        data: json.result
      })
    })
    .catch(err => console.error(err))
})

apiRouter.get('/fontdetail', function (req, res) {
  fetch(`http://v.juhe.cn/xhzd/queryid?key=beb8de4a1656916c4f69d79d1b641b4e&word=${req.query.id}`)
    .then(res => res.json())
    .then(json => {
      res.json({
        error: 0,
        data: json.result
      })
    })
    .catch(err => console.error(err))
})

apiRouter.get('/fontcn', function (req, res) {
  let words = req.query.word.replace(/(\w{2})/g, "%$1")
  fetch(`http://v.juhe.cn/xhzd/query?word=${words}&key=beb8de4a1656916c4f69d79d1b641b4e`)
    .then(res => res.json())
    .then(json => {
      res.json({
        error: 0,
        data: json.result
      })
    })
    .catch(err => console.error(err))
})

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var url = 'http://localhost:' + port
  console.log(`Listening at ${url}`)
})
