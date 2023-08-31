import { createMachine } from 'xstate'

export const askNameMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QENYGsByyC2YCyyAxgBYCWAdmAHQliFoD65OYAxABICCAygwGqcAMgEkAIgwyc8AUQDaABgC6iUAAcA9rFIAXUuvIqQAD0QBGAMwA2KgFZLNgCwOAnJdMAmNwHZ3pgDQgAJ6IALTmABxU5p728nHh5s6mbgC+KQGomCwEJBTUhPoAZqQATthMLKwAwgDyGABiwgBKMqIKykggGlq6+oYmCA7hkeFD4c7m8p428l6WAcEIYZHRlrHxicmmaekg5OoQcIaZWLg5ZJSG3Tp6Bp0DITZeVKajQzPyNs7uE84LoR5rDNRnNRu4vNFwmkMuhTvgiBd8sQ6IxmLgrpobn17qFnC83uEPl8fhE-kFQhEqO4HJZnA4IjZ3CDwu5oSATtkEXkaEVSuU0WAMT1bv1EOZzKYXtSfHTLOYnu55f8lpTqbT6YSmQ4vCy2RyzlzKFQwOQIEKsXdQANLA5JaZTDZTF4vHYku5PMqwniXI5LHF6c47OEvDsUkA */
    id: 'askNameMachine',
    initial: 'check_name',
    states: {
      check_name: {
        on: {
          HAS_VALID_NAME: {
            target: 'confirm_name',
            reenter: false,
          },
        },
      },
      confirm_name: {
        on: {
          CONFIRMED: {
            target: 'end',
            reenter: false,
          },
        },
      },
      end: {
        type: 'final',
      },
    },
    types: { events: {} as { type: 'HAS_VALID_NAME' } | { type: 'CONFIRMED' } },
  },
  {
    actions: {},
    actors: {},
    guards: {},
    delays: {},
  }
)
