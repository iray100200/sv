import React, { Component } from 'react'
import { PageHeader } from 'antd'

import './style.scss'

export default class Head extends Component {
  render() {
    const { background } = this.props
    return <div className="head" style={{ background }}>
      <PageHeader { ...this.props } />
    </div>
  }
}