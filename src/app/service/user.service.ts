import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private loggedInUser: any;

  constructor() { }

  setLoggedInUser(user: any) {
    this.loggedInUser = user;
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }
}
