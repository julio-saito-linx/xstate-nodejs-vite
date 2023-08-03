import { createMachine } from "xstate";

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFkCWAPMAnAdBOANqlAIYQD2AxADICSA4gIIBKA2gAwC6ioADubFQAXVOQB2PEOkQBGABwA2HHJkBmdnIDsAFgWrVmuQE4ANCACeszQFYc7GQCYjGuQ7nbtMzQF9vZtJi4RKQUlAAiAKIAynRMbFyS-IIi4pLSCF4yOEbW2tbs1kYO7J72CmaWCCo42pqGeWpy7JpG2r7+GNg4wWTkOPxCYGIAxqgkMpSMAKrIEQByACosHNxIIEnCohJr6dYy2jgKxU7ypfnaFYgOtTgGOarabg851u0gAV09FP3kgyNjDkmM3mS3iqz4Ak2qR2iEMmhwOia2iKMgUyOMlwQ13hd2sDyeyOsrz8706QWIvR+f1GJEBYVoyFocymtDBiUhKW2oF2N009ncmgM2lUCjxmJk9gRCk0T3YCkUmgUCiMbw+5JCfQGQxpqnCDKZLLZaw2nLSiBUtmM0tabjlCvFksVMrk6nl0qVKreYnI+HgazV7OSWzNCAAtKojIcHMrVCoZLk9OoLhZEKHBTh5O4SvH9PoHDJVWS8IQKRRA1CuVJzbdBXLM3kRcryimEM4M9YjncZdKXYXAt1S+Ry6aYQg8zgO6onA5BSoXdZxQc3K07upCrWHH3PoOqdqxjJh8HR7H2BO9NPZ-JVAuW15bPYTnlzloFFv1ZStf9aYfodzEKKcQca9lTxaNMnFOoJ0cIx9iJEoXzfAcNV3L9VB-St0iMEUESw-JijkF9WnFJo7Gg2Dn0VXxfCAA */
    id: "Mixer",
    initial: "desligado",
    states: {
      desligado: {
        on: {
          LIGAR: {
            target: "#Mixer.ligado.potencia1",
            reenter: false,
          },
        },
      },
      ligado: {
        initial: "potencia1",
        states: {
          hist: {
            type: "history",
          },
          potencia1: {
            on: {
              AUMENTAR: {
                target: "potencia2",
                reenter: false,
              },
            },
          },
          potencia2: {
            on: {
              AUMENTAR: {
                target: "potencia3",
                reenter: false,
              },
              DIMINUIR: {
                target: "potencia1",
                reenter: false,
              },
            },
          },
          potencia3: {
            on: {
              DIMINUIR: {
                target: "potencia2",
                reenter: false,
              },
            },
          },
        },
        on: {
          DESLIGAR: {
            target: "desligado",
            reenter: false,
          },
        },
      },
    },
    types: {
      events: {} as
        | { type: "LIGAR" }
        | { type: "DESLIGAR" }
        | { type: "AUMENTAR" }
        | { type: "DIMINUIR" },
    },
  },
  {
    actions: {},
    actors: {},
    guards: {},
    delays: {},
  }
);
