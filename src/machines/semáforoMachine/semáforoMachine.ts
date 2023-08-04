import { createMachine } from 'xstate'

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGUwFsCHAzA9gJxwGIAFAeQHUBRAJQH1SAxBgbQAYBdRUABx1gEsALvxwA7LiAAeiACwAmADQgAnogAcAVgB0GjQE4ZANk1zWGuWpkBGAL42lqTLgJbeAdzB4ABDixYSFDT0AHJsnEggvALCYhLSCADMVnpaVgmsVsmGCRoA7HKGrAlKqgiaOvpGJmYW1nYO6Nj4OFp4kISSsIIAhoJgWt1YfXgAFKasAJSEjk0ubRBhElFCIuIR8fqsWnJ66Wq7Zqx6cjIliKZWWrlWuQlqVhZ6hdlq9SAzzi1QbWCiHV29fqDYZjViTaaNT5ab5gX6LCLLGJrUDxSzaBKmXKFViFNR43JnBAXK43O4PfbPHJvD7NLTKMAAGwZODc-x6fQGQ08IysYKmNJc9KZLPhPD4K1i63UMlyqQ0rAKGgS10MMjUhPuWhluUs+Seyt0CTs9hAohwEDgEgFOCW4qRcUQAFpDITndTIbT3J4fH5bdFVg6EMltLoFXICoZchoZHocRrDFozAY1HJ5U9U+Z3U5afM-RLkVJZIYE+GCpZeYVrkV44nKim04YM3Is7Mvj8C4iA1KEPkS-KcmrDFY1JHiipzmCSXorErh9krMXmybrXTGcy3Hn7d29Jq5DqFRoh1jsi7x2U1BUDC88jHCjJjTYgA */
    id: 'Semáforo',
    initial: 'power off',
    states: {
      'power off': {
        on: {
          POWER_ON: {
            target: 'red',
            reenter: false,
          },
        },
      },
      red: {
        after: {
          '200': {
            target: '#Semáforo.green',
            actions: [],
          },
        },
      },
      green: {
        after: {
          '200': {
            target: '#Semáforo.yellow',
            actions: [],
          },
        },
      },
      yellow: {
        after: {
          '100': {
            target: '#Semáforo.red',
            actions: [],
          },
        },
      },
    },
    on: {
      POWER_OFF: {
        target: '.power off',
        reenter: false,
      },
    },
    types: { events: {} as { type: 'POWER_OFF' } | { type: 'POWER_ON' } },
  },
  {
    actions: {},
    actors: {},
    guards: {},
    delays: {},
  }
)
