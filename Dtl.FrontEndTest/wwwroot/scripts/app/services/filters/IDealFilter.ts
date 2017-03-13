module Dtl.Services.Filters {
    export interface IDealFilter {
        shouldFilter(query: Dtl.Models.DealQuery): boolean;
        filter(query: Dtl.Models.DealQuery, deal: Dtl.Models.Deal) : boolean;
    }
}
