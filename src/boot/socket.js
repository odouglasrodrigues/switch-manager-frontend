import { boot } from 'quasar/wrappers'
import {io} from 'socket.io-client'


const socket = io('http://localhost:5000')
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$socket

  app.config.globalProperties.$socket = socket
  // ^ ^ ^ this will allow you to use this.$socket (for Vue Options API form)
})

export { socket }
