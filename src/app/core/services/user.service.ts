import { Inject, Injectable } from '@angular/core';
import { UserInterface, UserLoginInterface, UserWithoutRolesAndName } from 'src/app/shared/interfaces/user.types';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.module';
import { map } from 'rxjs';
import { GeneralResponse } from 'src/app/shared/interfaces/response.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject(API_URL) private apiUrl: string, private http: HttpClient ,private authService: AuthService) { }

  signin(payload: UserWithoutRolesAndName) {
    return this.http.post<GeneralResponse>(`${this.apiUrl}login`, payload)
  }
  

}
