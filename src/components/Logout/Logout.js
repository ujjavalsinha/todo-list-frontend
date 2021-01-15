import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import * as actions from '../../store/action/auth'

const Logout = (props) => {
    useEffect(()=> {
        props.onLogout()
    })
    return (
        <Redirect to='/signup' />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch(actions.authReset())
    }
}

export default connect(null,mapDispatchToProps)(Logout)