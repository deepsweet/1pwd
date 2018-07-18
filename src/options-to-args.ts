import decamelize from 'decamelize'

type Options = {
  [key: string]: any
}

const optionsToArgs = (options: Options = {}) =>
  Object.keys(options).reduce((result: string[], rawKey) => {
    const key = decamelize(rawKey, '-')
    const value = options[rawKey]

    if (typeof value === 'boolean') {
      return result.concat(`--${key}`)
    }

    if (typeof value === 'string') {
      return result.concat(`--${key}=${value}`)
    }

    return result
  }, [])

export default optionsToArgs
