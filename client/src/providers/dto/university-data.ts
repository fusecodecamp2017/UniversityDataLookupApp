import {JsonObject, JsonProperty} from "json2typescript"; // https://www.npmjs.com/package/json2typescript

export class UniversityData {

  public id: Number;
  public name: string;
  public city: string;
  public state: string;
  public zipCode: string;
  public address: string;
  public schoolUrl: string;
  public priceCalculatorUrl: string;
  public accreditor: string;
  public mainCampus: string;
  public branches: number;
  public degreesAwardedPredominant: string;
  public degreesAwardedHighest: string;
  public ownership: string;
  public locale: string;
  public admissionRateOverall: string;
  public inStateTuitionCost: number;
  public outStateTuitionCost: number;
}
