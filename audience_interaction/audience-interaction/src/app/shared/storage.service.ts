import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {
  constructor() {}
  //saveData saves KVP in the localStorage
  saveData = (key, value) => {
    localStorage.setItem(key, value);
  };
  //getData retreives data from the localStorage
  getData = key => {
    return localStorage.getItem(key);
  };
  //deleteData deletes data from the localStorage
  deleteData = key => {
    if (!key) {
      localStorage.clear();
    } else {
      localStorage.removeItem(key);
    }
  };
}
