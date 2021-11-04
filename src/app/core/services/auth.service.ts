import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginStorage(token: string) {
    localStorage.setItem('isLoggedOn', 'true')
    localStorage.setItem('token', token)
  }
  logoutStorage() {
    localStorage.setItem('isLoggedOn', 'false')
    localStorage.removeItem('token')
  }

  isLoggedOn() {
    if (localStorage.getItem('isLoggedOn') == 'true')
      return true
    else if (localStorage.getItem('isLoggedOn') == 'false')
      return false
    return undefined
  }
  token() {
    return localStorage.getItem('token')
  }

  constructor() { }
}
