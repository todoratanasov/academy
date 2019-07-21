import axios from "axios";
import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";

@Injectable()
export class RequestService {
  constructor(private storage: StorageService) {}

  sendRequest = function(url, method, data, headers) {
    const baseUrl = "http://localhost:5001";
    data = data || {};
    headers = headers || {};
    //if the user is logged in we attach the authorization token to the header;
    if (this.storage.getData("authToken")) {
      const token = this.storage.getData("authToken");
      headers.Authorization = `Bearer ${token}`;
    }
    return axios({
      method: method,
      url: `${baseUrl + url}`,
      data: data,
      headers: headers
    });
  };
}
