import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
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
  show = true
  addCatName: string
  killCatName: string

  constructor(
    private catService: CatService
  ) { }

  submit() {
    this.catService.getAllCats().subscribe(ev => this.cats = ev)
  }
  toggle() {
    this.show = !this.show
  }
  addCat(catForm: NgModel) {
    console.log(catForm.value)
    if (catForm.valid)
      this.catService.addCat(catForm.value).subscribe(res => this.submit())
  }
  killCat(catForm: NgModel) {
    if (catForm.valid)
      this.catService.killCat(catForm.value).subscribe(res => this.submit())
  }

  // catAgeValidate(catAgeForm: NgForm) {
  //   if (Number(catAgeForm.value) && Number(catAgeForm.value) > 0)
  //     return true
  //   else
  //     return false
  // }
}
