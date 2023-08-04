import { createMachine, assign, fromPromise } from 'xstate'

// Definindo a interface para o contexto da máquina
interface Context {
  name: string
  resultCount: number
}

// Definindo a interface para eventos da máquina
type Events = { type: 'SEARCH'; name_query: string }

export const machine = createMachine<Context, Events>(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5SzAQwE4GMAWAxVAtgPYCusACmOrEQHYCyqOAlrWAHTMQA2YAxAGUAogEEASgGEAEgG0ADAF1EoAA5FYzAC7M6ykAA9EAZgAsJ9gA4jAJiNyAjBesBOAOxyAbB4A0IAJ6I1tbmwSYArBYmzm4m9ibWAL4JvigYOPjEZJTUdIwsbOypWNisUHwQdBysAG5EANYcRemEpBRUNAxMJQVN3VAINUSYqNp08grjemoao7R6hggmcs7scmuOTmZypiY+-ogAtPbWlvbbFnIWzrthRs72HkkpaMUZrdkded2NL-llVOgiOh2CpuCMAGZAgiFX54FpZdq5LqsH5pPoDWi1YazcaTJAgaZaHRzfELMKucxyayOOSxORhRxBXwBBD2MIediuYIeZxGOzHPlPEC9N4InKdfIcHBgTB1AD66DgJG4mj4eNU6iJulJiAsFg5SxMriMDIi1jkFOZiDcnPCHjCDrWzhclyFIvhbXFXxR7GlsoVSpVavsSnxhNm811+vYhuNpqcFpMVtZ7PYzgsx3NRjiHiMFluSWSIFoRAgcD07syns+yLYU01EZ1CFsrlOfLOzipYU7xuTRzW7GseuCQ7MefZYTdsNF1aRks4PDA9ZmxMjCFMYXYD3zRh59O7lv2648lL19ns0Vu1IdU7RM4+c++MLRpWXWpJoAWQ83Gfbyy7PZGMmvJpscDLOPGZgeBYt6vB6D4Sk+fryoqsDKpob6Np+uphCctj2K40EZh41gePSyYWOwRhctRYQmBc7gPCasHNFWCHegU4Iephq5NmcURbq4BFka4zjQXRewsmJtoUqYzrkru1wsXCbGIohPolpoM48dq2GsrSKwEcJFpifmuzJmym5BCeXJcmRSyRMp95qRxHBccw3AkIqOkfgYiAeOelh3G4Nj3Ceu7JqYJxkdSDgMlE9KJIWQA */
    id: 'searchFamousPersonMachine',
    initial: 'idle',
    context: {
      name: '',
      resultCount: 0, // resultado inicial
    },
    states: {
      idle: {
        // Estado inicial, aguardando uma pesquisa de nome
        on: {
          SEARCH: {
            target: 'searching',
            actions: assign({
              name: ({ event }) => event.name_query, // atualiza o nome com o nome da pesquisa em andamento
            }),
          },
        },
      },
      searching: {
        // A máquina está procurando se o nome é famoso
        invoke: {
          src: 'searching_invoke', // função que realmente realizaria a pesquisa
          onDone: {
            target: 'check_result',
            actions: ['search_assign'], // quando a pesquisa é concluída, transfira para o estado dos resultados
          },
          onError: 'failure',
        },
      },
      check_result: {
        always: [
          {
            target: 'famous',
            guard: ({ context }) => context.resultCount > 100,
          },
          { target: 'notFamous' },
        ],
      },
      famous: {
        // O nome é famoso
      },
      notFamous: {
        // O nome não é famoso
      },
      failure: {
        // Houve um erro na pesquisa
      },
    },
  },
  {
    actors: {
      // ref: https://stately.ai/docs/xstate-v5/migration#use-actor-logic-creators-for-invokesrc-instead-of-functions
      searching_invoke: fromPromise(async ({ input }) => {
        // Aqui iria o código que realmente faz a pesquisa na internet
        // Para este exemplo, estamos apenas 'simulando' esta consulta
        console.log('--  input: ', input)
        return Promise.resolve({
          resultCount: Math.random() * 200,
        })
      }),
    },
    actions: {
      search_assign: assign({
        resultCount: ({ event }) => {
          return (event as any).output.resultCount
        },
      }),
    },
  }
)
