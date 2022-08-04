import { boot } from 'quasar/wrappers'
import {io} from 'socket.io-client'

const host = process.env.HOST_SOCKET || 'http://localhost:5000'
const socket = io(`${host}`)
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$socket

  app.config.globalProperties.$socket = socket
  // ^ ^ ^ this will allow you to use this.$socket (for Vue Options API form)
})

export { socket }
