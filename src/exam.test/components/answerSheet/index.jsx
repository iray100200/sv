import React, { Component } from 'react'
import { Icon } from 'antd'

import './style.scss'

export default class AnswerSheet extends Component {
  handleClick = (index) => () => {
    const { onEmit = e => e } = this.props
    onEmit(index)
  }
  render() {
    const { dataSource, title, style } = this.props
    return <div className="answer-sheet" style={style}>
      <h4><Icon type="dashboard" style={{ marginRight: 6 }} />{title}</h4>
      <div className="body">
        {
          dataSource.map((o, i) => {
            return <span onClick={this.handleClick(i)} className={o.answered ? 'answered' : 'unanswered'}>{o.index}</span>
          })
        }
      </div>
    </div>
  }
}