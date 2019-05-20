import types from 'redux-types'

export default () => name => types((parseInt(Math.random() * 1000000)).toString(16), [name]) 