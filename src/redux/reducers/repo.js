import * as type from '../types';

const initialState = {
    repo: [],
    language: [],
    loading: false,
    error: null,
}

export default function repoReducer(state = initialState, action) {
    switch (action.type) {
        case type.GET_REPO:
            return {
                ...state,
                loading: true,
            }
        case type.GET_REPO_SUCCESS:
            return {
                ...state,
                repo: action.payload,
                language: action.language,
                loading: false,
            }
        case type.GET_REPO_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}