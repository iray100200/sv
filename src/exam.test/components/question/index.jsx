import React, { Component } from 'react'
import { Radio, Checkbox, Button, Icon, Input } from 'antd'
import * as actions from '../../actions'
import querystring from 'query-string'

import 'components/flex.scss'
import 'components/'
import './style.scss'

const _options = 'ABCDEFGHI'

const types = {
  "1": '选择题',
  "2": '判断题',
  "3": '简答题'
}

const { id } = querystring.parse(location.search)

export default class Question extends Component {
  handleSelectChange = val => {
    actions.submitItem(id, val.target.value).then(res => {

    })
  }
  render() {
    let { data } = this.props
    if (!data) return null
    const { title, options, type } = data
    return <div className="question-context">
      <h3 className="title">{ `${title}` }</h3>
      <Radio.Group onChange={this.handleSelectChange}>
        {
          type === types['3'] ?
            <Input.TextArea placeholder="在此输入" autosize={ { minRows: 2, maxRows: 6 } } /> :
            <ul className="options">
              {
                options.map((o, i) => {
                  return <li>
                    <Radio value={ o.value }>
                      <b>{ _options[i] }.</b>&nbsp;&nbsp;{ o.label }
                    </Radio>
                  </li>
                })
              }
            </ul>
        }

      </Radio.Group>
    </div>
  }
}

export class QuestionCollection extends Component {
  state = {
    current: 0
  }
  showNext = () => {
    let { current } = this.state
    this.setState({
      current: ++current
    })
  }
  showPrev = () => {
    let { current } = this.state
    this.setState({
      current: --current
    })
  }
  render() {
    const { dataSource } = this.props
    const { current } = this.state
    const hasNext = current < dataSource.length - 1
    const hasPrev = current > 0
    const currentQ = dataSource[this.state.current]
    return <div className="question-collection">
      {
        dataSource.length === 0 ? '' : <div>
          <div className="head">
            <div className="type">{ currentQ.type }（{current + 1}/{dataSource.length}）</div>
          </div>
          <Question data={ currentQ } />
          <div className="flex center">
            <div className="question-pagination">
              <Button disabled={ !hasPrev } shape="round" onClick={ this.showPrev }>
                上一题
            </Button>
              <Button disabled={ !hasNext } shape="round" onClick={ this.showNext }>
                下一题
            </Button>
            </div>
          </div>
        </div>
      }
    </div>
  }
}