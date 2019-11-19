import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { Inject } from '@angular/core';

export class LocalStorage {
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {}

  storeData(key: any, value: any) {
    this.storage.set(key, value);
  }

  getStorageData(key: any) {
    return this.storage.get(key);
  }

  clearData(key: any) {
    this.storage.remove(key);
  }

  clearStorageData(): void {
    localStorage.clear();
  }
}
