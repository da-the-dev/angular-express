import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Cat } from '../interfaces/cat';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseUrl


@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllCats() {
    return this.httpClient.get<Cat[]>(`${baseUrl}/api/v2/cats`)
  }
  getCat(name: string) {
    return this.httpClient.get<Cat>(`${baseUrl}/api/v2/cats/${name}`)
  }
  addCat(name: string, payload?: Record<string, any>) {
    return this.httpClient.put<Cat>(`${baseUrl}/api/v2/cats/${name}`, payload || {})
  }
  killCat(name: string) {
    return this.httpClient.delete<void>(`${baseUrl}/api/v2/cats/${name}`)
  }
}