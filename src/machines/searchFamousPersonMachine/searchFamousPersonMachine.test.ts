import { createActor, waitFor } from 'xstate'
import { machine } from './searchFamousPersonMachine'
import { expect, test } from 'vitest'
import { printSnapshot } from '../../utils/tests/printSnapshot'

test('searchFamousPersonMachine interpreter', async () => {
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

  actor.send({ type: 'SEARCH', name_query: 'Ben Morisson' })

  await waitFor(
    actor,
    (state) => state.matches('famous') || state.matches('notFamous')
  )

  subscription.unsubscribe()
}, 500)

test('save/restore state', async () => {
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

  actor.send({ type: 'SEARCH', name_query: 'Ben Morisson' })

  await waitFor(
    actor,
    (state) => state.matches('famous') || state.matches('notFamous')
  )

  const state1 = actor.getSnapshot()
  console.log('--  state1.context: ', state1.context)

  // Rehydrated State
  const actor2 = createActor(machine, {
    state: state1,
  }).start()

  const state2 = actor2.getSnapshot()
  console.log('--  state2.context: ', state2.context)

  expect(state1.context).toEqual(state2.context)

  expect(state1.value).toEqual(state2.value)
  expect(state1.historyValue).toEqual(state2.historyValue)

  subscription.unsubscribe()
}, 500)
