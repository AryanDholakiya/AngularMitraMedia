import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app-Home/home.module').then((m) => m.HomeModule),
    //note here module load kravannu 6, HomeComponent nhi.
    //standalone true project ma badha compo standalone hoi etle chale pn ahi em nahi thse
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
