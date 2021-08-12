import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import userImg from '../../assets/justin.PNG'

const NavBar = ({ userData }) => {
    const [userProfile, setUserProfile] = useState(false)
    return (
        <>
            <div style={{ margin: "2rem 1rem", marginBottom: '0rem', display: 'flex', justifyContent: 'space-between' }}>
                <div
                    className="dropDown"
                    onMouseEnter={() => setUserProfile(!userProfile)}
                    onMouseLeave={() => setUserProfile(false)}>
                    <img src={userData.image || userImg} alt="user" />
                    {userProfile && <ul>
                        <li><h3>{ userData.name || 'John Doe' }</h3></li>
                        <li>
                            <p style={{ margin: '0px' }}>
                                <a href={userData.url || '/'} target="_blank" rel="noopener noreferrer">{'Profile >>'}</a>
                            </p>
                        </li>
                    </ul>}
                </div>
                <Link to="/" className="btn">Home</Link>
            </div>
        </>
    )
}

export default NavBar
