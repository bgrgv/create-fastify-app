'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function preParsing(fastify, opts) {
  fastify.addHook('preParsing', async (request, reply) => {
    // Notice: the next callback is not available when using async/await
    // or returning a Promise. If you do invoke a next callback in this
    // situation unexpected behavior may occur, e.g. duplicate invocation
    // of handlers.
  })

  // fastify.addHook('preParsing', (request, reply, next) => {
  //   next()
  // })
})
