'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SpentSchema extends Schema {
  up () {
    this.create('spents', (table) => {
      table.increments()
      table.string('title', 120).notNullable()
      table.text('description')
      table.decimal('value', 15, 2).notNullable()
      table.date('purchase_date').notNullable()
      table.date('due_date').notNullable()
      table.date('payment_date')
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .notNullable()
      table.integer('bill_id')
        .unsigned()
        .references('id')
        .inTable('bills')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('spents')
  }
}

module.exports = SpentSchema
