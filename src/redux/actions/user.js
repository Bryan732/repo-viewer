import * as type from '../types';

export const getUser = () => {
    return {
        type: type.GET_USER
    }
}

export const getRepo = (repoName) => {
    return {
        type: type.GET_REPO,
        repoName
    }
}