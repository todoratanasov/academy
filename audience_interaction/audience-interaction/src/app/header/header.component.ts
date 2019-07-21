import { Component, OnInit, Output } from "@angular/core";
import { StorageService } from "../shared/storage.service";
import { AuthenticationService } from "../shared/authentication.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Output() isLogged = false;
  constructor(private logout: AuthenticationService, private router: Router) {}
  onLogout() {
    this.logout.onLogout();
    this.router.navigate(["/"]);
  }
  ngOnInit() {}
}
