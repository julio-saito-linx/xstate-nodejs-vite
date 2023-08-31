import { createMachine } from 'xstate'

export const mainMachine = createMachine(
  {
    id: 'mainChatMachine',
    initial: 'idle',
    states: {
      idle: {
        on: {
          NEXT: {
            target: 'ask_name',
            reenter: false,
          },
        },
      },
      ask_name: {
        on: {
          NEXT: {
            target: 'ask_privacy',
            reenter: false,
          },
        },
      },
      ask_privacy: {
        on: {
          NEXT: {
            target: 'show_ura',
            reenter: false,
          },
        },
      },
      show_ura: {},
    },
    types: { events: {} as { type: 'NEXT' } },
  },
  {
    actions: {},
    actors: {},
    guards: {},
    delays: {},
  }
)
