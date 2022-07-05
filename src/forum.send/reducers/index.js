import * as actions from '../actions'

const initialState = {
  detail: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return { ...state }
  }
}