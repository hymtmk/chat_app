import { FETCHING_CONVERSATION, FETCHING_CONVERSATION_SUCCESS, FETCHING_CONVERSATION_FAILURE } from '../actions/actionType'
import { put, takeEvery } from 'redux-saga/effects'
import getPeople from '../../components/API/api/login'

function* fetchConversations (action) {
  try {
    const data = yield getPeople()
    yield put({ type: FETCHING_CONVERSATION_SUCCESS, data })
  } catch (e) {
    yield put({ type: FETCHING_CONVERSATION_FAILURE })
  }
}

function* conversationSaga () {
  yield takeEvery(FETCHING_CONVERSATION, fetchConversations)
}

export default conversationSaga

