import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
// export class LoaderService {

//     constructor() { }

//     private _isLoading$ = new BehaviorSubject<boolean>(false);
//     public isLoading$ = this._isLoading$.asObservable()

//     setIsLoading(isLoading: boolean) {
//         this._isLoading$.next(isLoading)
//     }
// }
export class LoaderService {
  private _hasLoaderShown = false
  private _isLoading = new BehaviorSubject<boolean>(false)
  public isLoading$ = this._isLoading.asObservable()

  showLoaderOnce(): void {
    if (!this._hasLoaderShown) {
      this._isLoading.next(true)
      this._hasLoaderShown = true
    }
  }

  hideLoader(): void {
    this._isLoading.next(false)
  }

  setIsLoading(isLoading: boolean) {
    this._isLoading.next(isLoading)
  }
}
