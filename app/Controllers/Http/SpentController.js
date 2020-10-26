'use strict'

const Spent = use('App/Models/Spent')

class SpentController {
  async index ({ request, response, auth }) {
    const { page } = request.get()

    const spents = await Spent.query()
      .with('user')
      .with('bill')
      .where('user_id', auth.user.id)
      .paginate(page)

    return spents
  }

  async store ({ request, auth }) {
    const data = request.only(['title', 'description', 'purchase_date', 'due_date', 'payment_date', 'value', 'bill_id'])

    const spent = await Spent.create({ ...data, user_id: auth.user.id })

    return spent
  }

  async show ({ params, request, response, auth }) {
    try {
      const spent = await Spent.findByOrFail({
        user_id: auth.user.id,
        id: params.id
      })

      await spent.load('user')
      await spent.load('bill')

      return spent
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Spent doesn't found" } })
    }
  }

  async update ({ params, request, auth, response }) {
    try {
      const data = request.only(['title', 'description', 'purchase_date', 'due_date', 'payment_date', 'value', 'bill_id'])

      const spent = await Spent.findByOrFail({
        user_id: auth.user.id,
        id: params.id
      })

      spent.merge(data)

      await spent.save()

      return spent
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Spent doesn't found" } })
    }
  }

  async destroy ({ params, request, response, auth }) {
    try {
      const spent = await Spent.findByOrFail({
        user_id: auth.user.id,
        id: params.id
      })

      await spent.delete()
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Bill doesn't found" } })
    }
  }
}

module.exports = SpentController
