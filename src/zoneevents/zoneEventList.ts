/**
 * Rift ZoneEvents
 * Roft-ZoneEvents-Api
 *
 * OpenAPI spec version: 0.0.1
 * Contact: developer@tobiaskloss.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ZoneEvent } from './zoneEvent';
export interface ZoneEventList {
  shard?: string;
    status?: string;
    data?: Array<ZoneEvent>;
}
