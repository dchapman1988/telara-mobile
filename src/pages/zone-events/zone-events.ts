import {Component, OnInit} from '@angular/core';
import {DefaultService} from "../../swagger-telaradb";
import {ZoneEventService} from "../../zoneevents/zone-event.service";
import {ZoneEventList} from "../../zoneevents/zoneEventList";
import {LoadingController} from "ionic-angular";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'page-zoneevents',
  templateUrl: 'zone-events.html'
})
export class ZoneEventPage implements OnInit {

  events: ZoneEventList[] = [];
  title: string = "No Shard selected yet.";
  currentDC: string = 'EU';

  constructor(private service: DefaultService, private zoneEventService: ZoneEventService, private loadingController: LoadingController) {
  }

  ngOnInit(): void {

  }

  doRefresh(refresher) {
    this.loadEvents(this.currentDC, false).subscribe(value => {
      refresher.complete();
    }, error => {
      refresher.complete();
    });
  }

  switchToEU() {
    this.currentDC = 'EU';
    this.loadEvents('EU', true).subscribe();
  }

  switchToUS() {
    this.currentDC = 'US';
    this.loadEvents('US', true).subscribe();
  }

  switchToPrime() {
    this.currentDC = 'Prime';
    this.loadEvents('Prime', true).subscribe();
  }


  loadEvents(dcName, showLoader): Observable<any> {
    return new Observable(subscriber => {
      let loader;
      if (showLoader) {
        loader = this.loadingController.create({
          content: "Loading...",
          spinner: "crescent"
        });
        loader.present();
      }

      this.events = [];
      this.title = `Loading ${dcName}...`;
      this.zoneEventService.findAllEventsForDC(dcName).subscribe(zoneEventListArray => {
        for (let zoneEventList of zoneEventListArray) {
          zoneEventList.data = zoneEventList.data.filter(event => {
            return event.hasOwnProperty('name');
          });
          zoneEventList.data.forEach(event => {
              let eventCreatedSeconds = event.started;

              let nowSeconds = Date.now() / 1000;
              let diffSeconds = nowSeconds - eventCreatedSeconds;

              let minutes = Math.round(diffSeconds / 60);
              event.minutes = minutes;
              console.log(minutes);
          });
        }
        this.events = zoneEventListArray;
        this.title = dcName;

        if (showLoader) {
          loader.dismissAll();
        }
        subscriber.next(null);
        subscriber.complete();
      }, error => {
        console.log(`Error while fetching Events for ${dcName}!`);
        console.log(JSON.stringify(error));
        subscriber.error(error);
      });
    });
  }

}
