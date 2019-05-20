import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Layout } from 'components'
import { Tree, BackTop, Input, Icon } from 'antd'
import MarkDown from 'react-markdown'
import PageHeader from 'components/head'

const breadcrumb = [
  {
    text: '电子丛书'
  }
]
const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
}

import './style.scss'

class Root extends Component {
  render() {
    return <Layout current="knowledge" fullScreen breadcrumb={ breadcrumb }>
      <PageHeader backIcon={ <Icon type="read" style={ { fontSize: 16, color: 'rgba(0,0,0,.65)' } } /> } onBack={ () => null } title="知识库" subTitle={ <Input.Search className="input-search" style={ { width: 260 } } placeholder="搜索文档" onChange={ this.onChange } /> } />
      <div className="flex books-context">
        <div style={ { display: 'block' } } className="left-tree">
          <Tree.DirectoryTree
            defaultExpandAll
            showLine
            defaultExpandedKeys={ ['0-0-0'] }
            onSelect={ this.onSelect }
          >
            <Tree.TreeNode title="技术文档" key="0-0">
              <Tree.TreeNode title="法律" key="0-0-0">
                <Tree.TreeNode title="道路" key="0-0-0-0" isLeaf />
                <Tree.TreeNode title="交通" key="0-0-0-1" isLeaf />
                <Tree.TreeNode title="刑法" key="0-0-0-2" isLeaf />
              </Tree.TreeNode>
              <Tree.TreeNode title="哲学" key="0-0-1">
                <Tree.TreeNode title="道理" key="0-0-1-0" isLeaf />
              </Tree.TreeNode>
              <Tree.TreeNode title="计算机" key="0-0-2">
                <Tree.TreeNode title="WEB前端" key="0-0-2-0" isLeaf />
                <Tree.TreeNode title="Java" key="0-0-2-1" isLeaf />
              </Tree.TreeNode>
            </Tree.TreeNode>
          </Tree.DirectoryTree>
        </div>
        <BackTop target={ () => document.querySelector('.md') } />
        <div className="auto md">
          <MarkDown source={ require('./mock.md').default }></MarkDown>
        </div>
      </div>
    </Layout>
  }
}

export default connect(state => state)(Root)