import { Inject, Injectable } from '@angular/core';
import { UserInterface, UserLoginInterface, UserWithoutRolesAndName } from 'src/app/shared/interfaces/user.types';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/app.module';
import { map } from 'rxjs';
import { GeneralResponse } from 'src/app/shared/interfaces/response.type';
import { InventoryItem } from 'src/app/shared/interfaces/inventory.type';
import { Supplier } from 'src/app/shared/interfaces/supplier.type';
import { Sale } from 'src/app/shared/interfaces/sales.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject(API_URL) private apiUrl: string, private http: HttpClient ,private authService: AuthService) { }

  get header() {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  signin(payload: UserWithoutRolesAndName) {
    return this.http.post<GeneralResponse>(`${this.apiUrl}login`, payload)
  }

  inventories() {
    let headers = this.header
    return this.http.get<InventoryItem[]>(`${this.apiUrl}inventories`, { headers })
  }
  
  supplier() {
    let headers = this.header
    return this.http.get<Supplier[]>(`${this.apiUrl}supplier`, { headers })
  }

  sales() {
    let headers = this.header
    return this.http.get<Sale[]>(`${this.apiUrl}sales`, { headers })
  }

}
