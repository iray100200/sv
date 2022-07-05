import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Layout } from 'components'
import { List, Avatar, Card, Button, message, Icon, Spin } from 'antd'
import moment from 'moment'
import ReactQuill from 'react-quill'
import * as Service from '../service'
import ContentEditable from 'react-contenteditable'
import PageHeader from 'components/head'
import toolbar from './toolbar'
import exceed from 'utils/apimap'

import './style.scss'
import 'react-quill/dist/quill.snow.css'

const breadcrumb = [
  { text: '论坛' },
  { text: '发帖' }
]

const modules = toolbar

class Root extends Component {
  state = {
    title: '',
    content: '',
    keywords: '',
    loading: false,
    submitting: false
  }
  componentDidMount() {
    const { dispatch } = this.props
    if (query.id) {
      this.setState({
        loading: true
      })
      exceed.fetch({
        api: 'fetchForumItemData',
        data: {
          forumId: query.id
        }
      }).then(res => {
        if (res.code === 0) {
          let detail = res.body
          this.setState({
            title: detail.forumTitle,
            content: detail.forumContent,
            keywords: detail.forumtKeyword
          }, () => {
            this.setState({
              loading: false
            })
          })
        } else {
          message.info('加载失败')
          this.setState({
            loading: false
          })
        }
      }).catch(() => {
        message.info('加载失败')
        this.setState({
          loading: false
        })
      })
    }
  }
  handleChange = content => {
    this.setState({
      content
    })
  }
  handleSubmit = () => {
    let { title, content, keywords } = this.state
    if (!title) {
      message.warn('请输入标题')
      return
    }
    if (!content) {
      message.warn('请输入帖子内容')
    }
    this.setState({
      submitting: true
    })
    Service.postForumData({
      forumId: query.id, title, content, keywords
    }).then(res => {
      if (res.code === 0) {
        message.success('发布成功')
        setTimeout(() => {
          location.href = `/forum/item?id=${res.body}`
        }, 2000)
      } else {
        this.setState({
          submitting: false
        })
      }
    }).catch(() => {
      this.setState({
        submitting: false
      })
    })
  }
  render() {
    return <Layout fullScreen breadcrumb={breadcrumb} current="forum">
      <PageHeader
        backIcon={query.id ? <Icon type="form" /> : ''}
        onBack={query.id ? () => null : () => window.location.href = '/forum'}
        title={'编辑器'}
        subTitle={<Button disabled={this.state.submitting} type="link" onClick={this.handleSubmit}><span style={{ fontWeight: 'bold', fontSize: 15 }}>发布帖子&nbsp;<Icon type="arrow-right" /></span></Button>} />
      <div style={{ padding: 20 }}>
        <Spin spinning={this.state.loading}>
          <div className="flex top">
            <ContentEditable
              className="auto"
              style={{ marginBottom: 8 }}
              innerRef={this.contentEditable}
              placeholder="在此处输入标题"
              html={this.state.title}
              disabled={false}
              onChange={e => {
                this.setState({
                  title: e.currentTarget.textContent
                })
              }}
              tagName='h1'
            />
          </div>
          <ReactQuill
            theme="snow"
            modules={modules}
            value={this.state.content}
            placeholder="在此处输入帖子内容"
            onChange={this.handleChange} />
          <ContentEditable
            className="content-input"
            style={{ marginTop: 8 }}
            innerRef={this.contentEditable}
            placeholder="关键字"
            html={this.state.keywords}
            disabled={false}
            onChange={e => {
              this.setState({
                keywords: e.currentTarget.textContent
              })
            }}
            tagName='h4'
          />
        </Spin>
      </div>
    </Layout>
  }
}

export default connect(state => state)(Root)