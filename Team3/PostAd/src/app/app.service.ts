import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class AppService {


  readDataElectronics():Observable<Object>{
    return this.http.get('http://localhost:1234/electronics')
  }
  
  readDataProperty():Observable<Object>{
    return this.http.get('http://localhost:1234/property')
  }
  readDataVehicles():Observable<Object>{
    return this.http.get('http://localhost:1234/vehicles')
  }
  readDataOthers():Observable<Object>{
    return this.http.get('http://localhost:1234/others')
  }
  
  
  
  constructor(private http: HttpClient) { }
  postData(puserId,padId,pprice,pcategory,psubCategory,pdescription,pcity,pmanufacturer,pmakeModel,pmakeYear,plocation,pimages,puploadDate):Observable<Object>{
    
    // alert("upload function");
    return this.http.post('http://localhost:1234/insert/electronics', {
      userId:puserId,
      adId:padId,
      price:pprice,
      category:pcategory,
      subCategory:psubCategory,
      description:pdescription,
      city:pcity,
      manufacturer:pmanufacturer,
      makeModel:pmakeModel,
      makeYear:pmakeYear,
      location:plocation,
      images:pimages,
      uploadDate:puploadDate,
      isAction:0,
      isWarning:0
    })
  }

postDataOthers(puserId,padId,pprice,pcategory,psubCategory,pdescription,pcity,plocation,pimages,puploadDate,ppurchaseYear):Observable<Object>{
  console.log(ppurchaseYear);
  return this.http.post('http://localhost:1234/insert/others', {
    userId:puserId,
    adId:padId,
    price:pprice,
    category:pcategory,
    subCategory:psubCategory,
    description:pdescription,
    city:pcity,
    location:plocation,
    images:pimages,
    uploadDate:puploadDate,
    purchaseYear:ppurchaseYear,
    isAction:0,
    isWarning:0
    })
 //   console.log(plocation);
    
  }


  postDataProperty(puserId,padId,pprice,pcategory,psubCategory,pdescription,pcity,parea,plocation,pimages,puploadDate):Observable<Object>{
    return this.http.post('http://localhost:1234/insert/property', {
      userId:puserId,
      adId:padId,
      price:pprice,
      category:pcategory,
      subCategory:psubCategory,
      description:pdescription,
      city:pcity,
      area:parea,
      location:plocation,
      images:pimages,
      uploadDate:puploadDate,
      isAction:0,
      isWarning:0
    })

   // console.log(plocation);

  }
  



  vehicleData(puserId,padId,pprice,pcategory,psubCategory,pdescription,pcity,pmanufacturer,pmakeModel,pmakeYear,pkmCovered,plocation,pimages,puploadDate):Observable<Object>{
    return this.http.post('http://localhost:1234/insert/vehicles', {
      userId:puserId,
      adId:padId,
      price:pprice,
      category:pcategory,
      subCategory:psubCategory,
      description:pdescription,
      city:pcity,
      manufacturer:pmanufacturer,
      makeModel:pmakeModel,
      makeYear:pmakeYear,
      kmCovered:pkmCovered,
      location:plocation,
      images:pimages,
      uploadDate:puploadDate,
      isAction:0,
      isWarning:0
    })

   // console.log(plocation);

  }


  


  

}
