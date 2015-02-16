// 0.0.3 

angular.module('amChartsDirective', []).directive('amChart', function() {
		return {
			restrict: 'E',
			replace: true,
            scope: {
				options: '='
			},
			template: '<div class="amchart"></div>',
			'link': function($scope, $el) {

				// use existing outer id to create new id
				var id = $el[0].id + '_chart';
				$el.attr('id', id);

				// we can't render a chart without any data
				if ($scope.options.data) {

					var o = $scope.options;

					// set height and width
					var height = o.height || '400px';
					var width = o.width || '600px';

					$el.css({
						'height': height,
						'width': width
					});

					// instantiate new chart object
					var chart = new AmCharts.AmSerialChart();
					chart.dataProvider = o.data;
					// if a category field is not specified, attempt to use the first field from an object in the array
					chart.categoryField = o.categoryField || Object.keys(o.data[0])[0];
					chart.autoMargins = o.autoMargins === undefined ? true : o.autoMargins;
					chart.marginLeft = o.marginLeft || 0;
					chart.marginBottom = o.marginBottom || 0;
					chart.marginRight = o.marginRight  || 0;
					chart.startDuration = o.startDuration === undefined ? 0.5 : o.startDuration;

					// configure category axis
					var categoryAxis = chart.categoryAxis;
					categoryAxis.parseDates = o.xAxisParseDates === undefined ? true : o.xAxisParseDates;
					categoryAxis.equalSpacing = o.xAxisEqualSpacing === undefined ? false : o.xAxisEqualSpacing;
					categoryAxis.labelRotation = o.xAxisLabelRotation || 0;
					categoryAxis.dashLength = o.xAxisDashLength || 1;
					categoryAxis.gridPosition = o.xAxisGridPosition || 'start';
					categoryAxis.labelOffset = o.xAxisLabelOffset || 0;
					categoryAxis.title = o.xAxisTitle || '';
					categoryAxis.titleBold = o.xAxisTitleBold === undefined ? true : o.xAxisTitleBold;
					categoryAxis.titleFontSize = o.xAxisTitleFontSize || 16;
					categoryAxis.markPeriodChange = o.xAxisMarkPeriodChange === undefined ? false : o.xAxisMarkPeriodChange;
					categoryAxis.centerLabelOnFullPeriod = o.centerLabelOnFullPeriod === undefined ? false : o.centerLabelOnFullPeriod;
					categoryAxis.minPeriod = o.xAxisMinPeriod || 'DD';
					categoryAxis.autoGridCount = o.autoGridCount === undefined ? true : o.autoGridCount;
					categoryAxis.gridCount = o.gridCount || 5;

					// configure value axis
					var valueAxis = new AmCharts.ValueAxis();
					valueAxis.inside = o.valueAxisInside === undefined ? false : o.valueAxisInside;
					valueAxis.dashLength = o.valueAxisDashLength || 1;
					valueAxis.title = o.valueAxisTitle || '';
					valueAxis.offset = o.valueAxisOffset || 0;
					valueAxis.precision = o.valueAxisPrecision || 0;
					valueAxis.showLastLabel = o.valueAxisShowLastLabel === undefined ? true : o.valueAxisShowLastLabel;
					valueAxis.showFirstLabel = o.valueAxisShowFirstLabel === undefined ? true : o.valueAxisShowFirstLabel;
					chart.addValueAxis(valueAxis);


					// create the graph
					var graph = new AmCharts.AmGraph();
					// if a category field is not specified, attempt to use the second field from an object in the array
					graph.valueField = o.valueField || Object.keys(o.data[0])[1];
					graph.colorField = o.graphColorField || '';
					graph.balloonText = o.baloonTemplate || '<span style="font-size:14px">[[category]]: <b>[[value]]</b></span>';
					graph.type = o.graphType || 'column';
					graph.lineAlpha = o.graphLineAlpha || 1;
					graph.fillAlphas = o.graphFillAlphas || 0.5;
					graph.offset = o.graphOffset || 0;
					graph.pointPosition = o.graphPointPosition || 'middle';
					graph.lineColor = o.graphLineColor || '#45AADC';
					chart.addGraph(graph);

					// cursor
					var chartCursor = new AmCharts.ChartCursor();
					chartCursor.cursorAlpha = o.cursorAlpha || 0;
					chartCursor.zoomable = o.cursorZoomable === undefined ? false : o.cursorZoomable;
					chartCursor.categoryBalloonEnabled = o.categoryBalloonEnabled === undefined ? false : o.categoryBalloonEnabled;
					chartCursor.categoryBalloonDateFormat = o.categoryBalloonDateFormat || 'MMM DD, YYYY';
					chart.addChartCursor(chartCursor);

					chart.creditsPosition = o.creditsPosition || 'top-right';

					// WRITE
					chart.write(id);

					$scope.$on('triggerChartAnimate', function(){
						chart.animateAgain();
					});

				}

			}
		};
	});
