import React from 'react'

const Layout = ({
  children,
  connected,
  connectSafeWeb3Provider,
  connectProvider,
  sendTransaction
}) => (
  <React.Fragment>
    <div>
      <br />
      <div>
        This button will ensure the use of the Safe Web3 Provider. Remember to whitelist this Dapp in your Safe Browser Extension.
        <br />
        <button onClick={connectSafeWeb3Provider}>Connect to Gnosis Safe</button>
      </div>
      <br /><br />
      <div>
        This button will use the first injected provider. Remember to whitelist this Dapp if you are only using the Safe Browser Extension.
        <br />
        <button onClick={connectProvider}>Connect to injected provider</button>
      </div>
      <br /><br />
      <div>
        Make a transaction
        <br />
        <button disabled={!connected} onClick={sendTransaction}>Send 0.01 ETH</button>
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
