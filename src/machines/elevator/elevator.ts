import { createMachine } from 'xstate'

export const machine = createMachine(
  {
    id: 'elevator_2',
    description:
      'In this example the elevator will not move if the door is opened',
    initial: 'stoped',
    states: {
      stoped: {
        initial: 'door closed',
        states: {
          'door closed': {
            on: {
              'open the door': {
                target: 'door opened',
                reenter: false,
              },
              'move elevator up': {
                target: '#elevator_2.in movement.movingUp',
                reenter: false,
              },
              'move elevator down': {
                target: '#elevator_2.in movement.movingDown',
                reenter: false,
              },
            },
          },
          'door opened': {
            on: {
              'close the door': {
                target: 'door closed',
                reenter: false,
              },
            },
          },
        },
      },
      'in movement': {
        initial: 'movingDown',
        states: {
          movingDown: {},
          movingUp: {},
        },
        on: {
          'stop the elevator': {
            target: 'stoped',
            reenter: false,
          },
        },
      },
    },
    types: {
      events: {} as
        | { type: 'open the door' }
        | { type: 'close the door' }
        | { type: 'move elevator up' }
        | { type: 'move elevator down' }
        | { type: 'stop the elevator' },
    },
  },
  {
    actions: {},
    actors: {},
    guards: {},
    delays: {},
  }
)
