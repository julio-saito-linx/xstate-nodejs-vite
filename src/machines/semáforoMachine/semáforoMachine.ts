import { createMachine } from 'xstate'

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGUwFsCHAzA9gJxwGIAFAeQHUBRAJQH1SAxBgbQAYBdRUABx1gEsALvxwA7LiAAeiACwAmADQgAnogCMATjkA6NQGYNe1nMMA2UxpnmAvtaWpMuAtt4B3MHgAEOLFhIUaegA5Nk4kEF4BYTEJaQQ9TV0jNVM5AHY1AA5MuVZWPSVVBBSNbRkAVky9IzSc-Uzy23t0bHwcbTxIQklYQQBDQTBtPqxBvAAKIzyASkIHVudOiFCJSKERcXC48o1WbRMEvStMtPy5csLEXLVtDLS9cpk00yZTNYNUyaQead2qE6YFE3V6AyGIzGkzyrFmvza2gBYCBK3Ca2im1AcSqOg0GmymQ05SMFTkakuCGutzU90ez1e70+3zhzmUYAANmycK4Qf1BsNRh5xmpobCWn9tKyOVyUTw+OsYltEFVyvtqic5DI9Bq0hlyZkbk9agYZBo1BVTOU5LY7CBRDgIHAJMycKs5ejYogALSmcne7TQgOB1hmpli+FuDzeXyuqIbD3FQnacrlYzlcymk6mNLkzQ6UwGIwHdNWL4250dSAx+UYqSycz7OTparJ6pHMkqdRabT5wzGMwWEuhxzwxFAqvuxUIDJ6bRaV56UyaXEL9tFXJ7DKmmT6VILwlDhbtSWc1zjuOTwmmbtHRsL8x3mQ5xP6XtFgdpK3WoA */
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
