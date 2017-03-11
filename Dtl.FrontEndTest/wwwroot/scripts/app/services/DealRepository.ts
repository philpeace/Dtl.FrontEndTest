module Dtl.Services
{
    export class DealRepository implements IDealRepository
    {
        constructor(private $http: ng.IHttpService)
        {
            
        }

        get(): ng.IPromise<Dtl.Models.DealResult> {
            return null;
        }
    }

    angular
        .module('dtl')
        .service('dealRepository', ['$http', ($http) => new DealRepository($http)]);
}