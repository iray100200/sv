import namespace from '../../utils'
import exceed from 'utils/apimap'

const NS = namespace('forum.item')

export const FETCH_DETAIL = NS('FETCH_DETAIL')

export function fetchForumComments(data) {
  return dispatch => {
    exceed.fetch({
      api: 'fetchForumComments',
      data
    }).then(res => {
      if (res.code === 0) {
        dispatch({
          type: FETCH_DETAIL,
          data: res.body
        })
      }
    })
  }
}