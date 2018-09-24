import { Component,OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormSubmitComponent} from "./form-submit/form-submit.component";
import {MainmenuComponent} from "./mainmenu/mainmenu.component"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular';

  constructor(private router:Router){}
  ngOnInit(){
    this.router.navigateByUrl('main');
  }
}
