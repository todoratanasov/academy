import { Component, OnInit, ViewChild } from "@angular/core";
import { StorageService } from "src/app/shared/storage.service";
import { NgForm } from "@angular/forms";
import { RequestService } from "src/app/shared/request.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-event-create",
  templateUrl: "./event-create.component.html",
  styleUrls: ["./event-create.component.css"]
})
export class EventCreateComponent implements OnInit {
  @ViewChild("registerEvent", { static: false }) registerEvent: NgForm;
  //this is the data that we're going to send to the backend
  data = {
    creator: "",
    name: "",
    description: ""
  };

  constructor(
    private storage: StorageService,
    private requester: RequestService,
    private router: Router
  ) {
    //when an event is created we store the creator's Id in the localStorage
    this.data.creator = this.storage.getData("userId");
  }

  onSubmit() {
    //we set the data object kvp
    this.data.description = this.registerEvent.value.description;
    this.data.name = this.registerEvent.value.name;
    this.requester
      //we send POST request to create the event
      .sendRequest("/event/register", "POST", this.data, {})
      .then(result => {
        //we navigate to the event main window
        this.router.navigate(["window", result.data.eventId]);
      })
      .catch(err => {
        console.log(`This is an error from creating an event ${err}`);
      });
  }
  ngOnInit() {}
}
