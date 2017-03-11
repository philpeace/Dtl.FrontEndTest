'use strict';

function init(): void {
    console.log('The app is now live');
}

angular.module('dtl', []);

angular.module('dtl').run(init);
