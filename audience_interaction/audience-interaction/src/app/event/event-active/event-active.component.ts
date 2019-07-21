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
    this.requester.sendRequest("/event/events", "GET", {}, {}).then(result => {
      this.events = result.data.eventsDb;
      console.log(this.events);
    });
  }
}
