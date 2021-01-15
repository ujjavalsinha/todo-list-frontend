import React from 'react';
import styles from './Backdrop.module.css'
import * as actions from '../../store/action/todo'
import {connect } from 'react-redux'
const Backdrop = (props)=>{
    return (
        <div className={styles.Backdrop} onClick={props.onEditing}></div>
    )
}
const mapStateToProps = state => {
    return {
        editing_id : state.editing_id
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onEditing : (editing_id) => dispatch(actions.editing(editing_id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Backdrop);