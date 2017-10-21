const notifyState = {
    isLoading:false,
    errors:{},
    notification: {}
}
export const notify = (state = notifyState, action ={}) => {
    switch(action.type) {
        case 'POST_NOTIFICATION': {
            return {...state,
                fetching: true
            }
        }
        case 'POST_NOTIFICATION_SUCCESSFUL':{
            return {
                ...state,
                fetching: false,
                books: action.payload,
            }
        }
        case 'FAILED_TO_POST_NOTIFICATION':{
            return {
                ...state,
                fetching: false,
                errors: action.payload
            }
        }
        default: return state;
    }
}
const notificationState = {
    isLoading:false,
    errors:{},
    notifications: []
}
export const getNotification = (state = notificationState, action ={}) => {
    switch(action.type) {
        case 'GET_NOTIFICATION': {
            return {...state,
                fetching: true
            }
        }
        case 'GET_NOTIFICATION_SUCCESSFUL':{
            return {
                ...state,
                fetching: false,
                notifications: action.payload
            }
        }
        case 'FAILED_TO_GET_NOTIFICATION':{
            return {
                ...state,
                fetching: false,
                errors: action.payload
            }
        }
        default: return state;
    }
}