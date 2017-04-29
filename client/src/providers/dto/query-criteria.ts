import { Injectable } from '@angular/core';

@Injectable()
export class QueryCriteria {
  name: string;
  city: string;
  state: string;
  zipCode: string;
  inStateMinTuition: number;
  inStateMaxTuition: number;
  outStateMinTuition: number;
  outStateMaxTuition: number;
  sortField: string;
  sortOrder: string;
  distance: string;
}
