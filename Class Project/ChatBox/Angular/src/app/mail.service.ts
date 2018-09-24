import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable,of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http:HttpClient) { }

  sendMail(msg){
    console.log(msg);
    return this.http.post('http://localhost:8081/message',msg)
  }
}
