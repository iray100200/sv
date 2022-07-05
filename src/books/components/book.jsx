import React, { Component } from 'react'
import { Document, Page } from 'react-pdf/dist/entry.webpack'
import { Icon, Spin, Empty } from 'antd'
import 'react-pdf/dist/Page/AnnotationLayer.css'

import './book.less'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
}

export default class Book extends Component {
  state = {
    numPages: null,
    zoomLevel: 1,
    loading: true,
    failed: false
  }
  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0],
      loading: true
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url) {
      this.setState({
        loading: true,
        numPages: null
      })
    }
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({
      numPages,
      loading: false,
      failed: false
    })
  }

  handleZoomOut = () => {
    let { zoomLevel } = this.state
    let newZoomLevel = zoomLevel + 0.2
    if (newZoomLevel <= 2) {
      this.setState({
        zoomLevel: newZoomLevel
      })
    }
  }

  handleZoomIn = () => {
    let { zoomLevel } = this.state
    let newZoomLevel = zoomLevel - 0.2
    if (newZoomLevel >= 1) {
      this.setState({
        zoomLevel: newZoomLevel
      })
    }
  }

  handleDocumentLoadError = () => {
    this.setState({
      numPages: 0,
      loading: false,
      failed: true
    })
  }

  render() {
    const { numPages, loading, failed } = this.state
    const { url } = this.props
    if (!url) return null
    return (
      <div className="book__container__document">
        <Spin indicator={antIcon} spinning={loading}>
          <Document
            error={<Empty style={{ marginTop: 40 }} description="获取失败" />}
            loading={loading}
            renderMode="svg"
            file={url}
            onLoadError={this.handleDocumentLoadError}
            onLoadSuccess={this.onDocumentLoadSuccess}
            options={options}
          >
            {
              Array.from(
                new Array(numPages),
                (el, index) => (
                  <Page
                    scale={1 * this.state.zoomLevel}
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                  />
                ),
              )
            }
          </Document>
        </Spin>
        {
          !failed &&
          <div className="tool-bar">
            <Icon type="plus" onClick={this.handleZoomOut} />
            <Icon type="minus" onClick={this.handleZoomIn} />
          </div>
        }
      </div>
    )
  }
}
