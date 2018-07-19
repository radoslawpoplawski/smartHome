import { userService } from '../../services/user.service'
import { ROUTING } from './routing.const'

export const EnterGuard = function (to, from, next) {
  if (false) {
    next(ROUTING.main)
    return
  }
  next()
}

export const NotLoggedGuard = function (to, from, next) {
  if (userService.isUserLogged()) {
    next(ROUTING.form)
    return
  }
  next()
}

export const LoggedGuard = function (to, from, next) {
  if (!userService.isUserLogged()) {
    next(ROUTING.main)
    return
  }
  next()
}
