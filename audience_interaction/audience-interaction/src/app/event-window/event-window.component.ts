import { Component, OnInit, OnChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RequestService } from "../shared/request.service";

@Component({
  selector: "app-event-window",
  templateUrl: "./event-window.component.html",
  styleUrls: ["./event-window.component.css"]
})
export class EventWindowComponent implements OnInit {
  eventId = "";

  //event will be passed to the sidebar.component
  event = {
    creatorName: "",
    eventDescription: "",
    eventName: ""
  };

  //messagess will be passed to the message.component
  messages = [];
  constructor(
    private route: ActivatedRoute,
    private requester: RequestService
  ) {}
  ngOnInit() {
    //with one request information about the event and all messagess will be received
    this.eventId = this.route.snapshot.params["id"];
    this.requester
      .sendRequest(`/event/event:${this.eventId}`, "GET", {}, {})
      .then(result => {
        this.event.creatorName = result.data.creatorName;
        this.event.eventDescription = result.data.eventDescription;
        this.event.eventName = result.data.eventName;
        this.messages = result.data.messages;
      });
  }
}
