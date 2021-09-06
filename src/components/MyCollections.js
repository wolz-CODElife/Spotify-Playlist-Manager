import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { useHistory } from "react-router-dom";
import { deletePlaylist, getPlaylists } from "../utils/model";
import bgImg from '../assets/justin.PNG'
import Track from './Track'

const MyCollections = () => {
  const history = useHistory();
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")));
    const [playlists, setPlaylists] = useState([])
    const [activePlaylist, setactivePlaylist] = useState()

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      history.push("/");
    }

    getPlaylists(userData?.user_id)
    .then(req => {
        return setPlaylists(req)
    })
    .catch((err) => console.log(err.message))
    
    setUserData(JSON.parse(localStorage.getItem("user")))
  }, [userData, history]);
    
    const togglePlaylist = (id) => {
        if (activePlaylist === id) {
            setactivePlaylist()
        }
        else {
            setactivePlaylist(id)
        }
    }
    const removePlaylist = (playlist) => {
        deletePlaylist(playlist.id)
        .then(req => {
            const newPlaylist = playlists.filter((list) => list.id !== playlist.id)
            playlists.unshift(playlist)
            return setPlaylists(newPlaylist)
        })
        .catch((err) => console.log(err.message))
    } 

  return (
    <>
      <NavBar userData={userData} />
      <div className="container">
        <h1 style={{ color: "#fff", textShadow: "2px 2px 2px #ccc" }}>
          My Collections
        </h1>
        <article className="section">            
            <div className="trackList">
                <div className="playList">
                    {playlists.length ?
                        playlists?.map((playlist) => { return (
                            <ul className="track" key={playlist.id}>
                                <li style={{ cursor: 'pointer' }} onClick={() => togglePlaylist(playlist.id)}>
                                    <div style={{ margin: '0px', width: '100%', backgroundImage: `url(${bgImg})`, backgroundPosition: 'center', backgroundSize: 'cover', borderRadius: '0.3rem' }}>
                                        <div className="item" style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', margin: '0px'}}>                        
                                            <div>
                                                <h3>{playlist.name}</h3>
                                            </div>
                                            <button className="btn" style={{ background: 'red' }} onClick={(e) => {
                                                e.preventDefault()
                                                removePlaylist(playlist)
                                            }}> Delete </button>
                                        </div>
                                    </div>
                                </li>
                                {activePlaylist === playlist.id &&
                                    <div style={{background: '#000000'}}>
                                        {playlist.tracks.map((track) => {
                                            return (
                                                <Track
                                                    key={track.id}
                                                    track={track}
                                                />
                                        )})}
                                    </div>
                                }
                            </ul>
                        )
                        })
                    :
                        <h2 style={{ margin: '10vh 0px' }}>No Playlist saved . . .</h2>
                    }
                </div>
            </div>
        </article>
      </div>
    </>
  );
};

export default MyCollections;
