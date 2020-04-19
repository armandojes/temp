import { combineReducers } from 'redux'

// reducers
import session from './session'
import items from './items'
import alert from './alert'
import cart from './cart'
import notification from './notification'
import messages from './messages'

const reducer = combineReducers({
  session,
  items,
  alert,
  cart,
  notification,
  messages
})

export default reducer
