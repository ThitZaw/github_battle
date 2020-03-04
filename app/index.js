import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular';
import Battle from './components/Battle';

class App extends React.Component{
    render(){
        return (
            <div>
                <Battle/>
            </div>
            
        )
    }
}
// take 2 element 
// 1. react element
// where to put it
ReactDOM.render(
    <App/>,
    document.getElementById('app')
)