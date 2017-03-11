'use strict';
describe('Deal Service Tests', function () {
    var dealRepository;
    var $q;
    var $rootScope;
    var dealService;
    var scope;
    beforeEach(function () { return angular.mock.module('dtl'); });
    beforeEach(inject(function ($injector) {
        dealRepository = $injector.get('dealRepository');
        dealService = $injector.get('dealService');
        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        scope = $rootScope.$new();
    }));
    describe('When getting the deals from the Repository', function () {
        it('Then the repository is called', function () {
            var spy = spyOn(dealRepository, 'get').and.callFake(function () {
                var deferred = $q.defer();
                var deals = new Array();
                deals.push(new Dtl.Models.Deal());
                deferred.resolve(deals);
                return deferred.promise;
            });
            var query = new Dtl.Models.DealQuery();
            var result;
            dealService.fetch(query).then(function (r) {
                result = r;
            });
            expect(spy).toHaveBeenCalled();
        });
        it('The Service filters by ProductType', function () {
            var spy = spyOn(dealRepository, 'get').and.callFake(function () {
                var deferred = $q.defer();
                var deals = new Array();
                var deal = new Dtl.Models.Deal();
                deal.productTypes = ['Foo'];
                deals.push(deal);
                var dealResult = new Dtl.Models.DealResult();
                dealResult.deals = deals;
                deferred.resolve(dealResult);
                return deferred.promise;
            });
            var query = new Dtl.Models.DealQuery();
            query.productTypes.push('Foo');
            var result;
            dealService.fetch(query).then(function (r) {
                result = r;
            });
            scope.$digest();
            expect(result.length).toBe(1);
        });
        it('The Service filters by Speed', function () {
            var spy = spyOn(dealRepository, 'get').and.callFake(function () {
                var deferred = $q.defer();
                var deals = new Array();
                var deal = new Dtl.Models.Deal();
                deal.speed = new Dtl.Models.DataItem();
                deal.speed.label = 'bar';
                deals.push(deal);
                var dealResult = new Dtl.Models.DealResult();
                dealResult.deals = deals;
                deferred.resolve(dealResult);
                return deferred.promise;
            });
            var query = new Dtl.Models.DealQuery();
            query.speed = 'bar';
            var result;
            dealService.fetch(query).then(function (r) {
                result = r;
            });
            scope.$digest();
            expect(result.length).toBe(1);
        });
        it('The Service filters by Data', function () {
            var spy = spyOn(dealRepository, 'get').and.callFake(function () {
                var deferred = $q.defer();
                var deals = new Array();
                var deal = new Dtl.Models.Deal();
                deal.mobile = new Dtl.Models.Mobile();
                deal.mobile.data = new Dtl.Models.DataItem();
                deal.mobile.data.label = 'baz';
                deals.push(deal);
                var dealResult = new Dtl.Models.DealResult();
                dealResult.deals = deals;
                deferred.resolve(dealResult);
                return deferred.promise;
            });
            var query = new Dtl.Models.DealQuery();
            query.data = 'baz';
            var result;
            dealService.fetch(query).then(function (r) {
                result = r;
            });
            scope.$digest();
            expect(result.length).toBe(1);
        });
    });
});
//# sourceMappingURL=DealServiceTests.js.map