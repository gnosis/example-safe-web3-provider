# example-safe-web3-provider

This basic project shows an example on how to use the [SafeWeb3Provider](https://github.com/gnosis/safe-web3-provider).

The [Gnosis Safe Authenticator](https://github.com/gnosis/safe-browser-extension) must be installed and configured.

## Installation
Install dependencies
```
npm install
```

## Build
Build files to `./build` folder.
```
npm run build
```

## Usage of the safe-web3-provider
```js
import Web3 from 'web3'
import SafeProvider from 'safe-web3-provider'

/**
 *  Create Safe Provider
 */
const provider = new SafeProvider({
  rpcUrl: 'http://localhost:8545'
})

/**
 *  Create Web3
 */
const web3 = new Web3(provider)

/**
 *  Get Accounts
 */
const accounts = await web3.eth.getAccounts()

/**
 * Send Transaction
 */
const txHash = await web3.eth.sendTransaction(tx)

// ...

```

## Dapp interaction
Dapps like this one must be **whitelisted** in the Gnosis Safe Authenticator in order to have full access to the provider.

**Different situations:**

- **Only Gnosis Safe Authenticator is installed**
	- **Dapp is not whitelisted**
		- *Dapp integrates safe-web3-provider*
			- Dapp is unusable. Local safe-web3-provider is empty (no Safe account data and pop-up never opens).
	- **Dapp is whitelisted**
		- *Dapp integrates safe-web3-provider*
			- safe-web3-provider is injected by default. Local safe-web3-provider can be used if selected.
	
- **Both Gnosis Safe Authenticator and Metamask are installed**
	- **Dapp is not whitelisted**
		- *Metamask is used*
	- **Dapp is whitelisted**
		- *Dapp integrates safe-web3-provider*
			- Local safe-web3-provider is used.
