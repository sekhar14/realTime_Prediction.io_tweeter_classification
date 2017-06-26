import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import TweetList from './components/TweetList'
import TweetGraph from './components/TweetGraph'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={TweetList} />
            <Route path="/tweets" component={TweetList}/>
            <Route path="/visualization" component={TweetGraph}/>
        </Route>
    </Router>,
document.getElementById('app'))