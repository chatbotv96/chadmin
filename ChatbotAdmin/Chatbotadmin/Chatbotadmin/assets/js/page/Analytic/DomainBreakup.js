$(function () {
    //We provide domain wise breakup based on Read,bounce,Open,Deliver
    $(document).ready(function () {
        GraphBind();

    });
    function GraphBind() {
        var chart = document.getElementById('stacked_columns');
        var myChart = echarts.init(chart);
        stacked_columns_options = {

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
                    type: 'shadow' // 'line' | 'shadow'
                }
            },

            // Add legend
            legend: {
                data: ['Delivery', 'Bounce', 'Read', 'Click', 'Unsubscribe', 'Abuse']
            },

            // Add toolbox
            toolbox: {
                show: true,
                orient: 'vertical',
                x: 'right',
                y: 'center',
                itemGap: 15,
                showTitle: false,
                feature: {
                    mark: {
                        show: true,
                        title: {
                            mark: 'Markline switch',
                            markUndo: 'Undo markline',
                            markClear: 'Clear markline'
                        }
                    },
                    dataZoom: {
                        show: true,
                        title: {
                            dataZoom: 'Data zoom',
                            dataZoomReset: 'Reset zoom'
                        }
                    },
                    dataView: {
                        show: true,
                        readOnly: false,
                        title: 'View data',
                        lang: ['View chart data', 'Close', 'Update']
                    },
                    magicType: {
                        show: true,
                        title: {
                            line: 'Switch to line chart',
                            bar: 'Switch to bar chart',
                        },
                        type: ['line', 'bar']
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
                data: ['Total', 'Gmail', 'Yahoo', 'Reddifmail', 'Hotmail', 'Other']
            }],

            // Vertical axis
            yAxis: [{
                type: 'value'
            }],

            // Add series
            series: [
                {
                    name: 'Delivery',
                    type: 'bar',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: 'Bounce',
                    type: 'bar',
                    stack: 'Advertising',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Read',
                    type: 'bar',
                    stack: 'Advertising',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: 'Click',
                    type: 'bar',
                    stack: 'Advertising',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: 'Unsubscribe',
                    type: 'bar',
                    data: [862, 1018, 964, 1026, 1679, 1600, 1570],
                    markLine: {
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    type: 'dashed'
                                }
                            }
                        },
                        data: [
                            [{ type: 'min' }, { type: 'max' }]
                        ]
                    }
                },
                {
                    name: 'Abuse',
                    type: 'bar',
                    barWidth: 10,
                    stack: 'Television',
                    data: [620, 732, 701, 734, 1090, 1130, 1120]
                },

            ]
        };
        myChart.setOption(stacked_columns_options);

    }

});