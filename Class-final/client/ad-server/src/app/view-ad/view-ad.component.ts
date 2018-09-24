import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-view-ad",
  templateUrl: "./view-ad.component.html",
  styleUrls: ["./view-ad.component.css"]
})
export class ViewAdComponent implements OnInit {
  constructor(private route: Router) {}
  searchValue: string;

  categories: Array<string> = ["Property", "Electronics", "Vehicles", "Others"];

  subcategories: any = {
    Property: [
      "All Property",
      "Apartment",
      "Villa",
      "Bungalow",
      "Sites",
      "Others"
    ],
    Electronics: ["All Electronics", "Mobiles", "Televisions", "Others"],
    Vehicles: ["All Vehicles", "2Wheelers", "4Wheelers", "Others"],
    Others: ["All Others", "Books", "Furniture"]
  };

  ngOnInit() {}

  onTapCategory(category) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        category: category
      }
    };
    this.route.navigate(["category"], navigationExtras);
  }
  onTapSubCategory(category, subcategory) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        category: category,
        subcategory: subcategory
      }
    };
    this.route.navigate(["category"], navigationExtras);
  }
  Search() {
    console.log(this.searchValue);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        search: this.searchValue
      }
    };
    this.route.navigate(["category"], navigationExtras);
  }
}
