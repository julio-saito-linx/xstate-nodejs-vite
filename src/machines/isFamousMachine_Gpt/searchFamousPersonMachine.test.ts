import { interpret, waitFor } from 'xstate'
import { machine } from './searchFamousPersonMachine'
import { test } from 'vitest'
import { printSnapshot } from '../../utils/tests/printSnapshot'

test('searchFamousPersonMachine interpreter', async () => {
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

  actor.send({ type: 'SEARCH', name_query: 'Ben Morisson' })

  await waitFor(
    actor,
    (state) => state.matches('famous') || state.matches('notFamous')
  )

  subscription.unsubscribe()
}, 500)
