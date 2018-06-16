import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DefaultService, ItemList} from "../../swagger";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit{

  categories: string[] = [];
  tags: string[] = [];
  items: ItemList = {items: [], page: 0, pages: 0, total: 0};

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: DefaultService) {
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
}
