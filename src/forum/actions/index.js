import namespace from '../../utils'
import exceed from 'utils/apimap'

const NS = namespace('forum')

export const TYPES = {
  '0': NS('FETCH_FORUM_ALL_DATA'),
  '1': NS('FETCH_MY_FORUM_DATA'),
  '2': NS('FETCH_MY_JOINED_FORUM_DATA'),
  '3': NS('FETCH_MY_FORUM_DATA_P1'),
  '4': NS('FETCH_MY_FORUM_DATA_P2'),
  '5': NS('FETCH_MY_FORUM_DATA_P3')
}

export function fetchForumData(type) {
  return dispatch => {
    return exceed.fetch({
      api: 'fetchForumData',
      data: {
        type
      }
    }).then(res => {
      if (res.code === 0) {
        let list = res.body.list.map(o => {
          let dom = document.createElement('div')
          dom.innerHTML = o.forumContent
          return {
            id: o.id,
            title: o.forumTitle,
            description: dom.textContent.substr(0, 100),
            lastUpdateTime: o.updateDate,
            replyCount: 0,
            user: o.backup01,
            keywords: o.forumtKeyword
          }
        })
        dispatch({
          type: TYPES[type],
          data: {
            ...res.body,
            list
          }
        })
      }
    })
  }
}