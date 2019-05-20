import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Layout } from 'components'
import { List, Avatar, Card, Input, Button, Tabs } from 'antd'
import moment from 'moment'

import './style.scss'

moment.locale('zh-cn')
const breadcrumb = [
  { text: '论坛' }
]

function Time(props) {
  return <time className="time-tag">{ moment(props.children).startOf('hour').fromNow() }</time>
}

class Root extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchForumData())
  }
  render() {
    let { data } = this.props
    return <Layout showSearch fullScreen={ true } current="forum">
      <div className="head">
        <div className="head-context">
          <ul className="links">
            <li><a>我的待审核项</a></li>
            <li><a>我的审核已通过项</a></li>
            <li><a>我的审核失败项</a></li>
          </ul>
          <div className="forum-btns flex">
            <Input.Search
              placeholder="搜索帖子"
              onSearch={ value => console.log(value) }
              size="large"
              style={ { width: 200 } }
            />
            <a target="_blank" href="/forum/send">
              <Button type="primary" style={ { marginLeft: 8 } } size="large">发帖子</Button>
            </a>
          </div>
          <h2 className="label">聚焦社区之美</h2>
        </div>
      </div>
      <div className="flex forum-context">
        <Tabs>
          <Tabs.TabPane tab="全部帖子" key="1">
            <List
              size="small"
              dataSource={ data }
              renderItem={ item => (
                <List.Item actions={ [<Time>{ item.lastUpdateTime }</Time>] }>
                  <List.Item.Meta
                    avatar={ <Avatar style={ { color: '#f56a00' } }>U</Avatar> }
                    title={ <a href={ `/forum/item?id=${item.id}` }><b>{ item.title }</b></a> }
                    description={ item.description }
                  />
                  <span className="reply-count"><label>{ item.replyCount || 0 }</label></span>
                </List.Item>
              ) } />
          </Tabs.TabPane>
          <Tabs.TabPane tab="我参与的" key="2">
            <List
              size="small"
              dataSource={ data }
              renderItem={ item => (
                <List.Item actions={ [<Time>{ item.lastUpdateTime }</Time>] }>
                  <List.Item.Meta
                    avatar={ <Avatar style={ { color: '#f56a00' } }>U</Avatar> }
                    title={ <a href="/forum/item"><b>{ item.title }</b></a> }
                    description={ item.description }
                  />
                  <span className="reply-count"><label>{ item.replyCount || 0 }</label></span>
                </List.Item>
              ) } />
          </Tabs.TabPane>
          <Tabs.TabPane tab="我发布的" key="3">
            <List
              size="small"
              dataSource={ data }
              renderItem={ item => (
                <List.Item actions={ [<Time>{ item.lastUpdateTime }</Time>] }>
                  <List.Item.Meta
                    avatar={ <Avatar style={ { color: '#f56a00' } }>U</Avatar> }
                    title={ <a href="/forum/item"><b>{ item.title }</b></a> }
                    description={ item.description }
                  />
                  <span className="reply-count"><label>{ item.replyCount || 0 }</label></span>
                </List.Item>
              ) } />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Layout>
  }
}

export default connect(state => state)(Root)