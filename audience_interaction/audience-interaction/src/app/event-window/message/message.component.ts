import { Component, OnInit, Input } from "@angular/core";
import { DeleteService } from "src/app/shared/delete.service";
import { CloseEventService } from "src/app/shared/close-event.service";
import { VotingService } from "src/app/shared/voting.service";
import { StorageService } from "src/app/shared/storage.service";

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
  voteData = {
    messageId: "",
    userId: "",
    vote: 0
  };
  @Input() isCreator;
  isActive = true;
  constructor(
    private deleteMessage: DeleteService,
    private closeEvent: CloseEventService,
    private voteService: VotingService,
    private storageService: StorageService
  ) {
    this.voteData.userId = this.storageService.getData("userId");
  }

  onDelete(id, event) {
    this.data.messageId = id;
    this.data.eventId = event;
    this.deleteMessage.deleteMsg(this.data);
  }
  ngOnInit() {
    this.closeEvent.messages.subscribe(response => {
      console.log(response.text);
      this.isActive = response.text;
    });
  }
  onVote(vote, messageId) {
    this.voteData.messageId = messageId;
    this.voteData.vote = vote;

    this.voteService.messageVote(this.voteData);
  }
}
