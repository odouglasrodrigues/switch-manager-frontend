import { boot } from 'quasar/wrappers'
import {io} from 'socket.io-client'

const host = process.env.HOST || '192.168.0.43'
const socket = io(`http://${host}:5000`)
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$socket

  app.config.globalProperties.$socket = socket
  // ^ ^ ^ this will allow you to use this.$socket (for Vue Options API form)
})

export { socket }
