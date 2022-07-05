import namespace from '../../utils'
import exceed from 'utils/apimap'

const NS = namespace('forum.item')

export const FETCH_DETAIL = NS('FETCH_DETAIL')
export const FETCH_COMMENTS = NS('FETCH_COMMENTS')

export function fetchForumComments(data) {
  return dispatch => {
    return exceed.fetch({
      api: 'fetchForumComments',
      data
    }).then(res => {
      if (res.code === 0) {
        dispatch({
          type: FETCH_COMMENTS,
          data: res.body
        })
      }
    })
  }
}

export function fetchForumItemData(data) {
  return dispatch => {
    return exceed.fetch({
      api: 'fetchForumItemData',
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

export function commentForumItem(data) {
  return dispatch => new Promise(resolve => {
    exceed.fetch({
      api: 'commentForumItem',
      data
    }).then(res => {
      if (res.code === 0) {
        resolve(true)
        fetchForumComments({
          forumId: query.id
        })(dispatch)
      } else {
        resolve(false)
      }
    }).catch(e => {
      resolve(false)
    })
  })
}