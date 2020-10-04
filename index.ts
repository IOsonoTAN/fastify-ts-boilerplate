import server from './src/server'

server.listen(3000, (error) => {
  if (error) {
    server.log.error(error)
    process.exit(1)
  }
})