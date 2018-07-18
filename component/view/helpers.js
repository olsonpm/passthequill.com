import { waitMs } from 'universal/utils'

const waitFor = {
  animation: {
    loadingCircle: () => waitMs(500),
    //
    // TODO: use javascript to animate successCheck so we can program a hook
    //   `onFinishedAnimating` or something.  This hardcoded wait is a hack in
    //   the meantime
    //
    successCheck: () => waitMs(1000),
  },
}

export { waitFor }
