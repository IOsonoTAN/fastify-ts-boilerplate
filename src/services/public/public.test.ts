import server from '../../server'

describe('server public endpoints', () => {
  afterAll(() => {
    server.close()
  })

  test('responds with success on request /', async (done) => {
    const response = await server.inject({
      method: 'GET',
      url: '/'
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      name: process.env.npm_package_name,
      version: process.env.npm_package_version
    })
    done()
  })

  test('responds with success on request /ping', async (done) => {
    const response = await server.inject({
      method: 'GET',
      url: '/ping'
    })

    expect(response.statusCode).toBe(200)
    expect(response.payload).toBe('OK')
    done()
  })
})