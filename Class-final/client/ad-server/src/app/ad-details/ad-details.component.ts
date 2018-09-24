import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdService } from "../ad.service";
//import { switchMap } from 'rxjs/operators'

@Component({
  selector: "app-ad-details",
  templateUrl: "./ad-details.component.html",
  styleUrls: ["./ad-details.component.css"]
})
export class AdDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private userservice: AdService) {}

  ObjectAds: any;
  ObjectUser: any;
  interested: boolean = true;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.ObjectAds = params;

      this.userservice.readUserData(params.userId).subscribe(user => {
        this.ObjectUser = user;
        console.log(this.ObjectUser[0].firstName);
      });
    });
  }

  // this.route.queryParams.pipe(switchMap(params => {
  //   this.ObjectAds = params;
  //   return this.userservice.readUserData(params.userId)
  // }))
  //   .subscribe(user => {
  //     this.ObjectUser = user;
  //     console.log(this.ObjectUser[0].firstName);
  //   });

  showIButton(): void {
    this.interested = !this.interested;
  }
  showNIButton(): void {
    this.interested = !this.interested;
  }
}
