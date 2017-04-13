import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { QueryCriteria } from './dto/query-criteria';
import { UniversityData } from './dto/university-data';
import { JsonConvert } from "json2typescript"

/*
  Generated class for the HttpService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpUniversityService {

  private headers: Headers;
  private universityUrl = 'http://localhost:8081/api/universities';

  constructor(public http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  queryUniversities(queryCriteria: QueryCriteria): Promise<UniversityData[]> {
    var addedQueryParam = false;
    var queryUrl = this.universityUrl;
    if( queryCriteria.name ) {
      queryUrl += '?';
      queryUrl += 'name=';
      queryUrl += queryCriteria.name.replace(/ /g , "%20");
      addedQueryParam = true;
    }
    if( queryCriteria.city ) {
      if( addedQueryParam ) {
        queryUrl += '&';
      }
      else {
        queryUrl += '?';
      }
      queryUrl += 'city=';
      queryUrl += queryCriteria.city.replace(/ /g , "%20");
    }
    if( queryCriteria.state ) {
      if( addedQueryParam ) {
        queryUrl += '&';
      }
      else {
        queryUrl += '?';
      }
      queryUrl += 'state=';
      queryUrl += queryCriteria.state.replace(/ /g , "%20");
    }
    if( queryCriteria.zipCode ) {
      if( addedQueryParam ) {
        queryUrl += '&';
      }
      else {
        queryUrl += '?';
      }
      queryUrl += 'zip=';
      queryUrl += queryCriteria.zipCode.replace(/ /g , "%20");
    }
    if( queryCriteria.sortField && queryCriteria.sortOrder ) {
      if( addedQueryParam ) {
        queryUrl += '&';
      }
      else {
        queryUrl += '?';
      }
      queryUrl += 'sort=';
      queryUrl += queryCriteria.sortField + ":" + queryCriteria.sortOrder;
    }
    if( addedQueryParam ) {
      queryUrl += '&';
    }
    else {
      queryUrl += '?';
    }
    queryUrl += 'page=0&size=100';     
    return this.http.get(queryUrl, {headers: this.headers}) // The Angular http.get returns an RxJS Observable. Observables are a powerful way to manage asynchronous data flows. You'll read about Observables later in this page.
            .toPromise() // Convert the Observable to a Promise using the toPromise operator. The Angular Observable doesn't have toPromise() out of box, to get this functionality you have to import it as done above.
            .then(response => response.json() as UniversityData[]) // Extract data from response by calling json(). The JSON we created has a top level data property that contains the Hero array.
            .catch(this.handleError); // Catch errors and pass to handler.
  }

  private handleError(error: any): Promise<any> {
    console.error('Http error occurred', error);
    return Promise.reject(error.message || error);
  }  
}
