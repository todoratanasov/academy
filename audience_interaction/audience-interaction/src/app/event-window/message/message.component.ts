import { Component, OnInit, Input } from "@angular/core";
import { DeleteService } from "src/app/shared/delete.service";

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
  constructor(private deleteMessage: DeleteService) {}

  onDelete(id, event) {
    this.data.messageId = id;
    this.data.eventId = event;
    this.deleteMessage.deleteMsg(this.data);
  }
  ngOnInit() {}
}
