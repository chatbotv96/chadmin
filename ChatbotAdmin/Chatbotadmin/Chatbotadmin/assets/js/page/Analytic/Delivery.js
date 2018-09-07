$(function () {
    $(document).ready(function (data) {

        var Delivery = 10;
        var Bounce = 2;
        var UniqueRead = 2;
        var MultiRead = 8;
        var SoftBounce = 1;
        var HardBounce = 1;
        var Gmail_Yahoo_delivery = 6;
        var OtherDelivery = 2;
        Graphbind(Delivery, Bounce, MultiRead, UniqueRead, MultiRead, SoftBounce, HardBounce, Gmail_Yahoo_delivery, OtherDelivery);

    });
    function Graphbind(Delivery, Bounce, Read, UniqueRead, MultiRead, SoftBounce, HardBounce, Gmail_Yahoo_delivery, OtherDelivery) {
        var chart = document.getElementById('thermometer_columns');
        var myChart = echarts.init(chart);
        thermometer_columns_options = {

            // Setup grid
            grid: {
                x: 35,
                x2: 10,
                y: 35,
                y2: 25
            },

            // Add tooltip
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow' // 'line' | 'shadow'
                },
                formatter: function (params) {
                    return params[0].name + '<br/>'
                    + params[0].seriesName + ': ' + params[0].value + '<br/>'
                    + params[1].seriesName + ': ' + (params[1].value + params[0].value);
                }
            },

            // Add legend
            legend: {
                selectedMode: false,
                data: ['Mail Sent', 'Mail Bounce']
            },

            // Enable drag recalculate
            calculable: true,

            // Horizontal axis
            xAxis: [{
                type: 'category',
                data: ['Total Bounce', 'Gmail', 'Yahoo', 'Reddifmail', 'Hotmail', 'Other']
            }],

            // Vertical axis
            yAxis: [{
                type: 'value',
                boundaryGap: [0, 0.1]
            }],

            // Add series
            series: [
                {
                    name: 'Mail Bounce',
                    type: 'bar',
                    stack: 'sum',
                    barCategoryGap: '50%',
                    itemStyle: {
                        normal: {
                            color: '#FF7043',
                            barBorderColor: '#FF7043',
                            barBorderWidth: 6,
                            label: {
                                show: true,
                                position: 'insideTop'
                            }
                        },
                        emphasis: {
                            color: '#FF7043',
                            barBorderColor: '#FF7043',
                            barBorderWidth: 6,
                            label: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        }
                    },
                    data: [60, 200, 220, 120, 100, 80]
                },
                {
                    name: 'Mail Sent',
                    type: 'bar',
                    stack: 'sum',
                    itemStyle: {
                        normal: {
                            color: '#fff',
                            barBorderColor: '#FF7043',
                            barBorderWidth: 6,
                            barBorderRadius: 0,
                            label: {
                                show: true,
                                position: 'top',
                                formatter: function (params) {
                                    for (var i = 0, l = thermometer_columns_options.xAxis[0].data.length; i < l; i++) {
                                        if (thermometer_columns_options.xAxis[0].data[i] == params.name) {
                                            return thermometer_columns_options.series[0].data[i] + params.value;
                                        }
                                    }
                                },
                                textStyle: {
                                    color: '#FF7043'
                                }
                            }
                        },
                        emphasis: {
                            barBorderColor: '#FF7043',
                            barBorderWidth: 6,
                            label: {
                                show: true,
                                textStyle: {
                                    color: '#FF7043'
                                }
                            }
                        }
                    },
                    data: [140, 80, 50, 80, 80, 70]
                    //minus bounce
                }
            ]
        };
        myChart.setOption(thermometer_columns_options);

    }


});