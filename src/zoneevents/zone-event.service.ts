/**
 * Rift ZoneEvents API
 */

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {CustomHttpUrlEncodingCodec} from "./encoder";
import {ZoneEventList} from "./zoneEventList";
import {zip} from "rxjs/observable/zip";


@Injectable()
export class ZoneEventService {

  public defaultHeaders = new HttpHeaders();
  protected basePathEU = 'https://web-api-eu.riftgame.com/chatservice/zoneevent';
  protected basePathUS = 'https://web-api-us.riftgame.com/chatservice/zoneevent';

  private usShardMap = {
    "Deepwood": 1704,
    "Faeblight": 1707,
    "Graybriar": 1702,
    "Hailol": 1721,
    "Laethys": 1708,
    "Seastone": 1701,
    "Wolfsbane": 1706
  };

  private euShardMap = {
    2702: "Bloodiron",
    2714: "Brisesol",
    2711: "Brutwacht",
    2721: "Gelidra",
    2741: "Typhiria",
    2722: "Zaviel"
  };

  private primeShardMap = {
    1801: "Vigil"
  };

  constructor(protected httpClient: HttpClient) {

  }

  public findAllEventsForEU(): Observable<ZoneEventList[]> {
    return new Observable<ZoneEventList[]>(subscriber => {
      let observables: Observable<ZoneEventList>[] = [];

      for (let shardIdStr in this.euShardMap) {
        let shardId = parseInt(shardIdStr);
        let zoneEventListObservable = this.findAllEventsForShard(shardId, 'EU');
        observables.push(zoneEventListObservable);
      }

      let zippedObservable = zip.apply(null, observables);

      zippedObservable.subscribe(euZoneEvents => {
        subscriber.next(euZoneEvents);
      }, error => {
        subscriber.error(error);
      }, () => {
        subscriber.complete();
      });
    });
  }

  /**
   * Get all events for a shard
   * Requests all events for a shard
   * @param shardId The id of the shard
   * @param dataCenter The datacenter to request info from
   */
  public findAllEventsForShard(shardId: number, dataCenter: string): Observable<ZoneEventList> {
    let basepath = "";
    if(dataCenter === 'EU') {
      basepath = this.basePathEU;
    } else {
      basepath = this.basePathUS;
    }

    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (shardId !== undefined) {
      queryParameters = queryParameters.set('shardId', <any>shardId);
    }

    let headers = this.defaultHeaders;
    headers = headers.set("Accept", 'application/json');

    return this.httpClient.get<ZoneEventList>(`${basepath}/list`,
      {
        params: queryParameters,
        withCredentials: false,
        headers: headers,
        observe: 'body',
        reportProgress: false
      }
    );
  }

}
