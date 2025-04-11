const express = require('express')
const { Client, middleware } = require('@line/bot-sdk')

const app = express()

const config = {
  channelAccessToken: 'lMn2ChBOoGs2GqPvOEjDX1guoqZWKpw0ipcH3+VMCnsT4d5TB7Z/qS3W1RT0ATU1HrdHGLHuthC0lybXhISwPIakMI5UcLXCMwJG/78nFdyGC72KC+Zz06Ejze/JDk+P4Gd5JdxS9R/RVrV93J4OlwdB04t89/1O/w1cDnyilFU=',
  channelSecret: '2f02c9668b282a704b30fd52dfe944bf'
}

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
  const replyText = `✨你好，我是真實源的引路人倍禎✨\n你說的是：「${userMessage}」對嗎？`

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: replyText
  })
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`伺服器已啟動在 http://localhost:${PORT}`)
})
