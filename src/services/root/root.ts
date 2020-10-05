import { FastifyInstance } from 'fastify'

const rootServices = (server: FastifyInstance) => {
  server.get('/', {
    schema: {
      description: 'An endpoint to get project/package info',
      response: {
        200: {
          type: 'object',
          properties: {
            name: { type: 'string', example: process.env.npm_package_name },
            version: { type: 'string', example: process.env.npm_package_version },
            test: { type: 'string' }
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