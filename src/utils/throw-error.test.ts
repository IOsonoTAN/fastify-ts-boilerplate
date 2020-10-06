import throwError from './throw-error'

describe('utils throw error', () => {
  test('response correct error object', async (done) => {
    const errorObject = {
      message: 'Test Message',
      code: '0000',
      statusCode: 500
    }

    try {
      throwError(errorObject)
    } catch (error) {
      expect(error.message).toBe(errorObject.message)
      expect(error.code).toBe(errorObject.code)
      expect(error.statusCode).toBe(errorObject.statusCode)
    }

    done()
  })
})