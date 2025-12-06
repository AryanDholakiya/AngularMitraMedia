import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/Home/home.component';

@NgModule({
  declarations: [HomeComponent, AboutComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
