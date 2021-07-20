import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Spotify from '../../utils/Spotify'

const Index = () => {
    const [userData, setUserData] = useState({})
    const history = useHistory()
    
    useEffect(() => {
        if (userData.user_id) {            
            history.push('/create')
        }
    }, [userData, history])
    const getUserData = () => {
        Spotify.getUserId().then((newUserData) => setUserData(newUserData))
    }

    return (
        <>
            <div className="container">
                <br /><br />
                <br /><br />
                <h1 style={{ color: '#fff', textShadow: '2px 2px 2px #ccc' }}>MusicBuddy</h1>
                <br /><br />
                <button className="btn" onClick={() => getUserData()}>Get Started</button>
            </div>
        </>
    )
}

export default Index
