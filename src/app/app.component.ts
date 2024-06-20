import { Component, OnInit, inject } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';
import { Observable, concatMap, debounceTime, distinctUntilChanged, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'httpFirebaseMaterial';
  isLoading !: boolean;
  private _loaderService = inject(LoaderService);
  private postUrl = `https://jsonplaceholder.typicode.com/posts`
  of$: Observable<number> = of(2, 5, 7, 11);

  mapPost$ = this.of$
    .pipe(
      map(id => {
        return this._http.get(`${this.postUrl}/${id}`) // GET returns Observable
      })
    )

    contactMapPost$ = this.of$
                          .pipe(
                            tap(res => console.log(res)),
                            concatMap(id => {
                              return this._http.get(`${this.postUrl}/${id}`) 
                            })
                          )
    mergeMapPost$ = this.of$
                        .pipe(
                          tap(res => console.log(res)),
                          mergeMap((id:number) => {
                            return this._http.get(`${this.postUrl}/${id}`) 
                          })
                        )  
    switchMapPost$ = this.of$
                            .pipe(
                              tap(res => console.log(res)),
                              switchMap((id: number) => {
                                return this._http.get(`${this.postUrl}/${id}`)
                              })
                            )                                        
  private _http = inject(HttpClient)

  sereachProductForm !: FormGroup
  ngOnInit(): void {

    this.sereachProductForm = new FormGroup({
      searchValue : new FormControl(null)
    })


    this.sereachProductForm.get('searchValue')
          ?.valueChanges
              .pipe(
                debounceTime(500),
                distinctUntilChanged()
              )
              .subscribe(res => {
                console.log(`Making API call using value ${res}`);
              })


    this._loaderService.loadingState$
      .subscribe(res => {
        this.isLoading = res
      })
      this.switchMapPost$
        .subscribe(data => console.log(data))



      // this.mergeMapPost$
      //   .subscribe(data => console.log(data))
      // this.contactMapPost$
      //   .subscribe(data => console.log(data))
    // this.of$
    // .subscribe(id => {
    //   console.log(id);
    //   this._http.get(`${this.postUrl}/${id}`)
    //     .subscribe(post => {
    //       console.log(post);
    //     })
    // })

    // this.mapPost$
    //   .subscribe(obs => {
    //     console.log(obs);
    //       obs 
    //         .subscribe(data => console.log(data))
    //   })
  }
}


// Nested Obsevables

// 1 Readability and Maintability
// 2 Memory Leak
// 3 Difficult in error handling
// 4 Difficult in Tesing 

// Flatning Oprators

// concatMap >> Promise.chaining
// mergeMap >> Promise.all(array of promise)  >> New Single Promise
// switchMap >> Promise.race(array of promise) >> New Single Promise