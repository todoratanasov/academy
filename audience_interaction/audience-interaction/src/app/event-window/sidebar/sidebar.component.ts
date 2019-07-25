import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ChatService } from "../../shared/chat.service";
import { NgForm } from "@angular/forms";
import { StorageService } from "src/app/shared/storage.service";
import { CloseEventService } from "src/app/shared/close-event.service";
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  //this is the "ask question" form
  @ViewChild("messageForm", { static: false }) messageForm: NgForm;

  //here we receive some date from event window component
  @Input() event: {
    creatorName: string;
    eventDescription: string;
    eventName: string;
    currentEventId: string;
  };

  @Input() isCreator;
  //if a message is send a new message for the user is going to be shown
  messageSend = false;
  //the data we send to the backend
  data = {
    content: "",
    sender: "",
    eventId: "",
    senderId: ""
  };
  //we check if the event is active
  isActive = true;
  constructor(
    private chat: ChatService,
    private storage: StorageService,
    private closeEvent: CloseEventService
  ) {}

  ngOnInit() {
    //we subsrcribe if event is closed
    this.closeEvent.messages.subscribe(response => {
      this.isActive = response.text;
    });
  }
  //here if the event is closed I don't recall what is happening :D
  onClose() {
    setTimeout(() => {
      this.messageSend = false;
    }, 1000);
  }
  //here we close the event
  onCloseEvent() {
    this.data.eventId = this.event.currentEventId;
    this.closeEvent.closeEvent(this.data);
  }
  //here we send message (ask questions)
  sendMessage() {
    this.messageSend = true;
    this.data.sender = this.storage.getData("username") || "unknown";
    this.data.senderId = this.storage.getData("userId");
    this.data.content = this.messageForm.value.message;
    this.data.eventId = this.event.currentEventId;
    this.chat.sendMsg(this.data);
  }
}
