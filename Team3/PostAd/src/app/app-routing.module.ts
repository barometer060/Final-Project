import { NgModule } from '@angular/core';
import {FormSubmitComponent} from "./form-submit/form-submit.component";
import {PropertyComponent} from "./property/property.component";
import {VehiclesComponent} from "./vehicles/vehicles.component";
import {OthersComponent} from "./others/others.component";
import {MainmenuComponent} from "./mainmenu/mainmenu.component"
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'electronics',component: FormSubmitComponent},
  {path:'property',component: PropertyComponent},
  {path:'vehicles',component: VehiclesComponent},
  {path:'others',component: OthersComponent},
  {path:'main',component: MainmenuComponent}
];


@NgModule({
  imports: [
   RouterModule.forRoot(routes) 
  ],
  declarations: [],
  exports:[RouterModule]
})
export class AppRoutingModule { }
