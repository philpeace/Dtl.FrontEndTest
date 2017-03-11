module Dtl.Models {
    export class Deal {
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