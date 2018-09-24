import { Component, OnInit } from '@angular/core';
import {MailService} from '../mail.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  newMsg:any;
  receiverId:number;
  senderId:number;
  message:any;
  mailmssg:string;
  constructor(private mailService:MailService) { }

  
  ngOnInit() {
  }

  send(value){
    this.newMsg={
      receiverId:value.idr,
      senderId:value.ids,
      message:value.text
    }
    console.log(value);
    //this.mailmssg=value.text
    this.mailService.sendMail(this.newMsg).subscribe();

  }

}
