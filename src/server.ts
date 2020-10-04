import fastify from 'fastify'
import { errors } from './configs'
import { throwError } from './utils'

const server = fastify({
  logger: {
    prettyPrint: true
  }
})

server.get('/ping', async () => 'OK')

server.get('/error', async () => {
  throwError({
    ...errors.unauthorized,
    data: {
      errorType: 'example_error'
    }
  })
})

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
  reply
    .type('application/json')
    .code(error.statusCode || 500)
    .send(errorObject)
})

export default server