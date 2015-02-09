# amCharts-Angular

## [Angular.js](http://angularjs.org) directive for [amCharts](http://www.amcharts.com)

## 1. Install from bower

        bower install amcharts-angular --save

## 2. Create Angular application

#### Add script references

        <script type="text/javascript" src="lib/amcharts/dist/amcharts/amcharts.js"></script>
        <script type="text/javascript" src="lib/amcharts/dist/amcharts/serial.js"></script>
        <script type="text/javascript" src="lib/amcharts-angular/dist/amChartsDirective.js"></script>

#### Inject angular module dependency

        angular.module('MyModule, ['amChartsDirective'])

#### Quick example

        <am-chart id="myFirstChart" options="amChartOptions"></am-chart>

        $scope.amChartOptions = {
            data: [
                {key: '1/22/2015', value: '0.5'},
                {key: '1/23/2015', value: '0.1'},
                {key: '1/24/2015', value: '0.23'},
                {key: '1/25/2015', value: '0.7'},
                {key: '1/26/2015', value: '0.98'},
                {key: '1/27/2015', value: '1.1'},
                {key: '1/28/2015', value: '0.15'},
                {key: '1/29/2015', value: '0.23'}
            ]
        }
    

#### For a list of exposed configuration options, please look at the [source](https://github.com/ThumbsAlmighty/amCharts-Angular/blob/master/dist/amChartsDirective.js) and the [amCharts API documentation](http://docs.amcharts.com/javascriptcharts).
