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
  private universityUrl = 'https://college-app.cfapps.io/api/universities';

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
      queryUrl = this.appendQueryDelimiter(queryUrl, addedQueryParam);
      queryUrl += 'city=';
      queryUrl += queryCriteria.city.replace(/ /g , "%20");
      addedQueryParam = true;
    }
    if( queryCriteria.state ) {
      queryUrl = this.appendQueryDelimiter(queryUrl, addedQueryParam);     
      queryUrl += 'state=';
      queryUrl += queryCriteria.state.replace(/ /g , "%20");
      addedQueryParam = true;
    }
    if( queryCriteria.zipCode ) {
      queryUrl = this.appendQueryDelimiter(queryUrl, addedQueryParam);     
      queryUrl += 'zip=';
      queryUrl += queryCriteria.zipCode.replace(/ /g , "%20");
      addedQueryParam = true;
    }
    if( queryCriteria.inStateMinTuition && queryCriteria.inStateMaxTuition ) {
      queryUrl = this.appendQueryDelimiter(queryUrl, addedQueryParam);
      queryUrl += 'inStateCostRange=';
      queryUrl += this.multiplier(queryCriteria.inStateMinTuition, 1000) + '..' + this.multiplier(queryCriteria.inStateMaxTuition, 1000);
      addedQueryParam = true;
    }
    if( queryCriteria.outStateMinTuition && queryCriteria.outStateMaxTuition ) {
      queryUrl = this.appendQueryDelimiter(queryUrl, addedQueryParam);
      queryUrl += 'outStateCostRange=';
      queryUrl += this.multiplier(queryCriteria.outStateMinTuition, 1000) + '..' + this.multiplier(queryCriteria.outStateMaxTuition, 1000);
      addedQueryParam = true;
    }
    if( queryCriteria.sortField && queryCriteria.sortOrder ) {
      queryUrl = this.appendQueryDelimiter(queryUrl, addedQueryParam);   
      queryUrl += 'sort=';
      queryUrl += queryCriteria.sortField + ":" + queryCriteria.sortOrder;
      addedQueryParam = true;
    }
    queryUrl = this.appendQueryDelimiter(queryUrl, addedQueryParam);     
    queryUrl += 'page=0&size=100';

    return this.http.get(queryUrl, {headers: this.headers}) // The Angular http.get returns an RxJS Observable. Observables are a powerful way to manage asynchronous data flows. You'll read about Observables later in this page.
            .toPromise() // Convert the Observable to a Promise using the toPromise operator. The Angular Observable doesn't have toPromise() out of box, to get this functionality you have to import it as done above.
            .then(response => response.json() as UniversityData[]) // Extract data from response by calling json(). The JSON we created has a top level data property that contains the Hero array.
            .catch(this.handleError); // Catch errors and pass to handler.
  }

  getUniversityById(id: Number) : Promise<UniversityData> {
    var queryUrl = this.universityUrl;
    queryUrl += "/";
    queryUrl += id;

    return this.http.get(queryUrl, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as UniversityData)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Http error occurred', error);
    return Promise.reject(error.message || error);
  }

  private multiplier( input: number, multiplyBy: number ) {
    return input * multiplyBy;
  }

  private appendQueryDelimiter(queryUrl: string, addedQueryParam: boolean) : string {
    if( addedQueryParam ) {
      queryUrl += '&';
    }
    else {
      queryUrl += '?';
    }
    return queryUrl;
  }
}
