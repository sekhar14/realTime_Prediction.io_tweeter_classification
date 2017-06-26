import React from 'react'
import {Link} from 'react-router'

class App extends React.Component {
    render() {
        return(
            <div className="container">
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">Twt</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><Link to='/tweets'>tweets</Link></li>
                            <li><Link to='/visualization'>visualization</Link></li>
                        </ul>
                    </div>
                </nav>
                <div className="input-field col s6">
                    <input id="topic" type="text" />
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default App