$(function () {
    //Depending upon past campaig we provide which campaign is best hour based on Read and Delivery
    $(document).ready(function (data) {

        var Delivery = 10;
        var Bounce = 2;
        var UniqueRead = 2;
        var MultiRead = 8;
        var SoftBounce = 1;
        var HardBounce = 1;
        var Gmail_Yahoo_delivery = 6;
        var OtherDelivery = 2;
        BindGraph();
        //Graphbind(Delivery, Bounce, MultiRead, UniqueRead, MultiRead, SoftBounce, HardBounce, Gmail_Yahoo_delivery, OtherDelivery);

    });
    function BindGraph() {
        var chart = document.getElementById('basic_lines');
        var myChart = echarts.init(chart);
        basic_lines_options = {

            // Setup grid
            grid: {
                x: 40,
                x2: 40,
                y: 35,
                y2: 25
            },

            // Add tooltip
            tooltip: {
                trigger: 'axis'
            },

            // Add legend
            legend: {
                data: ['Delivery', 'Read']
            },

            // Add custom colors
            color: ['#EF5350', '#66BB6A'],

            // Enable drag recalculate
            calculable: true,

            // Horizontal axis
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
            }],

            // Vertical axis
            yAxis: [{
                type: 'value',
                axisLabel: {
                    formatter: '{value} '
                }
            }],

            // Add series
            series: [
                {
                    name: 'Delivery',
                    type: 'line',
                    data: [11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12, 13, 10, 11, 11, 15, 13, 12, 13, 10, 1, 1, 1],
                    markLine: {
                        data: [{
                            type: 'average',
                            name: 'Average'
                        }]
                    }
                },
                {
                    name: 'Read',
                    type: 'line',
                    data: [1, 2, 2, 5, 3, 2, 0, 1, 2, 2, 5, 3, 2, 0, 1, 2, 2, 5, 3, 2, 0, 0, 0, 0],
                    markLine: {
                        data: [{
                            type: 'average',
                            name: 'Average'
                        }]
                    }
                }
            ]
        };
        myChart.setOption(basic_lines_options);

    }


});