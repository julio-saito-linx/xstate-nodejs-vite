import { createActor } from 'xstate'
import { machine } from './chatbotMachine'
import { test } from 'vitest'
import { printSnapshot } from '../../utils/tests/printSnapshot'

test('mixerMachine createActorer', async () => {
  const actor = createActor(machine)

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

  actor.send({ type: 'USER_INPUTS_NAME' })

  subscription.unsubscribe()
}, 50000)
