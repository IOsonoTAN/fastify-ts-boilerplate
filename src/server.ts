import fastify from 'fastify'

const server = fastify({
  logger: {
    prettyPrint: true
  }
})

server.get('/ping', async () => 'OK')

export default server