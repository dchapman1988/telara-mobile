import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DefaultService, ItemList} from "../../swagger-telaradb";
import {ZoneEvent, ZoneeventServiceService} from "../../swagger-zoneevents";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit{

  categories: string[] = [];
  tags: string[] = [];
  items: ItemList = {items: [], page: 0, pages: 0, total: 0};
  events: ZoneEvent[] = [];
  title: string = "No Shard selected yet.";

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: DefaultService, private zoneeventServiceService: ZoneeventServiceService) {
  }

  ngOnInit(): void {
    this.service.findAllCategories().subscribe(categories => {
      this.categories = categories.items;
    });

    this.service.findAllTags().subscribe(tags => {
      this.tags = tags.items;
    });

    this.service.findItems("Hammer", "", "", 0, 50, false, 1, 70, 0, 70).subscribe(itemList => {

      this.items = itemList;
      for(let item of this.items.items) {
        let iconPath: string = item["Icon"];
        let replaced = iconPath.replace("\\", "/");
        item["Icon"] = replaced;
      }
    });

  }

  getEventsForShard(shardId: number, title: string) {
    this.zoneeventServiceService.findAllEventsForShard(shardId).subscribe(eventList => {
      this.events = eventList.data;
      this.title = title;
    });
  }
}
