import React from 'react'
import io from 'socket.io-client'

class TweetList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets : []
        }
        this.socket = null
    }

    componentDidMount() {
        this.socket = io.connect({'forceNew' : true})
        this.socket.on('message', (tweet) => {
            if (this.state.tweets.length < 15) {
                this.setState({
                    tweets : [tweet, ...this.state.tweets]
                })
            }else {
                var new_tweets = this.state.tweets
                new_tweets.splice(9, 5)
                this.setState({
                    tweets : [tweet, ...new_tweets]
                })
            }
        })
    }
    componentWillUnmount() {
        this.socket.disconnect()
    }
    render() {
        let tweets = this.state.tweets.map((tweet, ind) => {
            let clr = tweet.sentiment === '0' ? "card-panel red lighten-2" : "card-panel teal lighten-2"
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