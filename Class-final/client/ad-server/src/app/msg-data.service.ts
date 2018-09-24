import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MsgDataService {
  constructor(private http: HttpClient) {}

  readMsgDataInbox(receiverId): Observable<any> {
    return this.http.get(
      "http://localhost:8000/rest/api/messages/readmsg/" + receiverId
    );
  }

  readMsgDataOutBox(senderId): Observable<any> {
    return this.http.get(
      "http://localhost:8000/rest/api/messages/readmsgOut/" + senderId
    );
  }
}
