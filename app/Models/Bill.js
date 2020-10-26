'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bill extends Model {
  spents () {
    return this.hasMany('App/Models/Spent')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Bill
