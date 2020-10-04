import server from './server'

describe('server test', () => {
  afterAll(() => {
    server.close()
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