module Dtl.Services {
    import Deal = Dtl.Models.Deal;

    export interface IDealService {
        fetch(query: Dtl.Models.DealQuery): ng.IPromise<Array<Deal>>;
    }
}
