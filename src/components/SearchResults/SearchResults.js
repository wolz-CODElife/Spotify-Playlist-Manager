import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import TrackList from '../TrackList/TrackList'

const SearchResults = ({ search, searchResults, onAdd }) => {
    return (
        <>
            <div className="trackList">
                <SearchBar onSearch={search} />
                <TrackList tracks={searchResults} onAdd={onAdd} />
            </div>
        </>
    )
}
export default SearchResults