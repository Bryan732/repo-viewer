import * as type from '../types';

const initialState = {
    user: [],
    loading: false,
    error: null,
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case type.GET_USER:
            return {
                ...state,
                loading: true,
            }
        case type.GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case type.GET_USER_FAILED:
            return {
                ...state,
                error: action.message,
                loading: false
            }
        default:
            return state
    }
}