import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Question, { QuestionCollection } from './question'
import Timer from './timer'
import AnswerSheet from './answerSheet'
import { Button } from 'antd'
import querystring from 'query-string'

import './style.scss'

const { id } = querystring.parse(location.search)

class Root extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchExamInfo(id))
  }
  render() {
    const { list = [] } = this.props.records
    console.log(list)
    return <div className="exam-test">
      <QuestionCollection dataSource={ list}></QuestionCollection>
      <div className="time-count" style={{ visibility: list.length > 0 ? 'visible' : 'hidden' }}>
        <AnswerSheet title="答题卡" dataSource={ list } />
        <Button size="large" block style={ { marginTop: 20, lineHeight: 1 } }>交卷</Button>
        <div style={ { textAlign: 'center', margin: '100px auto' } }>
          <Timer />
        </div>
      </div>
    </div>
  }
}

export default connect(state => state)(Root)