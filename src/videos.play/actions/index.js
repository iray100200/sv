import namespace from 'utils'

const NS = namespace()

export const HOME_FETCH = NS('FETCH')

export function fetchLayout() {
  return dispatch => {
    dispatch({
      type: HOME_FETCH,
      data: 1
    })
  }
}