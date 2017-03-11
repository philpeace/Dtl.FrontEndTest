var Dtl;
(function (Dtl) {
    var Services;
    (function (Services) {
        var DealRepository = (function () {
            function DealRepository($http) {
                this.$http = $http;
            }
            DealRepository.prototype.get = function () {
                var deals = this.$http.get('/data/deals.json').then(function (result) {
                    return result.data;
                });
                return deals;
            };
            return DealRepository;
        }());
        Services.DealRepository = DealRepository;
        angular
            .module('app.dtl')
            .service('dealRepository', ['$http', function ($http) { return new DealRepository($http); }]);
    })(Services = Dtl.Services || (Dtl.Services = {}));
})(Dtl || (Dtl = {}));
//# sourceMappingURL=DealRepository.js.map