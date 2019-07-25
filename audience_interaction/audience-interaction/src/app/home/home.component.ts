import { Component, OnInit } from "@angular/core";
import { StorageService } from "../shared/storage.service";
import { RequestService } from "../shared/request.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  //isLooged checks if a user is logged or not
  isLogged = true;
  constructor(
    private storage: StorageService,
    private requester: RequestService
  ) {}
  counter = "";
  ngOnInit() {
    //here we check if the user is logged and we set isLogged
    if (this.storage.getData("username")) {
      this.isLogged = true;
    }
    this.requester
      .sendRequest("/home/events", "GET", {}, {})
      .then(result => {
        //here we retreive the ammount of events to be displayed on the home page
        this.counter = result.data.events;
      })
      .catch(err => console.log(err));
  }
}
