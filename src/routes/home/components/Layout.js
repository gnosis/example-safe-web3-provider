import React from 'react'

const Layout = ({
  provider,
  getNetworkName
}) => (
  <React.Fragment>
    <h1>My account:</h1>
    Account: {provider.account}
    <br />
    Balance: {provider.ethBalance && (provider.ethBalance + ' ETH')}
    <br />
    Network: {getNetworkName(provider.networkId)}
  </React.Fragment>
)

export default Layout
