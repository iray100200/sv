import * as actions from '../actions'

const initialState = {
  records: {

  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_EXAM_INFO:
      return { ...state, records: action.data }
    default:
      return { ...state }
  }
}