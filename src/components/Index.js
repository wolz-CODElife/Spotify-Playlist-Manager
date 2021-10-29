import React from 'react'
import { useHistory } from 'react-router-dom'
import { createUser, getUser } from '../utils/model'
import Spotify from '../utils/Spotify'

const Index = () => {
    const history = useHistory()
    
    if (localStorage.getItem('user')) {            
        history.push('/create')
    }

    const Signup = () => {
        Spotify.getUserId().then((newUserData) => {
            createUser(newUserData)
            .then(req => {
                if (req)
                    history.push('/create')
                else
                    alert("Spotify account already registered!")
            })
            .catch((err) => console.log(err.message))
        })
    }
    
    const Login = () => {
        Spotify.getUserId().then((newUserData) => {
            getUser(newUserData)
            .then(req => {
                if (req)
                    history.push('/create')
                else
                    alert('Spotify account not found! Signup first')
            })
            .catch((err) => console.log(err.message))
        })
    }

    return (
        <>
            <div className="container">
                <br /><br />
                <br /><br />
                <h1 style={{ color: '#fff', textShadow: '2px 2px 2px #ccc' }}>MusicBuddy</h1>
                <br /><br />
                <span className="btn" onClick={() => Login()}>Login</span>
                <br />
                <br />
                <p style={{textAlign: 'center', fontWeight: '700', color: 'green'}}>OR</p>
                <span className="btn" onClick={() => Signup()}>SignUp</span>
            </div>
        </>
    )
}

export default Index
