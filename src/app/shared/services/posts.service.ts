import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, catchError, delay, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost } from '../models/posts-interface';
import { LoaderService } from './loader.service';
import { SnackbarService } from './snackbar.service';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private _http = inject(HttpClient);
  private _loaderService = inject(LoaderService);
  private _snackBarService = inject(SnackbarService);
  postUrl: string = `${environment.baseUrl}/posts.json`
  constructor() { }

  fetchAllPosts(): Observable<Array<Ipost>> {
    // start loader
    // this._loaderService.loadingState$.next(true)
    return this._http.get<any>(this.postUrl)
      .pipe(
        map(data => {
          let postsArr: Array<Ipost> = [];
          for (const key in data) {
            postsArr.push({ ...data[key], id: key })
          }
          return postsArr.reverse()
        }),
        catchError(err => {
          console.log(err);
          this._snackBarService.openSnackBar(err.error.error)
          return EMPTY
        })
      )
  }

  fetchPost(id: string): Observable<Ipost | null> {
    // start Loader
    // this._loaderService.loadingState$.next(true)
    let fetchPostUrl = `${environment.baseUrl}/posts/${id}.json`;
    return this._http.get<Ipost>(fetchPostUrl)
      .pipe(
        catchError(err => {
          console.log(err);
          this._snackBarService.openSnackBar(err.error.error)
          return of()
        })
      )

  }

  creatPost(newPost: Ipost): Observable<any> {

    return this._http.post(this.postUrl, newPost)
  }

  updatePost(updatedObj: Ipost): Observable<Ipost> {
    // this._loaderService.loadingState$.next(true);
    let updateUrl = `${environment.baseUrl}/posts/${updatedObj.id}.json`;
    return this._http.patch<Ipost>(updateUrl, updatedObj)
  }

  removePost(post: Ipost): Observable<any> {
    let removeUrl = `${environment.baseUrl}/posts/${post.id}.json`;
    return this._http.delete(removeUrl)
  }
}
