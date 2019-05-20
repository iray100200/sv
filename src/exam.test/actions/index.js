import namespace from '../../utils'
import exceed from 'utils/apimap'

const NS = namespace()

export const FETCH_EXAM_INFO = NS('FETCH_EXAM_INFO')

export function fetchExamInfo(id) {
  return dispatch => {
    return exceed.fetch({
      api: 'fetchExamInfo',
      data: {
        examinationId: id
      }
    }).then(res => {
      if (res.code === 0) {
        let { itemList, examName, examTeacherName, userExamStatus } = res.body
        itemList = itemList.sort((a, b) => a.userExamItemIndex - b.userExamItemIndex).map(o => {
          let options = []
          switch (o.userExamItemType) {
            case '判断题':
              options = [
                {
                  label: '正确',
                  value: 1
                }, {
                  label: '错误',
                  value: 0
                }
              ]
              break
            case '单选题':
            case '多选题':
              for (var a in o.options) {
                let d = o.options[a]
                if (d) {
                  options.push({
                    label: d,
                    value: a.replace(/choice/, '')
                  })
                }
              }
              break
          }
          return {
            title: o.userExamItemName,
            id: o.userExamItemId,
            reply: o.userExamItemReply,
            score: o.userExamItemScore,
            type: o.userExamItemType,
            index: o.userExamItemIndex,
            options
          }
        })
        dispatch({
          type: FETCH_EXAM_INFO,
          data: {
            list: itemList, examName, examTeacherName, userExamStatus
          }
        })
      }
    })
  }
}

export function submitItem(id, reply) {
  return exceed.fetch({
    api: 'replyQuestion',
    data: {
      userExamItemId: id,
      userExamItemReply: reply
    }
  })
}