'use strict';
function init() {
    console.log('The app is now live');
}
angular.module('dtl', []);
angular.module('dtl').run(init);
var Dtl;
(function (Dtl) {
    var Controllers;
    (function (Controllers) {
        var DealController = (function () {
            function DealController($scope, dealService) {
                this.productTypes = ['Broadband', 'TV', 'Mobile'];
                this.scope = $scope;
                this.dealService = dealService;
                this.dealQuery = new Dtl.Models.DealQuery();
            }
            DealController.prototype.toggleProductType = function (p) {
                var idx = this.dealQuery.productTypes.indexOf(p);
                if (idx > -1) {
                    this.dealQuery.productTypes.splice(idx, 1);
                }
                else {
                    this.dealQuery.productTypes.push(p);
                }
                this.search();
            };
            DealController.prototype.search = function () {
                var _this = this;
                this.dealService.fetch(this.dealQuery).then(function (result) {
                    _this.deals = result;
                });
            };
            DealController.prototype.speedChanged = function () {
                this.search();
            };
            DealController.prototype.dataChanged = function () {
                this.search();
            };
            DealController.prototype.toggleSideNav = function () {
                this.showSideMenu = !this.showSideMenu;
            };
            return DealController;
        }());
        Controllers.DealController = DealController;
        angular
            .module('dtl')
            .controller('DealController', ['$scope', 'dealService', function ($scope, dealService) { return new DealController($scope, dealService); }]);
    })(Controllers = Dtl.Controllers || (Dtl.Controllers = {}));
})(Dtl || (Dtl = {}));
var Dtl;
(function (Dtl) {
    var Models;
    (function (Models) {
        var Channel = (function () {
            function Channel() {
            }
            return Channel;
        }());
        Models.Channel = Channel;
    })(Models = Dtl.Models || (Dtl.Models = {}));
})(Dtl || (Dtl = {}));
var Dtl;
(function (Dtl) {
    var Models;
    (function (Models) {
        var DataItem = (function () {
            function DataItem() {
            }
            return DataItem;
        }());
        Models.DataItem = DataItem;
    })(Models = Dtl.Models || (Dtl.Models = {}));
})(Dtl || (Dtl = {}));
var Dtl;
(function (Dtl) {
    var Models;
    (function (Models) {
        var Deal = (function () {
            function Deal() {
            }
            return Deal;
        }());
        Models.Deal = Deal;
    })(Models = Dtl.Models || (Dtl.Models = {}));
})(Dtl || (Dtl = {}));
var Dtl;
(function (Dtl) {
    var Models;
    (function (Models) {
        var DealQuery = (function () {
            function DealQuery() {
                this.productTypes = [];
            }
            DealQuery.prototype.isInvalid = function () {
                return this.productTypes.length === 0 && this.speed.length === 0 && this.data.length === 0;
            };
            return DealQuery;
        }());
        Models.DealQuery = DealQuery;
    })(Models = Dtl.Models || (Dtl.Models = {}));
})(Dtl || (Dtl = {}));
var Dtl;
(function (Dtl) {
    var Models;
    (function (Models) {
        var DealResult = (function () {
            function DealResult() {
            }
            return DealResult;
        }());
        Models.DealResult = DealResult;
    })(Models = Dtl.Models || (Dtl.Models = {}));
})(Dtl || (Dtl = {}));
var Dtl;
(function (Dtl) {
    var Models;
    (function (Models) {
        var Mobile = (function () {
            function Mobile() {
            }
            return Mobile;
        }());
        Models.Mobile = Mobile;
    })(Models = Dtl.Models || (Dtl.Models = {}));
})(Dtl || (Dtl = {}));
var Dtl;
(function (Dtl) {
    var Models;
    (function (Models) {
        var Offer = (function () {
            function Offer() {
            }
            return Offer;
        }());
        Models.Offer = Offer;
    })(Models = Dtl.Models || (Dtl.Models = {}));
})(Dtl || (Dtl = {}));
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
            .module('dtl')
            .service('dealRepository', ['$http', function ($http) { return new DealRepository($http); }]);
    })(Services = Dtl.Services || (Dtl.Services = {}));
})(Dtl || (Dtl = {}));
var Dtl;
(function (Dtl) {
    var Services;
    (function (Services) {
        var DealService = (function () {
            function DealService(dealRepository) {
                this.dealRepository = dealRepository;
            }
            DealService.prototype.fetch = function (query) {
                var dealData = this.dealRepository.get().then(function (result) {
                    var filteredDeals = result.deals.filter(function (deal) {
                        var productTypeCount = query.productTypes.length;
                        var foundProducts = 0;
                        for (var i = 0; i < query.productTypes.length; i++) {
                            if (deal.productTypes.indexOf(query.productTypes[i]) > -1) {
                                foundProducts++;
                            }
                        }
                        if (productTypeCount === foundProducts) {
                            return deal;
                        }
                        return false;
                    });
                    return filteredDeals;
                });
                return dealData;
            };
            return DealService;
        }());
        Services.DealService = DealService;
        angular
            .module('dtl')
            .service('dealService', ['dealRepository', function (dealRepository) { return new DealService(dealRepository); }]);
    })(Services = Dtl.Services || (Dtl.Services = {}));
})(Dtl || (Dtl = {}));
//# sourceMappingURL=app.js.map