import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth.service';

const passwordRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private auth: AuthService,
    private router: Router
  ) { }

  successfullyRegistered = false

  accountExists(): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      return await this.accountService.findUser(control.value) ? { 'accountExists': true } : null
    }
  }

  registerForm = new FormGroup({
    nickname: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)], this.accountExists()),
    password: new FormControl('', [Validators.required, Validators.pattern(passwordRegex)])
  })

  get nickname() {
    return this.registerForm.get('nickname')!
  }
  get password() {
    return this.registerForm.get('password')!
  }

  submit() {
    this.registerForm.updateValueAndValidity()

    if (this.registerForm.valid) {
      this.accountService.register(this.nickname.value, this.password.value).then(o => o.subscribe(
        res => {
          this.successfullyRegistered = true
          this.auth.loginStorage(this.password.value)
          this.router.navigate(['home'])
        }
      ))
    }
  }

  resetAccCheck() {
    this.log('changed')
  }

  log(any: any) {
    console.log(any)
  }

  ngOnInit(): void {
  }

}
