'use strict'
const Antl = use('Antl')

class Spent {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required|string',
      description: 'string',
      value: 'required|number',
      purchase_date: 'required|date',
      due_date: 'required|date',
      payment_date: 'date',
      bill_id: 'integer'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Spent
