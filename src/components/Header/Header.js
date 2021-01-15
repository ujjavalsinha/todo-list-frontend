import React from 'react'
import styles from './Header.module.css'

const Header = (props) => {
    return (
        <div className={styles.Header}>
            <h1>My Todo List</h1>
        </div>
    )
}

export default Header