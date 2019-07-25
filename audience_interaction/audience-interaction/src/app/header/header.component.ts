import { Component, OnInit, Output } from "@angular/core";
import { AuthenticationService } from "../shared/authentication.service";
import { Router } from "@angular/router";
import { StorageService } from "../shared/storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  //here we keep the state if the user is logged
  @Output() isLogged = false;
  constructor(
    private router: Router,
    private authentication: AuthenticationService,
    private storageService: StorageService
  ) {}

  onLogout() {
    //here if the user hit loggout button we subscribe for the event and we set the value that will hide some of the buttons in the navbar
    this.authentication.loggedEmmiter.subscribe(logged => {
      this.isLogged = logged;
    });
    this.storageService.deleteData(null);
    this.router.navigate(["/login"]);
    this.authentication.loggedEmmiter.next(false);
  }

  ngOnInit() {
    //here we check if a user is logged in
    if (this.storageService.getData("userId")) {
      this.isLogged = true;
    }
    //if user is logged in we subscribe for that event and we change isLogged to show some of the buttons
    this.authentication.loggedEmmiter.subscribe(logged => {
      this.isLogged = logged;
    });
  }
}
