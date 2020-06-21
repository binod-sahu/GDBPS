import { Injectable } from '@angular/core';
import { from, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import getDistance from 'geolib/es/getDistance';

const httpOptions = {
  headers: new HttpHeaders({
    'method': 'GET',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  })
 };

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  endpointURL: string = 'https://bpdts-test-app-v3.herokuapp.com/users';

  constructor(private httpClient: HttpClient) { }
  
  getUsers(): Observable<any> {
    return this.httpClient.get<any>(this.endpointURL, httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getUserByCity(city): Observable<any> {
    return this.httpClient.get<any>(`https://bpdts-test-app-v3.herokuapp.com/city/${city}/users`, httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
