import { Component } from '@angular/core';
import {ZoneEventPage} from "../zone-events/zone-events";
import {HomePage} from "../home/home";
import {DatabasePage} from "../database/database";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ZoneEventPage;
  tab2Root = HomePage;
  tab3Root = DatabasePage;

}
