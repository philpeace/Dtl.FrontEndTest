module Dtl.Models {
    export class DealQuery {
        constructor() {
            this.productTypes = [];
            this.speed = '';
            this.data = '';
        }

        productTypes: Array<string>;
        speed: string;
        data: string;

        isInvalid() {
            return this.productTypes.length === 0 && this.speed.length === 0 && this.data.length === 0;
        }
    }
}