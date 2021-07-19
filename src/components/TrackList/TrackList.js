import React from 'react'
import Track from '../Track/Track'
import Img from '../../assets/omo.png'

const TrackList = ({ tracks, onAdd, isRemoval, onRemove }) => {
    return (
        <>
            {(tracks.length > 0) &&
                <div className="playList">
                    {tracks.map((track) => {
                        return (
                            <Track
                                key={track.id}
                                track={track}
                                onAdd={onAdd}
                                isRemoval={isRemoval}
                                onRemove={onRemove}
                            />
                        )
                    })}
                </div >
            }
            {(tracks.length === 0) &&
                <div className="playList">
                <img src={Img} alt="Oops!" style={{ width: '100px', height: '100px', marginTop: '2.5rem' }} />
                    <h3>Oops! No Tracks founds</h3>
                    <p>Search and add for a track</p>
                </div>
            }
        </>
    )
}

export default TrackList