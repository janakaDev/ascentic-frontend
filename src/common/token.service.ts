import { Injectable } from '@angular/core';
import { LocalStorage } from './local-storage';

@Injectable()
export class TokenService {
  token: any;

  constructor(private storage: LocalStorage) {
    if (storage.getStorageData('login') != null) {
      const login = storage.getStorageData('login');
      if (login) {
        this.token = storage.getStorageData('token');
      }
    }
  }

  refresh() {
    if (this.storage.getStorageData('login') != null) {
      const login = this.storage.getStorageData('login');
      if (login) {
        this.token = this.storage.getStorageData('token');
      }
    }
  }

  getToken() {
    return this.token;
  }
}
