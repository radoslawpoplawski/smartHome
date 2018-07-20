class UserService {
  constructor() {
    this.user = {}
  }

  isUserLogged () {
    return !!this.user.id
  }
}

export let userService = new UserService()
