
import { fork, all } from 'redux-saga/effects'
import inviteSaga from './inviteSaga'
import dataSaga from './dataSaga'
import conversationSaga from './conversationSaga'

export default function* rootSaga () {
    yield all( [
        fork(inviteSaga), 
        fork(dataSaga),
        fork(conversationSaga),
    ]);
}