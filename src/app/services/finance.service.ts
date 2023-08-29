import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  BehaviorSubject,
  throwError,
  from,
  tap,
  retry,
  catchError,
  map,
  of,
} from 'rxjs';
import { storageService } from './async-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

// const ENTITY = 'contacts'

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  private cache: { [key: string]: any } = {};

  constructor(private http: HttpClient) {}

  private apiKey: string = '1c03cf441b134026b5c6488ffb1e2c48';
  private baseUrl: string = 'https://financialmodelingprep.com/api/v3';

  getCompanyQuotes(symbols: string[]): Observable<any> {
      const symbolString = symbols.join(',');
      const url = `${this.baseUrl}/quote/${symbolString}?apikey=${this.apiKey}`;
      return this.http.get<any>(url);
  }

  getRate(amountInUSD: number): Observable<number> {
    const url = `https://blockchain.info/tobtc?currency=USD&value=${amountInUSD}`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((response) => parseFloat(response)),
      catchError((error) => {
        console.error(
          'An error occurred while fetching the conversion rate:',
          error
        );
        return of(0);
      })
    );
  }

  getBitcoinPriceData(timeSpan: string = '6months'): Observable<any> {
    if (this.cache[timeSpan]) {
      console.log(
        'returning from cache data about bitcoin for timespan of ' + timeSpan
      );
      return of(this.cache[timeSpan]);
    }
    const url = `https://api.blockchain.info/charts/market-price?timespan=${timeSpan}&format=json&cors=true`;
    return this.http.get(url).pipe(
      map((response) => {
        this.cache[timeSpan] = response;
        return response;
      }),
      catchError((error) => {
        console.error(
          'An error occurred while fetching the market price:',
          error
        );
        return of(null);
      })
    );
  }

  getConfirmedTransactions(): Observable<any> {
    return of(null);
  }
}
