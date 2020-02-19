import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular';

class App extends React.Component{
    render(){
        return (
            <div>
                Hello Thit!
                <Popular/>
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