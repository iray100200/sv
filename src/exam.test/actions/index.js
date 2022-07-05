import namespace from '../../utils'
import exceed from 'utils/apimap'
import { message } from 'antd'

const NS = namespace()

export const FETCH_EXAM_INFO = NS('FETCH_EXAM_INFO')
export const UPDATE_EXAM_INFO = NS('UPDATE_EXAM_INFO')

export function fetchExamInfo(id) {
  return dispatch => {
    return exceed.fetch({
      api: 'fetchExamInfo',
      data: {
        examinationId: id
      }
    }).then(res => {
      if (!res.body) {
        message.warn(res.message || '没有找到考试数据')
        return
      }
      if (res.code === 0) {
        let { itemList } = res.body
        itemList = itemList.map((o, index) => {
          let options = []
          switch (o.userExamItemType) {
            case '判断题':
              options = [
                {
                  label: '对',
                  value: '对'
                }, {
                  label: '错',
                  value: '错'
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
            index: index + 1,
            options,
            answered: !!o.userExamItemReply
          }
        })
        dispatch({
          type: FETCH_EXAM_INFO,
          data: {
            ...res.body, list: itemList
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

export function updateExamInfo(dataSource) {
  return {
    type: UPDATE_EXAM_INFO,
    data: dataSource
  }
}

export function endExam(data) {
  return exceed.fetch({
    api: 'endExam',
    data
  })
}