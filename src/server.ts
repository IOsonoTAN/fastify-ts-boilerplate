import fastify, { FastifyInstance } from 'fastify'
import { swagger } from './configs'
import { publicServices } from './services'

const server: FastifyInstance = fastify({
  disableRequestLogging: true,
  logger: {
    prettyPrint: true
  }
})

/**
 * Plugins
 */
swagger(server)

/**
 * Services
 */
publicServices(server)

/**
 * Hooks and handlers
 */
server.setErrorHandler((error, request, reply) => {
  const errorObject = {
    error: {
      code: error.code || '',
      message: error.message,
      statusCode: error.statusCode,
    }
  }

  request.log.error(errorObject)
  reply
    .type('application/json')
    .code(error.statusCode || 500)
    .send(errorObject)
})

export default server