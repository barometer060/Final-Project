import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  electronics(){
    this.router.navigateByUrl('electronics');
  }

  property(){
    this.router.navigateByUrl('property');
  }

  vehicles(){
    this.router.navigateByUrl('vehicles');
  }

  others(){
    this.router.navigateByUrl('others');
  }

  
}
