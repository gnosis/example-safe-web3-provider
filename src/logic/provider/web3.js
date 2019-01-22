import Web3 from 'web3'
import SafeProvider from 'safe-web3-provider'
import promisify from '~/utils/promisify'

let web3

window.addEventListener('load', async () => {
  loadWeb3Provider()
  console.log('Loaded injected web3 provider')
})

export const getWeb3Provider = () => web3

export const loadWeb3Provider = async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    web3 = new Web3(window.ethereum)
    try {
      // Request account access if needed
      const enabled = await window.ethereum.enable()
      if (enabled) {
        // Acccounts now exposed
        console.log('Provider enabled.', enabled)
      } else {
        console.log('Provider not enabled.')
      }
    } catch (error) {
      console.log(error)
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use provider.
    web3 = window.web3
    console.log('Injected web3 detected.')
  }
  // Fallback to localhost use dev console port by default...
  else {
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
    web3 = new Web3(provider)
    console.log('No web3 instance injected, using local provider.')
  }
  console.log('INJECTED PROVIDER:', web3)
}

export const loadSafeWeb3Provider = () => {
  const provider = SafeProvider({
    rpcUrl: 'https://rinkeby.infura.io/'
  })
  web3 = new Web3(provider)
  console.log('LOCAL PROVIDER:', web3)
  return web3
}

export const getWeb3ProviderData = async () => {
  if (web3) {
    const networkId = await promisify(cb => web3.version.getNetwork(cb))
    const [account] = await promisify(cb => web3.eth.getAccounts(cb))
    let ethBalance = undefined
    if (account) {
      const balance = await promisify(cb => web3.eth.getBalance(account, cb))
      ethBalance = web3.fromWei(balance, 'ether')
    }
    return { networkId, account, ethBalance }
  }
  return { networkId: null, account: null, ethBalance: null }
}
