'use strict';
describe('Deal Repository Tests', function () {
    var $http;
    var $httpBackend;
    var dealRepository;
    beforeEach(function () { return angular.mock.module('dtl'); });
    beforeEach(inject(function ($injector) {
        $http = $injector.get('$http');
        $httpBackend = $injector.get('$httpBackend');
        dealRepository = $injector.get('dealRepository');
    }));
    describe('When getting the deals from the Repository', function () {
        it('Then the deals are retuend from the HTTP call', function () {
            var data = [{ deals: [new Dtl.Models.Deal()] }];
            $httpBackend.when('GET', '/data/deals.json').respond(200, data);
            var result;
            dealRepository.get().then(function (r) {
                result = r;
            });
            $httpBackend.flush();
            expect(result[0].deals.length).toBe(1);
        });
    });
});
//# sourceMappingURL=DealRepositoryTests.js.map