import {Component, OnInit} from '@angular/core';
import {DefaultService} from "../../swagger-telaradb";
import {ZoneEventService} from "../../zoneevents/zone-event.service";
import {ZoneEvent} from "../../zoneevents/zoneEvent";
import {ZoneEventList} from "../../zoneevents/zoneEventList";
import {LoadingController} from "ionic-angular";

@Component({
  selector: 'page-zoneevents',
  templateUrl: 'zone-events.html'
})
export class ZoneEventPage implements OnInit {

  events: ZoneEventList[] = [];
  title: string = "No Shard selected yet.";

  constructor(private service: DefaultService, private zoneEventService: ZoneEventService, private loadingController: LoadingController) {
  }

  ngOnInit(): void {

  }

  getEventsForEU() {
    this.events = [];
    this.title = 'Loading EU...';
    let loader = this.loadingController.create({
      content: "Loading EU..",
      spinner: "crescent"
    });
    loader.present();
    this.zoneEventService.findAllEventsForDC('EU').subscribe(zoneEventListArray => {
      for (let zoneEventList of zoneEventListArray) {
        zoneEventList.data = zoneEventList.data.filter(event => {
          return event.hasOwnProperty('name');
        });
      }
      this.events = zoneEventListArray;
      this.title = 'EU';
      loader.dismissAll();
    }, error => {
      console.log("Error while fetching Events for EU!");
      console.log(JSON.stringify(error));
    });
  }

  getEventsForUS() {
    this.events = [];
    this.title = 'Loading US...';
    let loader = this.loadingController.create({
      content: "Loading US..",
      spinner: "crescent"
    });
    loader.present();
    this.zoneEventService.findAllEventsForDC('US').subscribe(zoneEventListArray => {
      for (let zoneEventList of zoneEventListArray) {
        zoneEventList.data = zoneEventList.data.filter(event => {
          return event.hasOwnProperty('name');
        });
      }
      this.events = zoneEventListArray;
      this.title = 'US';
      loader.dismissAll();
    }, error => {
      console.log("Error while fetching Events for US!");
      console.log(JSON.stringify(error));
    });
  }

  getEventsForPrime() {
    this.events = [];
    this.title = 'Loading Prime...';
    let loader = this.loadingController.create({
      content: "Loading Prime..",
      spinner: "crescent"
    });
    loader.present();
    this.zoneEventService.findAllEventsForDC('Prime').subscribe(zoneEventListArray => {
      for (let zoneEventList of zoneEventListArray) {
        zoneEventList.data = zoneEventList.data.filter(event => {
          return event.hasOwnProperty('name');
        });
      }
      this.events = zoneEventListArray;
      this.title = 'Prime';
      loader.dismissAll();
    }, error => {
      console.log("Error while fetching Events for Prime!");
      console.log(JSON.stringify(error));
    });
  }

}
