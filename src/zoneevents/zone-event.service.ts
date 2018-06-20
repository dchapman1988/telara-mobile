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
    1704: "Deepwood",
    1707: "Faeblight",
    1702: "Greybriar",
    1721: "Hailol",
    1708: "Laethys",
    1701: "Seastone",
    1706: "Wolfsbane"
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

  public findAllEventsForDC(dataCenter: string): Observable<ZoneEventList[]> {
    return new Observable<ZoneEventList[]>(subscriber => {

      let observableList: Observable<ZoneEventList>[];
      if(dataCenter === 'EU') {
        observableList = this.getObservableListForEU();
      } else if (dataCenter === 'US') {
        observableList = this.getObservableListForUS();
      } else {
        observableList = this.getObservableListForPrime();
      }

      let zippedObservable = zip.apply(null, observableList);

      zippedObservable.subscribe(zoneEvents => {
        subscriber.next(zoneEvents);
      }, error => {
        subscriber.error(error);
      }, () => {
        subscriber.complete();
      });
    });
  }

  private getObservableListForEU(): Observable<ZoneEventList>[]{
    let observables: Observable<ZoneEventList>[] = [];
    for (let shardIdStr in this.euShardMap){
      let shardId = parseInt(shardIdStr);
      let zoneEventListObservable = this.findAllEventsForShard(shardId, 'EU', this.euShardMap[shardIdStr]);
      observables.push(zoneEventListObservable);
    }
    return observables;
  }

  private getObservableListForUS(): Observable<ZoneEventList>[]{
    let observables: Observable<ZoneEventList>[] = [];
    for (let shardIdStr in this.usShardMap){
      let shardId = parseInt(shardIdStr);
      let zoneEventListObservable = this.findAllEventsForShard(shardId, 'US', this.usShardMap[shardIdStr]);
      observables.push(zoneEventListObservable);
    }
    return observables;
  }

  private getObservableListForPrime(): Observable<ZoneEventList>[]{
    let observables: Observable<ZoneEventList>[] = [];
    for (let shardIdStr in this.primeShardMap){
      let shardId = parseInt(shardIdStr);
      let zoneEventListObservable = this.findAllEventsForShard(shardId, 'Prime', this.primeShardMap[shardIdStr]);
      observables.push(zoneEventListObservable);
    }
    return observables;
  }



  /**
   * Get all events for a shard
   * Requests all events for a shard
   * @param shardId The id of the shard
   * @param dataCenter The datacenter to request info from
   */
  public findAllEventsForShard(shardId: number, dataCenter: string, shardName: string): Observable<ZoneEventList> {
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

    return new Observable(subscriber => {
      let zoneEventListObservable = this.httpClient.get<ZoneEventList>(`${basepath}/list`,
        {
          params: queryParameters,
          withCredentials: false,
          headers: headers,
          observe: 'body',
          reportProgress: false
        });
      zoneEventListObservable.subscribe(zoneEventList => {
        zoneEventList.shard = shardName;
        subscriber.next(zoneEventList);
        subscriber.complete();
      }, error => {
        subscriber.error(error);
      })
    });

  }

}
