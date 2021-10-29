import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Cat } from '../interfaces/cat';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllCats() {
    return this.httpClient.get<Cat[]>('/api/v2/cats')
  }
  getCat(name: string) {
    return this.httpClient.get<Cat>(`/api/v2/cats/${name}`)
  }
  addCat(name: string, payload?: Record<string, any>) {
    return this.httpClient.put<Cat>(`/api/v2/cats/${name}`, payload || {})
  }
  killCat(name: string) {
    return this.httpClient.delete<void>(`/api/v2/cats/${name}`)
  }
}