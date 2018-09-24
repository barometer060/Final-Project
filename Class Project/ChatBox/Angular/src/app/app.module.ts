import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RoutingModule } from './/routing.module';
import {DispalyMsgComponent} from './dispaly-msg/dispaly-msg.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    DispalyMsgComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
