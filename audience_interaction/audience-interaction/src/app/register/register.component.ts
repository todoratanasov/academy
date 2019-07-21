import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { RequestService } from "../shared/request.service";
import { StorageService } from "../shared/storage.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @ViewChild("registerForm", { static: false }) registerForm: NgForm;
  password = "";
  repeatPassword = "";
  data = {
    username: "",
    password: ""
  };
  constructor(
    private requester: RequestService,
    private storage: StorageService,
    private router: Router
  ) {}
  onSubmit() {
    this.password = this.registerForm.value.password;
    this.repeatPassword = this.registerForm.value.repeatPassword;
    if (this.password != this.repeatPassword) {
      console.log("passwords do not match");
    } else {
      this.data.username = btoa(this.registerForm.value.username);
      this.data.password = btoa(this.registerForm.value.password);
      this.requester
        .sendRequest("/user/register", "POST", this.data, {})
        .then(result => {
          this.storage.saveData("username", result.data.username);
          this.storage.saveData("token", result.data.token);
          this.storage.saveData("userId", result.data.userId);
          this.router.navigate(["/"]);
        })
        .catch(err => {
          console.log("There is an error " + err);
        });
    }
  }
  ngOnInit() {}
}
