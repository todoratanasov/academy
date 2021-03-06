import { Component, OnInit } from "@angular/core";
import { RequestService } from "src/app/shared/request.service";

@Component({
  selector: "app-event-active",
  templateUrl: "./event-active.component.html",
  styleUrls: ["./event-active.component.css"]
})
export class EventActiveComponent implements OnInit {
  events = [];
  constructor(private requester: RequestService) {}

  ngOnInit() {
    //here we get all avtive events from the backend
    this.requester.sendRequest("/event/events", "GET", {}, {}).then(result => {
      this.events = result.data.mappedEvents;
    });
  }
}
