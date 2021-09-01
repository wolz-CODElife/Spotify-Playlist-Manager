import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { useHistory } from "react-router-dom";
import { getPlaylists } from "../utils/model";
import Track from './Track'

const MyCollections = () => {
  const history = useHistory();
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      history.push("/");
    }

    getPlaylists(userData?.user_id)
    .then(req => {
        return setPlaylists(req)
    })
    .catch((err) => console.log(err.message))
  }, [userData, history]);
    console.log(playlists);
    
    const onAdd = (id) => {

    } 
    const onRemove = (id) => {
        
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
                    {playlists.tracks.map((track) => {
                        return (
                            <Track
                                key={track.id}
                                track={track}
                                onAdd={onAdd}
                                isRemoval={true}
                                onRemove={onRemove}
                            />
                        )
                    })}
                </div>
            </div>
        </article>
      </div>
    </>
  );
};

export default MyCollections;
