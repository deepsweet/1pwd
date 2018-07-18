import test from 'tape-promise/tape'
import { mock } from 'mocku'
import { createSpy, getSpyCalls } from 'spyfn'

test('getItem: no options', async (t) => {
  const opSpy = createSpy(() => Promise.resolve('{ "foo": "bar" }'))

  mock('../src/', {
    './op': {
      default: opSpy
    }
  })

  const { getItem } = await import('../src/')
  const result = await getItem('foo')

  t.deepEqual(
    getSpyCalls(opSpy),
    [[['get', 'item', 'foo'], undefined]],
    'should spawn `op` child process with necessary args'
  )

  t.deepEqual(
    result,
    { foo: 'bar' },
    'should return an item JSON'
  )
})

test('getItem: options', async (t) => {
  const opSpy = createSpy(() => Promise.resolve('{ "foo": "bar" }'))

  mock('../src/', {
    './op': {
      default: opSpy
    }
  })

  const { getItem } = await import('../src/')
  const result = await getItem('foo', {
    vault: 'vault',
    includeTrash: true
  })

  t.deepEqual(
    getSpyCalls(opSpy),
    [
      [
        [ 'get', 'item', 'foo' ],
        { vault: 'vault', includeTrash: true }
      ]
    ],
    'should spawn `op` child process with necessary args'
  )

  t.deepEqual(
    result,
    { foo: 'bar' },
    'should return an item JSON'
  )
})
