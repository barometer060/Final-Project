import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) {}
  getelectronics():any{
      return this.http.get("http://localhost:1234/electronics") 
  }  
  getvehicles():any{
    return this.http.get("http://localhost:1234/vehicles") 
}
getproperties():any{

  return this.http.get("http://localhost:1234/property") 
}
getothers():any{
  
  return this.http.get("http://localhost:1234/others") 
}

approve(t,cat,i){
  alert(cat)
  return this.http.post('http://localhost:1234/insert',{ 
    object:t,
    category:cat,
    i:i
  });
}
warning(t,cat,comments){
  alert(JSON.stringify(t)+cat+comments)
  
}
}

/* postads(cat):any{ 
    return this.http.post("http://localhost:1234/getads",{
      cat
    }) 
  }*/
/*
delete(id,cat):any{
  alert("deleteCalled")
  alert(id+cat)
  return this.http.post("http://localhost:1234/delete", {
    query:{adId: id},
    cat: cat 
    });
}
deleteV(id):any{
  alert("Deleted");
  return this.http.post('http://localhost:1234/delete/vehicles', {
    adId: id
    });
}
deleteE(id):any{
  alert("Deleted");

  return this.http.post('http://localhost:1234/delete/electronics', {
    adId: id
    });
}
deleteO(id):any{
  alert("Deleted");
  return this.http.post('http://localhost:1234/delete/others', {
    adId: id
    });
}
deleteP(id):any{
  alert("Deleted");
  return this.http.post('http://localhost:1234/delete/property', {
    adId: id
    });
}*/

