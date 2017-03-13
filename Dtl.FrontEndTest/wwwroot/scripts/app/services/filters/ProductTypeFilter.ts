module Dtl.Services.Filters {
    export class ProductTypeFilter implements Dtl.Services.Filters.IDealFilter {
        shouldFilter(query: Dtl.Models.DealQuery) {
            const isValid = query.productTypes.length > 0;

            console.log(`ProductTypeFilter.shouldFilter = ${isValid}`);

            return isValid;
        }

        filter(query: Dtl.Models.DealQuery, deal: Dtl.Models.Deal) {
            const productTypeCount = query.productTypes.length;

            console.info('ProductTypeFilter.Filter', deal.productTypes, query.productTypes);

            if (productTypeCount > 0) {
                let foundProducts = 0;
                for (let i = 0; i < query.productTypes.length; i++) {
                    if (deal.productTypes.indexOf(query.productTypes[i]) > -1) {
                        foundProducts++;
                    }
                }

                if (productTypeCount === foundProducts) {


                    return true;
               }
            }

            return false;
        }
    }
}
