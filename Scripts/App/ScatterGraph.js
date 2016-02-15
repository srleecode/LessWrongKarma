define(["jquery", "highcharts"],function($, highcharts) {
    var that = {};
    that.addGraph = function(conatinerSelector, commentsData, discussionData, postData) {
        $(conatinerSelector).highcharts({
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'USD to EUR exchange rate over time'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'Hours of the Day'
                },
                type: 'datetime',
            },
            yAxis: [{
                title: {
                    text: 'Comments and Discussion Posts',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true,
            }, {
                title: {
                    text: 'Rainfall',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value} mm',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                }
            }],
            legend: {
                enabled: false
            },
             tooltip: {
                crosshairs: [true, true],
                backgroundColor: '#FCFFC5',
                borderColor: 'black',
                borderRadius: 10,
                borderWidth: 3,
                headerFormat: '<b>{series.name} Score : {point.y}</b><br>',
                pointFormat: '{point.x:%a %d %b %I:%M:%S %p}'
            },
            plotOptions: {
                series:{
                    turboThreshold:0,
                    point:{
                        events:{
                            select: function(e){
                                var link = this.link;
                                window.open(link,'_blank');
                            }
                        }
                    }
                }
            },
            series: [{
                color: 'rgba(123, 174, 185, 0.5)', // colours based on this theme http://www.colourlovers.com/palette/23881/Toned_Out
                allowPointSelect: true,
                name: 'Comment',
                data: commentsData,
                yAxis: 1
            }]
        });
    }
    return that;
});