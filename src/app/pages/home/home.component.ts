import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CatData } from 'src/app/core/interfaces/cat-data';
import { CatService } from 'src/app/core/services/cat.service';
import anime, { stagger } from 'animejs'
import { AnimeInstance } from 'animejs'
import { CompileTemplateMetadata } from '@angular/compiler';

const checkElement = async (selector: any) => {
  while (document.querySelector(selector) === null) {
    await new Promise(resolve => requestAnimationFrame(resolve))
  }
  return document.querySelector(selector);
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  reloadAnim: AnimeInstance
  async ngAfterViewInit() {
    this.submit()
    // checkElement('.catData').then(() => {
    //   console.log(document.querySelectorAll('.catData'))
    //   anime({
    //     targets: document.querySelectorAll('.catData'),
    //     translate: '400px',
    //     duration: anime.stagger(100),
    //     easing: 'easeInOutSine',
    //     complete: () => {
    //       console.log('done!')
    //       document.querySelectorAll('.catData').forEach(el => {
    //         // console.log(el)
    //         el.classList.remove('catData')
    //         //@ts-ignore
    //         el.style.removeProperty('translate')
    //         console.log(el)
    //       })
    //     }
    //   })
    // })

    this.reloadAnim = anime({
      targets: document.querySelector('.reload'),
      rotate: '2turn',
      duration: 2000,
      autoplay: false,
    })
  }

  isCollapsed = false;
  updateCollapsed = true;

  catForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    age: new FormControl('', [Validators.pattern('[0-9]+')])
  })

  cats: CatData[] = []
  show = true
  addCatName: string
  killCatName: string

  constructor(
    private catService: CatService
  ) { }



  get age() {
    return this.catForm.get('age')!
  }
  get name() {
    return this.catForm.get('name')!
  }

  submit() {
    this.catService.getAllCats().subscribe(ev => {
      const catStates = this.cats.map(c => c.isCollapsed)
      this.cats = ev.map((c, i) => {
        return {
          cat: c,
          isCollapsed: catStates[i] === undefined ? true : catStates[i]
        }
      })
    })
  }
  toggle() {
    this.show = !this.show
  }
  addCat() {
    if (this.catForm.valid)
      this.catService.addCat(this.name.value).subscribe(res => this.submit())
  }
  killCat() {
    if (this.catForm.valid)
      this.catService.killCat(this.name.value).subscribe(res => this.submit())
  }
  updateCat() {
    if (this.catForm.valid) {
      this.catService.updateCat(this.name.value, { age: this.age.value }).subscribe(res => {
        const updatedCatIndex = this.cats.findIndex(c => c.cat.name == res.name)
        this.cats[updatedCatIndex] = { cat: res, isCollapsed: this.cats[updatedCatIndex].isCollapsed }
      })
    }
  }
  reset() {
    this.catForm.reset()
    this.catService.reset().subscribe(res => {
      this.cats = res.map((c, i) => {
        return {
          cat: res[i],
          isCollapsed: this.cats[i].isCollapsed
        }
      })
    })
  }


  reloadSpin() {
    this.reloadAnim.restart()
  }

  log(any?: any) {
    console.log(any)
  }

}
