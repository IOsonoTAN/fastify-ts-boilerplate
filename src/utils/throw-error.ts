class ThrowError extends Error {
  code?: string | undefined
  statusCode?: number | undefined
  data?: object | undefined

  constructor(
    message: string,
    code?: string,
    statusCode?: number,
    data?: object
  ) {
    super(message)

    this.code = code
    this.statusCode = statusCode
    this.data = data

    Object.setPrototypeOf(this, ThrowError.prototype)
  }
}

interface optionProps {
  message: string
  code?: string | undefined
  statusCode?: number | undefined
  data?: object | undefined
}

const throwError = (options: optionProps) => {
  const {
    message,
    code,
    statusCode,
    data = {}
  } = options

  const error = new ThrowError(message)
  error.code = code
  error.statusCode = statusCode
  error.data = data

  throw error
}

export default throwError