import { createMachine } from 'xstate'

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFkCWAPMAnAdBOANqlAIYQD2AxADICSA4gIIBKA2gAwC6ioADubFQAXVOQB2PEOkQB2AKw4ATAA4ZARmVqZATjmbt2gMwAaEAE9EK7TgBsawwBZtyh0+0P1AX0+m0mXESkFJQAIgCiAMp0TGxckvyCIuKS0gg27DgOKnIG8i4yMoaKphYIaio42jY2hvKKRexyhjaK3r4Y2DiBZOQ4-EJgYgDGqCRqlIwAqshhAHIAKiwc3EggCcKiEqupTYqVBfWKLVWK7NollsrWdo7OrgYeag5tIH6d3RR95APDo4oT0zmi1iKz4Ag2yW2iBcaiUTjkijUTycRzUFwQVls9icLjcj2ePleHQCxB6Xx+IxI-xCtGQtFmk1oIPi4KSW1AOwcsPYdhsykR-LkcjUNnR5WUlWqtQRDSaNjkLzeJKCvX6g0phlCtPpjOZq3WbJS0KcOEMZu0Mh5FuUchkYoqVRqdVlzQVLzE5Hw8FWSpZiU2RrKeyyNtyeg8hQ06IAtA4FM4jKdVIZtOwzcpFcS8IRSRQ-RD2VJEDUcFcI8pNFcNIohejEQo4-I1Laa2oDCLM-4urnyPnDVCMc3TTIa-K42nmg5lOiuZkKwj1Dp2E3DG72l2PqrvurRmo+wGB4ZVKbHI4Cg5qjJqnWh425VVq9oa533j3yTuqfvIRzi1UcOx2HKKdynYLInBvBtbWFFthXbQwX2VMk1V+EhDC-QtUjUACFAFU52BtepDGXCDMltJxXHnGxtAQ7sVRwAALVBYCEdDAyOQxh1HORxzNeUxVnG0clOPl7EKKpvG8IA */
    id: 'Mixer',
    initial: 'desligado',
    states: {
      desligado: {
        on: {
          LIGAR: {
            target: '#Mixer.ligado.hist',
            reenter: false,
          },
        },
      },
      ligado: {
        initial: 'potencia1',
        states: {
          potencia1: {
            on: {
              AUMENTAR: {
                target: 'potencia2',
                reenter: false,
              },
            },
          },
          potencia2: {
            on: {
              AUMENTAR: {
                target: 'potencia3',
                reenter: false,
              },
              DIMINUIR: {
                target: 'potencia1',
                reenter: false,
              },
            },
          },
          potencia3: {
            on: {
              DIMINUIR: {
                target: 'potencia2',
                reenter: false,
              },
            },
          },
          hist: {
            type: 'history',
          },
        },
        on: {
          DESLIGAR: {
            target: 'desligado',
            reenter: false,
          },
        },
      },
    },
    types: {
      events: {} as
        | { type: 'LIGAR' }
        | { type: 'DESLIGAR' }
        | { type: 'AUMENTAR' }
        | { type: 'DIMINUIR' },
    },
  },
  {
    actions: {},
    actors: {},
    guards: {},
    delays: {},
  }
)
