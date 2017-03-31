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
                this.productTypes = ['Broadband', 'TV', 'Mobile', 'Phone'];
                this.scope = $scope;
                this.dealService = dealService;
                this.dealQuery = new Dtl.Models.DealQuery();
                this.deals = [];
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
                if (!this.dealQuery.isInvalid()) {
                    this.dealService.fetch(this.dealQuery).then(function (result) {
                        _this.deals = result;
                    });
                }
                else {
                    this.deals = [];
                }
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
                this.speed = '';
                this.data = '';
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
                this.filters = [
                    new Dtl.Services.Filters.ProductTypeFilter(),
                    new Dtl.Services.Filters.SpeedFilter(),
                    new Dtl.Services.Filters.MobileDataFilter()
                ];
            }
            DealService.prototype.fetch = function (query) {
                var _this = this;
                var dealData = this.dealRepository.get().then(function (result) {
                    var activeFilters = [];
                    for (var j = 0; j < _this.filters.length; j++) {
                        if (_this.filters[j].shouldFilter(query)) {
                            activeFilters.push(_this.filters[j]);
                        }
                    }
                    var filteredDeals = result.deals.filter(function (deal) {
                        var filteredCount = 0;
                        for (var f = 0; f < activeFilters.length; f++) {
                            if (activeFilters[f].filter(query, deal)) {
                                filteredCount++;
                            }
                        }
                        return filteredCount === activeFilters.length;
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
var Dtl;
(function (Dtl) {
    var Services;
    (function (Services) {
        var Filters;
        (function (Filters) {
            var MobileDataFilter = (function () {
                function MobileDataFilter() {
                }
                MobileDataFilter.prototype.shouldFilter = function (query) {
                    var isValid = query.data && query.data.length > 0;
                    console.log("MobileFilter.shouldFilter = " + isValid);
                    return isValid;
                };
                MobileDataFilter.prototype.filter = function (query, deal) {
                    if (deal.mobile && deal.mobile.data && deal.mobile.data.label === query.data) {
                        console.info('MobileFilter.Filter', deal.mobile.data.label, query.data);
                        return true;
                    }
                };
                return MobileDataFilter;
            }());
            Filters.MobileDataFilter = MobileDataFilter;
        })(Filters = Services.Filters || (Services.Filters = {}));
    })(Services = Dtl.Services || (Dtl.Services = {}));
})(Dtl || (Dtl = {}));
var Dtl;
(function (Dtl) {
    var Services;
    (function (Services) {
        var Filters;
        (function (Filters) {
            var ProductTypeFilter = (function () {
                function ProductTypeFilter() {
                }
                ProductTypeFilter.prototype.shouldFilter = function (query) {
                    var isValid = query.productTypes.length > 0;
                    console.log("ProductTypeFilter.shouldFilter = " + isValid);
                    return isValid;
                };
                ProductTypeFilter.prototype.filter = function (query, deal) {
                    var productTypeCount = query.productTypes.length;
                    console.info('ProductTypeFilter.Filter', deal.productTypes, query.productTypes);
                    if (productTypeCount > 0) {
                        var foundProducts = 0;
                        for (var i = 0; i < query.productTypes.length; i++) {
                            if (deal.productTypes.indexOf(query.productTypes[i]) > -1) {
                                foundProducts++;
                            }
                        }
                        if (productTypeCount === foundProducts) {
                            return true;
                        }
                    }
                    return false;
                };
                return ProductTypeFilter;
            }());
            Filters.ProductTypeFilter = ProductTypeFilter;
        })(Filters = Services.Filters || (Services.Filters = {}));
    })(Services = Dtl.Services || (Dtl.Services = {}));
})(Dtl || (Dtl = {}));
var Dtl;
(function (Dtl) {
    var Services;
    (function (Services) {
        var Filters;
        (function (Filters) {
            var SpeedFilter = (function () {
                function SpeedFilter() {
                }
                SpeedFilter.prototype.shouldFilter = function (query) {
                    var isValid = query.speed && query.speed.length > 0;
                    console.log("SpeedFilter.shouldFilter = " + isValid);
                    return isValid;
                };
                SpeedFilter.prototype.filter = function (query, deal) {
                    if (deal.speed && deal.speed.label === query.speed) {
                        console.info('SpeedFilter.Filter', deal.speed.label, query.speed);
                        return true;
                    }
                };
                return SpeedFilter;
            }());
            Filters.SpeedFilter = SpeedFilter;
        })(Filters = Services.Filters || (Services.Filters = {}));
    })(Services = Dtl.Services || (Dtl.Services = {}));
})(Dtl || (Dtl = {}));
//# sourceMappingURL=app.js.map