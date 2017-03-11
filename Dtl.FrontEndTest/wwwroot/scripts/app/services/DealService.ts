module Dtl.Services {
    export class DealService implements IDealService {
        constructor(private dealRepository: IDealRepository) {
            
        }

        fetch(query: Dtl.Models.DealQuery): ng.IPromise<Array<Dtl.Models.Deal>> {
            var dealData = null;

            return dealData;
        }
    }

    angular
        .module('dtl')
        .service('dealService', ['dealRepository', (dealRepository) => new DealService(dealRepository)]);
}