import { Component, OnInit } from "@angular/core";
import { MsgDataService } from "../msg-data.service";
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-dispaly-msg",
  templateUrl: "./dispaly-msg.component.html",
  styleUrls: ["./dispaly-msg.component.css"]
})
export class DispalyMsgComponent implements OnInit {
  constructor(private http: HttpClient, private service: MsgDataService) {}
  msgData: any;
  outboxMsg: any;
  sender: number;
  receiver: number;

  item: any;

  showmsg: boolean = true;
  InboxNoData: boolean = true;
  InboxData: boolean = true;

  showOutBox: boolean = true;
  OutboxNoData: boolean = true;
  Outboxdata: boolean = true;

  ngOnInit() {}

  MailBox() {
    this.showmsg = !this.showmsg;
  }

  Outbox() {
    this.showOutBox = !this.showOutBox;
  }

  onSubmit(form: NgForm) {
    this.receiver = form.controls["RId"].value;
    console.log(this.receiver);

    this.service.readMsgDataInbox(this.receiver).subscribe(value => {
      // console.log(typeof value)
      console.log(value.length);
      if (value.length == 0) {
        this.InboxNoData = false;
        this.InboxData = true;
      } else {
        this.InboxNoData = true;
        this.InboxData = false;
        this.msgData = value;
        console.log("this is inbox data" + this.msgData);
      }
    });

    this.service.readMsgDataOutBox(this.receiver).subscribe(value2 => {
      console.log(value2);
      if (value2.length == 0) {
        this.OutboxNoData = false;
        this.Outboxdata = true;
      } else {
        this.OutboxNoData = true;
        this.Outboxdata = false;
        this.outboxMsg = value2;
      }
    });
  }
}
