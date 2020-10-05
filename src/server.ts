import fastify from 'fastify'
import { swagger } from './configs'
import { rootServices } from './services'

const server = fastify({
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
rootServices(server)

/**
 * Hooks and handlers
 */
server.setErrorHandler((error, request, reply) => {
  const errorObject = {
    error: {
      code: error.code || '',
      message: error.message,
      statusCode: error.statusCode,
      // @ts-ignore
      data: error.data
    }
  }

  request.log.error(errorObject)
  reply
    .type('application/json')
    .code(error.statusCode || 500)
    .send(errorObject)
})

export default server