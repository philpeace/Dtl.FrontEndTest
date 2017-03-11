module Dtl.Services {
    export class DealService implements IDealService {
        constructor(private dealRepository: IDealRepository) {
            
        }

        fetch(query: Dtl.Models.DealQuery): ng.IPromise<Array<Dtl.Models.Deal>> {
            var dealData = this.dealRepository.get().then(result => {
                console.log(result);
                let filteredDeals = result.deals.filter(deal => {
                    const productTypeCount = query.productTypes.length;
                    let foundProducts = 0;
                    for (let i = 0;i < query.productTypes.length;i++) {
                        if (deal.productTypes.indexOf(query.productTypes[i]) > -1) {
                            foundProducts++;
                        }
                    }

                    if (productTypeCount === foundProducts) {
                        return deal;
                    }
                    //if (deal.speed.label === query.speed) {
                    //    return deal;
                    //}
                    //if (deal.mobile && deal.mobile.data.label === query.data) {
                    //    return deal;
                    //}
                    return false;
                });

                return filteredDeals;
            });

            return dealData;
        }
    }

    angular
        .module('dtl')
        .service('dealService', ['dealRepository', (dealRepository) => new DealService(dealRepository)]);
}