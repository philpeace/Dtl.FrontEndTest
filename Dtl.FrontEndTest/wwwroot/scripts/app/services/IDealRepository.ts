module Dtl.Services {
    export interface IDealRepository {
        get(): ng.IPromise<Dtl.Models.DealResult>;
    }
}
