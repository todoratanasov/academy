import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { RequestService } from "../shared/request.service";
import { StorageService } from "../shared/storage.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @ViewChild("registerForm", { static: false }) registerForm: NgForm;
  password = "";
  repeatPassword = "";
  //this is the data that we're going to send to the backend
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
    //we get the data form the form
    this.password = this.registerForm.value.password;
    this.repeatPassword = this.registerForm.value.repeatPassword;

    //some small validation for the password
    if (this.password != this.repeatPassword) {
      console.log("passwords do not match");
    } else {
      //we create base64 string and we set the data object's kvp
      this.data.username = btoa(this.registerForm.value.username);
      this.data.password = btoa(this.registerForm.value.password);
      this.requester
        .sendRequest("/user/register", "POST", this.data, {})
        .then(result => {
          //we store some data in to the browser's local storage
          this.storage.saveData("username", result.data.username);
          this.storage.saveData("token", result.data.token);
          this.storage.saveData("userId", result.data.userId);
          //we envoke the loggedEmmiter and we pass true because the user is logged
          this.authentication.loggedEmmiter.next(true);
          this.router.navigate(["/"]);
        })
        .catch(err => {
          console.log("There is an error " + err);
        });
    }
  }
  ngOnInit() {}
}
