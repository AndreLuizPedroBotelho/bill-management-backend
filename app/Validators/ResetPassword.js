'use strict'
const Antl = use('Antl')

class ResetPassword {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      user_id: 'required|integer'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ResetPassword
