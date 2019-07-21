import { Component, OnInit } from "@angular/core";
import { StorageService } from "../shared/storage.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  isLogged = true;
  constructor(private storage: StorageService) {}

  ngOnInit() {
    if (this.storage.getData("username")) {
      this.isLogged = true;
    }
  }
}
