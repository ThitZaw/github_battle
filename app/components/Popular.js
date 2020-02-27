import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepo } from '../utils/api'

function LanguagesNav({selected,onUpdateLanguage}){
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
        return(
            <ul className='flex-center'>
            {languages.map((language) => (
            <li key={language}>
                <button 
                    className='btn-clear nav-link'
                    style={language === selected ? { color: 'rgb(187, 46, 31)' } : null}
                    onClick={() => onUpdateLanguage(language)}>
                    {language}
                </button>
            </li>
            ))}
        </ul>
        )
}

LanguagesNav.propTypes = {
    selected:PropTypes.string.isRequired,
    onUpdateLanguage:PropTypes.func.isRequired
}

export default class Popular extends React.Component{
    constructor(props){
    super(props)
    this.state = {
        selectedLanguage : 'All',
        repos:{},   // 1.add the repos and error properties to the state
        error:null,
    }
    this.updateLanguage = this.updateLanguage.bind(this)
    this.isLoading = this.isLoading.bind(this) //6.bind it to the constructor
    }

    componentDidMount () {
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage(selectedLanguage){
        console.log(this.state.repos)
        this.setState({
            selectedLanguage,
            error:null, // 3.whenever the state is update error and repos need to be null first before update the state 
        })

        if (!this.state.repos[selectedLanguage]){
            fetchPopularRepo(selectedLanguage)
            .then((data)=>{
                this.setState(({repos})=>({
                    repos:{
                        ...repos,
                        [selectedLanguage]:data
                    }
                }))
            })
            .catch(()=>{
                console.warn('Error Fetching the selected Language Repo')
                this.setState({
                    error: 'there was an erro fetching the selected language'
                })
            })
        }
    }

    isLoading(){ // 5. add the loading function
        const { selectedLanguage, repos, error } = this.state

        return !repos[selectedLanguage] && error === null 
    }

    render(){
        const { selectedLanguage,repos,error } = this.state // 2.add the repos and error from state to render DOM
        return(
            <React.Fragment>
                <LanguagesNav selected={selectedLanguage} onUpdateLanguage={this.updateLanguage}/>
                {this.isLoading() && <p>LOADING</p>} 
                {error && <p>{error}</p>}
                {repos[selectedLanguage] && <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}
            </React.Fragment>
        )
    }
}