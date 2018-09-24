import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-submit',
  templateUrl: './form-submit.component.html',
  styleUrls: ['./form-submit.component.css']
})
export class FormSubmitComponent implements OnInit {

  constructor(private app:AppService,private http:HttpClient,private router:Router) { }
//  adId:string;
  count:number;
  info:any;
  ngOnInit() {
    let date = new Date();
  
    this.uploadDate =  date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
    this.app.readDataElectronics().subscribe((data)=>{
      this.info = data;
      let count1 = this.info.length;
      this.count = count1 + 1;
      console.log(this.count);
      })
  }

  userId:string;
  adId:string;
  price:number;
  category:string = "Electronics";
  subCategory:string;
  description:string;
  city:string;
  manufacturer:string;
  makeModel:string;
  makeYear:number;
  location:string;
  images:string;
  uploadDate:string;
  uploadFile:any;


  show(obj){

      //alert("function called1");
    this.adId = "E"+ this.count;
    console.log(this.uploadDate);
    console.log(this.userId,this.adId,this.price,this.category,this.subCategory,this.description,this.city,this.manufacturer,this.makeModel,this.makeYear,this.location,this.uploadFile,this.uploadDate,obj);
  let r=confirm("Are you sure want to post your ad");
  if(r==true)
  {
   this.app.postData(this.userId,this.adId,this.price,this.category,this.subCategory,this.description,this.city,this.manufacturer,this.makeModel,this.makeYear,this.location,this.images,this.uploadDate).subscribe();
   alert("Your Post is submitted for approval");
   this.router.navigateByUrl('main');
  }
  // else
  // {
  //   this.router.navigateByUrl('main');
  // }
}
  
}
