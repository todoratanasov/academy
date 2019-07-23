import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ChatService } from "../../shared/chat.service";
import { NgForm } from "@angular/forms";
import { StorageService } from "src/app/shared/storage.service";
import { CloseEventService } from 'src/app/shared/close-event.service';
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  @ViewChild("messageForm", { static: false }) messageForm: NgForm;
  @Input() event: {
    creatorName: string;
    eventDescription: string;
    eventName: string;
    currentEventId: string;
  };
  @Input() isCreator;
  messageSend = false;
  data = {
    content: "",
    sender: "",
    eventId: "",
    senderId: ""
  };
  isActive=true;
  constructor(private chat: ChatService, private storage: StorageService, private closeEvent: CloseEventService) {}

  ngOnInit() {
    this.closeEvent.messages.subscribe(response => {
      this.isActive=response.text;
    });
  }
  onClose() {
    setTimeout(() => {
      this.messageSend = false;
    }, 1000);
  }
  onCloseEvent(){
    this.data.eventId = this.event.currentEventId;
    this.closeEvent.closeEvent(this.data);
  }
  sendMessage() {
    this.messageSend = true;
    this.data.sender = this.storage.getData("username") || "unknown";
    this.data.senderId = this.storage.getData("userId");
    this.data.content = this.messageForm.value.message;
    this.data.eventId = this.event.currentEventId;
    this.chat.sendMsg(this.data);
  }
}
