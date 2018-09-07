$(function () {

    //Domain Wise as well as Browser wise analytics provide reports 
    $(document).ready(function (data) {

        var Delivery = 10;
        var Bounce = 2;
        var UniqueRead = 2;
        var MultiRead = 8;
        var SoftBounce = 1;
        var HardBounce = 1;
        var Gmail_Yahoo_delivery = 6;
        var OtherDelivery = 2;
        GraphBind();
        //Graphbind(Delivery, Bounce, MultiRead, UniqueRead, MultiRead, SoftBounce, HardBounce, Gmail_Yahoo_delivery, OtherDelivery);

    });
    function GraphBind() {
        var chart = document.getElementById('stacked_bars');
        var myChart = echarts.init(chart);
        stacked_bars_options = {

            // Setup grid
            grid: {
                x: 75,
                x2: 25,
                y: 35,
                y2: 25
            },

            // Add tooltip
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },

            // Add legend
            legend: {
                data: ['Total Read', 'Unique Read', 'Multi Read']
            },

            // Enable drag recalculate
            calculable: true,

            // Horizontal axis
            xAxis: [{
                type: 'value'
            }],

            // Vertical axis
            yAxis: [{
                type: 'category',
                data: ['Total Mail', 'Gmail', 'Yahoo', 'Reddifmail', 'Hotmail', 'Other']
            }],

            // Add series
            series: [
                {
                    name: 'Total Read',
                    type: 'bar',
                    stack: 'Total',
                    itemStyle: {
                        normal: {
                            color: '#297c15',
                            label: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        emphasis: {
                            color: '#42A5F5',
                            label: {
                                show: true
                            }
                        }
                    },
                    data: [100, 20, 30, 40, 50, 10]
                },
                {
                    name: 'Unique Read',
                    type: 'bar',
                    stack: 'Total',
                    itemStyle: {
                        normal: {
                            color: '#a3358b',
                            label: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        emphasis: {
                            color: '#42A5F5',
                            label: {
                                show: true
                            }
                        }
                    },
                    data: [60, 20, 10, 05, 4, 1]
                },
                {
                    name: 'Multi Read',
                    type: 'bar',
                    stack: 'Total',
                    itemStyle: {
                        normal: {
                            color: '#873e4f',
                            label: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        emphasis: {
                            color: '#42A5F5',
                            label: {
                                show: true
                            }
                        }
                    }
                    , data: [80, 30, 20, 5, 6, 2]
                },


            ]
        };

        myChart.setOption(stacked_bars_options);
    }


});