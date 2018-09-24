import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {

  constructor(private app:AppService,private router:Router) { }
  count:number;
  info:any;
  ngOnInit() {
    let date = new Date();
  
    this.uploadDate =  date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
    this.app.readDataOthers().subscribe((data)=>{
      this.info = data;
      let count1 = this.info.length;
      this.count = count1 + 1;
      console.log(this.count);
      })
  }


  userId:string;
  adId:string;
  price:number;
  category:string = "Others";
  subCategory:string;
  description:string;
  city:string;

  location:string;
  uploadFile:string;
  uploadDate:string;
  



  purchaseYear:number;



  looki


  show(obj){

    this.adId = "O"+ this.count;
    console.log(this.adId);
    console.log(this.description);
    let r=confirm("Are you sure want to post your ad");
  if(r==true)
  {
    console.log(this.userId,this.adId,this.price,this.category,this.subCategory,this.description,this.city,this.location,this.uploadFile,this.uploadDate,this.purchaseYear);
   this.app.postDataOthers(this.userId,this.adId,this.price,this.category,this.subCategory,this.description,this.city,this.location,this.uploadFile,this.uploadDate,this.purchaseYear).subscribe();
alert("Your Post is submitted for approval");
   this.router.navigateByUrl('main');
  }
  // else
  // {
  //   this.router.navigateByUrl('main');
  // }
}


}
