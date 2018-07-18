import test from 'tape-promise/tape'
import { mock } from 'mocku'
import { createSpy, getSpyCalls } from 'spyfn'

test('getTotp', async (t) => {
  const opSpy = createSpy(() => Promise.resolve('123456'))

  mock('../src/', {
    './op': {
      default: opSpy
    }
  })

  const { getTotp } = await import('../src/')
  const result = await getTotp('foo')

  t.deepEqual(
    getSpyCalls(opSpy),
    [[['get', 'totp', 'foo']]],
    'should spawn `op` child process with necessary args'
  )

  t.equal(
    result,
    '123456',
    'should return a TOTP'
  )
})
