import { createStructuredSelector } from 'reselect'
import { providerSelector } from '~/logic/provider/store/selectors'

export default createStructuredSelector({
  provider: providerSelector
})
