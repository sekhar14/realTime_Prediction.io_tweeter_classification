import React from 'react'
import io from 'socket.io-client'
import {VictoryPie, VictoryChart, VictoryTheme} from 'victory'

class TweetGraph extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            positive: 0,
            negative: 0
        }
        this.socket = null
    }
    componentDidMount() {
        this.socket = io.connect({'forceNew' : true})
        this.socket.on('change', (newStat) => {
            this.setState({
                positive: newStat.positive,
                negative: newStat.negative
            })
        })
    }
    componentWillUnmount() {
        this.socket.disconnect()
    }
    render() {
        return(
            <div className="container">
                    <VictoryPie 
                        data = {[
                            {"sent" : "positive", "cnt" : this.state.positive},
                            {"sent" : "negative", "cnt" : this.state.negative}
                        ]}
                        x="sent"
                        y="cnt"
                        theme={VictoryTheme.material}
                    />
            </div>
        )
    }
}

export default TweetGraph 