'use strict'

const Bill = use('App/Models/Bill')

class BillController {
  async index ({ request, response, auth }) {
    const { page } = request.get()

    const bills = await Bill.query()
      .with('user')
      .where('user_id', auth.user.id)
      .paginate(page)

    return bills
  }

  async store ({ request, auth }) {
    const data = request.only(['title', 'due_day', 'month_day', 'type', 'value'])

    const bill = await Bill.create({ ...data, user_id: auth.user.id })

    return bill
  }

  async show ({ params, request, response, auth }) {
    try {
      const bill = await Bill.findByOrFail({
        user_id: auth.user.id,
        id: params.id
      })

      await bill.load('user')

      return bill
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Bill doesn't found" } })
    }
  }

  async update ({ params, request, auth, response }) {
    try {
      const data = request.only(['title', 'due_day', 'type', 'value'])

      const bill = await Bill.findByOrFail({
        user_id: auth.user.id,
        id: params.id
      })

      bill.merge(data)

      await bill.save()

      return bill
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Bill doesn't found" } })
    }
  }

  async destroy ({ params, request, response, auth }) {
    try {
      const bill = await Bill.findByOrFail({
        user_id: auth.user.id,
        id: params.id
      })

      await bill.delete()
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Bill doesn't found" } })
    }
  }
}

module.exports = BillController
