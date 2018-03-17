//---------//
// Imports //
//---------//

import KoaRouter from 'koa-router'
import log from 'server/log'

//
//------//
// Main //
//------//

const createPageRouter = getRenderer => {
  const pageRouter = new KoaRouter()

  return pageRouter.get('*', ctx => {
    const { renderToString } = getRenderer(),
      vueContext = { url: ctx.url }

    return renderToString(vueContext)
      .then(html => {
        ctx.status = vueContext.httpStatusCode
        ctx.body = html
      })
      .catch(error => {
        log.server.error(
          'unexpected error occurred during renderToString',
          error
        )

        return Promise.reject(error)
      })
  })
}

//
//---------//
// Exports //
//---------//

export default createPageRouter
