import * as actionTypes from './actionTypes'
import axios from 'axios'
export const addItem = (items,username) => {
    return dispatch => {
        axios.post(`https://todolist-backend-django.vercel.app/api/todolist/${username}`,items)
        .then(response => {
            
            dispatch(setTodoItems(response.data))
        })
        .catch(error => {
            dispatch(fetchFailed(true))
        })
    }
}

export const statusChanged = (item) => {
    console.log("INSIDE STATUS CHANGED IN TODO>JS")
    return {
        type : actionTypes.STATUS_CHANGED,
        item : item
    }
}
export const completeTask = (item_id,username) => {
    return dispatch => {
        axios.get(`https://todolist-backend-django.vercel.app/api/todolist/${username}/${item_id}/complete`)
        .then(response => {
            
            const item = response.data
            dispatch(statusChanged(item))
        })
        .catch(error => {
            console.log(error.data)
        })
    }
}
export const removeItem = (item_id,username) => {
    return dispatch => {
        axios.get(`https://todolist-backend-django.vercel.app/api/todolist/${username}/${item_id}/delete`)
        .then(response => {
            
            dispatch(setTodoItems(response.data))
        })
        .catch(error => {
            dispatch(fetchFailed(true))
        })
    }
}

export const fetchFailed = (error) => {
    return {
        type : actionTypes.FETCH_FAILED,
        error : error
    }
}

export const setTodoItems = (items) => {
    return {
        type : actionTypes.SET_ITEMS,
        item : items
    }
}

export const fetchTodoItems = (username) => {
    return dispatch => {
        axios.get(`https://todolist-backend-django.vercel.app/api/todolist/${username}`)
        .then(response => {
            
            dispatch(setTodoItems(response.data))
        })
        .catch(error => {
            dispatch(fetchFailed(true))
        })
    }
}

export const editing = (item_id) => {
    return {
        type : actionTypes.EDITING,
        item_id : item_id
    }
}
export const updatingItem = (item,id,username) => {
    return dispatch => {
        axios.post(`https://todolist-backend-django.vercel.app/api/todolist/${username}/${id}`,item)
        .then(response => {
            
            dispatch(setTodoItems(response.data))
            dispatch(editing(id))
        })
        .catch(error => {
            console.log(error)
        })
    }
}
