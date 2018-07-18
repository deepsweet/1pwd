import test from 'tape-promise/tape'
import { mock } from 'mocku'
import { createSpy, getSpyCalls } from 'spyfn'

class ExecaError extends Error {
  stdout: string
  stderr: string
}

test('op: success', async (t) => {
  const execaSpy = createSpy(() => Promise.resolve({ stdout: 'baz' }))

  mock('../src/', {
    execa: {
      default: execaSpy
    }
  })

  const { op } = await import('../src/')
  const result = await op(['foo', 'bar'])

  t.deepEqual(
    getSpyCalls(execaSpy),
    [['op', ['foo', 'bar']]],
    'should spawn `op` child process with necessary args'
  )

  t.equal(
    result,
    'baz',
    'should return stdout'
  )
})

test('op: external error', async (t) => {
  const error = new ExecaError('external error')

  error.stderr = ''

  mock('../src/', {
    execa: {
      default: () => Promise.reject(error)
    }
  })

  const { op } = await import('../src/')
  try {
    await op(['foo'])
  } catch (error) {
    t.equal(
      error.message,
      'external error',
      'should pass external errors through'
    )
  }
})

test('op: internal error', async (t) => {
  const error = new ExecaError('internal error')

  error.stderr = '[LOG] foo bar (ERROR) internal error stderr'

  mock('../src/', {
    execa: {
      default: () => Promise.reject(error)
    }
  })

  const { op } = await import('../src/')

  try {
    await op(['foo'])
  } catch (error) {
    t.equal(
      error.message,
      'internal error stderr',
      'should handle and format internal errors'
    )
  }
})

test('op: options', async (t) => {
  const execaSpy = createSpy(() => Promise.resolve({ stdout: 'baz' }))

  mock('../src/', {
    execa: {
      default: execaSpy
    }
  })

  const { op } = await import('../src/')
  const result = await op(['foo', 'bar'], {
    foo: 'bar',
    baz: true,
    unknown: 123
  })

  t.deepEqual(
    getSpyCalls(execaSpy),
    [['op', ['foo', 'bar', '--foo=bar', '--baz']]],
    'should spawn `op` child process with necessary args'
  )

  t.equal(
    result,
    'baz',
    'should return stdout'
  )
})
