import { createActor, waitFor } from 'xstate'
import { mainMachine } from './mainChatMachine'
import { askNameMachine } from './askNameMachine'
import { test } from 'vitest'

test('mainMachine', async () => {
  // DB:
  // mainMachine_State: JSON
  // askNameMachine_State: JSON
  // uraMachine_State: JSON
  // searchProductsMachine_State: JSON
  //
  /**
      chat_state: {
        mainMachine: {},
        askNameMachine: {},
        uraMachine: {},
        searchProductsMachine: {},
      },
   */

  // mainMachine
  const mainActor = createActor(mainMachine)
  mainActor.start()
  mainActor.send({
    type: 'NEXT',
  })
  const mainState = mainActor.getSnapshot()

  if (mainState.value === 'ask_name') {
    // askNameMachine
    const askNameActor = createActor(askNameMachine)
    askNameActor.start()
    await waitFor(askNameActor, (state) => state.matches('check_name'))
    askNameActor.send({
      type: 'HAS_VALID_NAME',
    })
    await waitFor(askNameActor, (state) => state.matches('confirm_name'))
    console.log(
      '--  askNameActor.getSnapshot().value: ',
      askNameActor.getSnapshot().value
    )
  }
}, 5000)
