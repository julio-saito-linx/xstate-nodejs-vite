import { createMachine } from 'xstate'

// https://stately.ai/registry/editor/0c4fb670-d495-4300-b2f1-2adeebb949b0?mode=Design&machineId=591ab3dc-f9c1-4224-9db6-152239b0b31e
export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGMAWBDALgIwPaYH0AGARgDpZVcB3AgSwDs7M70AbA6sN5XAWzAFYmLGADEAbSIBdRKAAOuWMzq4GckAA9EAZgBMOsjoAcegKxEALESI6dAdmM6AbABoQAT0R6ixsk6JnPQBOIjMLPXszAF9o9zQsPEJSCipaRhV2Tm5eASERTHEJElkkEEVlFjUNbQR9QxNzKxs7Rxd3Lzr7SzJgkJJgkh9LElMzHVj4jBx8YnJKGnomFiyuHn5BYVFJPVKFJRVqstr6ozHm2wcnN09ESx8yextgy3s9AeNfZxi4kASZ5LkdCwADWBAY6DyW0KYgAqgBlACiACUCABJAByAAVYQAVeEEDEAQQAsoipHtygcqupjohnEEyHpIvdgsEzMZxhyOt4zHoyJdjANusF7MEdCRLJM-tMknMyLwGAAzOgAJz44MhmwK4gRKIIAGEAPIYgBiaORJIJAAk0QTiWSKRoKodaaBaiQhj07ByiO9BnoeQhzD1xiZhZZReLJdL-nKUoqVerNVCdXCkajkYiAFKIg34gi2+2k8kyZ3U1RurT0xnM7ohdmcnTc27BlJRcxPPTGKKhBmx2WzFLAsHyVV0ABu6GQHny2z1qIAIkbCUbcQQiQaDYisQWsci0QA1TcATSdZRdNJqiBIZlCTOcdmCnIs1mCQfM-JIzjCDL6zlGYxjAHRIhyBUECDHSdp1naFdQzDctx3dd9yPU9z32SpK2vBBb3vPRHx0Z9wmad9Wx0SNHgIoIgnsZxPhGH4plAwEyBHSDxynGc5xhDCqSwo53RvO8iAfJ8X1IoMdD9MhLBGIVHyAoiSAmX44zAsgoFwXAIGwDxBAEWBYHQGAePELN4VxIlkVxPjL2wulcPsMUyGcQZPm-Cx-0DVshTIT0BkscIzGcSxjBePQQIBeUFloeQwFVWA1HYOhYEgbJ1lTbZNDgtilUKVUAAofBsABKMR1NY2LIISpKITYVL0rWXJtVEOyK0E6tg2Zch9BeCwnk9AwpKIYJXKU5lbBCqL43mNIasS5KGrSiAMpasyxBynU8oK4qbCIcrKpi+b4sW+rGtW5qNjM4pKXszqPReMbTCCUIzEcRwnA-EKjECaxSEjOionsWJfgYHS4A0I7SHLASq1qABaG5OiRgV9vRjGiBBtTByq+aMhWDgrqywpYddHD7iDQYyHCZw6ObEhRusAiZo09iIRJsAyavRywrMXozBIN4AMZywTGR7wsceH0hbCOiseCVnWMTNUNQ51rSYvDr4cQPp+TMEZQlIOtBeMb6enFSNInGf8nFU5jouHCCoK42CdW5hyhNwojnEeA2njsBwnnZD9GVGSU7FGULnJIJX5S0nS9IMuBjNMuCPYem9BlE29AiCV5rG+Mwg3Cmm+nCgwCIsBlsYd2bUkWU66pSla1uu9OtbhnCBkZ-zq-z7pAnCEa-DvIZGdsIUGLjlJqr4dBGAIAQGAAVzMjOdeDFxvVeaO3OZZlLBHsvx5aKerFB6IgA */
    id: 'chatbot_01',
    context: {
      user_first_name: 'UserName',
      user_has_accepted_privacy: false,
      user_has_confirmed_his_name: false,
    },
    initial: 'show_initial_welcome_state',
    states: {
      show_initial_welcome_state: {
        always: [
          {
            target: 'ask_name_state',
            reenter: false,
          },
          {
            target: 'confirm_name_state',
            guard: 'user_have_a_valid_name',
            reenter: false,
          },
          {
            target: 'ask_privacy_state',
            guard: 'user_already_confirmed_name',
            reenter: false,
          },
        ],
      },
      ask_name_state: {
        on: {
          USER_INPUTS_NAME: {
            target: 'confirm_name_state',
            reenter: false,
          },
        },
      },
      confirm_name_state: {
        on: {
          USER_CONFIRMS_HIS_NAME: {
            target: 'ask_privacy_state',
            reenter: false,
          },
          USER_REJECTS_HIS_NAME: {
            target: 'ask_name_state',
            reenter: false,
          },
        },
      },
      ask_privacy_state: {
        always: {
          target: 'show_personalised_welcome_state',
          guard: 'user_already_accepty_privacy',
          reenter: false,
        },
        on: {
          USER_DO_NOT_ACCEPTS_PRIVACY: {
            target: 'goodbye_message_state',
            reenter: false,
          },
          USER_ACCEPT_PRIVACY: {
            target: 'show_personalised_welcome_state',
            reenter: false,
          },
        },
      },
      goodbye_message_state: {
        on: {
          RESTART: {
            target: 'show_initial_welcome_state',
            reenter: false,
          },
        },
      },
      show_personalised_welcome_state: {
        after: {
          '2000': [
            {
              target: '#chatbot_01.show_main_menu_state',
              actions: [],
              meta: {},
            },
            {
              reenter: true,
            },
          ],
        },
      },
      show_main_menu_state: {},
    },
    types: {
      events: {} as
        | { type: 'USER_INPUTS_NAME' }
        | { type: 'USER_CONFIRMS_HIS_NAME' }
        | { type: 'USER_REJECTS_HIS_NAME' }
        | { type: 'USER_DO_NOT_ACCEPTS_PRIVACY' }
        | { type: 'RESTART' }
        | { type: 'USER_ACCEPT_PRIVACY' },
    },
  },
  {
    actions: {},
    actors: {},
    guards: {
      user_have_a_valid_name: createMachine({}),
      user_already_confirmed_name: createMachine({}),
      user_already_accepty_privacy: createMachine({}),
    },
    delays: {},
  }
)
