import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs'
import { ReturnUser } from '../interfaces/return-user';
import { environment } from 'src/environments/environment';
import { DBUser } from '../interfaces/dbuser';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(
    private httpClient: HttpClient,
    private auth: AuthService
  ) { }

  async findUser(nickname: string) {
    try {
      return await (this.httpClient.get<DBUser>(`${baseUrl}/api/v3/login/${nickname}`).toPromise())
    } catch (error) {
      return false
    }
  }

  async register(nickname: string, password: string) {
    const passHash = await bcrypt.hash(password, 10)
    return this.httpClient.post<ReturnUser>(`${baseUrl}/api/v3/register`, { nickname, passHash })
  }

  async login(nickname: string, password: string) {
    const user = await this.httpClient.get<DBUser>(`${baseUrl}/api/v3/login/${nickname}`).toPromise()

    // Successful login
    if (user.nickname == nickname && await bcrypt.compare(password, user.passHash)) {
      this.auth.login(password)
      return new Observable(subscriber => {
        subscriber.next(true)
        subscriber.complete()
      })
    }
    // Invalid password
    else if (user.nickname == nickname && !await bcrypt.compare(password, user.passHash))
      return new Observable(subscriber => {
        subscriber.error({ status: 400 })
        subscriber.complete()
      })
    // User doesn't exist
    else
      return new Observable(subscriber => {
        subscriber.error({ status: 404 })
        subscriber.complete()
      })
  }

  logout() {
    this.auth.logout()
  }
}