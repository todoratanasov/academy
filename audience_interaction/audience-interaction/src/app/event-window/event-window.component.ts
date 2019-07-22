import { Component, OnInit, OnChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RequestService } from "../shared/request.service";
import { ChatService } from "../shared/chat.service";

@Component({
  selector: "app-event-window",
  templateUrl: "./event-window.component.html",
  styleUrls: ["./event-window.component.css"]
})
export class EventWindowComponent implements OnInit {
  eventId = "";
  firstEmit = true;
  //event will be passed to the sidebar.component
  event = {
    creatorName: "",
    eventDescription: "",
    eventName: "",
    currentEventId: ""
  };

  //messagess will be passed to the message.component
  messages = [];
  constructor(
    private route: ActivatedRoute,
    private requester: RequestService,
    private chat: ChatService
  ) {}
  ngOnInit() {
    //with one request information about the event and all messagess will be received
    this.chat.messages.subscribe(msg => {
      this.messages.push(msg.text);
    });
    if (this.firstEmit === true) {
      this.firstEmit = false;
      this.eventId = this.route.snapshot.params["id"];
      this.requester
        .sendRequest(`/event/event:${this.eventId}`, "GET", {}, {})
        .then(result => {
          this.event.creatorName = result.data.creatorName;
          this.event.eventDescription = result.data.eventDescription;
          this.event.eventName = result.data.eventName;
          this.event.currentEventId = this.eventId;
          this.messages = result.data.messages;
        });
    }
  }
}
