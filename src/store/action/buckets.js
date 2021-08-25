import * as actionTypes from './actionTypes'
import axios from 'axios'

export const addBucket = (name,username) => {
    return dispatch => {
        axios.post(`https://todo-list-frontend-one.vercel.app/api/buckets/${username}`,name)
        .then(response => {
            
            dispatch(setBuckets(response.data))
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export const setBuckets = (buckets) => {
    return {
        type : actionTypes.SET_BUCKETS,
        buckets : buckets
    }
}

export const fetchBuckets = (username) => {
    return dispatch => {
        axios.get(`https://todo-list-frontend-one.vercel.app/api/buckets/${username}`)
        .then(response => {
            
            dispatch(setBuckets(response.data))
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export const deleteBucket = (bucket_id,username) => {
    return dispatch => {
        axios.get(`https://todo-list-frontend-one.vercel.app/api/buckets/${username}/${bucket_id}/delete`)
        .then(response => {
            
            dispatch(setBuckets(response.data))
        })
        .catch(error=> {
            console.log(error)
        })
    }
}

