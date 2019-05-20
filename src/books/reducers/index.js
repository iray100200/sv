import * as actions from '../actions'

const initialState = {
  layout: 0,
  bookTypes: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_BOOKS_AND_TYPES:
      return { ...state, bookTypes: action.data }
    default:
      return { ...state }
  }
}