import React from 'react'


class App extends React.Component {
    render() {
        return(
            <div>
                <h4>Tweet App</h4>
                {this.props.children}
            </div>
        )
    }
}

export default App