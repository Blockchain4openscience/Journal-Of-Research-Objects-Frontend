import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  write(key: string, value: any) {
      if (value) {
          value = JSON.stringify(value);
      }
      localStorage.setItem(key, value);
  }

  read<T>(key: string): T {
      let value: string = localStorage.getItem(key);

      if (value && value != "undefined" && value != "null") {
          return <T>JSON.parse(value);
      }

      return null;
  }

  clear(){ //Empties Local Storage
    localStorage.clear();
  }
}