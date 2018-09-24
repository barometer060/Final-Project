import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  constructor(private app:AppService,private router:Router) { }


  count:number;
  info:any;
  ngOnInit() {
    let date = new Date();
  
    this.uploadDate =  date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
    this.app.readDataVehicles().subscribe((data)=>{
      this.info = data;
      let count1 = this.info.length;
      this.count = count1 + 1;
      console.log(this.count);
      })
  }


userId:string;
  adId:string;
  price:number;
  category:string = "Vehicles";
  subCategory:string;
  description:string;
  city:string;
  manufacturer:string;
  makeModel:string;
  makeYear:number;
  kmCovered:number;
  location:string;
  uploadFile:string;
  uploadDate:string;

  show(){

    this.adId = "V"+ this.count;
    console.log(this.adId);
    console.log(this.userId,this.adId,this.price,this.category,this.subCategory,this.description,this.city,this.manufacturer,this.makeModel,this.makeYear,this.kmCovered,this.location,this.uploadFile,this.uploadDate);
    let r=confirm("Are you sure want to post your ad");
  if(r==true)
  {
    this.app.vehicleData(this.userId,this.adId,this.price,this.category,this.subCategory,this.description,this.city,this.manufacturer,this.makeModel,this.makeYear,this.kmCovered,this.location,this.uploadFile,this.uploadDate).subscribe();
    alert("Your Post is submitted for approval");
   this.router.navigateByUrl('main');
  }
  // else
  // {
  //   this.router.navigateByUrl('main');
  // }
}

  // new1(){
  // //  this.app.ge().subscribe()
  // }
}
