import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ExamTimeOut extends Component {
  render() {
    return (
      <div>ExamTimeOut</div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ExamTimeOut)