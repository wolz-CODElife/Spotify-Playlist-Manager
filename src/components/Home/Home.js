import React, { useState, useEffect } from 'react'
import PlayList from '../PlayList/PlayList'
import SearchResults from '../SearchResults/SearchResults'
import Spotify, {accessToken} from '../../utils/Spotify';

import { data } from '../../data/data.json'

const Home = () => {
    const [searchResults, setSearchResults] = useState([])
    const [playListName, setPlayListName] = useState("")
    const [playListTracks, setPlayListTracks] = useState([])
    
    useEffect(() => {
        if (!accessToken) {
            setSearchResults(data)
        }
    }, [])

    const search = (term) => {
        if (term !== "") {
        Spotify.search(term).then((searchResults) => setSearchResults(searchResults))
        }
        else {
        document.querySelector("#searchBar").focus()
        }
    }
    const addTrack = (track) => {
        if (playListTracks.find((savedTrack) => savedTrack.id === track.id)) {
        return
        }
        const newPlayListTracks = [...playListTracks, track]
        setPlayListTracks(newPlayListTracks)
    }
    const removeTrack = (track) => {
        const newPlayListTracks = playListTracks.filter((currentTrack) => currentTrack.id !== track.id)
        searchResults.unshift(track)
        setPlayListTracks(newPlayListTracks)
    }
    const removeTrackSearch = (track) => {
        const newSearchResults = searchResults.filter((currentTrack) => currentTrack.id !== track.id)
        setSearchResults(newSearchResults)
    }
    const doThese = (track) => {
        addTrack(track)
        removeTrackSearch(track)
    }
    const updatePlayListname = (name) => {
        setPlayListName(name)
    }
    const savePlayList = (e) => {
        e.preventDefault()
        const trackUris = playListTracks.map((track) => track.uri)
        if (playListName !== "") {
        Spotify.savePlaylist(playListName, trackUris).then(() => {
            setPlayListName("")
            setPlayListTracks([])
        })
        }
        else {
        document.querySelector('#playListName').focus()
        }
    }
    return (
        <div className="container">
        <h1 style={{ color: '#fff', textShadow: '2px 2px 2px #ccc' }}>MusicBuddy</h1>
        <article className="section">
            <SearchResults search={search} searchResults={searchResults} onAdd={doThese} />
            <PlayList
            playListTracks={playListTracks}
            playListName={playListName}
            onNameChange={updatePlayListname}
            onRemove={removeTrack}
            onSave={savePlayList}
            />
        </article>
        </div>
    )
}

export default Home
