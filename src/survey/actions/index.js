import namespace from '../../utils'
import exceed from 'utils/apimap'

const NS = namespace('survey')

export const FETCH_LIST = NS('FETCH_LIST')

export function fetchLayout() {
  return dispatch => {
    dispatch({
      type: HOME_FETCH,
      data: 1
    })
  }
}

const types = {
  1: 'radiogroup',
  2: 'radiogroup',
  3: 'text'
}

const choices = [
  '非常满意',
  '满意',
  '一般',
  '不满意',
  '非常不满意'
].map((o, i) => {
  return {
    text: o,
    value: i
  }
})

export function fetchSurveyList() {
  return dispatch => {
    return exceed.fetch({
      api: 'fetchSurveyList',
      data: {
        user: userInfo.loginName
      }
    }).then(res => {
      let data = res.map(o => {
        let id = o._id
        return {
          isRequired: true,
          questions: o.data.map((o, i) => {
            return {
              type: types[o.type],
              title: o.title,
              name: id + '-' + i,
              choices: Number(o.type) === 2 ? o.options.map((o, i) => {
                return {
                  text: o,
                  value: i
                }
              }) : choices,
              isRequired: true
            }
          })
        }
      })
      dispatch({
        type: FETCH_LIST,
        data
      })
    })
  }
}

export function submit(data) {
  return exceed.fetch({
    api: 'submitSurvey',
    data
  })
}