import { interpret } from 'xstate'
import { machine } from './mixerMachine'
import { test } from 'vitest'
import { printSnapshot } from '../../utils/tests/printSnapshot'

test('mixerMachine interpreter', async () => {
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

  actor.send({ type: 'TURN_ON' })
  actor.send({ type: 'INCREASE_POWER' })
  actor.send({ type: 'INCREASE_POWER' })
  actor.send({ type: 'DECREASE_POWER' })

  actor.send({ type: 'TURN_OFF' })
  actor.send({ type: 'TURN_ON' })

  actor.send({ type: 'INCREASE_POWER' })
  actor.send({ type: 'DECREASE_POWER' })
  actor.send({ type: 'DECREASE_POWER' })

  actor.send({ type: 'TURN_OFF' })

  subscription.unsubscribe()
}, 50000)
