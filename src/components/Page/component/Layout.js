import React from 'react'

const Layout = ({
  children,
  connected,
  connectSafeWeb3Provider,
  connectProvider,
  sendTransaction,
  signTypedData,
  signature
}) => (
  <React.Fragment>
    <div>
      <br />
      Remember to whitelist this Dapp in your Safe Browser Extension.
      <div>
        <h3>Connect to provider:</h3>
        <button onClick={connectSafeWeb3Provider}>Local Gnosis Safe provider</button>
        <br /><br />
        <button onClick={connectProvider}>First injected provider</button>
      </div>
      <br />
      <div>
        <h3>Make a transaction:</h3>
        <button disabled={!connected} onClick={sendTransaction}>Send 0.01 ETH</button>
      </div>
      <br />
      <div>
        <h3>Sign typed data:</h3>
        <button disabled={!connected} onClick={signTypedData}>Sign typed data</button>
        <br/>
        Wallet signature:
        <div style={{wordBreak:'break-all'}}>{signature}</div>
      </div>
    </div>
    {connected &&
      <div>
        {children}
      </div>
    }
  </React.Fragment>
)

export default Layout
