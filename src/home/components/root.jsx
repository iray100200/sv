import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Layout } from 'components'

class Root extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchLayout())
  }
  render() {
    return <Layout>
      <div>
        123
      </div>
    </Layout>
  }
}

export default connect(state => state)(Root)