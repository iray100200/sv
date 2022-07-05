import * as actions from '../actions'

const initialState = {
  knowledgeNodes: [],
  typeList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_KNOWLEDGE_TYPES:
      return { ...state, typeList: action.data }
    case actions.FETCH_KNOWLEDGE:
      return { ...state, knowledgeNodes: action.data }
    default:
      return { ...state }
  }
}