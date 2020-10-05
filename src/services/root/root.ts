import { FastifyInstance } from 'fastify'
import { errors } from '../../configs'
import { throwError } from '../../utils'

const rootServices = (server: FastifyInstance): FastifyInstance => {
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

  return server
}

export default rootServices