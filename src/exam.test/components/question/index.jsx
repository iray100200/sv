import React, { Component } from 'react'
import { Radio, Checkbox, Button, Input, message } from 'antd'
import * as actions from '../../actions'
import querystring from 'query-string'

import 'components/flex.scss'
import 'components/'
import './style.scss'

const _options = 'ABCDEFGHI'

const types = {
  "1": '单选题',
  "2": '判断题',
  "3": '简答题',
  "4": "多选题"
}

export default class Question extends Component {
  state = {
    reply: ''
  }
  handleChange = val => {
    let value = val
    const { onChange = e => e, data } = this.props
    if (val.target) {
      value = val.target.value
    }
    if (Array.isArray(val)) {
      value = val.sort((a, b) => a.localeCompare(b)).join('')
    }
    onChange(value)
    actions.submitItem(data.id, value).then(res => {
      if (res.code !== 0) {
        message.warn('提交失败: ' + res.message)
      }
    }).catch(e => message.error('网络异常：' + e.message))
  }
  handleChangeText = v => {
    this.setState({
      reply: v.target.value
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      reply: nextProps.data.reply
    })
  }
  componentDidMount() {
    this.setState({
      reply: this.props.data.reply
    })
  }
  content(data) {
    const { type, options, reply } = data
    switch (type) {
      case '单选题':
      case '判断题':
        return <Radio.Group onChange={this.handleChange} value={reply}>
          <ul className="options">
            {
              options.map((o, i) => {
                return <li>
                  <Radio value={o.value}>
                    <div className="flex">
                      <b>{_options[i]}.</b><label style={{ marginLeft: 4, whiteSpace: 'normal', display: 'inline-block', verticalAlign: 'top' }}>{o.label}</label>
                    </div>
                  </Radio>
                </li>
              })
            }
          </ul>
        </Radio.Group>
      case '多选题':
        return <Checkbox.Group onChange={this.handleChange} value={reply}>
          <ul className="options">
            {
              options.map((o, i) => {
                return <li>
                  <Checkbox value={o.value}>
                    <div className="flex">
                      <b>{_options[i]}.</b><label style={{ marginLeft: 4, whiteSpace: 'normal', display: 'inline-block', verticalAlign: 'top' }}>{o.label}</label>
                    </div>
                  </Checkbox>
                </li>
              })
            }
          </ul>
        </Checkbox.Group>
      case '简答题':
        return <Input.TextArea value={this.state.reply} onChange={this.handleChangeText} onBlur={this.handleChange} placeholder="在此输入" autosize={{ minRows: 2, maxRows: 6 }} />
    }
  }
  render() {
    let { data } = this.props
    if (!data) return null
    const { title, type, correct } = data
    return <div className={"question-context" + (correct !== void (0) ? (correct ? ' correct' : ' wrong') : '')}>
      <h3 className="title" style={{ display: 'flex' }}>
        <label>[{type}]</label>
        <label style={{ marginLeft: 4, flex: 1 }} dangerouslySetInnerHTML={{ __html: title }}></label></h3>
      {this.content(data)}
      <div></div>
    </div>
  }
}

export class QuestionCollection extends Component {
  state = {
    current: 0
  }
  showNext = () => {
    const { onUpdateIndex = e => e } = this.props
    let { current } = this.state
    this.setState({
      current: ++current
    })
    onUpdateIndex(current)
  }
  showPrev = () => {
    const { onUpdateIndex = e => e } = this.props
    let { current } = this.state
    this.setState({
      current: --current
    })
    onUpdateIndex(current)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      current: nextProps.current || 0
    })
  }
  handleChange = index => val => {
    const { dataSource, onChange = e => e } = this.props
    if (val) {
      dataSource[index].answered = true
    } else {
      dataSource[index].answered = false
    }
    dataSource[index].reply = val
    onChange(dataSource)
  }
  render() {
    const { dataSource, bottom } = this.props
    const { current } = this.state
    const hasNext = current < dataSource.length - 1
    const hasPrev = current > 0
    const currentQ = dataSource[current]
    return <div className="question-collection">
      {
        dataSource.length === 0 ? '' : <div>
          <div className="head">
            <div className="type">{currentQ.type}（{current + 1}/{dataSource.length}）</div>
          </div>
          <Question onChange={this.handleChange(current)} data={currentQ} />
          {
            bottom && <div style={{ margin: '-10px 14px 10px' }}>{bottom(currentQ)}</div>
          }
          <div className="flex center">
            <div className="question-pagination">
              <Button disabled={!hasPrev} shape="round" onClick={this.showPrev}>
                上一题
            </Button>
              <Button disabled={!hasNext} shape="round" onClick={this.showNext}>
                下一题
            </Button>
            </div>
          </div>
        </div>
      }
    </div>
  }
}