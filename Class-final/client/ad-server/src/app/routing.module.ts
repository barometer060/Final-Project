import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DispalyMsgComponent} from './dispaly-msg/dispaly-msg.component';

const routes:Routes=[
  {path:'dispaly-msg',component:DispalyMsgComponent}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class RoutingModule { }
