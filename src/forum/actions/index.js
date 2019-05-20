import namespace from '../../utils'
import exceed from 'utils/apimap'

const NS = namespace('forum')

export const FETCH_FORUM_DATA = NS('FETCH_FORUM_DATA')

export function fetchForumData() {
  return dispatch => exceed.fetch({
    api: 'fetchForumData'
  }).then(res => {
    if (res.code === 0) {
      dispatch({
        type: FETCH_FORUM_DATA,
        data: res.body.map(o => {
          let dom = document.createElement('div')
          dom.innerHTML = o.forumContent
          return {
            id: o.id,
            title: o.forumTitle,
            description: dom.textContent.substr(0, 100),
            lastUpdateTime: o.updateDate,
            replyCount: 0
          }
        })
      })
    }
  })
}