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
    this.data.creator = this.storage.getData("userId");
  }

  onSubmit() {
    this.data.description = this.registerEvent.value.description;
    this.data.name = this.registerEvent.value.name;
    this.requester
      .sendRequest("/event/register", "POST", this.data, {})
      .then(result => {
        this.router.navigate(["window", result.data.eventId]);
      })
      .catch(err => {
        console.log(`This is an error from creating an event ${err}`);
      });
  }
  ngOnInit() {}
}
