import { Component, OnInit, ViewChild } from "@angular/core";
import { RequestService } from "../shared/request.service";
import { StorageService } from "../shared/storage.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @ViewChild("loginForm", { static: false }) loginForm: NgForm;
  //this is the data that we are going to send to the backend
  data = {
    username: "",
    password: ""
  };

  constructor(
    private requester: RequestService,
    private storage: StorageService,
    private router: Router,
    private authentication: AuthenticationService
  ) {}

  onSubmit() {
    //we create base64 strings of the username and the password and we set the data object's kvp
    this.data.username = btoa(this.loginForm.value.username);
    this.data.password = btoa(this.loginForm.value.password);
    this.requester
      .sendRequest("/user/login", "POST", this.data, {})
      .then(result => {
        //we store some data form the backend in to the localstorage of the browser
        this.storage.saveData("username", result.data.username);
        this.storage.saveData("token", result.data.token);
        this.storage.saveData("userId", result.data.userId);
        //we envoke the loggedEmmiter and we pass true because the user is logged
        this.authentication.loggedEmmiter.next(true);
        this.router.navigate(["/"]);
      })
      .catch(error => {
        console.log("we have error" + error);
      });
  }
  ngOnInit() {}
}
