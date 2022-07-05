import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Layout } from 'components'
import { Icon, Card, Form } from 'antd'
import { initPlayer } from './player'
import PageHeader from 'components/head'
import Info from 'components/info'
import _ from 'lodash'
import querystring from 'query-string'
import axios from 'axios'
import CourseInfo from '../../study/components/courseInfo'
import Progress from './progress'

import './style.scss'

class Root extends Component {
  state = {
    resize: 0
  }
  log = (ended) => e => {
    const { record } = this.props
    if (this.player) {
      let currentTime = this.player.currentTime()
      let length = this.player.duration()
      let postData = {
        userCourseRecordId: record.id,
        type: ended ? 0 : 1,
        userCourseRecordTimeProgress: currentTime,
        userCourseRecordNumberProgress: currentTime / length,
        token: window.token
      }
      axios.get('/api/vrecord?' + querystring.stringify(postData))
      navigator.sendBeacon('/api/vrecord?' + querystring.stringify(postData))
    }
    if (e) {
      e.returnValue = true
    }
  }
  componentDidMount() {
    this.props.dispatch(actions.fetchVideo(query.id))
    window.addEventListener('beforeunload', this.log())
    window.addEventListener('unload', this.log())
  }
  transformUrl(url) {
    return url
  }
  handleTimeUpdate = e => {
    let currentTime = this.player.currentTime()
    let length = this.player.duration()
    this.progress.setPercent(currentTime / length)
  }
  handleEnd = e => {
    this.log(true)(e)
  }
  render() {
    const hasInfo = !_.isEmpty(this.props.video)
    const { video, record = {} } = this.props
    const { courseTitle, courseVideo } = video
    let { userCourseRecordNumberProgress, userCourseRecordNumber, userCourseRecordTimeProgress } = record
    userCourseRecordNumberProgress = Number(userCourseRecordNumberProgress) || 0
    return <Layout fullScreen current="videos">
      <PageHeader onBack={() => window.location.href = '/videos'} title={courseTitle} subTitle={<CourseInfo id={video.id}><a><Icon type="eye" /></a></CourseInfo>} />
      <div className="flex context" style={{ overflow: 'hidden' }}>
        <div className="flex vertical" style={{ width: '100%', overflow: 'hidden' }}>
          <Card bordered={false} className="video-context">
            <div className="m">
              {
                courseVideo && <video
                  ref={ref => {
                    if (ref) {
                      this.player = initPlayer(userCourseRecordTimeProgress, userCourseRecordNumber > 1)
                      this.player.on('timeupdate', this.handleTimeUpdate)
                      this.player.on('ended', this.handleEnd)
                    }
                  }}
                  id="video"
                  poster={"assets/player.jpg"}
                  controlsList="nodownload"
                  className="video-js vjs-big-play-centered"
                  preload="auto"
                  width={document.documentElement.clientWidth}
                  height={document.documentElement.clientHeight - 200}
                  data-setup="{}"
                  controls>
                  <source src={this.transformUrl(courseVideo)} type="video/mp4"></source>
                </video>
              }
            </div>
          </Card>
          <div className="video-info">
            {
              hasInfo ? <div className="flex center">
                <label style={{ width: 60, height: 16 }}>完成度</label>
                <Progress ref={ref => this.progress = ref} value={userCourseRecordNumberProgress} />
              </div> : ''
            }
          </div>
        </div>
      </div>
    </Layout>
  }
}

export default connect(state => state)(Root)