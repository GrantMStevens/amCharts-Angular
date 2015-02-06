angular.module('amChartDirective').directive('amChart', function() {
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

					// set height and width
					var height = $scope.options.height || '400px';
					var width = $scope.options.width || '600px';

					$el.css({
						'height': height,
						'width': width
					});

					// instantiate new chart object
					var chart = new AmCharts.AmSerialChart();
					chart.dataProvider = $scope.options.data;
					// if a category field is not specified, attempt to use the first field from an object in the array
					chart.categoryField = $scope.options.categoryField || Object.keys($scope.options.data[0])[0];
					chart.autoMargins = $scope.options.autoMargins === undefined ? true : $scope.options.autoMargins;
					chart.marginLeft = $scope.options.marginLeft || 0;
					chart.marginBottom = $scope.options.marginBottom || 0;
					chart.marginRight = $scope.options.marginRight  || 0;
					chart.startDuration = $scope.options.startDuration === undefined ? 0.5 : $scope.options.startDuration;

					// configure category axis
					var categoryAxis = chart.categoryAxis;
					categoryAxis.parseDates = $scope.options.xAxisParseDates === undefined ? true : $scope.options.xAxisParseDates;
					categoryAxis.equalSpacing = $scope.options.xAxisEqualSpacing === undefined ? false : $scope.options.xAxisEqualSpacing;
					categoryAxis.labelRotation = $scope.options.xAxisLabelRotation || 0;
					categoryAxis.dashLength = $scope.options.xAxisDashLength || 1;
					categoryAxis.gridPosition = $scope.options.xAxisGridPosition || 'start';
					categoryAxis.labelOffset = $scope.options.xAxisLabelOffset || 0;
					categoryAxis.title = $scope.options.xAxisTitle || '';
					categoryAxis.titleBold = $scope.options.xAxisTitleBold === undefined ? true : $scope.options.xAxisTitleBold;
					categoryAxis.titleFontSize = $scope.options.xAxisTitleFontSize || 16;
					categoryAxis.markPeriodChange = $scope.options.xAxisMarkPeriodChange === undefined ? false : $scope.options.xAxisMarkPeriodChange;
					categoryAxis.centerLabelOnFullPeriod = $scope.options.centerLabelOnFullPeriod === undefined ? false : $scope.options.centerLabelOnFullPeriod;

					// configure value axis
					var valueAxis = new AmCharts.ValueAxis();
					valueAxis.inside = $scope.options.valueAxisInside === undefined ? false : $scope.options.valueAxisInside;
					valueAxis.dashLength = $scope.options.valueAxisDashLength || 1;
					valueAxis.title = $scope.options.valueAxisTitle || '';
					valueAxis.offset = $scope.options.valueAxisOffset || 0;
					chart.addValueAxis(valueAxis);


					// create the graph
					var graph = new AmCharts.AmGraph();
					// if a category field is not specified, attempt to use the second field from an object in the array
					graph.valueField = $scope.options.valueField || Object.keys($scope.options.data[0])[1];
					graph.colorField = $scope.options.graphColorField || '';
					graph.balloonText = $scope.options.baloonTemplate || '<span style="font-size:14px">[[category]]: <b>[[value]]</b></span>';
					graph.type = $scope.options.graphType || 'column';
					graph.lineAlpha = $scope.options.graphLineAlpha || 1;
					graph.fillAlphas = $scope.options.graphFillAlphas || 0.5;
					graph.offset = $scope.options.graphOffset || 0;
					graph.pointPosition = $scope.options.graphPointPosition || 'middle';
					graph.lineColor = $scope.options.graphLineColor || '#45AADC';
					chart.addGraph(graph);

					// cursor
					var chartCursor = new AmCharts.ChartCursor();
					chartCursor.cursorAlpha = $scope.options.cursorAlpha || 0;
					chartCursor.zoomable = $scope.options.cursorZoomable === undefined ? false : $scope.options.cursorZoomable;
					chartCursor.categoryBalloonEnabled = $scope.options.categoryBalloonEnabled === undefined ? false : $scope.options.categoryBalloonEnabled;
					chart.addChartCursor(chartCursor);

					chart.creditsPosition = $scope.options.creditsPosition || 'top-right';

					// WRITE
					chart.write(id);

					$scope.$on('triggerChartAnimate', function(){
						chart.animateAgain();
					});

				}

			}
		};
	});