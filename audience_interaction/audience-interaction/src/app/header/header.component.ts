import { Component, OnInit, Output } from "@angular/core";
import { AuthenticationService } from "../shared/authentication.service";
import { Router } from "@angular/router";
import { StorageService } from '../shared/storage.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Output() isLogged = false;
  constructor( private router: Router, private authentication: AuthenticationService, private storageService: StorageService) {}

  onLogout() {
    this.authentication.loggedEmmiter.subscribe(logged=>{
      this.isLogged=logged});
      this.storageService.deleteData(null);
      this.router.navigate(["/login"]);
      this.authentication.loggedEmmiter.next(false);
  }

  ngOnInit() {
    if(this.storageService.getData("userId")){
      this.isLogged=true;}
    this.authentication.loggedEmmiter.subscribe(logged=>{
      this.isLogged=logged;
      
    });
    
  }
}
