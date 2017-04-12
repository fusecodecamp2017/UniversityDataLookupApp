import {JsonObject, JsonProperty} from "json2typescript"; // https://www.npmjs.com/package/json2typescript

@JsonObject
export class UniversityData {

  @JsonProperty("id", Number)
  id: number = undefined;

  @JsonProperty("school.name", String)
  name: string = undefined;
}
