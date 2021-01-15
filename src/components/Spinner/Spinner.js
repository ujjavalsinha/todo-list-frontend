import React from 'react'
import styles from './Spinner.module.css'

const Spinner = (props) => {
    return (
        <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Spinner