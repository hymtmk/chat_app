import {combineReducers} from 'redux'
import dataReducer from './dataReducer'
import inviteReducer from './inviteReducter'

const allReducers = combineReducers ({

  dataReducer,
  inviteReducer,
})

export default allReducers