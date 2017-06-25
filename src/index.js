import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets : []
        }
        this.cnt = 0
    }

    componentDidMount() {
        this.socket = io()
        this.socket.on('message', (tweet) => {
            this.cnt += 1
            console.log('server emitted a message ', this.cnt)
            if (this.state.tweets.length < 10) {
                this.setState({
                    tweets : [tweet.tweet, ...this.state.tweets]
                })
            }else {
                this.setState({
                    tweets : [tweet.tweet]
                })
            }
        })
    }

    render() {
        let tweets = this.state.tweets.map((tweet, ind) => {
            return <div key={ind} className="card-panel teal lighten-2">{tweet}</div>
        })
        return(
            <div className="container">
                {tweets}
            </div>
        )
    }

}


ReactDOM.render(<App />, document.getElementById('app'))