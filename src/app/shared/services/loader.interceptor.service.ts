import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, delay, finalize } from "rxjs";
import { LoaderService } from "./loader.service";




@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
    constructor(
        private _loaderService: LoaderService
    ) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loaderService.loadingState$.next(true)
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'JWT Token from local storage !!!'
        })

        const cloneReq = req.clone({ headers })
        // const cloneReq = req.clone()
        // cloneReq.headers.set('Content-type', 'application/json')
        // cloneReq.headers.set('Authorization', 'JWT Token from local storage !!!')

        // it send cloned request instead of original request
        return next.handle(cloneReq)
            .pipe(
                delay(500),
                finalize(() => {
                    // when we got respose from BE
                    this._loaderService.loadingState$.next(false)
                })
            )
    }
}