import { Injectable, Injector } from '@angular/core';
import { LocalStorage } from '../../../../common/local-storage';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CONST from '../../../../common/Constants';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isUserExist$ = new BehaviorSubject<boolean>(this.hasAccessToken());

  public userType$ = new BehaviorSubject<string>(
    this.getCurrentUserTypeFromLocalStorage()
  );
  public currentUserPermissions$ = new BehaviorSubject<string[]>(
    this.getUserPermissionFromLocalStorage()
  );

  public currentUserName$ = new BehaviorSubject<string>(
    this.getCurrentUserFullName()
  );

  public currentUserId$ = new BehaviorSubject<string>(this.getCurrentUserId());

  public currentUserAuthenticationToken$ = new BehaviorSubject<string>(
    this.getCurrentUserAuthenticationToken()
  );

  public isTokenAlive$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private store: LocalStorage,
    private injector: Injector
  ) {}

  // Login
  async userLogin(email: string, password: string) {
    const credentials = { email, password };
    const status = await this.http
      .post(CONST.USER_LOGIN, credentials)
      .toPromise();
    return status;
  }

  // Logout
  userLogout() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.currentUserAuthenticationToken$.getValue()
    });
    const options = { headers };
    return this.http.post(CONST.USER_LOGOUT, null, options);
  }

  async login(email: string, password: string) {
    const status = await this.userLogin(email, password);
    this.setLocalStorage(status);
    return status;
  }

  async logout() {
    const status = await this.userLogout().toPromise();
    this.clearLocalStorage();
    return status;
  }

  /*----------  Helper Methods  ----------*/

  // check access token exists or not
  hasAccessToken(): boolean {
    return !!this.store.getStorageData('token');
  }

  // gets current user's authentication token
  getCurrentUserAuthenticationToken(): string {
    if (!!this.store.getStorageData('token')) {
      return this.store.getStorageData('token');
    }
    return '';
  }

  // Gets user type of current logged in user
  getCurrentUserTypeFromLocalStorage(): string {
    if (!!this.store.getStorageData('userType')) {
      return this.store.getStorageData('userType');
    }
    return '';
  }

  // Gets the permission of the current active
  getUserPermissionFromLocalStorage(): string[] {
    if (!!this.store.getStorageData('permission')) {
      return JSON.parse(this.store.getStorageData('permission'));
    }
    return [];
  }

  // subscribes currently logged in username
  getCurrentUserFullName(): string {
    if (!!this.store.getStorageData('username')) {
      return this.store.getStorageData('username');
    }
    return '';
  }

  // subscribes currently logged in user's id
  getCurrentUserId(): string {
    if (!!this.store.getStorageData('userId')) {
      return this.store.getStorageData('userId');
    }
    return '';
  }

  clearLocalStorage(): void {
    this.store.clearStorageData();
    this.currentUserPermissions$.next([]);
    this.userType$.next('');
    this.currentUserId$.next('');
    this.currentUserAuthenticationToken$.next('');
    this.isTokenAlive$.next(false);
    this.currentUserName$.next('');
    this.isUserExist$.next(false);
  }

  setLocalStorage(data: any): void {
    this.store.storeData('login', true);
    this.store.storeData('token', data.data.token);
    this.currentUserAuthenticationToken$.next(data.data.token);
    this.isTokenAlive$.next(true);
    this.currentUserPermissions$.next(data.data.roles);
    this.currentUserAuthenticationToken$.next(data.data.token);
    this.isUserExist$.next(true);
  }
}
