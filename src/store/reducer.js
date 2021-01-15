import * as actionTypes from './action/actionTypes'
const initialState = {
    tasks : [],
    buckets : [],
    loading : false,
    error : null,
    status_changed : false,
    editing : false,
    editing_id : null,
    auth : {
        username : null,
        tokenId : null,
        error : null,
        loading : false
    }
}

const reducer = (state=initialState, action) => {
    
    switch(action.type){
        case(actionTypes.FETCH_FAILED):
            return {
                ...state,
                error : true
            }
        case(actionTypes.SET_ITEM_START):
            return {
                ...state,
                loading : true,
            }
        case(actionTypes.SET_ITEMS):
            return {
                ...state,
                tasks : action.item,
                status_changed : false,
            }

        case(actionTypes.SET_BUCKETS):
            return {
                ...state,
                buckets : action.buckets,
            }
        case(actionTypes.STATUS_CHANGED):
            
            const newTasks = [...state.tasks]
            for(let i = 0 ; i <=newTasks.length-1 ; i++){
                
                if(newTasks[i].id === action.item.id){
                    newTasks[i] = action.item
                }
            }
            
            return {
                ...state,
                tasks : newTasks,
                editing : false
            }
        case(actionTypes.EDITING):
            return {
                ...state,
                editing : !state.editing,
                editing_id : action.item_id
            }

        case(actionTypes.AUTH_RESET):
            return {
                ...state,
                tasks : [],
                buckets : [],
                editing : false,
                
                auth : {
                    ...state.auth,
                    username : null,
                    tokenId : null,
                    error : null,
                    loading : false
                }
            }
        case(actionTypes.AUTH_START):
            return {
                ...state,
                auth : {
                    ...state.auth,
                    loading : true
                }
            }
        case(actionTypes.AUTH_SUCCESS):
            return {
                ...state,
                auth : {
                    ...state.auth,
                    loading : false,
                    username : action.username ? action.username : null,
                    tokenId : action.tokenId ? action.tokenId : null,
                    error : null
                }
            }
        case(actionTypes.AUTH_FAIL):
            return {
                ...state,
                auth : {
                    ...state.auth,
                    loading : false,
                    error : action.error
                }
            }
        case(actionTypes.AUTH_LOGOUT):
            return {
                ...state,
                auth : {
                    ...state.auth,
                    tokenId : null,
                    username : null,
                    loading : false,
                    error : null
                }
            }
    }
    return state
}

export default reducer