import React, { Component } from 'react'
import { Table, Button, Switch, Icon, Modal } from 'antd'
import exceed from 'utils/apimap'

import './style.scss'

class Root extends Component {
  state = {
    list: []
  }
  componentDidMount() {
    this.fetchList()
  }
  fetchList = () => {
    exceed.fetch({
      api: 'fetchAllSurveyList'
    }).then(res => {
      this.setState({
        list: res
      })
    })
  }
  create = () => {
    window.location.href = '/admin/survey/edit'
  }
  handleRemove = (id, name) => () => {
    Modal.confirm({
      title: '删除',
      content: '是否要删除' + name,
      okText: "继续删除",
      cancelText: '取消',
      onOk: () => {
        exceed.fetch({
          api: 'removeSurveyItem',
          data: {
            id
          }
        }).then(res => {
          if (res.code === 0) {
            this.fetchList()
          }
        })
      }
    })
  }
  render() {
    const { list } = this.state
    return <div style={{ padding: 20 }}>
      <Button onClick={this.create} type="primary">新建问卷调查</Button>
      <Table bordered size="small" dataSource={list} style={{ marginTop: 20 }}>
        <Table.Column dataIndex="name" width={200} title="问卷标题" />
        <Table.Column align="center" dataIndex="enabled" width={150} title="是否启用" render={v => {
          return <Switch disabled checked={v}></Switch>
        }} />
        <Table.Column align="center" dataIndex="_id" width={120} title={<span>统计分析&nbsp;&nbsp;<Icon type="dashboard" /></span>} render={v => {
          return <a target="_blank" href={`/admin/survey/result?id=${v}`}>查看统计</a>
        }} />
        <Table.Column align="center" dataIndex="_id" width={120} title={<span>修改&nbsp;&nbsp;<Icon type="form" /></span>} render={v => {
          return <a target="_blank" href={`/admin/survey/edit?id=${v}`}>编辑</a>
        }} />
        <Table.Column align="center" dataIndex="_id" width={120} title={<span>删除&nbsp;&nbsp;<Icon type="delete" /></span>} render={(v, o) => {
          return <a onClick={this.handleRemove(v, o.name)}>删除</a>
        }} />
      </Table>
    </div>
  }
}

export default Root