import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Layout } from 'components'
import { Comment, Avatar, Spin, Button, List, Input, Icon } from 'antd'
import PageHeader from 'components/head'
import _ from 'lodash'

import './style.scss'

const breadcrumb = [
  {
    text: '论坛'
  }
]
const TextArea = Input.TextArea

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} 条评论`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
)

const Editor = ({
  onChange, onSubmit, submitting, value, disabled
}) => (
    <div>
      <TextArea rows={4} onChange={onChange} value={value} />
      <Button
        disabled={disabled}
        style={{ marginTop: 16, float: 'right', marginBottom: -16 }}
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        发表评论
      </Button>
    </div>
  )

class Root extends Component {
  state = {
    comments: [],
    submitting: false,
    value: ''
  }
  componentDidMount() {
    const { dispatch } = this.props
    loadUserInfo.then(res => {
      dispatch(actions.fetchForumItemData({
        forumId: query.id
      }))
      dispatch(actions.fetchForumComments({
        forumId: query.id
      })).then(() => {
        const { comments } = this.props
        this.setState({
          comments: this.traverseComments(comments)
        })
      })
    })
  }
  handleChange = (e) => {
    this.setState({
      value: e.currentTarget.value
    })
  }
  submitComment = (data) => {
    return new Promise(resolve => {
      if (data.content.length > 0) {
        const { dispatch } = this.props
        dispatch(actions.commentForumItem(data)).then(res => {
          if (res) {
            message.success('发表成功！')
            return resolve(true)
          } else {
            message.error('发表失败，请稍后再试！')
            resolve(false)
          }
        })
      } else {
        message.info('请先评论后，再发表哦！')
        resolve(false)
      }
    })
  }
  handleSubmit = (data) => {
    this.submitComment({
      forumId: query.id,
      content: this.state.value,
      commentPid: query.id
    }).then(r => {
      if (r) {
        this.setState({
          value: ''
        })
      }
    })
  }
  handleReply = obj => e => {
    this.replyId = obj.id
    this.setState({
      comments: this.traverseComments(this.props.comments)
    })
  }
  handleBlur = obj => () => {
    this.replyId = ''
    this.setState({
      comments: this.traverseComments(this.props.comments)
    })
  }
  handlePressEnter = obj => e => {
    e.stopPropagation()
    e.preventDefault()
    this.submitComment({
      forumId: query.id,
      content: e.currentTarget.value,
      commentPid: obj.id
    }).then(r => {
      if (r) this.replyId = ''
    })
  }
  traverseComments(comments) {
    return comments.map(o => {
      const reply = this.replyId === o.id ? <div>
        <TextArea ref={ref => {
          if (ref) {
            ref.textAreaRef.focus()
          }
        }} onPressEnter={this.handlePressEnter(o)} prefix={`回复：${o.userName}`}></TextArea>
        <div style={{ marginTop: 4, fontSize: 13 }}>按回车键提交</div>
      </div> : <span onClick={this.handleReply(o)} style={{ fontSize: 12 }}>回复 <author>{o.userName}</author></span>
      return <Comment
        author={o.userName}
        datetime={moment(o.replyTime).fromNow()}
        content={o.content}
        actions={userInfo.role > 0 && [reply]}
        avatar={<Avatar size={40} className="comment-avatar flex inline center" src={'/assets/head.jpg'}>
          {o.userName.substr(0, 1)}
        </Avatar>}
      >
        {
          this.traverseComments(o.replyList || [])
        }
      </Comment>
    })
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.comments, this.props.comments)) {
      this.setState({
        comments: this.traverseComments(nextProps.comments)
      })
    }
  }
  render() {
    const { detail } = this.props
    const { submitting, value, comments } = this.state
    return <Layout fullScreen breadcrumb={breadcrumb} current="forum">
      <PageHeader onBack={() => window.location.href = '/forum'} title={detail && detail.forumTitle} subTitle={detail && detail.forumtStatus !== '0' &&
        <a href={`/forum/send?id=${detail.id}`}><Icon title="重新编辑" type="edit" /></a>} />
      {
        detail ?
          <div>
            <div className="context">
              <div className="content" dangerouslySetInnerHTML={{ __html: detail.forumContent }}></div>
              <div className="sub-title">
                <time>发布于：{moment(detail.updateDate || detail.createDate || new Date()).fromNow()}</time>
                <span style={{ marginLeft: 20, display: detail.forumtKeyword ? 'inline-block' : 'none' }}>关键字：{detail.forumtKeyword}</span>
              </div>
            </div>
            <div className="comments-context">
              {
                userInfo.role > 0 ? <Comment
                  className="comment-box"
                  avatar={false}
                  content={(
                    <Editor
                      disabled={detail && detail.forumtStatus !== '0'}
                      onChange={this.handleChange}
                      onSubmit={this.handleSubmit}
                      submitting={submitting}
                      value={value}
                    />
                  )}
                /> : ''
              }
              {comments.length > 0 && comments}
            </div>
          </div> : <div className="context" style={{ textAlign: "center", height: 200, lineHeight: '200px' }}>
            <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}></Spin>
          </div>
      }
    </Layout>
  }
}

export default connect(state => state)(Root)