import { Component, OnInit } from '@angular/core'; //important.
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { HeaderComponent } from './app-Home/components/header/header.component';
import { HomeComponent } from './app-Home/components/home/home.component';
import { FooterComponent } from './app-Home/components/footer/footer.component';

@Component({
  //decorator function: provide info to our component. first we have to import it if we want to use it
  selector: 'app-root', //this name we have to provide in "index.html" as tag.
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  //basically export means that this class is public we can use/import it anywhere.
  title = 'StandAlone Demo';

  constructor() {
    console.log('this is constructor!');
  }
  ngOnInit(): void {
    console.log('this is ngOnInit!');
    // this.changetitle();
  }
  changetitle() {
    this.title = 'Latest';
  }
}
