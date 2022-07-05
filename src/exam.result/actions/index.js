import namespace from '../../utils'
import exceed from 'utils/apimap'

const NS = namespace('exam')

export const FETCH_EXAM_INFO = NS('FETCH_EXAM_INFO')

export function fetchExamInfo(id) {
  return dispatch => {
    return exceed.fetch({
      api: 'queryExamResult',
      data: {
        examinationId: id
      }
    }).then(res => {
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
            answered: !!o.userExamItemReply,
            correct: o.correctness !== 'wrong',
            answer: o.userExamItemAnswer
          }
        })
        dispatch({
          type: FETCH_EXAM_INFO,
          data: {
            ...res.body, list: itemList, wrongCount: itemList.filter(o => !o.correct).length,
          }
        })
      }
    })
  }
}