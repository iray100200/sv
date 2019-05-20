import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Layout } from 'components'
import { Icon, Card, Input } from 'antd'
import { initPlayer } from './player'
import PageHeader from 'components/head'

import './style.scss'

const breadcrumb = [{
  text: '在线视频'
}, {
  text: '播单'
}]

class Root extends Component {
  state = {
    resize: 0
  }
  componentDidMount() {
    initPlayer()
    this.props.dispatch(actions.fetchLayout())
  }
  render() {
    let { title = '教学视频A专辑-B' } = this.state
    return <Layout fullScreen current="videos">
      <PageHeader onBack={ () => window.location.href = '/videos' } title={ title } subTitle={ <Input.Search className="input-search" style={ { width: 260 } } placeholder="搜索视频" onChange={ this.onChange } /> } />
      <div className="flex context" style={ { overflow: 'hidden' } }>
        <div className="flex vertical" style={ { width: '100%', overflow: 'hidden' } }>
          <Card bordered={ false } className="video-context">
            <div className="m">
              <video
                id="video"
                poster="assets/player.jpg"
                controlsList="nodownload"
                className="video-js vjs-big-play-centered"
                preload="auto"
                width={ document.documentElement.clientWidth }
                height={ document.documentElement.clientHeight - 200 }
                controls>
                <source src="/assets/test.mp4" type="video/mp4"></source>
              </video>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  }
}

export default connect(state => state)(Root)