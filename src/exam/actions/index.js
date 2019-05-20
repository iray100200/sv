import namespace from 'utils'
import exceed from 'utils/apimap'

const NS = namespace()

export const FETCH_EXAM_LIST = NS('FETCH_EXAM_LIST')

export function fetchExamList(data) {
  return dispatch => {
    return exceed.fetch({
      api: 'fetchExamList',
      data
    }).then(res => {
      if (res.code === 0) {
        dispatch({
          type: FETCH_EXAM_LIST,
          data: res.body
        })
      }
    })
  }
}