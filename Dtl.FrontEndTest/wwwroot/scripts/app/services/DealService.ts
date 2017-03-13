module Dtl.Services {
    export class DealService implements IDealService {
        filters: Array<Dtl.Services.Filters.IDealFilter>;

        constructor(private dealRepository: IDealRepository) {
            this.filters = [
                new Dtl.Services.Filters.ProductTypeFilter(),
                new Dtl.Services.Filters.SpeedFilter(),
                new Dtl.Services.Filters.MobileDataFilter()
            ];
        }

        fetch(query: Dtl.Models.DealQuery): ng.IPromise<Array<Dtl.Models.Deal>> {
            var dealData = this.dealRepository.get().then(result => {
                let activeFilters: Array<Dtl.Services.Filters.IDealFilter> = [];
                for (let j = 0; j < this.filters.length; j++) {
                    if (this.filters[j].shouldFilter(query)) {
                        activeFilters.push(this.filters[j]);
                    }
                }
                // foo

                let filteredDeals = result.deals.filter(deal => {
                    let filteredCount = 0;

                    for (let f = 0; f < activeFilters.length; f++) {
                        if (activeFilters[f].filter(query, deal)) {
                            filteredCount++;
                        }
                    }

                    return filteredCount === activeFilters.length;

                    //const productTypeCount = query.productTypes.length;

                    //if (productTypeCount > 0) {
                    //    let foundProducts = 0;
                    //    for (let i = 0;i < query.productTypes.length;i++) {
                    //        if (deal.productTypes.indexOf(query.productTypes[i]) > -1) {
                    //            foundProducts++;
                    //        }
                    //    }

                    //    if (productTypeCount === foundProducts) {
                    //        return deal;
                    //    }                        
                    //}

                    //if (deal.speed && deal.speed.label === query.speed) {
                    //    return deal;
                    //}
                    //if (deal.mobile && deal.mobile.data && deal.mobile.data.label === query.data) {
                    //    return deal;
                    //}
                    //return false;
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