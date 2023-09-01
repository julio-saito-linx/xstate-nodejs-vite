import { createActor } from 'xstate'
import { machine } from './elevator'
import { test } from 'vitest'
import { printSnapshot } from '../../utils/tests/printSnapshot'

test('elevator createActorer', async () => {
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

  actor.send({ type: 'move elevator up' })
  actor.send({ type: 'stop the elevator' })
  actor.send({ type: 'open the door' })

  subscription.unsubscribe()
})
