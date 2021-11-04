import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private auth: AuthService,
    private router: Router
  ) { }

  successfullyRegistered = false

  accountExists(): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      return await this.accountService.findUser(control.value) ? null : { 'accountExists': false }
    }
  }

  loginForm = new FormGroup({
    // nickname: new FormControl('', [Validators.required, this.forbiddenNameValidator(/1234/)]),
    nickname: new FormControl('', [Validators.required], this.accountExists()),
    password: new FormControl('', [Validators.required])
  })

  get nickname() {
    return this.loginForm.get('nickname')!
  }
  get password() {
    return this.loginForm.get('password')!
  }


  submit() {
    this.loginForm.updateValueAndValidity()

    if (this.loginForm.valid) {
      this.accountService.login(this.nickname.value, this.password.value).then(o => o.subscribe(
        res => {
          this.successfullyRegistered = true
          this.auth.loginStorage(this.password.value)
          this.router.navigate(['home'])
        },
        err => {
          console.log(err)
          switch (err.status) {
            case 400:
              this.password.setErrors({ validPassword: false })
              break
            case 404:
              // not used
              break
          }
        }
      ))
    }

  }

  log(any?: any) {
    any ? console.log(any) : null
  }

  ngOnInit() { }

}
