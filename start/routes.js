'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.group(() => {
  Route.resource('spents', 'SpentController').apiOnly()
    .validator(new Map(
      [
        [
          ['spents.store'], ['Spent']
        ],
        [
          ['spents.update'], ['Spent']
        ]
      ]
    ))

  Route.resource('bills', 'BillController').apiOnly()
    .validator(new Map(
      [
        [
          ['bills.store'], ['Bill']
        ],
        [
          ['bills.update'], ['Bill']
        ]
      ]
    ))

  Route.put('users/:id', 'UserController.update').validator('UserUpdate')
  Route.get('users/:id', 'UserController.show')
  Route.delete('users/:id', 'UserController.destroy')
}).middleware(['auth'])

Route.group(() => {
  Route.get('users', 'UserController.index')
  Route.put('resetPassword', 'ResetPasswordController.update').validator('ResetPassword')
}).middleware(['auth'], ['admin'])
