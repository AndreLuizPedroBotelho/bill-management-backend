'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request, response }) {
    const data = request.only(['name', 'email', 'password', 'salary', 'type'])

    if (!['admin', 'basic'].includes(data.type)) {
      return response
        .status(400)
        .send({ error: { message: "Type doesn't found" } })
    }

    const user = await User.create(data)

    return user
  }

  async update ({ request, params, response }) {
    try {
      const data = request.only(['name', 'password', 'salary'])

      const user = await User.findByOrFail({
        id: params.id
      })

      user.merge(data)

      await user.save()

      return user
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Spent doesn't found" } })
    }
  }

  async index ({ request, response, auth }) {
    const { page } = request.get()

    const users = await User.query().paginate(page)

    return users
  }

  async show ({ params, response }) {
    try {
      const user = await User.findByOrFail({
        id: params.id
      })

      return user
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "User doesn't found" } })
    }
  }

  async destroy ({ params, response, auth }) {
    try {
      const user = await User.findByOrFail({
        id: params.id
      })

      await user.delete()
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "User doesn't found" } })
    }
  }
}

module.exports = UserController
