import execa from 'execa'

import optionsToArgs from '../options-to-args'

const errorRegexp = /^\[LOG\].+?\(ERROR\)\s(.+)$/

export type OpOptions = {
  [key: string]: any
}

const op = async (commands: string[], options?: OpOptions) => {
  try {
    const { stdout } = await execa('op', [
      ...commands,
      ...optionsToArgs(options)
    ])

    return stdout
  } catch (error) {
    const message = error.stderr.trim()
    const errorMatch = message.match(errorRegexp)

    if (errorMatch !== null) {
      throw new Error(errorMatch[1])
    }

    throw error
  }
}

export default op
