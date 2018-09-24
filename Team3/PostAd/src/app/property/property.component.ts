import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  constructor(private propservice:AppService,private router:Router) { }

  count:number;
  info:any;
  ngOnInit() {
    let date = new Date();
  
    this.uploadDate =  date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
    this.propservice.readDataProperty().subscribe((data)=>{
      this.info = data;
      let count1 = this.info.length;
      this.count = count1 + 1;
      console.log(this.count);
      })
  }


  userId;
  adId;
  price;
  category:string = "Property";
  subCategory;
  description;
  city;
  area;
  location;
  uploadFile;
  uploadDate;
  check;

  propertyShow(){
 
    this.adId = "P"+ this.count;
    console.log(this.adId);
    let r=confirm("Are you sure want to post your ad");
  if(r==true)
  {
    console.log(this.userId,this.adId,this.price,this.category,this.subCategory,this.description,this.city,this.area,this.location,this.uploadFile,this.uploadDate);
   this.propservice.postDataProperty(this.userId,this.adId,this.price,this.category,this.subCategory,this.description,this.city,this.area,this.location,this.uploadFile,this.uploadDate).subscribe();
   alert("Your Post is submitted for approval");
   this.router.navigateByUrl('main');
  }
  // else
  // {
  //   this.router.navigateByUrl('main');
  // }
}

}


