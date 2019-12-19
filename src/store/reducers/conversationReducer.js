import { FETCHING_CONVERSATION, FETCHING_CONVERSATION_SUCCESS, FETCHING_CONVERSATION_FAILURE } from '../actions/actionType'

const initialState = {
    key: '',
    conversations: [],
    isLoading: false
  }
  
  export default function conversationReducer (state = initialState, action) {
    switch (action.type) {
      case FETCHING_CONVERSATION:
        return {
          ...state,
          conversations: [],
          isLoading: true
        }
      case FETCHING_CONVERSATION_SUCCESS:
        return {
          ...state,
          conversations: action.data,
          isLoading: false
        }
      case FETCHING_CONVERSATION_FAILURE:
        return {
          ...state,
          isLoading: false
        }
      default:
        return state
    }
  }