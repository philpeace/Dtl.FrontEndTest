declare function init(): void;
declare module Dtl.Controllers {
    class DealController {
        scope: any;
        dealService: Dtl.Services.IDealService;
        deals: Array<Dtl.Models.Deal>;
        dealQuery: Dtl.Models.DealQuery;
        productTypes: Array<string>;
        showSideMenu: boolean;
        constructor($scope: ng.IScope, dealService: Dtl.Services.IDealService);
        toggleProductType(p: string): void;
        search(): void;
        speedChanged(): void;
        dataChanged(): void;
        toggleSideNav(): void;
    }
}
declare module Dtl.Models {
    class Channel {
        name: string;
        channelCategory: string;
        logo: string;
    }
}
declare module Dtl.Models {
    class DataItem {
        label: string;
        sortValue: number;
    }
}
declare module Dtl.Models {
    class Deal {
        title: string;
        contractLength: string;
        speed: DataItem;
        usage: DataItem;
        cost: string;
        offer: Offer;
        popularChannels: Array<Channel>;
        productTypes: Array<string>;
        mobile: Mobile;
    }
}
declare module Dtl.Models {
    class DealQuery {
        constructor();
        productTypes: Array<string>;
        speed: string;
        data: string;
        isInvalid(): boolean;
    }
}
declare module Dtl.Models {
    class DealResult {
        deals: Array<Deal>;
    }
}
declare module Dtl.Models {
    class Mobile {
        minutes: DataItem;
        data: DataItem;
        texts: DataItem;
        connectionType: DataItem;
    }
}
declare module Dtl.Models {
    class Offer {
        type: string;
        title: string;
        smallLogo: string;
    }
}
declare module Dtl.Services {
    class DealRepository implements IDealRepository {
        private $http;
        constructor($http: ng.IHttpService);
        get(): ng.IPromise<Dtl.Models.DealResult>;
    }
}
declare module Dtl.Services {
    class DealService implements IDealService {
        private dealRepository;
        filters: Array<Dtl.Services.Filters.IDealFilter>;
        constructor(dealRepository: IDealRepository);
        fetch(query: Dtl.Models.DealQuery): ng.IPromise<Array<Dtl.Models.Deal>>;
    }
}
declare module Dtl.Services {
    interface IDealRepository {
        get(): ng.IPromise<Dtl.Models.DealResult>;
    }
}
declare module Dtl.Services {
    import Deal = Dtl.Models.Deal;
    interface IDealService {
        fetch(query: Dtl.Models.DealQuery): ng.IPromise<Array<Deal>>;
    }
}
declare module Dtl.Services.Filters {
    interface IDealFilter {
        shouldFilter(query: Dtl.Models.DealQuery): boolean;
        filter(query: Dtl.Models.DealQuery, deal: Dtl.Models.Deal): boolean;
    }
}
declare module Dtl.Services.Filters {
    class MobileDataFilter implements IDealFilter {
        shouldFilter(query: Dtl.Models.DealQuery): boolean;
        filter(query: Dtl.Models.DealQuery, deal: Dtl.Models.Deal): boolean;
    }
}
declare module Dtl.Services.Filters {
    class ProductTypeFilter implements Dtl.Services.Filters.IDealFilter {
        shouldFilter(query: Dtl.Models.DealQuery): boolean;
        filter(query: Dtl.Models.DealQuery, deal: Dtl.Models.Deal): boolean;
    }
}
declare module Dtl.Services.Filters {
    class SpeedFilter implements IDealFilter {
        shouldFilter(query: Dtl.Models.DealQuery): boolean;
        filter(query: Dtl.Models.DealQuery, deal: Dtl.Models.Deal): boolean;
    }
}
