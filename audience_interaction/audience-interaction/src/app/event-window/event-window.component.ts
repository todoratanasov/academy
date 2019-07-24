import { Component, OnInit, OnChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RequestService } from "../shared/request.service";
import { ChatService } from "../shared/chat.service";
import { DeleteService } from "../shared/delete.service";
import { StorageService } from "../shared/storage.service";
import { VotingService } from "../shared/voting.service";

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
  isCreator = false;
  constructor(
    private route: ActivatedRoute,
    private requester: RequestService,
    private chat: ChatService,
    private deleteService: DeleteService,
    private storageService: StorageService,
    private voteService: VotingService
  ) {}
  ngOnInit() {
    //with one request information about the event and all messagess will be received
    this.chat.messages.subscribe(msg => {
      this.messages.push(msg.text);
    });

    this.voteService.messages.subscribe(response => {
      this.event.creatorName = response.text.creatorName;
      this.event.eventDescription = response.text.eventDescription;
      this.event.eventName = response.text.eventName;
      this.event.currentEventId = this.eventId;
      this.messages = response.text.messages;
    });

    this.deleteService.messages.subscribe(result => {
      this.event.creatorName = result.text.creatorName;
      this.event.eventDescription = result.text.eventDescription;
      this.event.eventName = result.text.eventName;
      this.event.currentEventId = this.eventId;
      this.messages = result.text.messages;
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
          if (this.storageService.getData("userId") === result.data.creatorId) {
            this.isCreator = true;
          }
        });
    }
  }
}
