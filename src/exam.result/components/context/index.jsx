import React from 'react'
import { QuestionCollection } from '../../../exam.test/components/question'

import './style.scss'

class ContextItem extends React.Component {
  handleClick = () => {
    const { onClick = e => e } = this.props
    onClick()
  }
  render() {
    const { dataSource, selected } = this.props
    const { index, correct } = dataSource
    return <div className={"examr-context-item flex" + (selected ? ' selected' : '') + (correct ? ' correct' : ' wrong')}>
      <div className="er-index" onClick={this.handleClick}>{index}</div>
    </div>
  }
}

export default class Context extends React.Component {
  static Item = ContextItem
  state = {
    selectedIndex: 1
  }
  handleChangeIndex = (index) => {
    const { onIndexChange = e => e } = this.props
    this.setState({
      selectedIndex: index
    })
    onIndexChange(index)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.state.selectedIndex) {
      this.setState({
        selectedIndex: nextProps.current
      })
    }
  }
  render() {
    const { title, children, dataSource } = this.props
    const { selectedIndex } = this.state
    const bottom = item => {
      return <div className="answer-card">
        <div className="answers flex">
          <strong className="auto">正确答案：{item.answer}</strong>
          {
            !item.reply ? <label style={{ color: '#999' }}>未作答</label> : ''
          }
        </div>
      </div>
    }
    return <div className="examr-context">
      <div className="er-head">
        {title}
      </div>
      <div className="flex vertical">
        <div className="list flex wrap">
          {children}
        </div>
        <div className="container">
          <QuestionCollection current={selectedIndex} onUpdateIndex={this.handleChangeIndex} dataSource={dataSource} bottom={bottom}></QuestionCollection>
        </div>
      </div>
    </div>
  }
}
