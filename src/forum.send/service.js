import exceed from 'utils/apimap'

export function postForumData(data) {
  return exceed.fetch({
    api: 'postForumData',
    data
  })
}