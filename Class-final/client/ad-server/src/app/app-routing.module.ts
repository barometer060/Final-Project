import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { CategoryComponent } from "./category/category.component";
import { AdDetailsComponent } from "./ad-details/ad-details.component";
import { DispalyMsgComponent } from "./dispaly-msg/dispaly-msg.component";
import { MessagesComponent } from "./messages/messages.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "/category", pathMatch: "full" },
  { path: "category", component: CategoryComponent },
  { path: "adDetails", component: AdDetailsComponent },
  { path: "dispaly-msg", component: DispalyMsgComponent },
  { path: "messages", component: MessagesComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [CommonModule, [RouterModule.forRoot(routes)]],
  exports: [RouterModule],

  declarations: []
})
export class AppRoutingModule {}
