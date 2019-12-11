
import { fork, all } from 'redux-saga/effects'
import inviteSaga from './inviteSaga'
import dataSaga from './dataSaga'

export default function* rootSaga () {
    yield all( [
        fork(inviteSaga), 
        fork(dataSaga),
    ]);
}