import {Component, OnInit} from '@angular/core';
import {DefaultService} from "../../swagger-telaradb";
import {ZoneEventService} from "../../zoneevents/zone-event.service";
import {ZoneEvent} from "../../zoneevents/zoneEvent";

@Component({
  selector: 'page-zoneevents',
  templateUrl: 'zone-events.html'
})
export class ZoneEventPage implements OnInit {

  events: ZoneEvent[] = [];
  title: string = "No Shard selected yet.";

  constructor(private service: DefaultService, private zoneEventService: ZoneEventService) {
  }

  ngOnInit(): void {

  }

  getEventsForEU() {
    this.events = [];
    let newEvents: ZoneEvent[] = [];
    this.zoneEventService.findAllEventsForEU().subscribe(zoneEventListArray => {
      for (let zoneEventList of zoneEventListArray) {
        let events = zoneEventList.data;
        for (let event of events) {
          if (event.name !== undefined) {
            newEvents.push(event);
          }
        }
      }
      this.events = newEvents;
      this.title = 'EU';
    }, error => {
      console.log("Error while fetching Events for EU!");
      console.log(JSON.stringify(error));
    });
  }
}
