import { createMachine } from "xstate";

export const mixerMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFkCWAPMAnAdBOANqlAIYQD2AxADICSA4gIIBKA2gAwC6ioADubFQAXVOQB2PEOkQBGAJzscAZgAc7GQFYNANgBM2mQBYZ+gDQgAnokPaNOOUoO6A7M9U2Nz7QF9v5tJi4RKQUlAAiAKIAynRMbFyS-IIi4pLSCDIqMjgqBipKSkYqhhomhuZWCHI47AUqChpyupoySnKGvv4Y2DjBZOQ4-EJgYgDGqCQylIwAqsgRAHIAKiwc3EggScKiEhvpGiX2B0rq7drt7OWWiEq6ujiNhs6Gquzs2qraHX4gAT19FEG5GGYwmummc0WK3i6z4Am2qT2iCy9ye+XYXheKmccmcFRudweZzkuI09W07DknV+3SCxH6QJB4xI4LCtGQtAWM1oMMS8JSu1A+wONVUzlKzhkGLkmnxGWc9zUSjctjUd081L+dJCAyGI2ZSnC7M53N5Gy2ArSyJOor0MnkBnF7F0cpkCpytRVZOdug11LE5Hw8A2Wr5yR2VoQAFptHKo84VDhDC8Lip8l4dEpNbS8IR6RQwwjBVJrC7rghsQ9PNoa211I4NLps4FevnyIXLUiEI5sh8VLpcSdSoZKRo5So7LcycU3RpKROZM3-m3GfqJjIOxGuyPqn2B252MPR3LdIZEzpKSdsTK+0vtQy9aCWZvEULENpxfYmkYvFKB6oTzPB4KVxQwmnYGc-S6FsAV1YE1xIJQX2LdIZXuNoB00Zo5y0PFy1Pc8QOecDIOcXxfCAA */
    id: "Mixer",
    initial: "desligado",
    states: {
      desligado: {
        on: {
          LIGAR: {
            target: "#Mixer.ligado.potencia1",
          },
        },
      },
      ligado: {
        initial: "potencia1",
        states: {
          potencia1: {
            on: {
              AUMENTAR: {
                target: "potencia2",
              },
            },
          },
          potencia2: {
            on: {
              AUMENTAR: {
                target: "potencia3",
              },
              DIMINUIR: {
                target: "potencia1",
              },
            },
          },
          potencia3: {
            on: {
              DIMINUIR: {
                target: "potencia2",
              },
            },
          },
        },
        on: {
          DESLIGAR: {
            target: "desligado",
          },
        },
      },
    },
  },
  {
    actions: {},
    guards: {},
    delays: {},
  }
);
