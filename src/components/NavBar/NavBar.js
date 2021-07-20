import React from 'react'
import { Link } from 'react-router-dom'
import userImg from '../../assets/justin.PNG'

const NavBar = ({userData}) => {
    return (
        <>
            <div style={{ margin: "1rem 0.5rem", display: 'flex', justifyContent: 'space-between' }}>
                <div className="dropDown">                    
                    <img src="" alt="" />
                    <ul>
                        <li>Name: </li>
                        <li>Email: </li>
                        <li>Profile >> </li>
                    </ul>
                </div>
                <Link to="/" className="btn">Home</Link>
            </div>
        </>
    )
}

export default NavBar
