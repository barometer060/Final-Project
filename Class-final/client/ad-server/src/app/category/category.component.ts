import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  Input,
  SimpleChanges,
  DoCheck
} from "@angular/core";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { AdService } from "../ad.service";

declare var $: any;

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit, AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private adservice: AdService,
    private router: Router
  ) {}

  min: number;
  max: number;

  info: any;

  category: string;
  subcategory: string;
  search: string = "";
  noResults: boolean = false;
  ngOnInit() {
    console.log(this.router.url);
    if (this.router.url === "/category") {
      this.adservice.getAllAds().subscribe(data => {
        this.info = data;
        console.log(this.info);
      });
    }
    this.route.queryParams.subscribe(params => {
      this.category = params.category;
      this.subcategory = params.subcategory;
      this.search = params.search;

      if (this.category == "Property") {
        this.min = 10000;
        this.max = 20000000;
      }
      if (this.category == "Electronics") {
        this.min = 1000;
        this.max = 100000;
      }
      if (this.category == "Vehicles") {
        this.min = 1000;
        this.max = 100000;
      }
      if (this.category == "Others") {
        this.min = 10;
        this.max = 1000;
      }

      // (<any>$("#slider-range")).slider({
      //   range: true,
      //   min: this.min,
      //   max: this.max,
      //   values: [this.min, this.max],
      //   slide: (event, ui) => {
      //     $("#amount").val("Rs" + ui.values[0] + " - Rs" + ui.values[1]);
      //
      //     this.displaynum(ui.values[0], ui.values[1]);
      //   }
      // });
      // $("#amount").val(
      //   "Rs" +
      //     (<any>$("#slider-range")).slider("values", 0) +
      //     " - Rs" +
      //     (<any>$("#slider-range")).slider("values", 1)
      // );

      if (this.category != null && this.subcategory == "All " + this.category) {
        this.adservice.readAdscat(this.category).subscribe(data => {
          this.info = data;
        });
      }
      if (this.category != null && this.subcategory != "All " + this.category) {
        this.adservice
          .readAdssubcat(this.category, this.subcategory)
          .subscribe(data => {
            this.info = data;
          });
      }
      if (this.search != null) {
        this.noResults = false;
        let filter: string = this.search
          ? this.search.toLocaleLowerCase()
          : null;
        console.log(filter);
        this.adservice.readSearch(filter).subscribe(data => {
          this.info = data;
          if (this.info.length === 0) {
            this.noResults = true;
          }
        });
      }
    });
  }

  ngAfterViewInit() {}

  displaynum(min, max) {
    this.min = min;
    this.max = max;
    this.info = this.info.filter(data => {
      return data.price >= this.min && data.price <= this.max;
    });
    console.log(min, max);
  }

  // ngOnChanges(changes: SimpleChanges) {
  // this.info = this.info.filter(data => {
  //   return data.price >= this.min && data.price <= this.max;
  // });
  // }

  details(ref) {
    console.log(ref);
    let navigationextras: NavigationExtras = {
      queryParams: ref
    };
    //console.log(navigationextras);
    this.router.navigate(["adDetails"], navigationextras);
  }

  sortByName() {
    console.log("Namie sorted");
    this.info.sort((a, b) => {
      return a.Title.localeCompare(b.Title);
    });
  }

  sortByPriceLH() {
    console.log("Price sorted");
    this.info.sort((a, b) => {
      return a.price - b.price;
    });
  }
  sortByPriceHL() {
    console.log("Price sorted");
    this.info.sort((a, b) => {
      return b.price - a.price;
    });
  }

  filterByPrice() {
    console.log(this.min);
    console.log(this.max);
    this.info = this.info.filter(data => {
      return data.price >= this.min && data.price <= this.max;
    });
  }
}
