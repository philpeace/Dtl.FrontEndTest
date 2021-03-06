﻿///<reference path="../../../typings/index.d.ts"/>

'use strict';

describe('Deal Service Tests', () => {
    var dealRepository: any;
    var $q: any;
    var $rootScope: any;
    var dealService: Dtl.Services.IDealService;
    var scope: any;

    beforeEach(() => angular.mock.module('dtl'));

    beforeEach(inject(($injector) => {
        dealRepository = $injector.get('dealRepository');
        dealService = $injector.get('dealService');
        $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');
        scope = $rootScope.$new();
    }));

    describe('When getting the deals from the Repository', () => {
        it('Then the repository is called', () => {

            var spy = spyOn(dealRepository, 'get').and.callFake(() => {
                const deferred = $q.defer();

                var deals = new Array<Dtl.Models.Deal>();
                deals.push(new Dtl.Models.Deal());
                deferred.resolve(deals);

                return deferred.promise;
            });

            var query = new Dtl.Models.DealQuery();
            var result;

            dealService.fetch(query).then((r) => {
                result = r;
            });

            expect(spy).toHaveBeenCalled();
        });

        it('The Service filters by ProductType', () => {

            var spy = spyOn(dealRepository, 'get').and.callFake(() => {
                const deferred = $q.defer();

                var deals = new Array<Dtl.Models.Deal>();
                let deal = new Dtl.Models.Deal();
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

            dealService.fetch(query).then((r) => {
                result = r;
            });
            scope.$digest();
            expect(result.length).toBe(1);
        });
        it('The Service filters by Speed', () => {

            var spy = spyOn(dealRepository, 'get').and.callFake(() => {
                const deferred = $q.defer();

                var deals = new Array<Dtl.Models.Deal>();
                let deal = new Dtl.Models.Deal();
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

            dealService.fetch(query).then((r) => {
                result = r;
            });
            scope.$digest();
            expect(result.length).toBe(1);
        });
        it('The Service filters by Data', () => {

            var spy = spyOn(dealRepository, 'get').and.callFake(() => {
                const deferred = $q.defer();

                var deals = new Array<Dtl.Models.Deal>();
                let deal = new Dtl.Models.Deal();
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

            dealService.fetch(query).then((r) => {
                result = r;
            });
            scope.$digest();
            expect(result.length).toBe(1);
        });
    });
});