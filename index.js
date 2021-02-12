const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const line = require('@line/bot-sdk'); // 追加
const config = {
  channelSecret: process.env.SECRET_KEY
,  channelAccessToken: process.env.ACCESS_TOKEN
};
const client = new line.Client(config); // 追加

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  // 以下のPOSTメソッド追加
  .post('/webhook', line.middleware(config), (req, res) => {
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// 追加。応答処理
const handleEvent = (event)=> {
  // この中に処理を書きます。
}