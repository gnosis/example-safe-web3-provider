export const getNetworkName = (networkId) => {
  switch (networkId) {
    case '1':
      return 'Mainnet'
    case '4':
      return 'Rinkeby'
    default:
      return 'Unknown network'
  }
}
