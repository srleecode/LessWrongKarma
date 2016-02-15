define(["jquery", "highcharts"],function($, highcharts) {
    var that = {};
    var chart = null;

    that.addGraph = function(id, commentsStats, discussionPostStats, mainPostStats) {
        chart = new highcharts.Chart({
            chart: {
                renderTo : id,
                type: 'column'
            },
            title: {
                text: null,
                style: {
                    display: 'none'
                }
            },
            xAxis: {
                categories: ['Comments', 'Discussion Posts', 'Main Posts']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Score'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            tooltip: {
                snap: 0,
                backgroundColor: '#FCFFC5',
                borderColor: 'black',
                borderRadius: 10,
                borderWidth: 3,
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.y}%'
            },
            plotOptions: {
                column: {
                    stacking: 'percent'
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: "Positive",
                color: "rgb(34, 139, 34)",
                data: [commentsStats.numPercentPositive, discussionPostStats.numPercentPositive, mainPostStats.numPercentPositive]
            }, {
                name: "Neutral",
                color: "rgb(128, 128, 128)",
                data: [commentsStats.numPercentNeutral, discussionPostStats.numPercentNeutral, mainPostStats.numPercentNeutral]
            }, {
                name: "Negative",
                color: "rgb(178, 34, 34)",
                data: [commentsStats.numPercentNegative, discussionPostStats.numPercentNegative, mainPostStats.numPercentNegative]
            }]
        });
    };
    return that;
});