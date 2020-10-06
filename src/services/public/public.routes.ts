import { FastifyInstance } from 'fastify'
import { errors } from '../../configs'
import { throwError } from '../../utils'
import { homeEndpoint } from './public.modules'

const publicServicesRoutes = (server: FastifyInstance): FastifyInstance => {
  server.get('/', {
    schema: {
      tags: ['Public'],
      description: 'The main endpoint that always response success and some package detail',
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
  }, homeEndpoint)

  server.get('/ping', {
    schema: {
      tags: ['Public'],
      description: 'An endpoint that use for health check',
      response: {
        200: {
          type: 'string',
          description: 'OK'
        }
      }
    }
  }, async () => 'OK')

  server.get('/throw-error', {
    schema: {
      tags: ['Public'],
      description: 'Response with normal error format',
      response: {
        401: {
          $ref: 'Errors#/properties/ResponseError'
        }
      }
    }
  }, async () => {
    throwError(errors.unauthorized)
  })

  return server
}

export default publicServicesRoutes