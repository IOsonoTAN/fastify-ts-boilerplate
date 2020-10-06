import { FastifyRequest, FastifyReply } from 'fastify'

interface HomeEndpointResponse {
  name: string,
  version: string,
}

export const homeEndpoint = async (request: FastifyRequest, reply: FastifyReply): Promise<HomeEndpointResponse> => {
  return {
    name: process.env.npm_package_name || 'Empty Package Name',
    version: process.env.npm_package_version || 'Empty Package Version'
  }
}

export default {
  homeEndpoint
}