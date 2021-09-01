import React, { useState } from 'react'
import TrackList from './TrackList'

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
const SearchBar = ({ onSearch }) => {
    const [term, setTerm] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
    };
    return (
    <>
        <form className="form" onSubmit={handleSubmit}>
        <input
            id="searchBar"
            type="text"
            placeholder="Song, album or artist name"
            onChange={(e) => setTerm(e.target.value)}
        />
        <button className="btn" onClick={handleSubmit}>
            SEARCH
        </button>
        </form>
    </>
    );
};
  
export default SearchResults