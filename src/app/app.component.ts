import { Component, OnInit } from '@angular/core';
import { Cat } from './core/interfaces/cat';
import { CatService } from './core/services/cat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-express';

  cats: Cat[] = []
  addCatName: string
  killCatName: string

  constructor(
    private catService: CatService
  ) { }

  submit() {
    this.catService.getAllCats().subscribe(ev => this.cats = ev)
  }
  addCat(name: string, body?: Record<string, any>) {
    console.log(name)
    this.catService.addCat(name, body).subscribe(res => this.submit())
  }
  killCat(name: string) {
    this.catService.killCat(name).subscribe(res => this.submit())
  }

  log(any?: any) {
    console.log(any)
  }

}
