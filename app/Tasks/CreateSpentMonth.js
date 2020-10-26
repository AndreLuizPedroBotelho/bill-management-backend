'use strict'

const Task = use('Task')

const Bill = use('App/Models/Bill')
const Spent = use('App/Models/Spent')

class CreateSpentMonth extends Task {
  static get schedule () {
    return '00 00 22 * * 0-7'
  }

  async handle () {
    console.log('CreateSpentMonth initialized')

    const date = new Date()

    const dayToday = date.getDate()

    const month = date.getUTCMonth() + 2
    const day = date.getUTCDate()
    const year = date.getUTCFullYear()

    const dateFullToday = year + '/' + month + '/' + day

    const bills = await Bill
      .query()
      .where('due_day', dayToday)
      .where('type', 'month')
      .fetch()

    const billsJson = bills.toJSON()

    for (const bill of billsJson) {
      await Spent.create({
        user_id: bill.user_id,
        title: `Spent- ${bill.title} - ${dateFullToday}`,
        description: 'Create for month job',
        value: bill.value,
        purchase_date: dateFullToday,
        due_date: dateFullToday,
        bill_id: bill.id
      })
    }

    console.log('Spent was created')
  }
}

module.exports = CreateSpentMonth
