import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

const API = axios.create({ baseURL: 'https://api.github.com/' });

function* fetchUser() {
    try {
        const user = yield API.get('users/react-native-community/repos');
        yield put({ type: 'GET_USER_SUCCESS', payload: user });
    } catch (err) {
        yield put({ type: 'GET_USER_FAILED', message: err.message });
    }
};

function* fetchRepo(action) {
    const { repoName } = action;
    try {
        const repo = yield API.get(`repos/react-native-community/${repoName}`);
        const lang = yield API.get(`repos/react-native-community/${repoName}/languages`);
        yield put({ type: 'GET_REPO_SUCCESS', payload: repo, language: lang });
    } catch (err) {
        yield put({ type: 'GET_REPO_FAILED', message: err.message });
    }
}

function* repoSaga() {
    yield takeEvery('GET_USER', fetchUser);
    yield takeEvery('GET_REPO', fetchRepo);
}

export default repoSaga;