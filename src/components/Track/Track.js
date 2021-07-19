import React, { useState, useEffect } from 'react'
import bgImg from '../../assets/justin.PNG'

const Track = ({ track, onAdd, onRemove, isRemoval }) => {
    const [trackBg, setTrackBg] = useState(bgImg)

    useEffect(() => {
        if (track.img) {
            setTrackBg(track.img)
        }
    }, [track.img])
    const addTrack = () => {
        onAdd(track)
    }
    const removeTrack = () => {
        onRemove(track)
    }
    return (
        <ul className="track">
            <li>
                <div style={{ margin: '0px', width: '100%', backgroundImage: `url(${trackBg})`, backgroundPosition: 'center', borderRadius: '0.3rem' }}>
                    <div className="item" style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', margin: '0px'}}>                        
                        <div>
                            <h3>{track.name}</h3>
                            {track.artist} | {track.album}
                        </div>
                        <TrackAction isRemoval={isRemoval} removeTrack={removeTrack} addTrack={addTrack} />
                    </div>
                </div>
            </li>
            <li>
                <iframe 
                    src={"https://open.spotify.com/embed/track/" + track.id}
                    width="100%" 
                    height="80"
                    frameBorder="0"
                    allowtransparency="True"
                    allow="encrypted-media"
                    title="preview"
                />
            </li>
        </ul>
    )
}
const TrackAction = ({ isRemoval, removeTrack, addTrack }) => {
    return (
        <>
            {
                isRemoval ?
                    <button className="btn" style={{background: 'red'}} onClick={removeTrack}> - </button>
                :
                    <button className="btn" onClick={addTrack}> + </button>
            }
        </>
    )
}





export default Track