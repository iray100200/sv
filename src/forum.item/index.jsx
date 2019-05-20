import React from 'react'
import ReactDom from 'react-dom'
import Root from './components/root'
import store from './store'
import { Provider } from 'react-redux'

ReactDom.render(<Provider store={ store }>
  <Root />
</Provider>, document.getElementById('root'))