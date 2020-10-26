'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Spent extends Model {
  bill () {
    return this.belongsTo('App/Models/Bill')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Spent
