import { UPDATE_PROVIDER } from '~/logic/provider/store/actions'

const initalState = {
  networkId: null,
  account: null,
  ethBalance: null
}

const provider = (state = initalState, action) => {
  switch (action.type) {
    case UPDATE_PROVIDER:
      return {
        networkId: action.networkId,
        account: action.account,
        ethBalance: action.ethBalance
      }

    default:
      return state
  }
}

export default provider
