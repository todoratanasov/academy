import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthenticationService {
  constructor(private storage: StorageService) {}
  onLogout() {
    this.storage.deleteData(null);
  }
}
