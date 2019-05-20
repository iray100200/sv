import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Layout } from 'components'
import { List, Avatar, Card, Button, message } from 'antd'
import moment from 'moment'
import ReactQuill from 'react-quill'
import * as Service from '../service'
import ContentEditable from 'react-contenteditable'

import './style.scss'
import 'react-quill/dist/quill.snow.css'

const breadcrumb = [
  { text: '论坛' },
  { text: '发帖' }
]

const modules = {
  toolbar: [
    [
      {
        'header': [1, 2, false]
      }
    ],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { 'list': 'ordered' },
      { 'list': 'bullet' },
      { 'indent': '-1' },
      { 'indent': '+1' }
    ],
    ['link', 'image'],
    [
      {
        'color': ['#19CAAD', '#8CC7B5', '#A0EEE1', '#BEE7E9', '#BEEDC7', '#D6D5B7', '#D1BA74', '#E6CEAC', '#ECAD9E', '#F4606C', '#808080', '#ffffff', '#000000', 'orange']
      }, {
        'background': ['#19CAAD', '#8CC7B5', '#A0EEE1', '#BEE7E9', '#BEEDC7', '#D6D5B7', '#D1BA74', '#E6CEAC', '#ECAD9E', '#F4606C', '#808080', '#ffffff', '#000000', 'orange']
      }
    ],
    ['clean']
  ]
}

class Root extends Component {
  state = {
    title: '',
    content: '',
    keywords: ''
  }
  componentDidMount() {

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
    Service.postForumData({
      title, content, keywords
    }).then(res => {

    })
  }
  render() {
    return <Layout breadcrumb={ breadcrumb } current="forum">
      <div className="flex top">
        <ContentEditable
          className="auto"
          style={ { marginBottom: 8 } }
          innerRef={ this.contentEditable }
          placeholder="请输入标题"
          html={ this.state.title }
          disabled={ false }
          onChange={ e => {
            this.setState({
              title: e.currentTarget.textContent
            })
          } }
          tagName='h1'
        />
        <Button type="primary" onClick={ this.handleSubmit }>发表</Button>
      </div>
      <ReactQuill
        theme="snow"
        modules={ modules }
        value={ this.state.content }
        placeholder="请输入帖子内容"
        onChange={ this.handleChange } />
      <ContentEditable
        className="content-input"
        style={ { marginTop: 8 } }
        innerRef={ this.contentEditable }
        placeholder="请输入关键字"
        html={ this.state.keywords }
        disabled={ false }
        onChange={ e => {
          this.setState({
            keywords: e.currentTarget.textContent
          })
        } }
        tagName='h4'
      />
    </Layout>
  }
}

export default connect(state => state)(Root)