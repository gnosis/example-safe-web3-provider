import React, { Component } from 'react'
import { connect } from 'react-redux'

import promisify from '~/utils/promisify'
import { getWeb3Provider, getWeb3ProviderData, loadWeb3Provider, loadSafeWeb3Provider } from '~/logic/provider/web3'
import actions from './actions'
import selector from './selector'
import Layout from './component/Layout'

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signature: undefined
    }
  }

  componentDidMount = async () => {
    const { onUpdateProvider } = this.props

    let provider = await getWeb3ProviderData()
    onUpdateProvider(provider.networkId, provider.account, provider.ethBalance)

    this.intervalId = setInterval(async () => {
      const newProvider = await getWeb3ProviderData()
      if (JSON.stringify(provider) !== JSON.stringify(newProvider)) {
        onUpdateProvider(newProvider.networkId, newProvider.account, newProvider.ethBalance)
        provider = newProvider
        console.log('NEW PROVIDER:', provider)
      }
    }, 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalId)
  }

  connectProvider = async (e) => {
    await loadWeb3Provider()
  }

  isProviderUsable = () => {
    const { provider } = this.props
    return provider.account ? true : false
  }

  sendTransactionPromise = (web3Provider, from, to, value) => {
    return new Promise ((resolve, reject) => {
      web3Provider.eth.sendTransaction({ from, to, value }, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
  }

  sendTransaction = async () => {
    try {
      const web3 = getWeb3Provider()
      const [account] = await promisify(cb => web3.eth.getAccounts(cb))
      const val = web3.toWei('0.01', 'ether')
      const transactionHash = await this.sendTransactionPromise(web3, account, account, val)
      console.log('Transaction hash:', transactionHash)
    } catch (error) {
      console.log(error)
    }
  }

  signTypedData = () => {
    const web3 = getWeb3Provider()
    this.setState({ signature: undefined })

    const msgParams = JSON.stringify({
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" }
        ],
        Person: [
          { name: "name", type: "string" },
          { name: "wallet", type: "address" }
        ],
        Mail: [
          { name: "from", type: "Person" },
          { name: "to", type: "Person" },
          { name: "contents", type: "string" }
        ]
      },
      primaryType: "Mail",
      domain: { name: "Ether Mail", version: "1", chainId: 1, verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC" },
      message: {
        from: { name: "Cow", wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826" },
        to: { name: "Bob", wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB" },
        contents: "Hello, Bob!"
      }
    })

    const from = web3.eth.accounts[0]
    const params = [from, msgParams]
    const method = 'wallet_signTypedData'
    console.log(params)

    const self = this
    web3.currentProvider.sendAsync({
      method,
      params,
      from,
    }, (err, result) => {
      if (err) {
        console.log(err)
        return
      }
      self.setState({ signature: JSON.stringify(result.result) })
    })
  }

  render = () => {
    const { children } = this.props
    const { signature } = this.state
    const connected = this.isProviderUsable()

    return (
      <Layout
        children={children}
        connected={connected}
        connectSafeWeb3Provider={loadSafeWeb3Provider}
        connectProvider={this.connectProvider}
        sendTransaction={this.sendTransaction}
        signTypedData={this.signTypedData}
        signature={signature}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateProvider: (networkId, account, ethBalance) =>
      dispatch(actions.updateProvider(networkId, account, ethBalance))
  }
}

export default connect(
  selector,
  mapDispatchToProps
)(Page)
