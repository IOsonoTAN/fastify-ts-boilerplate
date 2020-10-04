import server from './src/server'
import { environments } from './src/configs'

server.listen(environments.port, (error) => {
  if (error) {
    server.log.error(error)
    process.exit(1)
  }
})