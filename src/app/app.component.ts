import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { Cat } from './core/interfaces/cat';
import { CatService } from './core/services/cat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-express';

  catForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    age: new FormControl('', [Validators.pattern('[0-9]+')])
  })

  cats: Cat[] = []
  show = true
  addCatName: string
  killCatName: string

  constructor(
    private catService: CatService
  ) { }

  ngOnInit(): void { }

  submit() {
    this.catService.getAllCats().subscribe(ev => this.cats = ev)
  }
  toggle() {
    this.show = !this.show
  }
  addCat() {
    if (this.catForm.valid)
      this.catService.addCat(this.catForm.get('name')?.value).subscribe(res => this.submit())
  }
  killCat() {
    if (this.catForm.valid)
      this.catService.killCat(this.catForm.get('name')?.value).subscribe(res => this.submit())
  }

  catAgeValidate() {
    console.log(this.catForm.get('age')?.value)
    if (Number(this.catForm.get('age')?.value) && Number(this.catForm.get('age')?.value) > 0)
      return true
    else
      return false
  }

  log(any?: any) {
    console.log(any)
  }
}
