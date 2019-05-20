import React, { Component } from 'react'
import { PageHeader } from 'antd'

import './style.scss'

export default class Head extends Component {
  render() {
    return <div className="head">
      <PageHeader { ...this.props } />
    </div>
  }
}