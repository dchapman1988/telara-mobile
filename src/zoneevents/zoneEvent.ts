/**
 * Rift ZoneEvent
 */
export interface ZoneEvent {
    shard?: string;
    zone?: string;
    zoneId?: number;
    name?: string;
    started?: number;
}
