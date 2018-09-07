$(function () {
    $(document).ready(function (data) {
        DayChartBind();
        WeekChartBind();
        MonthChartBind();


    });
    function DayChartBind() {
        var totalmessage = new Array;
        var totalcountmessage = 0;
        var totalcountdeliver = 0;
        var totalcountBounce = 0;
        var totalcountRead = 0;
        var totalcountbandwidth=0
        var hourwisetime = new Array;
        var totaldeilver = new Array;
        var totalbounce = new Array;
        var totalRead = new Array;
        var totalhardbounce = new Array;
        var totalSoftbounce = new Array;
        var totalBandwidth = new Array;
        $.post("DayWiseReport", { "disdate": moment().format('YYYY-MM-DD') }, function (data) {

            var chart = document.getElementById('DayChart');
            var myChart = echarts.init(chart);
            for (var i = 0; i < 24; i++) {
                totalmessage.push((data[i].cs_totalmessage));
                hourwisetime.push((data[i].cs_hourwisemsg));
                totaldeilver.push((data[i].cs_totaldelivery));
                totalbounce.push((data[i].cs_totalbounce));
                totalRead.push((data[i].cs_read));
                totalBandwidth.push(Math.ceil((data[i].cs_totalbandwidth / 1048576)));
                totalhardbounce.push((data[i].cs_hardbounce));
                totalSoftbounce.push((data[i].cs_softbounce));
                totalcountmessage = parseInt(totalcountmessage) + parseInt(data[i].cs_totalmessage);
                totalcountdeliver = parseInt(totalcountdeliver) + parseInt((data[i].cs_totaldelivery));
                totalcountBounce = parseInt(totalcountBounce) + parseInt(data[i].cs_totalbounce);
                totalcountRead = parseInt(totalcountRead) + parseInt(data[i].cs_read);
                totalcountbandwidth=parseInt(totalcountbandwidth)+parseInt((data[i].cs_totalbandwidth / 1048576));
            }
            DayTableBind(data, totalBandwidth, totalcountbandwidth, totalcountmessage);
            basic_columns_options = {

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
                    data: ['Mail Count', 'Mail Usage(MB)']
                },

                // Enable drag recalculate
                calculable: true,

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    data: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value'
                }],

                // Add series
                series: [
                    {
                        name: 'Mail Count',
                        type: 'bar',
                        data: totalmessage,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        fontWeight: 500
                                    }
                                }
                            }
                        },
                        markLine: {
                            data: [{ type: 'average', name: 'Average' }]
                        }
                    },
                    {
                        name: 'Mail Usage(MB)',
                        type: 'bar',
                        data: totalBandwidth,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        fontWeight: 500
                                    }
                                }
                            }
                        },
                        markLine: {
                            data: [{ type: 'average', name: 'Average' }]
                        }
                    }
                ]
            };
            myChart.setOption(basic_columns_options);
        });

    }
    function WeekChartBind() {
        var disdate = new Array;
        var totalmessage = new Array;
        var totalcountmessage = 0;
        var totalcountdeliver = 0;
        var totalcountBounce = 0;
        var totalcountRead = 0;
        var totalcountBandwidth=0;
        var hourwisetime = new Array;
        var totaldeilver = new Array;
        var totalbounce = new Array;
        var totalRead = new Array;
        var totalhardbounce = new Array;
        var totalSoftbounce = new Array;
        var totalBandwidth = new Array;

        $.post("WeekWiseReport", { "campaignfromdate": moment().subtract(6, 'days').format('YYYY-MM-DD'), "campaigntodate": moment().format('YYYY-MM-DD') }, function (data) {

            for (var i = 0; i < 7; i++) {
                disdate.push((data[i].cs_distdate));
                totalmessage.push((data[i].cs_totalmessage));
                hourwisetime.push((data[i].cs_hourwisemsg));
                totaldeilver.push((data[i].cs_totaldelivery));
                totalbounce.push((data[i].cs_totalbounce));
                totalBandwidth.push(Math.ceil((data[i].cs_totalbandwidth / 1048576)));
                totalRead.push((data[i].cs_read));
                totalhardbounce.push((data[i].cs_hardbounce));
                totalSoftbounce.push((data[i].cs_softbounce));
                totalcountmessage = parseInt(totalcountmessage) + parseInt(data[i].cs_totalmessage);
                totalcountdeliver = parseInt(totalcountdeliver) + parseInt((data[i].cs_totaldelivery));
                totalcountBounce = parseInt(totalcountBounce) + parseInt(data[i].cs_totalbounce);
                totalcountRead = parseInt(totalcountRead) + parseInt(data[i].cs_read);
                totalcountBandwidth=parseInt(totalcountBandwidth) + parseInt((data[i].cs_totalbandwidth / 1048576));
            }
            WeekTableBind(data, totalcountmessage,totalcountBandwidth);
            var chart = document.getElementById('WeekChart');
            var myChart = echarts.init(chart);
            basic_columns_options = {

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
                    data: ['Mail Count', 'Mail Usage(MB)']
                },

                // Enable drag recalculate
                calculable: true,

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    data: disdate,
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value'
                }],

                // Add series
                series: [
                    {
                        name: 'Mail Count',
                        type: 'bar',
                        data: totalmessage,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        fontWeight: 500
                                    }
                                }
                            }
                        },
                        markLine: {
                            data: [{ type: 'average', name: 'Average' }]
                        }
                    },
                    {
                        name: 'Mail Usage(MB)',
                        type: 'bar',
                        data: totalBandwidth,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        fontWeight: 500
                                    }
                                }
                            }
                        },
                        markLine: {
                            data: [{ type: 'average', name: 'Average' }]
                        }
                    }
                ]
            };
            myChart.setOption(basic_columns_options);
        });

    }
    function MonthChartBind() {
        var totalmessage = new Array;
        var totalcountmessage = 0;
        var totalcountdeliver = 0;
        var totalcountBounce = 0;
        var totalcountRead = 0;
        var monthwise = new Array;
        var totaldeilver = new Array;
        var totalbounce = new Array;
        var totalRead = new Array;
        var totalhardbounce = new Array;
        var totalSoftbounce = new Array;
        var totalBandwidth = new Array;
        var Dates = new Array;
        $.post("MonthWiseReport", { "campaignfromdate": moment().subtract(30, 'days').format('YYYY-MM-DD'), "campaigntodate": moment().format('YYYY-MM-DD') }, function (data) {
            if (data.includes("Error:")) {
                alert(data);
            }
            else {
                MonthTableBind(data);
                for (var i = 0; i < 31; i++) {
                    Dates.push(data[i].cs_distdate);
                    totalmessage.push((data[i].cs_totalmessage));
                    monthwise.push((data[i].cs_distdate));
                    totaldeilver.push((data[i].cs_totaldelivery));
                    totalbounce.push((data[i].cs_totalbounce));
                    totalRead.push((data[i].cs_read));
                    totalhardbounce.push((data[i].cs_hardbounce));
                    totalBandwidth.push(Math.ceil((data[i].cs_totalbandwidth / 1048576)));
                    totalSoftbounce.push((data[i].cs_softbounce));
                    totalcountmessage = parseInt(totalcountmessage) + parseInt(data[i].cs_totalmessage);
                    totalcountdeliver = parseInt(totalcountdeliver) + parseInt((data[i].cs_totaldelivery));
                    totalcountBounce = parseInt(totalcountBounce) + parseInt(data[i].cs_totalbounce);
                    totalcountRead = parseInt(totalcountRead) + parseInt(data[i].cs_read);
                }
                var chart = document.getElementById('MonthChart');
                var myChart = echarts.init(chart);
                basic_columns_options = {

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
                        data: ['Mail Count', 'Mail Usage(MB)']
                    },

                    // Enable drag recalculate
                    calculable: true,

                    // Horizontal axis
                    xAxis: [{
                        type: 'category',
                        data: Dates,
                    }],

                    // Vertical axis
                    yAxis: [{
                        type: 'value'
                    }],

                    // Add series
                    series: [
                        {
                            name: 'Mail Count',
                            type: 'bar',
                            data: totalmessage,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        textStyle: {
                                            fontWeight: 500
                                        }
                                    }
                                }
                            },
                            markLine: {
                                data: [{ type: 'average', name: 'Average' }]
                            }
                        },
                        {
                            name: 'Mail Usage(MB)',
                            type: 'bar',
                            data: totalBandwidth,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        textStyle: {
                                            fontWeight: 500
                                        }
                                    }
                                }
                            },
                            markLine: {
                                data: [{ type: 'average', name: 'Average' }]
                            }
                        }
                    ]
                };
                myChart.setOption(basic_columns_options);

            }
        });
    }
    function DayTableBind(data, totalBandwidth, totalcountbandwidth, totalcountmessage) {

        $("#HoursDayTable").html("");
        var TotalcountmessageGroup=0;
        var TotalcountBandwidthGroup = 0;
        var TodayDate;
        var count = 0;
        var SRNO = 1;

        for (var i = 1; i < data.length + 1; i++)
        {

            if (i % 8 == 0)
            {
                $("#HoursDayTable").append("<tr><td>" + SRNO + "</td>" +
                                    "<td>" + count +"-"+data[i - 1].cs_hourwisemsg+" Hours" + "</td><td>" + TotalcountmessageGroup + "</td><td>" + TodayDate + "</td><td>" + TotalcountBandwidthGroup + "</td></tr>");
                TotalcountBandwidthGroup = 0;
                TotalcountmessageGroup = 0;
                count = count + 8;
                SRNO++;
            }
            else
            {
                TotalcountBandwidthGroup = parseInt(TotalcountBandwidthGroup) + parseInt(totalBandwidth[i-1]);
                TotalcountmessageGroup = parseInt(TotalcountmessageGroup) + parseFloat(data[i].cs_totalmessage);
            }

        }
        $("#HoursDayTable").append("<tr><td>" + "" + "</td>" +
                               "<td><b>" + "Total Mail" + "</b></td><td><b>" + totalcountmessage + "</b></td><td>" + "" + "</td><td><b>" + totalcountbandwidth + "</b></td></tr>");

    }
    function WeekTableBind(data, totalcountmessage, totalcountBandwidth)
    {
        for (var i = 0; i < data.length; i++) {
            $("#WeekTable").append("<tr><td>" + (i + 1) + "</td><td>" + data[i].cs_distdate + "</td><td>" + data[i].cs_totalmessage + "</td><td>" + Math.ceil((data[i].cs_totalbandwidth / 1048576)) + "</td><tr>");
        }
        $("#WeekTable").append("<tr><td>" + "" + "</td><td><b>" +"Total" + "</b></td><td>" + totalcountmessage + "</td><td>" + totalcountBandwidth + "</td><tr>");


    }
    function MonthTableBind(data) {
        if (data.length > 10) {
            var datatabeobj = $("#TableMonth").DataTable({
                "bFilter": false,
            });
        }
        else {
            var datatabeobj = $("#TableMonth").DataTable({
                "bPaginate": false,
                "bFilter": false,
                "bInfo": false
            });
        }
        for (var i = 0; i < data.length; i++) {

            datatabeobj.row.add([
                i+1,
                data[i].cs_distdate,
                data[i].cs_totalmessage,
                Math.ceil((data[i].cs_totalbandwidth / 1048576)),
            ]).draw(false);
        }
        //divide table into different rows
        //for (var i = 0; i < data.length; i++) {
        //    $("#TableMonth").append("<tr><td>" + (i + 1) + "</td><td>" + data[i].cs_distdate + "</td><td>" + data[i].cs_totalmessage + "</td><td>" + Math.ceil((data[i].cs_totalbandwidth / 1048576)) + "</td><tr>");
        //}

        //for (var i = 0; i < 3; i++) {
        //    
        //    content = content + "<tr><table id='InnerTable" + i + "' class='table '><tbody id='InnerTableBody'"+i+"></tbody>";
        //    content = content + "</table></tr><tr><td colspan=4><span class='glyphicons glyphicons-arrow-down'>View More</span></td></tr>";
        //    $("#TableMonth").append(content);
        //    for (j = count; j < count + 10; j++) {
        //        $("#InnerTableBody"+i+"").append("<tr><td>" + (parseInt(j) + 1) + "</td><td>" + data[j].cs_distdate + "</td><td>" + data[j].cs_totalmessage + "</td><td>" + Math.ceil((data[j].cs_totalbandwidth / 1048576)) + "</td></tr>");
        //    }
        //    count = count + 10;
        //    SrNo++;
        //}

        //for (var i = count; i <= count + 10; i++) {
        //    if (i == 0 || i == 10 || i == 20)
        //    {
        //        content = content + "<tr id=myid" + i + "><table class='table table-borderd'>"
        //    }
        //    content = content + "<tr><td>" + data[i].cs_distdate + "</td><td>" + data[i].cs_totalmessage + "</td> <td>" + Math.ceil((data[i].cs_totalbandwidth / 1048576)) + "</td></tr>"
        //    if (count % 10 == 0) {
        //        count = count + 10;
        //        content = "<table></tr>";

        //    }
        //    $("#TableMonth").html("");
        //    $("#TableMonth").append(content);

        //}



    }
    
});