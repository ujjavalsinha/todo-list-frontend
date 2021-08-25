import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    }
}

export const authSuccess = (tokenId,username) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        tokenId : tokenId,
        username : username
    }
}

export const authReset = () => {
    return {
        type : actionTypes.AUTH_RESET
    }
}

export const authFail = (error) => {
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    }
}

export const authSignUp = (userData, history) => {
    return dispatch => {
        dispatch(authStart())
        // axios.post('http://127.0.0.1:8000/api/users/signup',userData)
        axios.post('https://todolist-backend-django.herokuapp.com/api/users/signup',userData)
        .then(response => {
            console.log(response.data)
            dispatch(authSuccess(response.data.tokenId,response.data.username ))
            history.push('/')
        })
        .catch(error => {
            console.log(error.response.data.message)
            dispatch(authFail(error.response.data.message))
        })
    }
}

export const authSignIn = (userLoginData,history) => {
    return dispatch => {
        dispatch(authStart())
        // axios.post('http://127.0.0.1:8000/api/users/login',userLoginData)
        axios.post('https://todolist-backend-django.herokuapp.com/api/users/login',userLoginData)
        .then(response => {
            console.log(response.data)
            dispatch(authSuccess(response.data.tokenId,response.data.username))
            history.replace('/')
        })
        .catch(error => {
            console.log(error.response.data.message)
            dispatch(authFail(error.response.data.message))
        })
    }
}
