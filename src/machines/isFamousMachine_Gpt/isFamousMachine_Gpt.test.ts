import { interpret } from 'xstate'
import { machine } from './isFamousMachine_Gpt'
import { test } from 'vitest'
import { printSnapshot } from '../../utils/tests/printSnapshot'

test('isFamousMachine_Gpt interpreter', async () => {
  const actor = interpret(machine)

  const subscription = actor.subscribe({
    next(snapshot) {
      printSnapshot({ snapshot, __filename })
    },
    error(data) {
      console.error(data)
      // ...
    },
    complete() {
      console.log('done')
      // ...
    },
  })

  // Ativa a máquina
  actor.start()

  actor.send({ type: 'SEARCH', query: 'gpt' })

  subscription.unsubscribe()
}, 50000)
