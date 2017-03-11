///<reference path="../../../typings/index.d.ts"/>

'use strict';

describe('Deal Service Tests', () => {
    var dealRepository: any;
    var $q: any;
    var dealService: Dtl.Services.IDealService;

    beforeEach(() => angular.mock.module('dtl'));

    beforeEach(inject(($injector) => {
        dealRepository = $injector.get('dealRepository');
        dealService = $injector.get('dealService');
        $q = $injector.get("$q");
    }));

    describe('When getting the deals from the Repository', () => {
        it('Then the repository is called', () => {

            var spy = spyOn(dealRepository, "get").and.callFake(() => {
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
    });
});