import {Component, OnInit} from '@angular/core';
import {DefaultService} from "../../swagger-telaradb";
import {ZoneEventService} from "../../zoneevents/zone-event.service";
import {ZoneEvent} from "../../zoneevents/zoneEvent";
import {ZoneEventList} from "../../zoneevents/zoneEventList";

@Component({
  selector: 'page-zoneevents',
  templateUrl: 'zone-events.html'
})
export class ZoneEventPage implements OnInit {

  events: ZoneEventList[] = [];
  title: string = "No Shard selected yet.";

  constructor(private service: DefaultService, private zoneEventService: ZoneEventService) {
  }

  ngOnInit(): void {

  }

  getEventsForEU() {
    this.events = [];
    this.title = 'Loading EU...';
    this.zoneEventService.findAllEventsForDC('EU').subscribe(zoneEventListArray => {
      for (let zoneEventList of zoneEventListArray) {
        zoneEventList.data = zoneEventList.data.filter(event => {
          return event.hasOwnProperty('name');
        });
      }
      this.events = zoneEventListArray;
      this.title = 'EU';
    }, error => {
      console.log("Error while fetching Events for EU!");
      console.log(JSON.stringify(error));
    });
  }

  getEventsForUS() {
    this.events = [];
    this.title = 'Loading US...';
    this.zoneEventService.findAllEventsForDC('US').subscribe(zoneEventListArray => {
      for (let zoneEventList of zoneEventListArray) {
        zoneEventList.data = zoneEventList.data.filter(event => {
          return event.hasOwnProperty('name');
        });
      }
      this.events = zoneEventListArray;
      this.title = 'US';
    }, error => {
      console.log("Error while fetching Events for US!");
      console.log(JSON.stringify(error));
    });
  }

  getEventsForPrime() {
    this.events = [];
    this.title = 'Loading Prime...';
    this.zoneEventService.findAllEventsForDC('Prime').subscribe(zoneEventListArray => {
      for (let zoneEventList of zoneEventListArray) {
        zoneEventList.data = zoneEventList.data.filter(event => {
          return event.hasOwnProperty('name');
        });
      }
      this.events = zoneEventListArray;
      this.title = 'Prime';
    }, error => {
      console.log("Error while fetching Events for Prime!");
      console.log(JSON.stringify(error));
    });
  }

}
