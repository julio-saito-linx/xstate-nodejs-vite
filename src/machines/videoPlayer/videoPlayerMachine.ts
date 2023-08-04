import { createMachine, assign, raise, log, sendTo, stop } from 'xstate'

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDcCWEwHsAKAbAhgJ5gBOAsvgMYAWqAdmAHQDCumskAxJgA5h0BtAAwBdRKB7tUAF1SY64kAA9EADgDsjAIxaALADZ9AZgCsWofvVHVATgA0IQoi3qhjXet1CtJgwCYbfS0-IwBfUIc0DBwCYnIqWgZGAHk+BghOKKxGWGleYTEkEElYGTkFIpUEU113Iz9VCz99VX0vQwcnBA8jRhsTT3VVLSCNPz8TcMj0LDwiUgoaeiZU-khGOcJ6KE5sAEEAVQBlAFECxRKy+UUqwzdVXRtAmyNHq1fOxD8hxn0Qs3MRn0Qm+qimICyMXm8SWSVW6Q2sW2mRmmEY-Ag5yKl1k10qiFM+kYqhMJkMxiEJJsQxMn26OmJRnqQiEvhMlIGYQiENRmwWCWWKTS62w+AArhwMtgADJ7ACaWIkUlxFVAVRM43cfi0RisqmaJlUdO191UqlMIXU+hs4ws4MhfJhiRWwogjCOeR4fAySly+GkTHwADMAyQABTmFkAShR0Udi2dQrWbo9vG9iuKyvKN0Qd3cri0TxM1kCGrp5MYzStPlcrxZ6nC3LomAw8CKDti-NhYAuWbxasQAFptbULIFdDodQ1grTHEP2cTC+p+jYhBPHub7bzO07Bax2JBe6UVTmEIORkSx21J-VhhM6S43B4vD5-IEdGDuR3oQnBfDD9ifaqsoXxaKolaPLqwKmFYfyzl0QK-IarIjmaDTWlucY7r+cKuoiRDbEeVzAVUzREn4kFWkIMFAvec4ICajAgteujsiy-TNJhszYQKuHJhs4qSkRJ74ggli1MMpiSaYRhrn4xogr8Iw2HorGmCMfhcVCcQ4S6-Gpl6AFKse2aifovjEuohYTNY4zmUYdJMk+ATmiMxbqAMZKNqEQA */
    id: 'videoPlayerMachine',
    initial: 'Closed',
    states: {
      Closed: {
        meta: {
          test: 'foo',
        },
        on: {
          open: {
            target: 'Opened',
            reenter: false,
          },
        },
      },
      Opened: {
        description: 'The video player should be in full-screen mode',
        invoke: {
          src: 'videoPlayer',
          id: 'invoke-flufe',
        },
        tags: 'fullscreen',
        initial: 'Playing',
        states: {
          Playing: {
            entry: {
              type: 'playVideo',
              params: {},
            },
            exit: {
              type: 'pauseVideo',
              params: {},
            },
            on: {
              PAUSE: {
                target: 'Paused',
                reenter: false,
              },
              'video.end': {
                target: 'Stopped',
                reenter: false,
              },
            },
          },
          Paused: {
            on: {
              PLAY: {
                target: 'Playing',
                reenter: false,
              },
            },
          },
          Stopped: {
            entry: [
              assign({ position: '' }),
              raise({ type: 'video.end' }),
              log('video stopped'),
              sendTo(
                'videoPlayer',
                { type: 'stopVideo' },
                { delay: undefined, id: undefined }
              ),
              stop('videoPlayer'),
            ],
            after: {
              '1000': {
                target: '#videoPlayerMachine.Closed',
                actions: [],
              },
            },
          },
        },
        on: {
          'video.stop': {
            target: '.Stopped',
            reenter: false,
          },
        },
      },
    },
    types: {
      events: {} as
        | { type: 'PAUSE' }
        | { type: 'PLAY' }
        | { type: 'open' }
        | { type: 'video.stop' }
        | { type: 'video.end' },
    },
  },
  {
    actions: {
      playVideo: () => {},
      pauseVideo: () => {},
    },
    actors: { videoPlayer: createMachine({}) },
    guards: {},
    delays: {},
  }
)
