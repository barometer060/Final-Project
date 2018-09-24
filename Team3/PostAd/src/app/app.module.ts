import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { FormSubmitComponent } from './form-submit/form-submit.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { OthersComponent } from './others/others.component';
import { PropertyComponent } from './property/property.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainmenuComponent } from './mainmenu/mainmenu.component';
@NgModule({
  declarations: [
    AppComponent,
    FormSubmitComponent,
    VehiclesComponent,
    OthersComponent,
    PropertyComponent,
    MainmenuComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpClientModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
