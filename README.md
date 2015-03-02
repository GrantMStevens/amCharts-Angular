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

        <am-chart id="myFirstChart" options="amChartOptions" height="400" width="600"></am-chart>

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
            ],
            type: "serial",
            "categoryAxis": {
                labelOffset: 20,
                autoGridCount: false,
                gridCount: 7,
                centerLabelOnFullPeriod: true,
                parseDates: true,
                gridPosition: "middle"
            },
            valueAxes: [{
				showLastLabel: false,
			}],
			graphs: [{
				type: 'line',
				pointPosition: 'start',
				lineColor: '#45AADC'
			}],
			chartCursor: {
				categoryBalloonDateFormat: 'MMM DD HH:MM A'
			}
        }
    
    
##### If you do not specify a category field or a value field, the directive will assume the category field is at index [0] and the value field is at index [1]. Using the example above, 'key' would be the category field, and 'value' would be the value field.
    
    
#### For a list of exposed configuration options, please look at the [amCharts API documentation](http://docs.amcharts.com/3/javascriptcharts).
