module Dtl.Services.Filters {
    export class MobileDataFilter implements IDealFilter {
        shouldFilter(query: Dtl.Models.DealQuery) {
            const isValid = query.data && query.data.length > 0;

            console.log(`MobileFilter.shouldFilter = ${isValid}`);

            return isValid;
        }

        filter(query: Dtl.Models.DealQuery, deal: Dtl.Models.Deal) {
            if (deal.mobile && deal.mobile.data && deal.mobile.data.label === query.data) {

                console.info('MobileFilter.Filter', deal.mobile.data.label, query.data);

                return true;
            }
        }
    }
}