'use strict';
describe('Deal Service Tests', function () {
    var dealRepository;
    var $q;
    var dealService;
    beforeEach(function () { return angular.mock.module('dtl'); });
    beforeEach(inject(function ($injector) {
        dealRepository = $injector.get('dealRepository');
        dealService = $injector.get('dealService');
        $q = $injector.get("$q");
    }));
    describe('When getting the deals from the Repository', function () {
        it('Then the repository is called', function () {
            var spy = spyOn(dealRepository, "get").and.callFake(function () {
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
    });
});
//# sourceMappingURL=DealServiceTests.js.map