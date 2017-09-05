const request = require('request')
const {readFileSync, writeFileSync} = require('fs')

request({
  url: `https://vision.googleapis.com/v1/images:annotate?key=${process.env.API_KEY}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    requests: [
      {
        image: {
          content: readFileSync('./sample.jpg', {
            encoding: 'base64'
          })
        },
        features: {
          type: 'TEXT_DETECTION'
        },
        imageContext: {
          languageHints: ['ja']
        }
      }
    ]
  },
  json: true
}, (err, _, body) => {
  writeFileSync('./result.json', JSON.stringify(body))
  console.log(err, body)
})
