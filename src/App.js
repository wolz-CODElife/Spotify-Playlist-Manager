import React from 'react'
import './App.css';

import PlayList from './components/PlayList/PlayList'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Spotify from './utils/Spotify';

class App extends React.Component{
  constructor(props){
    super(props)
    
    this.state = {
      searchResults: [],
      playListName: "New Playlist",
      PlayListTracks: []
    }
  
    this.search = this.search.bind(this)
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.removeTrackSearch = this.removeTrackSearch.bind(this)
    this.doThese = this.doThese.bind(this)
  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  addTrack(track){
    let tracks = this.state.PlayListTracks
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return 
    } 
    tracks.push(track)
    this.setState({PlayListTracks: tracks})
  }

  removeTrack(track){
    let tracks = this.state.PlayListTracks
    let trackSearch = this.state.searchResults
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
    trackSearch.unshift(track)
    this.setState({PlayListTracks: tracks}) 
  }

  removeTrackSearch(track){
    let tracks = this.state.searchResults
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
    this.setState({searchResults: tracks})
  }

  doThese(track){
    this.addTrack(track)
    this.removeTrackSearch(track)
  }

  updatePlaylistName(name){
    this.setState({playListName: name})
  }

  savePlaylist(){
    const trackUris = this.state.PlayListTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playListName, trackUris).then(() => {
      this.setState({
        playListName: "New Playlist",
        PlayListTracks: []
      })
    })
  }
  render(){
    return (
      <div>
        <h1 style={{ textAlign: 'center'}}>
          <a href="http://localhost:3000">Musicophile</a>
        </h1>
        <div className="app">
          <SearchBar onSearch={this.search} />
          <div className="app-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.doThese} />
            <PlayList 
              PlayListTracks={this.state.PlayListTracks} 
              onNameChange={this.updatePlaylistName} 
              onRemove={this.removeTrack}  
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
