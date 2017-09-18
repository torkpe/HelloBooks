const initialState = {
    fetching: false,
    books: []
}
export default (state = initialState, action ={}) => {
    switch(action.type) {
        case 'GET_BOOKS': {
            return {...state,
                fetching: true
            }
        }
        case 'GET_BOOKS_SUCCESSFUL':{
            return {
                ...state,
                isLoading: false,
                books: action.payload
            }
        }
        case 'FAILED':{
            return {
                ...state,
                fetching: false,
                errors: action.payload
            }
        }
        default: return state;
    }
}