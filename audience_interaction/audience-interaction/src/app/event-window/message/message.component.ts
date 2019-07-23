import { Component, OnInit, Input } from "@angular/core";
import { DeleteService } from "src/app/shared/delete.service";
import { CloseEventService } from 'src/app/shared/close-event.service';

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {
  @Input() messages = [];
  data = {
    messageId: "",
    eventId: ""
  };
  @Input() isCreator;
  isActive=true;
  constructor(private deleteMessage: DeleteService,private closeEvent: CloseEventService) {}

  onDelete(id, event) {
    this.data.messageId = id;
    this.data.eventId = event;
    this.deleteMessage.deleteMsg(this.data);
  }
  ngOnInit() {
    this.closeEvent.messages.subscribe(response => {
      console.log(response.text);
      this.isActive=response.text;
    });
  }
}
