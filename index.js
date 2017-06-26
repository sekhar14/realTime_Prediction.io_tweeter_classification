const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const socketIO = require('socket.io')
const webpack = require('webpack')
const webpackDevMiddleWare = require('webpack-dev-middleware')
const path = require('path')
const webpackConfig = require('./webpack.config.js')
const axios = require('axios')
const Twit = require('twit')
const config = require('./config')
const app = express()
const server = http.createServer(app)
const io = new socketIO(server)


app.use(express.static(path.join(__dirname, 'public')))
app.use(webpackDevMiddleWare(webpack(webpackConfig)))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

var track_topic = 'kashmir'
var T = new Twit(config)
var stream = T.stream('statuses/filter', {
    track: track_topic
})

var positive = 0
var negative = 0

io.on('connection', socket => {
    console.log("someone connected...")
    socket.on('disconnect', () => {
        console.log("someone disconnected")
    })
})
stream.on('tweet', (tweet) => {
    axios.post('http://localhost:5000', {
            text : tweet.text
        })
        .then((res) => {
            if (res.data.sentiment === '0') {
                negative += 1
            }else {
                positive += 1
            }
            io.emit('message', {
                'topic': track_topic, 
                'tweet': tweet.text,
                'sentiment': res.data.sentiment
            })
            io.emit('change', {
                positive,
                negative
            })
        })
        .catch((error) => {
            console.log('axios error')
            console.log(error)
        })
})
server.listen(3000, '0.0.0.0', () => {
    console.log('server running ......')
})