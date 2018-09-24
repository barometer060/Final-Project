import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AdService {
  constructor(private _http: HttpClient) {}

  readAdscat(category): Observable<any> {
    return this._http.post(
      "http://localhost:8000/rest/api/ads/readCategoryAds",
      { category }
    );
  }
  readAdssubcat(category, subcategory): Observable<any> {
    return this._http.post(
      "http://localhost:8000/rest/api/ads/readCategoryAds1",
      { category, subcategory }
    );
  }
  readUserData(userId): Observable<any> {
    return this._http.post("http://localhost:8000/rest/api/ads/readUserData", {
      userId
    });
  }
  readSearch(searchdata) {
    return this._http.post("http://localhost:8000/rest/api/ads/searchads", {
      searchdata
    });
  }
  getAllAds(): Observable<any> {
    return this._http.get("http://localhost:8000/rest/api/ads/getAllAds");
  }
}
