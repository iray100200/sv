import React, { Component } from 'react'
import { Card, List } from 'antd'
import exceed from 'utils/apimap'
import querystring from 'query-string'
import { PieChart, Pie, Legend, Cell } from 'recharts'

import './style.scss'

const { id } = querystring.parse(location.search)

function fetchResult() {
  return exceed.fetch({
    api: 'fetchSurveyResultById',
    data: {
      id
    }
  })
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default class Root extends Component {
  state = {
    model: {}
  }
  componentDidMount() {
    fetchResult().then(res => {
      this.setState({
        model: res
      })
    })
  }
  get commentModel() {
    return Object.values(this.state.model).filter(o => o.type === 3).map(o => {
      return {
        title: o.title,
        list: o.data
      }
    })
  }
  get chartsModel() {
    return Object.values(this.state.model).filter(o => o.type < 3).map(o => {
      return {
        title: o.title,
        data: o.data.map(o => {
          return {
            name: o.option,
            value: o.count
          }
        })
      }
    })
  }
  render() {
    const { model } = this.state
    return <div className="context">
      {
        this.chartsModel.map(o => {
          return <Card size="small" title={o.title}>
            <PieChart width={500} height={250}>
              <Legend layout="vertical" align="right" iconType="circle" iconSize="6" />
              <Pie data={o.data} dataKey="value" nameKey="name" fill="#8884d8" label>
                {
                  o.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
              </Pie>
            </PieChart>
          </Card>
        })
      }
      {
        this.commentModel.map(o => {
          return <List
            size="small"
            header={o.title}
            bordered
            dataSource={o.list}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        })
      }
    </div>
  }
}