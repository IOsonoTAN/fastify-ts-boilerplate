import { FastifyInstance } from 'fastify'
import fastifySwagger from 'fastify-swagger'

export default (server: FastifyInstance) => {
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
}