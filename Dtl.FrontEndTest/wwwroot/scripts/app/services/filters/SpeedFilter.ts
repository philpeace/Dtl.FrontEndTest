module Dtl.Services.Filters {
    export class SpeedFilter implements IDealFilter {
        shouldFilter(query: Dtl.Models.DealQuery) {
            let isValid = query.speed && query.speed.length > 0;

            console.log(`SpeedFilter.shouldFilter = ${isValid}`);

            return isValid;
        }

        filter(query: Dtl.Models.DealQuery, deal: Dtl.Models.Deal) {
            if (deal.speed && deal.speed.label === query.speed) {

                console.info('SpeedFilter.Filter', deal.speed.label, query.speed);

                return true;
            }
        }
    }
}