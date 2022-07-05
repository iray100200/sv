import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Layout } from 'components'
import { List, Avatar, Card, Input, Button, Tabs, Tag } from 'antd'
import moment from 'moment'

import './style.scss'

moment.locale('zh-cn')
const breadcrumb = [
  { text: '论坛' }
]

function Time(props) {
  return <time className="time-tag">{moment(props.children).startOf('hour').fromNow()}</time>
}

const items = [
  {
    label: '全部帖子',
    key: 0,
    target: 'allData'
  }
  // , {
  //   label: '我发布的',
  //   key: 1,
  //   target: 'myData'
  // }, {
  //   label: '我参与的',
  //   key: 2,
  //   target: 'myJoinedData'
  // }, {
  //   label: '我的待审核项',
  //   key: 3,
  //   target: 'p1Data'
  // }, {
  //   label: '我的审核已通过项',
  //   key: 4,
  //   target: 'p2Data'
  // }, {
  //   label: '我的审核失败项',
  //   key: 5,
  //   target: 'p3Data'
  // }
]

class Root extends Component {
  state = {
    activeKey: 0,
    filtered: [],
    searchKey: ''
  }
  componentDidMount() {
    window.loadUserInfo.then(() => {
      items.forEach(o => this.props.dispatch(actions.fetchForumData(o.key)))
    })
  }
  handleSearch = (v) => {
    if (v) {
      this.setState({
        filtered: this.props.allData.list.filter(o => new RegExp(v, 'gi').test(o.title)),
        activeKey: -2,
        searchKey: v
      })
    } else {
      this.setState({
        filtered: [],
        activeKey: 0,
        searchKey: ''
      })
    }
  }
  handleTabChange = v => {
    this.setState({
      activeKey: v
    })
  }
  get searhResult() {
    return <Tabs.TabPane tab={(
      <span className="inline flex middle">搜索结果<label>（{this.state.filtered.length}）</label></span>)
    } key={'-2'} >
      <List
        pagination
        size="small"
        dataSource={this.state.filtered}
        renderItem={item => (
          <List.Item actions={[<Time>{item.lastUpdateTime}</Time>]}>
            <List.Item.Meta
              avatar={<Avatar style={{ color: '#f56a00' }}>{item.user.substr(0, 1)}</Avatar>}
              title={<a href={`/forum/item?id=${item.id}`}><b>{item.title}</b></a>}
              description={item.description}
            />
            {
              item.keywords && <span className="reply-count"><label>{item.keywords}</label></span>
            }
          </List.Item>
        )} />
    </Tabs.TabPane>
  }
  render() {
    let tabs = items.map(o => {
      let t = this.props[o.target]
      return <Tabs.TabPane tab={(
        <span className="inline flex middle">{o.label}<label>（{t.count || 0}）</label></span>)} key={String(o.key)}>
        <List
          pagination
          size="small"
          dataSource={t.list || []}
          renderItem={item => (
            <List.Item actions={[<Time>{item.lastUpdateTime}</Time>]}>
              <List.Item.Meta
                avatar={<Avatar style={{ color: '#f56a00' }}>{item.user.substr(0, 1)}</Avatar>}
                title={<a href={`/forum/item?id=${item.id}`}><b>{item.title}</b></a>}
                description={item.description}
              />
              <span className="reply-count"><label>{item.keywords}</label></span>
            </List.Item>
          )} />
      </Tabs.TabPane>
    })
    if (this.state.searchKey) {
      tabs = tabs.concat(this.searhResult)
    }
    return <Layout showSearch fullScreen={true} current="forum">
      <div className="head">
        <div className="head-context">
          <div className="forum-btns flex">
            <div className="btns">
              <Input.Search
                placeholder="搜索帖子"
                onSearch={this.handleSearch}
                size="large"
                enterButton
                style={{ width: 240 }}
              />
              {
                userInfo.role > 0 ? <a target="_blank" href="/forum/send">
                  <Button type="primary" style={{ marginLeft: 8 }} size="large">发帖子</Button>
                </a> : ''
              }
            </div>
          </div>
          <h2 className="label">聚焦社区之美</h2>
        </div>
      </div>
      <div className="flex forum-context">
        <Tabs onTabClick={this.handleTabChange} activeKey={String(this.state.activeKey)}>
          {tabs}
        </Tabs>
      </div>
    </Layout>
  }
}

export default connect(state => state)(Root)