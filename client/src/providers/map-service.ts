import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Location } from 'dto/location';
import 'rxjs/add/operator/map';

/*
  Generated class for the MapService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MapService {

  constructor(public http: Http) {
    console.log('Hello MapService Provider');
  }

  getLocationFromAddress( address: string ) : Location {

    JSON.parse("hello");

// let jsonData = JSON.parse(data);  

        // personData = new Person(jsonData.name, jsonData.surname, jsonData.birthdate);
        // return personData;

    return null;
  }
}
