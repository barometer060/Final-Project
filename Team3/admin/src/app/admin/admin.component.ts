import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private cons:AdminService) { }
  temp=0;
  User="Vaibhav"
  select;
  info:any=[];
  t;
  
  cat(i){
  if (i ==1) {
   this.temp=1;
   this.select="Electronics";
   this.cons.getelectronics().subscribe(data=>this.info=data);
  }
  if (i==2) {
    this.temp=2;
    this.select="Vehciles";
    this.cons.getvehicles().subscribe(data=>this.info=data);
  }
  if (i==3) {
    this.temp=3;
    this.select="Property";
    this.cons.getproperties().subscribe(data=>this.info=data);
  }
  if (i==4) {
    this.temp=4;
    this.select="Others";
    this.cons.getothers().subscribe(data=>this.info=data);
  }
}

sample(i)
{
  if(i==1)
  {
    this.select='Electronics';
  }
}

//Find Index
findIndex(w){
  for (var q=0;q<this.info.length;q++){
   if(w==this.info[q].adId){
   this.t=q; 
  }}}

approve(adid,i){
  alert(i)
  this.findIndex(adid);
  this.cons.approve(this.info[this.t],this.select,i).subscribe();
  location.reload();
}
warning(adid){
  this.findIndex(adid);
  var comment= prompt("Please leave your comment here")
  this.cons.warning(this.info[this.t],this.select,comment)//.subscribe();
}
  ngOnInit() { 
  }
}

/*declineE(adid){
  var q= confirm("Are you sure you want to delete this advertisement")
  if(q==true){
     this.findIndex(adid);
 this.info.splice(this.t,1)
  this.cons.deleteE(adid).subscribe();
}
else alert("Cancelled")
}
declineV(adid){
  var q= confirm("Are you sure you want to delete this advertisement")
  if(q==true){
    this.findIndex(adid);
 this.info.splice(this.t,1)
  this.cons.deleteV(adid).subscribe();
}
else alert("Cancelled")
}
declineO(adid){
  var q= confirm("Are you sure you want to delete this advertisement")
  if(q==true){
  this.findIndex(adid);
 this.info.splice(this.t,1)
  this.cons.deleteO(adid).subscribe();
}
else alert("Cancelled")
}
declineP(adid){
  var q= confirm("Are you sure you want to delete this advertisement")
  if(q==true){
  this.findIndex(adid);
 this.info.splice(this.t,1)
  this.cons.deleteP(adid).subscribe();
}
 else alert("Cancelled")
}


delete(adid){
  var q= confirm("Are you sure you want to delete this advertisement")
  if(q==true){
  this.findIndex(adid);
 this.info.splice(this.t,1)
  this.cons.delete(adid,this.select).subscribe();
}
 else alert("Cancelled")
}
*/

/*
decline(adid){
  this.findIndex(adid);
  //this.cons.decline(this.info[this.t],this.select).subscribe();
  location.reload();
}
*/
