// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SessionStorageName } from 'src/app/shared/const/session_storage.const';
import { UserLoginInterface, UserWithoutPassword } from 'src/app/shared/interfaces/user.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() {
    this.checkLogged()
  }

  checkLogged() {
    if (this.getToken() !== null) {
      this.isLogged.next(true)
    }
  }

  
  doLogged(user: UserLoginInterface) {
    this.setToken(user.token)
    this.setRoles(user.user.roles)
    this.setUser(user.user)
  }

  setToken(token: string): void {
    sessionStorage.setItem(SessionStorageName.TOKEN, token)
  }

  setRoles(roles: string[]): void {
    sessionStorage.setItem(SessionStorageName.ROLES, JSON.stringify(roles))
  }

  setUser(user: UserWithoutPassword): void {
    sessionStorage.setItem(SessionStorageName.USER, JSON.stringify(user))
  }

  logout(): void {
    sessionStorage.removeItem(SessionStorageName.TOKEN)
    sessionStorage.removeItem(SessionStorageName.ROLES)
    sessionStorage.removeItem(SessionStorageName.USER)
    this.isLogged.next(false)
  }

  getToken(): string | null {
    return sessionStorage.getItem(SessionStorageName.TOKEN) || null
  }

  getRoles(): string[] {
    const roles = sessionStorage.getItem(SessionStorageName.ROLES) || '[]'
    const role: string[] = JSON.parse(roles)
    if (role) return role;
    else return []
  }

  getUser(): UserWithoutPassword {
    return JSON.parse(sessionStorage.getItem(SessionStorageName.USER) || '')
  }

  isAuthenticated(): Observable<boolean> {
    this.checkLogged()
    return this.isLogged.asObservable()
  }

}
