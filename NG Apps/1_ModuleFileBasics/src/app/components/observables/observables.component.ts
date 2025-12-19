import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observables',
  standalone: false,
  templateUrl: './observables.component.html',
  styleUrl: './observables.component.css',
})
export class ObservablesComponent {
  title = 'Learn Obeservables';

  buttonPressed: string = '';

  simpleArr: any[] = [];

  //1. create an obserrvable: first we have to create Constructor of observable like : new Observable();
  myObservable = new Observable((observer) => {
    observer.next([1, 2, 3, 4, 5]);
  });
  //observer is , who emit the value of observable using next method.//observer will emmit the data only when there is a subscriber for the particular observable otherwise who will recieve that data?

  subscribeObservable() {
    this.buttonPressed = 'subscribeObservable';
    //observer
    //this suscribe method takes 3 callback function: next:(observable next event emmit kre tyare use thy), error:(observable error event emmit kre tyare use thy), complete:(observable complete event emmit kre tyare use thy)
    this.myObservable.subscribe((val: any) => {
      //"val" emmit thyeli value recieve krse
      this.simpleArr = val;
    });
  }

  dataInChunks: any[] = [];

  chunkObservable = new Observable((observer) => {
    setTimeout(() => {
      observer.next(1); //aa data(andr no 1 e ek second pachhi emmit thse.)
    }, 1000);

    setTimeout(() => {
      observer.next(2);
    }, 2000);

    setTimeout(() => {
      observer.next(3);
    }, 3000);

    // setTimeout(() => {
    //   observer.error(
    //     new Error('something went Wrong, please try again later!')
    //   );
    // }, 3000);

    setTimeout(() => {
      observer.next(4);
    }, 4000);

    setTimeout(() => {
      observer.next(5);
    }, 5000);

    setTimeout(() => {
      observer.complete();
    }, 6000);

    // observer.next(1), //aa data jse to ek pachhi ek j pn fast kam thse etle smj mare setTimeout mukyu
    //   observer.next(2),
    //   observer.next(3),
    //   observer.next(4),
    //   observer.next(5);
  });

  chunkObservablefun() {
    this.buttonPressed = 'chunkObservablefun';
    this.chunkObservable.subscribe(
      (val) => {
        //jetli var new value emmit thse etli var subscriber invoke thse
        this.dataInChunks.push(val);
      },
      (err) => {
        alert(err.message);
      },
      () => {
        //COMPLETE EVENT EMMT THSE TO AA CHALSE. PN JO ENE RSTA MA KSE ERROR NA MLE TO
        alert('All the Data is streamed SUCCESSFULLY!✔');
      }
    );
  }
}
