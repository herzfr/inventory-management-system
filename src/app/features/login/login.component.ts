import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import {
  UserInterface,
  UserLoginInterface,
  UserWithoutRolesAndName,
} from 'src/app/shared/interfaces/user.types';
import { CustomValidators } from 'src/app/shared/utilities/custom-validator.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  private signinSubscription: Subscription | undefined;

  hide: boolean = true;
  loading: boolean = false;
  invalid: boolean = false;

  username: FormControl = new FormControl('', [
    Validators.required,
    CustomValidators.usernameValidator,
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    CustomValidators.passwordValidator,
  ]);

  // Service
  userservice = inject(UserService);
  authservice = inject(AuthService);
  router = inject(Router);

  // Login func
  login() {
    this.loading = true;
    setTimeout(async () => {
      let user: UserWithoutRolesAndName = {
        username: this.username.value,
        password: this.password.value,
      };
      this.signinSubscription = this.userservice.signin(user)
        .subscribe((result) => {
          console.log(result)
          if (result.status.includes("00")) {
            this.invalid = false 
            this.authservice.doLogged(result.data as UserLoginInterface)
            this.router.navigate(['inventory'])
          } else {
            this.invalid = true
          }
      })
    }, 1000); // Adjust the time as per your requirement
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    if (this.signinSubscription) {
      this.signinSubscription.unsubscribe();
    }
  }

}
