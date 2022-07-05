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
        let list = res.body.list
        const completed = list.filter(o =>
          o.userExaminationStatus !== '0' &&
          o.userExaminationStatus !== '-4' &&
          o.userExaminationStatus !== '-3').length
        dispatch({
          total: res.body.count,
          type: FETCH_EXAM_LIST,
          data: res.body,
          completed: completed,
          passed: list.filter(o => o.userExaminationPass === '是').length,
          failed: list.filter(o => o.userExaminationPass === '否').length,
          percent: list.length ? list.map(o =>
            o.userExaminationStatus !== '0' &&
              o.userExaminationStatus !== '-4' &&
              o.userExaminationStatus !== '-3' ? 1 : Number(o.process) || 0).reduce((a, b) => a + b, 0) / list.length * 100 : 0
        })
      }
    })
  }
}