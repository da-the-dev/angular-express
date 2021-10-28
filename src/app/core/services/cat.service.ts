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
    return this.httpClient.get<Cat[]>('http://localhost:4200/api/v1/cats')
  }
}
