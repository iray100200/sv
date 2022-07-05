import namespace from '../../utils'
import exceed from 'utils/apimap'

const NS = namespace()

export const FETCH_KNOWLEDGE = NS('FETCH_KNOWLEDGE')
export const FETCH_KNOWLEDGE_TYPES = NS('FETCH_KNOWLEDGE_TYPES')

export function fetchKnowledgeTypes() {
  return dispatch => exceed.fetch({
    api: 'fetchKnowledgeTypes'
  }).then(res => {
    if (res.code === 0) {
      dispatch({
        type: FETCH_KNOWLEDGE_TYPES,
        data: res.body
      })
    }
  })
}

export function fetchKnowledge() {
  return dispatch => exceed.fetch({
    api: 'fetchKnowledge'
  }).then(res => {
    if (res.code === 0) {
      dispatch({
        type: FETCH_KNOWLEDGE,
        data: res.body
      })
    }
  })
}