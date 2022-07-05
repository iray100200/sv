import exceed from 'utils/apimap'

export function postForumData(data) {
  return exceed.fetch({
    api: data.forumId ? 'updateForumData' : 'postForumData',
    data
  })
}