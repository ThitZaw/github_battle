import React from 'react'

export default class Result extends React.Component {
    render(){
        return (
            <div>
                Results
                <pre>{JSON.stringify(this.props, null, 2)}</pre>
            </div>
        )
    }
}