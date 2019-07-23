import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import {Subject} from 'rxjs';

@Injectable()
export class AuthenticationService {
  constructor(private storage: StorageService,) {}
  
  loggedEmmiter = new Subject<boolean>();
  
}
