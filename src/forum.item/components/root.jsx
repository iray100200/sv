import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Layout } from 'components'
import mock, { comments } from './mock'
import { Comment, Avatar, Form, Button, List, Input } from 'antd'

import './style.scss'

const breadcrumb = [
  {
    text: '论坛'
  }
]
const TextArea = Input.TextArea

const CommentList = ({ comments }) => (
  <List
    dataSource={ comments }
    header={ `${comments.length} 条评论` }
    itemLayout="horizontal"
    renderItem={ props => <Comment { ...props } /> }
  />
)

const Editor = ({
  onChange, onSubmit, submitting, value,
}) => (
    <div>
      <TextArea rows={ 4 } onChange={ onChange } value={ value } />
      <Button
        style={ { marginTop: 16 } }
        htmlType="submit"
        loading={ submitting }
        onClick={ onSubmit }
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
    this.props.dispatch(actions.fetchForumComments({
      forumId: query.id
    }))
  }
  handleChange = () => {

  }
  handleSubmit = () => {

  }
  render() {
    const { submitting, value } = this.state
    return <Layout fullScreen breadcrumb={ breadcrumb } current="forum">
      <div className="context">
        <h1>{ mock.title }</h1>
        <time>发布于：{ new Date().toLocaleDateString() }</time>
        <div className="content" dangerouslySetInnerHTML={ { __html: mock.content } }></div>
      </div>
      <div className="comments-context">
        <Comment
          className="comment-box"
          avatar={ false }
          content={ (
            <Editor
              onChange={ this.handleChange }
              onSubmit={ this.handleSubmit }
              submitting={ submitting }
              value={ value }
            />
          ) }
        />
        { comments.length > 0 && <CommentList comments={ comments } /> }
      </div>
    </Layout>
  }
}

export default connect(state => state)(Root)