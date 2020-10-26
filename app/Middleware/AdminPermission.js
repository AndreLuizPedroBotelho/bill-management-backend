'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AdminPermission {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response, auth }, next) {
    if (auth.user.type === 'admin') {
      await next()
      return
    }
    return response
      .status(403)
      .send({ error: { message: "Action doesn't permitted" } })
  }
}

module.exports = AdminPermission
