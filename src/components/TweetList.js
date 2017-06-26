import React from 'react'
import axios from 'axios'
import io from 'socket.io-client'

class TweetList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets : []
        }
    }

    componentDidMount() {
        this.socket = io()
        this.socket.on('message', (tweet) => {
            if (this.state.tweets.length < 15) {
                this.setState({
                    tweets : [tweet, ...this.state.tweets]
                })
            }else {
                var new_tweets = this.state.tweets
                new_tweets.splice(9, 5)
                console.log(new_tweets.length)
                this.setState({
                    tweets : [tweet, ...new_tweets]
                })
            }
        })
    }

    render() {
        let tweets = this.state.tweets.map((tweet, ind) => {
            console.log(tweet.sentiment)
            let clr = tweet.sentiment === '0' ? "card-panel red lighten-2" : "card-panel teal lighten-2"
            console.log(clr)
            return <div key={ind} className={clr}>{tweet.tweet}</div>
        })
        return(
            <div className="container">
                {tweets}
            </div>
        )
    }

}

export default TweetList