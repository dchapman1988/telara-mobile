import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DefaultService} from "../../swagger";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit{

  categories: string[] = [];
  tags: string[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: DefaultService) {
  }

  ngOnInit(): void {
    this.service.findAllCategories().subscribe(categories => {
      this.categories = categories.items;
    });

    this.service.findAllTags().subscribe(tags => {
      this.tags = tags.items;
    });
  }
}
