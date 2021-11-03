import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/core/services/account.service';

const passwordRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private accountService: AccountService
  ) { }

  registerForm = new FormGroup({
    nickname: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.pattern(passwordRegex)])
  })

  get nickname() {
    return this.registerForm.get('nickname')!
  }
  get password() {
    return this.registerForm.get('password')!
  }

  submit() {
    if (this.registerForm.valid) {
      this.accountService.register(this.nickname.value, this.password.value).then(o => o.subscribe(res => console.log('sent!')))
    }
  }

  log(any: any) {
    console.log(any)
  }

  ngOnInit(): void {
  }

}
