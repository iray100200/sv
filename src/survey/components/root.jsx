import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Layout } from 'components'
import * as Survey from 'survey-react'
import PageHeader from 'components/head'
import { Icon, Empty, Spin } from 'antd'
import _ from 'lodash'

import 'survey-react/survey.min.css'
import './style.scss'

var survey = data => new Survey.Model({
  'showProgressBar': "top", 'pages': data
})
Survey.surveyLocalization.currentLocaleValue = 'zh-cn'

class Root extends Component {
  state = {
    loading: true
  }
  componentDidMount() {
    loadUserInfo.then(o => {
      this.props.dispatch(actions.fetchSurveyList()).then(res => {
        this.setState({
          loading: false
        })
      })
    })
  }
  handleComplete = e => {
    let value = e.getAllValues()
    let t = Object.keys(value).map(o => {
      let key = o
      let splits = key.split('-')
      let id = splits[0]
      let index = Number(splits[1])
      let v = value[key]
      return {
        id, index, value: v
      }
    })
    t = _.groupBy(t, 'id')
    actions.submit({
      user: userInfo.loginName,
      data: t
    })
  }
  render() {
    const { data } = this.props
    const { loading } = this.state
    return <Layout fullScreen current="survey">
      <PageHeader backIcon={<Icon type="team" style={{ fontSize: 16, color: 'rgba(0,0,0,.65)' }} />} onBack={() => null} title="调查问卷" />
      {
        loading ? <div style={{ textAlign: 'center', padding: 60 }}>
          <Spin tip="正在加载数据..."></Spin>
        </div> :
          <div style={{ margin: 20 }}>
            {
              data.length ? <Survey.Survey onComplete={this.handleComplete} model={survey(data)} /> : <Empty style={{ marginTop: 60 }} description="当前没有数据哦" />
            }
          </div>
      }
    </Layout>
  }
}

export default connect(state => state)(Root)