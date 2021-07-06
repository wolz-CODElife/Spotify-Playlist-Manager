
import React from 'react'
import './SearchBar.css'

class SearchBar extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            terms: ""
        }

        this.handleTermChange = this.handleTermChange.bind(this)
        this.search = this.search.bind(this)
        this.handleEnter = this.handleEnter.bind(this)
        
    }

    handleTermChange(event){
        this.setState({term: event.target.value})
    }

    search(){
        this.props.onSearch(this.state.term)
    }

    handleEnter(event){
        if (event.keyCode === 13) {
            this.search()
        }
    }

    render(){
        return(
            <div className="SearchBar">
                <input type="text" placeholder="Enter song, album or artist" onChange={this.handleTermChange} onKeyUp={this.handleEnter} />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}


export default SearchBar