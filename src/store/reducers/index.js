import {combineReducers} from 'redux'
import dataReducer from './dataReducer'
import inviteReducer from './inviteReducter'
import conversationReducer from './conversationReducer'

const allReducers = combineReducers ({

  dataReducer,
  inviteReducer,
  conversationReducer,
})

export default allReducers