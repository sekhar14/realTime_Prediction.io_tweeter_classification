import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import TweetList from './components/TweetList'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={TweetList} />
        </Route>
    </Router>,
document.getElementById('app'))