'use strict'

const Task = use('Task')

const Bill = use('App/Models/Bill')
const Spent = use('App/Models/Spent')

class CreateSpentYear extends Task {
  static get schedule () {
    return '00 00 22 * * 0-7'
  }

  async handle () {
    console.log('CreateSpentYear initialized')

    const date = new Date()

    const dayToday = date.getDate()
    const monthToday = date.getUTCMonth() + 1

    const month = date.getUTCMonth() + 2
    const day = date.getUTCDate()
    const year = date.getUTCFullYear()

    const dateFullToday = year + '/' + month + '/' + day

    const bills = await Bill
      .query()
      .where('due_day', dayToday)
      .andWhere('month_day', monthToday)
      .andWhere('type', 'year')
      .fetch()

    const billsJson = bills.toJSON()

    for (const bill of billsJson) {
      await Spent.create({
        user_id: bill.user_id,
        title: `Spent - ${bill.title} - ${dateFullToday}`,
        description: 'Create for year job ',
        value: bill.value,
        purchase_date: dateFullToday,
        due_date: dateFullToday,
        bill_id: bill.id
      })
    }

    console.log('Bill was created')
  }
}

module.exports = CreateSpentYear
