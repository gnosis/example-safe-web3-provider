import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getNetworkName } from '~/utils/helpers'
import Layout from '../components/Layout'
import selector from './selector'

class Home extends Component {
  render = () => {
    const { provider } = this.props
    return (
      <Layout
        provider={provider}
        getNetworkName={getNetworkName}
      />
    )
  }
}

export default connect(
  selector
)(Home)
