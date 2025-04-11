const express = require('express')
const { Client, middleware } = require('@line/bot-sdk')

const app = express()

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// 建立 LINE bot client
const client = new Client(config)

// webhook middleware
app.post('/webhook', middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then(result => res.json(result))
})

// 處理接收到的訊息事件
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null)
  }

  const userMessage = event.message.text
  const replyText = `✨你好，我是真實源✨\n你說的是：「${userMessage}」對嗎？`

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: replyText
  })
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`伺服器已啟動在 http://localhost:${PORT}`)
})
