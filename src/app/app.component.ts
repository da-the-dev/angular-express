import { Component, OnInit } from '@angular/core';
import { Cat } from './core/interfaces/cat';
import { CatService } from './core/services/cat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-express';

  cats: Cat[]

  constructor(
    private catService: CatService
  ) { }

  ngOnInit(): void {
    this.catService.getAllCats().subscribe(ev => this.cats = ev)
  }

  submit() {
    console.log(this.cats)
  }
}
