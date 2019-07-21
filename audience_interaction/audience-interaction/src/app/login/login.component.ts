import { Component, OnInit, ViewChild } from "@angular/core";
import { RequestService } from "../shared/request.service";
import { StorageService } from "../shared/storage.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @ViewChild("loginForm", { static: false }) loginForm: NgForm;
  data = {
    username: "",
    password: ""
  };
  constructor(
    private requester: RequestService,
    private storage: StorageService,
    private router: Router
  ) {}

  onTest() {
    this.requester.sendRequest("/test", "GET", {}, {}).then(result => {
      console.log("It works!");
      this.storage.saveData("key", result.data);
    });
  }
  onSubmit() {
    this.data.username = btoa(this.loginForm.value.username);
    this.data.password = btoa(this.loginForm.value.password);
    this.requester
      .sendRequest("/user/login", "POST", this.data, {})
      .then(result => {
        this.storage.saveData("username", result.data.username);
        this.storage.saveData("token", result.data.token);
        this.storage.saveData("userId", result.data.userId);
        this.router.navigate(["/"]);
      })
      .catch(error => {
        console.log("we have error" + error);
      });
  }
  ngOnInit() {}
}
