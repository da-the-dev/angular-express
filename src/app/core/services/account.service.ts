import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs'
import { ReturnUser } from '../interfaces/return-user';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(
    private httpClient: HttpClient
  ) { }

  async register(nickname: string, password: string) {
    console.log('hashing...')
    const passHash = await bcrypt.hash(password, 10)
    console.log('hashed! sending...')
    return this.httpClient.post<ReturnUser>(`${baseUrl}/api/v3/register`, { nickname, passHash })
  }

  async login(nickname: string, password: string) {

  }
  // async register(nickname: string, password: string) {
  //   console.log(passHash)
  // }
}
