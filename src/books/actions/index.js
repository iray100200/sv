import namespace from '../../utils'
import exceed from 'utils/apimap'

const NS = namespace()

export const FETCH_BOOKS = NS('FETCH_BOOKS')
export const FETCH_BOOK_TYPES = NS('FETCH_BOOK_TYPES')
export const FETCH_BOOKS_AND_TYPES = NS('FETCH_BOOKS_AND_TYPES')

export function fetchBooks(data) {
  return new Promise((resolve, reject) => {
    exceed.fetch({
      api: 'fetchBooks',
      data
    }).then(res => {
      if (res.code === 0) {
        resolve(res.body)
        return
      }
      reject()
    }).catch(reject)
  })
}

export function fetchBookTypes() {
  return dispatch => exceed.fetch({
    api: 'fetchBookTypes'
  }).then(res => {
    if (res.code === 0) {
      dispatch({
        type: FETCH_BOOK_TYPES,
        data: res.body
      })
    }
  })
}

export function fetchBooksAndTypes(data) {
  return dispatch => exceed.fetch({
    api: 'fetchBooksAndTypes',
    data
  }).then(res => {
    if (res.code === 0) {
      dispatch({
        type: FETCH_BOOKS_AND_TYPES,
        data: res.body
      })
    }
  })
}