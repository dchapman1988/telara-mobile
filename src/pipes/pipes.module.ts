import { NgModule } from '@angular/core';
import { EventTimePipe } from './event-time/event-time';
@NgModule({
	declarations: [EventTimePipe],
	imports: [],
	exports: [EventTimePipe]
})
export class PipesModule {}
