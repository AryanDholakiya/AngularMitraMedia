import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  //snapshot: get value from another page.
  private route = inject(ActivatedRoute);
  newid: any;
  ngOnInit(): void {
    // this.newid = this.route.snapshot.paramMap.get('id'); //aa name as same as app.routes.ts ma route ne aapel hoi te j apvanu, and aa route parameter te j page ma mle jena route ma aapne define krelu hoi.
    // //ex about page na route ma aapne id aapel 6 to router parameter khali about ni ts file ma j mlse.
    // console.log(`id : ${this.newid}`);

    //method 2: instead of use snapshot. we can use the Observables(subscribe)
    this.route.params.subscribe({
      next: (data) => {
        this.newid = data['id'];
        // console.log(data['id']);
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }
}
