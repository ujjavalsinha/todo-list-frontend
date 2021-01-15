import React from 'react'
import styles from './NavBar.module.css'
import {connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
const NavBar = (props) => {
    return (
        <div className={styles.NavBar}>
            <div className={styles.Logo}>
                <div className={styles.LogoText}>
                    <h1>TODO</h1>
                </div>
            </div>
            <ul className={styles.NavItems}>
                {props.isAuthenticated ? null : <li><NavLink to='/login'>Login</NavLink></li>}
                {props.isAuthenticated ? null : <li><NavLink to='/signup'>Signup</NavLink></li>}
                {props.isAuthenticated ? <li><NavLink to='/logout'>Logout</NavLink></li> : null}
            </ul>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.tokenId !== null,
    }
}
export default connect(mapStateToProps)(NavBar);