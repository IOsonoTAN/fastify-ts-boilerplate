import throwError from './throw-error'

describe('utils throw error', () => {
  test('response correct error object', async (done) => {
    const errorObject = {
      message: 'Test Message',
      code: '0000',
      statusCode: 500,
      data: {
        foo: 'bar'
      }
    }

    try {
      throwError(errorObject)
    } catch (error) {
      expect(error.message).toBe(errorObject.message)
      expect(error.code).toBe(errorObject.code)
      expect(error.statusCode).toBe(errorObject.statusCode)
      expect(error.data).toEqual(errorObject.data)
    }

    done()
  })
})