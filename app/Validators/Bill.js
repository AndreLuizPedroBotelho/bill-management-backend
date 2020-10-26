'use strict'
const Antl = use('Antl')

class Bill {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required|string|unique:bills',
      due_day: 'required_when:type,month,year',
      month_day: 'required_when:type,year',
      type: 'required|string',
      value: 'required|number'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Bill
