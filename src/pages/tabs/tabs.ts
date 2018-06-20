import { Component } from '@angular/core';
import {ZoneEventPage} from "../zone-events/zone-events";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ZoneEventPage;
  tab2Root = TabsPage;

}
