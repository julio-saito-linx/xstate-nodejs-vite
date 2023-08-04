import { createMachine } from 'xstate'

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFkCWAPMAnAdAFwFcsA7SAfQHsAzKgYgBUBVAJQDkyB5VgbQAYBdRKAAOFWKjyoKxISHSIAbAFYcAFgDMAJiWqAHEs2aAnKqOGANCACeiAIy9eOXgtW8lD9buVKXAX1+WaJi4hCTk0gws7BwAYjF8gkggouKS0rLyCAqaOJq86gDsvF56Crq2LpY2CJrlOEq2BarG6g26zn4BIEHY+ESkEJTEOKIA7thkADZgAG5gk2S2tACSrADCzACiAIIAyptkAAocAOqbzAmyKRJSMkmZDY7ZBYWaTRVGZlV26uq5qnp3LYlF4jLZVP5AhheqEBkMRhRxlgprN5mRNCt1ls9gdjmcLgIrmIbul7ogvE9GgCyp9VODbN8ELZfv9AbxgaDwZDutCQv1wsMxhNpnMFhiACKbDY7fZHU7nS5Ja5pO6gB7AnAFApGbyqHw6dSM9SuTUG+wKXja+wVbk9PlhQbSBFIlGisjqWiS6U4uX4xUiYkqjLkl71Qy6Iwg2zGXS6Q3WRDGxwFM3OS1g9kKfxdYgUCBwWR2ompW7BpmqXL5IolLzlSoJhAAWgKChwzJbRl4hmy6gUJltvL6DsoNGLJNVckUKi71brBjjmkZtk7moUjVjZTXFQMA+CQ7hpIDJcPk5qvZwXmXLZ7SlaFSXthwSeBBV0mgU7yUTV3MP5jsFiLCqiCy2GOQZkggrQ5EYLy8GC0Y6LG8bVJohQ4DBxrZM076xq+P72geAEuiKaKaGBpYQUUratAYqhNDBSgggojKoQU6EvKoWHdrhuj4fuArOkBbrqORJ6ZPYPjoSCdFaG4Pj1ihaEYZxmjYWUuh4V0dr8f+OAABaoLAeAUFg1RHuOZa1BWl4wQoN53sxDZGLoF62O0bgaTBeRwdmvhAA */
    id: 'Mixer',
    initial: 'turned_off',
    states: {
      turned_off: {
        on: {
          TURN_ON: {
            target: '#Mixer.turned_on.history',
            reenter: false,
          },
        },
      },
      turned_on: {
        initial: 'power_level_1',
        states: {
          power_level_1: {
            on: {
              INCREASE_POWER: {
                target: 'power_level_2',
                reenter: false,
              },
            },
          },
          power_level_2: {
            on: {
              INCREASE_POWER: {
                target: 'power_level_3',
                reenter: false,
              },
              DECREASE_POWER: {
                target: 'power_level_1',
                reenter: false,
              },
            },
          },
          power_level_3: {
            on: {
              DECREASE_POWER: {
                target: 'power_level_2',
                reenter: false,
              },
            },
          },
          history: {
            type: 'history',
          },
        },
        on: {
          TURN_OFF: {
            target: 'turned_off',
            reenter: false,
          },
        },
      },
    },
    types: {
      events: {} as
        | { type: 'TURN_ON' }
        | { type: 'TURN_OFF' }
        | { type: 'INCREASE_POWER' }
        | { type: 'DECREASE_POWER' },
    },
  },
  {
    actions: {},
    actors: {},
    guards: {},
    delays: {},
  }
)
