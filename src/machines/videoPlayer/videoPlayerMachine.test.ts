import { interpret, waitFor } from 'xstate'
import { machine } from './videoPlayerMachine'
import { test } from 'vitest'
import { printSnapshot } from '../../utils/tests/printSnapshot'

test('videoPlayerMachine interpreter', async () => {
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

  actor.send({ type: 'open' })
  actor.send({ type: 'PAUSE' })
  actor.send({ type: 'PLAY' })
  actor.send({ type: 'video.stop' })

  await waitFor(actor, (state) => state.matches('videoPlayerMachine.Closed'))

  subscription.unsubscribe()
}, 500)
