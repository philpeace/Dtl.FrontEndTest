module Dtl.Services
{
    export class DealRepository implements IDealRepository
    {
        constructor(private $http: ng.IHttpService)
        {
            
        }

        get(): ng.IPromise<Dtl.Models.DealResult> {
            const deals = this.$http.get<Dtl.Models.DealResult>('/data/deals.json').then(result => {
                return result.data;
            });

            return deals;
        }
    }

    angular
        .module('dtl')
        .service('dealRepository', ['$http', ($http) => new DealRepository($http)]);
}