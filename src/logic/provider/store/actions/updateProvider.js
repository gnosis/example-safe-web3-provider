export const UPDATE_PROVIDER = 'UPDATE_PROVIDER'

export const updateProvider = (networkId, account, ethBalance) => ({
  type: UPDATE_PROVIDER,
  networkId,
  account,
  ethBalance
})
