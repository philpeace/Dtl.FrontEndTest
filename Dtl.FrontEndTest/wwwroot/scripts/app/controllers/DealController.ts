module Dtl.Controllers {
    export class DealController {
        scope: any;
        dealService: Dtl.Services.IDealService;
        deals: Array<Dtl.Models.Deal>;
        dealQuery: Dtl.Models.DealQuery;
        productTypes: Array<string> = ['Broadband', 'TV', 'Mobile'];
        showSideMenu: boolean;

        constructor($scope: ng.IScope, dealService: Dtl.Services.IDealService) {
            this.scope = $scope;
            this.dealService = dealService;
            this.dealQuery = new Dtl.Models.DealQuery();
        }

        toggleProductType(p: string) {
            var idx = this.dealQuery.productTypes.indexOf(p);

            // is currently selected
            if (idx > -1) {
                this.dealQuery.productTypes.splice(idx, 1);
            }
            // is newly selected
            else {
                this.dealQuery.productTypes.push(p);
            }

            this.search();
        }

        search() {
            this.dealService.fetch(this.dealQuery).then(result => {
                this.deals = result;
            });
        }

        speedChanged() {
            this.search();
        }

        dataChanged() {
            this.search();
        }

        toggleSideNav() {
            this.showSideMenu = !this.showSideMenu;
        }
    }

    angular
        .module('dtl')
        .controller('DealController', ['$scope', 'dealService', ($scope, dealService) => new DealController($scope, dealService)]);
}