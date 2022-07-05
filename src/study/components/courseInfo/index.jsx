import React, { Component, Children } from 'react'
import { Drawer } from 'antd'
import exceed from 'utils/apimap'
import _ from 'lodash'
import Info from 'components/info'
import moment from 'moment'

import './style.scss'

export default class CourseInfo extends Component {
  state = {
    visible: false,
    data: {}
  }
  fetchDetail = () => {
    if (_.isEmpty(this.state.data)) {
      const { id } = this.props
      exceed.fetch({
        api: 'fetchCourseDetail',
        data: {
          courseId: id
        }
      }).then(res => {
        if (res.code === 0) {
          this.setState({
            data: res.body
          })
        }
      })
    }
  }
  showModal = () => {
    this.setState({
      visible: true
    }, this.fetchDetail)
  }
  hideModal = () => {
    this.setState({
      visible: false
    })
  }
  transformUrl(url) {
    return url
  }
  getImgBase64(url) {
    return url + '?spm=a2c4g.11186623.2.1.yjOb8V&x-oss-process=video/snapshot,t_7000,f_jpg,w_400,h_300,m_fast';
  }
  render() {
    const { children, disabled } = this.props
    const { visible, data } = this.state
    return <span>
      <span onClick={this.showModal}>{children}</span>
      <Drawer
        className="course-drawer"
        placement="right"
        closable={false}
        width="340"
        onClose={this.hideModal}
        visible={visible}>
        {
          _.isEmpty(data) ? '' : <div className="flex vertical context">
            <div className="w-img" style={{ backgroundImage: `url(${this.transformUrl(data.coursePic || this.getImgBase64(data.courseVideo))})` }}></div>
            <div className="content">
              <Info type="across" hasBorder theme="dark">
                <Info.Item label="课程名称">{data.courseName}</Info.Item>
                <Info.Item label="课程标题">{data.courseTitle}</Info.Item>
                <Info.Item label="课程编号">{data.courseNumber}</Info.Item>
                <Info.Item label="讲师">{data.courseTeacher}</Info.Item>
                <Info.Item label="学时">{data.coursePeriod}</Info.Item>
                <Info.Item label="学分">{data.courseCredit}</Info.Item>
                <Info.Item label="目标">{data.courseTarget}</Info.Item>
                <Info.Item label="课程简介">{data.courseIntroduce}</Info.Item>
                <Info.Item label="提纲">{data.courseOutline}</Info.Item>
                <Info.Item label="开始时间">{moment(data.courseStarttime).format('YYYY-MM-DD HH:mm:ss')}</Info.Item>
                <Info.Item label="结束时间">{moment(data.courseEndtime).format('YYYY-MM-DD HH:mm:ss')}</Info.Item>
              </Info>
            </div>
          </div>
        }
      </Drawer>
    </span>
  }
}