import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root'
})
// export class DelayGuardService {
//   constructor(private loaderService: LoaderService) {}

//   canActivate(): Observable<boolean | UrlTree> {
//     this.loaderService.setIsLoading(true)
//     return of(true).pipe(
//       delay(1000),
//       tap(() => this.loaderService.setIsLoading(false)) 
//     );
//   }
// }

export class DelayGuardService {
    constructor(private loaderService: LoaderService) {}
  
    canActivate(): Observable<boolean | UrlTree> {
      this.loaderService.showLoaderOnce()
      return of(true).pipe(
        delay(1000),
        tap(() => this.loaderService.hideLoader()) 
      );
    }
  }
  