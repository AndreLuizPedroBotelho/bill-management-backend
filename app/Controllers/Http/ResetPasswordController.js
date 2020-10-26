'use strict'

const User = use('App/Models/User')
const Env = use('Env')

class ResetPasswordController {
  async update ({ request, response, params, auth }) {
    try {
      const userId = request.input('user_id')
      const user = await User.findOrFail(userId)
      user.password = Env.get('PASSWORD_DEFAULT')

      await user.save()

      return response.status(200).send({ message: 'Password resets with success' })
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Spent doesn't found" } })
    }
  }
}

module.exports = ResetPasswordController
