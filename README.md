# Dtl.FrontEndTest

## Running the project

`Ctrl-F5` from within Visual Studio 2015

or

`dotnet run` from the command line.

## Running the tests

The Jasmine/Karma tests can be run using either 

`karma start --single-run` 

from within the `Dtl.FrontEndTest.ClientTests` folder,
 or simply run the `RunUnitTests.ps1` Powershell script.


## Things I would do differently given more time

* Progressive enhancement instead of using just Angular
* Implement a ServiceWorker to cache relevant requests
* Cache the `deals.json` in LocalStorage

