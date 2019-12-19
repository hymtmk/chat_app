import { INVITING_DATA, INVITING_DATA_SUCCESS, INVITING_DATA_FAILURE } from '../actions/actionType'
import { put, takeEvery } from 'redux-saga/effects'
import getPeople from '../../components/API/api/inviting'

function* inviteData (action) { 

  try {
    const data = yield getPeople(action.a, action.b)

    console.log ("saga data......", data)
  
    yield put({ type: INVITING_DATA_SUCCESS, data })
  } catch (e) {
    yield put({ type: INVITING_DATA_FAILURE })
  }
}

function* inviteSaga () {
  
  yield takeEvery(INVITING_DATA, inviteData)

}

export default inviteSaga


