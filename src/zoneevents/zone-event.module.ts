import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ZoneEventService} from './zone-event.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  exports: [],
  providers: [ZoneEventService]
})
export class ZoneEventModule {
  constructor(@Optional() @SkipSelf() parentModule: ZoneEventModule) {
    if (parentModule) {
      throw new Error('ZoneEventModule is already loaded. Import your base AppModule only.');
    }
  }
}
