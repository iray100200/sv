import * as actions from '../actions'

const initialState = {
  allData: {},
  myData: {},
  myJoinedData: {},
  p1Data: {},
  p2Data: {},
  p3Data: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.TYPES['0']:
      return { ...state, allData: action.data }
    case actions.TYPES['1']:
      return { ...state, myData: action.data }
    case actions.TYPES['2']:
      return { ...state, myJoinedData: action.data }
    case actions.TYPES['3']:
      return { ...state, p1Data: action.data }
    case actions.TYPES['4']:
      return { ...state, p2Data: action.data }
    case actions.TYPES['5']:
      return { ...state, p3Data: action.data }
    default:
      return { ...state }
  }
}