$(function () {

    //Here user will campaign report based on browser which would be helpful for next campaign
    $(document).ready(function () {
        alert($("#campaignfromdate").val());
        BindFirstGraph();
        BindSecondGraph();
    });
    function BindFirstGraph() {
        var chart = document.getElementById('connect_pie');
        var myChart = echarts.init(chart);
        connect_pie_options = {

            // Add title
            title: {
                text: 'Browser popularity',
                subtext: 'Open source data',
                x: 'center'
            },

            // Add tooltip
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },

            // Add legend
            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['Internet Explorer', 'Opera', 'Safari', 'Firefox', 'Chrome']
            },

            // Enable drag recalculate
            calculable: true,

            // Add series
            series: [{
                name: 'Browser',
                type: 'pie',
                radius: '75%',
                center: ['50%', '57.5%'],
                data: [
                    { value: 335, name: 'Internet Explorer' },
                    { value: 310, name: 'Opera' },
                    { value: 234, name: 'Safari' },
                    { value: 135, name: 'Firefox' },
                    { value: 1548, name: 'Chrome' }
                ]
            }]
        };
        myChart.setOption(connect_pie_options);

    }
    function BindSecondGraph() {
        var chart = document.getElementById('connect_column');
        var myChart = echarts.init(chart);
        connect_column_options = {

            // Setup grid
            grid: {
                x: 40,
                x2: 47,
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
                data: ['Internet Explorer', 'Opera', 'Safari', 'Firefox', 'Chrome']
            },

            // Add toolbox
            toolbox: {
                show: true,
                orient: 'vertical',
                x: 'right',
                y: 35,
                feature: {
                    mark: {
                        show: true,
                        title: {
                            mark: 'Markline switch',
                            markUndo: 'Undo markline',
                            markClear: 'Clear markline'
                        }
                    },
                    magicType: {
                        show: true,
                        title: {
                            line: 'Switch to line chart',
                            bar: 'Switch to bar chart',
                            stack: 'Switch to stack',
                            tiled: 'Switch to tiled'
                        },
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    restore: {
                        show: true,
                        title: 'Restore'
                    },
                    saveAsImage: {
                        show: true,
                        title: 'Same as image',
                        lang: ['Save']
                    }
                }
            },

            // Enable drag recalculate
            calculable: true,

            // Horizontal axis
            xAxis: [{
                type: 'category',
                data: ['Gmail', 'Yahoo', 'Reddifmail', 'Hotmail', 'Other']
            }],

            // Vertical axis
            yAxis: [{
                type: 'value',
                splitArea: { show: true }
            }],

            // Add series
            series: [
                {
                    name: 'Internet Explorer',
                    type: 'bar',
                    stack: 'Total',
                    data: [320, 332, 301, 334, 390]
                },
                {
                    name: 'Opera',
                    type: 'bar',
                    stack: 'Total',
                    data: [120, 132, 101, 134, 90]
                },
                {
                    name: 'Safari',
                    type: 'bar',
                    stack: 'Total',
                    data: [220, 182, 191, 234, 290]
                },
                {
                    name: 'Firefox',
                    type: 'bar',
                    stack: 'Total',
                    data: [150, 232, 201, 154, 190]
                },
                {
                    name: 'Chrome',
                    type: 'bar',
                    stack: 'Total',
                    data: [820, 932, 901, 934, 1290]
                }
            ]
        };
        myChart.setOption(connect_column_options);


    }
});