import fastify from 'fastify'
import { errors } from './configs'
import { throwError } from './utils'

const server = fastify({
  disableRequestLogging: true,
  logger: {
    prettyPrint: true
  }
})

server.get('/', async () => ({
  name: process.env.npm_package_name,
  version: process.env.npm_package_version
}))
server.get('/ping', async () => 'OK')

server.get('/error', async () => (
  throwError({
    ...errors.unauthorized,
    data: {
      errorType: 'example_error'
    }
  })
))

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