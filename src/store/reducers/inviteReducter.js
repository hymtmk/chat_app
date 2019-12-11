import { INVITING_DATA, INVITING_DATA_SUCCESS, INVITING_DATA_FAILURE } from '../actions/actionType'

const initialState = {
  data: [],
  invited: false,
  isInviting:false,
  error: false
}

export default function inviteReducer (state = initialState, action) {
  switch (action.type) {
    case INVITING_DATA:

      return {
        ...state,
        data: [],
        isInviting: true
      }
    case INVITING_DATA_SUCCESS:
   
      return {
        ...state,
        isInviting: false,
        data: action.data
      }
    case INVITING_DATA_FAILURE:
      return {
        ...state,
        isInviting: false,
        error: true
      }
    default:
      return state
  }
}
