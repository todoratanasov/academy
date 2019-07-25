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
  //here we receive the messages array
  @Input() messages = [];
  //the data we send to the backend
  data = {
    messageId: "",
    eventId: ""
  };
  //the data we send to the backend on vote
  voteData = {
    messageId: "",
    userId: "",
    vote: 0
  };

  @Input() isCreator;
  //we check if the event is not closed from the legturer
  isActive = true;
  constructor(
    private deleteMessage: DeleteService,
    private closeEvent: CloseEventService,
    private voteService: VotingService,
    private storageService: StorageService
  ) {
    //if an user vote's we store his Id in the local storage so that we can disable his voting buttons but there is another check in the backend
    this.voteData.userId = this.storageService.getData("userId");
  }

  onDelete(id, event) {
    //we send delete event via socket.io and we receive all other active messages
    this.data.messageId = id;
    this.data.eventId = event;
    this.deleteMessage.deleteMsg(this.data);
  }

  ngOnInit() {
    //we subscribe for possible closing of the event
    this.closeEvent.messages.subscribe(response => {
      this.isActive = response.text;
    });
  }
  onVote(vote, messageId) {
    this.voteData.messageId = messageId;
    this.voteData.vote = vote;
    //we send some data to the backend how the user voted
    this.voteService.messageVote(this.voteData);
  }
}
