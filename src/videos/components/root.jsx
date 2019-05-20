import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Layout } from 'components'
import PictureCard from 'components/pictureCard'
import { Input, Icon } from 'antd'
import PageHeader from 'components/head'

import './style.scss'

const breadcrumb = [{
  text: '在线视频'
}]

class Root extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchLayout())
  }
  render() {
    return <Layout current="videos" fullScreen>
      <PageHeader backIcon={ <Icon type="play-circle" style={ { fontSize: 16, color: 'rgba(0,0,0,.65)' } } /> } onBack={ () => null } title="在线视频" subTitle={ <Input.Search className="input-search" style={ { width: 260 } } placeholder="搜索视频" onChange={ this.onChange } /> } />
      <div className="context">
        <PictureCard.Container>
          <PictureCard title="教学视频A一" subTitle="1小时" href={ '/videos/play' } />
          <PictureCard title="教学视频A二" subTitle="1小时" href={ '/videos/play' } />
          <PictureCard title="教学视频A三" subTitle="1小时" href={ '/videos/play' } />
          <PictureCard title="教学视频A四" subTitle="1小时" href={ '/videos/play' } />
          <PictureCard title="教学视频A五" subTitle="1小时" href={ '/videos/play' } />
          <PictureCard title="教学视频B一" subTitle="1小时" href={ '/videos/play' } />
          <PictureCard title="教学视频B二" subTitle="1小时" href={ '/videos/play' } />
          <PictureCard title="教学视频B三" subTitle="1小时" href={ '/videos/play' } />
          <PictureCard title="教学视频B一" subTitle="1小时" href={ '/videos/play' } />
          <PictureCard title="教学视频B二" subTitle="1小时" href={ '/videos/play' } />
          <PictureCard title="教学视频B三" subTitle="1小时" href={ '/videos/play' } />
        </PictureCard.Container>
      </div>
    </Layout>
  }
}

export default connect(state => state)(Root)