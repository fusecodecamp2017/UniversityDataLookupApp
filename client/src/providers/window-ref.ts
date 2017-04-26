import { Injectable } from '@angular/core';

/*
  Generated class for the WindowRef provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

function _window() : any {
   // return the global native browser window object
   return window;
}

@Injectable()
export class WindowRef {

   constructor() {
    console.log('Hello WindowRef Provider');
   }

   get nativeWindow() : any {
      return _window();
   }
}
