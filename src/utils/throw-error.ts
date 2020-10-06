class ThrowError extends Error {
  code?: string | undefined
  statusCode?: number | undefined

  constructor(
    message: string,
    code?: string,
    statusCode?: number
  ) {
    super(message)

    this.code = code
    this.statusCode = statusCode

    Object.setPrototypeOf(this, ThrowError.prototype)
  }
}

interface optionProps {
  message: string
  code?: string | undefined
  statusCode?: number | undefined
}

const throwError = (options: optionProps): ThrowError => {
  const {
    message,
    code,
    statusCode
  } = options

  const error = new ThrowError(message)
  error.code = code
  error.statusCode = statusCode

  throw error
}

export default throwError