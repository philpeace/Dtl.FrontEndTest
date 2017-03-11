///<reference path="../../../typings/index.d.ts"/>

'use strict';

describe('Deal Repository Tests', () => {
    var $http: any;
    var $httpBackend: any;

    var dealRepository: Dtl.Services.DealRepository;

    beforeEach(() => angular.mock.module('dtl'));

    beforeEach(inject(($injector) => {
        $http = $injector.get('$http');
        $httpBackend = $injector.get('$httpBackend');
        dealRepository = $injector.get('dealRepository');
    }));

    describe('When getting the deals from the Repository', () => {
        it('Then the deals are retuend from the HTTP call', () => {
            let data = [{ deals: [new Dtl.Models.Deal()] }];
            $httpBackend.when('GET', '/data/deals.json').respond(200, data);

            var result;

            dealRepository.get().then(r => {
                result = r;
            });

            $httpBackend.flush();

            expect(result[0].deals.length).toBe(1);
        });
    });
});