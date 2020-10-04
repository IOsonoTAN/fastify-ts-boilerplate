import fastify from 'fastify'
import fastifySwagger from 'fastify-swagger'
import { errors } from './configs'
import { throwError } from './utils'

const server = fastify({
  disableRequestLogging: true,
  logger: {
    prettyPrint: true
  }
})

server.register(fastifySwagger, {
  swagger: {
    info: {
      title: process.env.npm_package_name || '',
      description: process.env.npm_package_description,
      version: process.env.npm_package_version || ''
    }
  },
  exposeRoute: true
})

server.get('/', {
  schema: {
    description: 'An endpoint to get project/package info',
    response: {
      200: {
        type: 'object',
        properties: {
          name: { type: 'string', example: process.env.npm_package_name },
          version: { type: 'string', example: process.env.npm_package_version }
        }
      }
    }
  }
}, async () => ({
  name: process.env.npm_package_name,
  version: process.env.npm_package_version
}))

server.get('/ping', {
  schema: {
    description: 'An endpoint that use for health check',
    response: {
      200: {
        type: 'string',
        description: 'OK'
      }
    }
  }
}, async () => 'OK')

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