import { createActor } from 'xstate'
import { machine } from './mixerMachine'
import { expect, test } from 'vitest'
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

  actor.send({ type: 'TURN_ON' })
  expect(actor.getSnapshot().value).toEqual({ turned_on: 'power_level_1' })

  actor.send({ type: 'INCREASE_POWER' })
  expect(actor.getSnapshot().value).toEqual({ turned_on: 'power_level_2' })

  actor.send({ type: 'INCREASE_POWER' })
  expect(actor.getSnapshot().value).toEqual({ turned_on: 'power_level_3' })

  actor.send({ type: 'DECREASE_POWER' })
  expect(actor.getSnapshot().value).toEqual({ turned_on: 'power_level_2' })

  actor.send({ type: 'DECREASE_POWER' })
  expect(actor.getSnapshot().value).toEqual({ turned_on: 'power_level_1' })

  // NO EFFECT
  actor.send({ type: 'DECREASE_POWER' })
  expect(actor.getSnapshot().value).toEqual({ turned_on: 'power_level_1' })

  actor.send({ type: 'INCREASE_POWER' })
  expect(actor.getSnapshot().value).toEqual({ turned_on: 'power_level_2' })

  actor.send({ type: 'TURN_OFF' })
  expect(actor.getSnapshot().value).toEqual('turned_off')

  // History remembers the last state: power_level_2
  actor.send({ type: 'TURN_ON' })
  expect(actor.getSnapshot().value).toEqual({ turned_on: 'power_level_2' })

  actor.send({ type: 'INCREASE_POWER' })
  expect(actor.getSnapshot().value).toEqual({ turned_on: 'power_level_3' })

  // NO EFFECT
  actor.send({ type: 'INCREASE_POWER' })
  expect(actor.getSnapshot().value).toEqual({ turned_on: 'power_level_3' })

  actor.send({ type: 'DECREASE_POWER' })
  expect(actor.getSnapshot().value).toEqual({ turned_on: 'power_level_2' })

  actor.send({ type: 'DECREASE_POWER' })
  expect(actor.getSnapshot().value).toEqual({ turned_on: 'power_level_1' })

  actor.send({ type: 'TURN_OFF' })
  expect(actor.getSnapshot().value).toEqual('turned_off')

  subscription.unsubscribe()
}, 50000)
