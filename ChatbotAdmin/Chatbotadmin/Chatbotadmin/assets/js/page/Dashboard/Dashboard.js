$(function () {
    var stardate;
    var enddate;
   
    //check where input is null or not
    function check(input) {
        if (input == "" || input == null) {
            return 0;
        }
        else {
            return input;
        }
    }
    //Main function
    $(document).ready(function () {
      swal({
            text:"Please Wait..",
            showConfirmButton: false,
            allowOutsideClick: false,
            showLoading: true
         });
       
        swal.showLoading();
        
        CampaigntableBindDayWeek();
        BindGraphDAY();
         DateRangebind();
         SendertableBindDay();
       CampaigntableBindDay();
        //MapBindDay();
        BindWeekGraph();
         SendertableBindWeek();
        
        //MapBindMonth();
       BindGraphMonth();
        SendertableBindMonth();
        CampaigntableBindMonth();
        //MapBindWeek();
        
setTimeout(
            function () {
                swal.hideLoading();
                swal.close();
         }, 3000);
        
    });
    //Map Bind --This is use for MAP where you get number of user read mail today
    function MapBindDay() {
        $.post("MapBindTable", { "startdate": stardate, "enddate": enddate }, function (mydata) {
            $("#daybody").html('');
            var addString = "";
            var othercountrycount = 0;
            for (var i = 0; i < 10; i++)
            {
                     addString = addString + "<tr><td>" + mydata.resource[i].ctr_countryname + "</td><td style='text-align:right'>" + formatThousands(mydata.resource[i].ctr_totaldreads) + "</td></tr>";
            }
            for (var i = 10; i < mydata.resource.length; i++) {
                othercountrycount = othercountrycount + mydata.resource[i].ctr_totaldreads;
            }
            addString = addString + "<tr><td>" + "Other" + "</td><td style='text-align:right'>" + formatThousands(othercountrycount) + "</td></tr>";
            $("#daybody").append(addString);
        });
        $.post("MapBind", { "startdate": stardate, "enddate": enddate }, function (mydata) {
           
            var data = mydata;
                
            $('#day').vectorMap({
                map: 'world_mill_en',
                backgroundColor: 'transparent',
                series: {
                    regions: [{
                        values: data,
                        scale: ['#C8EEFF', '#0071A4'],
                        normalizeFunction: 'polynomial'
                    }]
                },
                onRegionLabelShow: function (e, el, code) {
                    el.html(el.html() + '<br>' + 'Open - ' + data[code]);
                }
            });
        });
    }
    //Map Bind --This is use for MAP where you get number of user read mail month wise
    function MapBindMonth() {
        $.post("MapBindTable", { "startdate": moment().subtract(30, 'days').format('YYYY-MM-DD'), "enddate": moment().format('YYYY-MM-DD') }, function (mydata) {
            $("#monthbody").html('');
            var addString = "";
            var othercountrycount = 0;
            for (var i = 0; i < 10; i++) {
                addString = addString + "<tr><td>" + mydata.resource[i].ctr_countryname + "</td><td style='text-align:right'>" + formatThousands(mydata.resource[i].ctr_totaldreads) + "</td></tr>";
            }
            for (var i = 10; i < mydata.resource.length; i++) {
                othercountrycount = othercountrycount + mydata.resource[i].ctr_totaldreads;
            }
            addString = addString + "<tr><td>" + "Other" + "</td><td style='text-align:right'>" + formatThousands(othercountrycount) + "</td></tr>";
            $("#monthbody").append(addString);
        });
        $.post("MapBind", { "startdate": moment().subtract(30, 'days').format('YYYY-MM-DD'), "enddate": moment().format('YYYY-MM-DD') }, function (mydata) {
        $('#month').vectorMap({
            map: 'world_mill_en',
            backgroundColor: 'transparent',
            series: {
                regions: [{
                    values: mydata,
                    scale: ['#C8EEFF', '#0071A4'],
                    normalizeFunction: 'polynomial'
                }]
            },
            onRegionLabelShow: function (e, el, code) {
                el.html(el.html() + '<br>' + 'Open - ' + mydata[code]);
            }
        });
        });
    }
    //Map Bind --This is use for MAP where you get number of user read mail Week Wise
    function MapBindWeek() {
        $.post("MapBindTable", { "startdate": moment().subtract(6, 'days').format('YYYY-MM-DD'), "enddate": moment().format('YYYY-MM-DD') }, function (mydata) {
            var addString = "";
            var othercountrycount = 0;
            for (var i = 0; i < 10; i++) {
                addString = addString + "<tr><td>" + mydata.resource[i].ctr_countryname + "</td><td style='text-align:right'>" + formatThousands(mydata.resource[i].ctr_totaldreads) + "</td></tr>";
            }
            for (var i = 10; i < mydata.resource.length; i++) {
                othercountrycount = othercountrycount + mydata.resource[i].ctr_totaldreads;
            }
            addString = addString + "<tr><td>" + "Other" + "</td><td style='text-align:right'>" + formatThousands(othercountrycount) + "</td></tr>";
            $("#weekbody").append(addString);
        });
        $.post("MapBind", { "startdate": moment().subtract(6, 'days').format('YYYY-MM-DD'), "enddate": moment().format('YYYY-MM-DD') }, function (mydata) {
            $('#week').vectorMap({
                map: 'world_mill_en',
                backgroundColor: 'transparent',
                series: {
                    regions: [{
                        values: mydata,
                        scale: ['#C8EEFF', '#0071A4'],
                        normalizeFunction: 'polynomial'
                    }]
                },
                onRegionLabelShow: function (e, el, code) {
                    el.html(el.html() + '<br>' + 'Open - ' + mydata[code]);
                }
            });
        });

        
    }

    //We want number which should be contain , like 10,000
    function formatThousands(n, dp) {
        var s = '' + (Math.floor(n)), d = n % 1, i = s.length, r = '';
        while ((i -= 3) > 0) { r = ',' + s.substr(i, 3) + r; }
        return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10, dp || 2)) : '');
    }

    //Date Range bind method use for bind date picker
    function DateRangebind() {
        var start = moment().subtract(0, 'days');
        var end = moment();
        $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                //'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'This Week': [moment().startOf('week').add(1, 'days'), moment().startOf('week').add(7, 'days')],
                //http://stackoverflow.com/questions/22144940/get-next-week-start-and-end-using-jquery-and-moment-js
                'Last Week': [moment().subtract('days', 0 - (1 - moment().isoWeekday()) + 7), moment().subtract('days', 0 - (1 - moment().isoWeekday()) + 7).add(6, 'days')],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]

            }
        }, cb);

        cb(start, end);
        $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
            $("#TotalMailRandom").html('');
            $("#TotalDeliverRandom").html('');
            $("#TotalBounceRandom").html('');
            $("#TotalReadRandom").html('');
            $("#CampaignNote").html('');
            $("#CampaignNote").append("Campaign-wise report for "+stardate +" to "+enddate+"and mails with same <b>subject</b> have been grouped as single campaign");
            var date1 = Date.parse(mystart);
            var date2 = Date.parse(myend);
            var timeDiff = Math.abs(date2 - date1);
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
            $('.tabbable a[href="#colored-tab4"]').tab('show');
            $('.tab-content #colored-tab4').addClass("active");
            $("#colored-tab1").removeClass("active");
            $("#colored-tab2").removeClass("active");
            $("#colored-tab3").removeClass("active");
            if (stardate == moment().subtract(1, 'days').format('DD/MM/YYYY') && enddate == moment().subtract(1, 'days').format('DD/MM/YYYY')) {
                //BindMapRandom(stardate, enddate);
                BindGraphDayRandom(moment().subtract(1, 'days').format('DD/MM/YYYY'));
                SendertableBindRandom(moment().subtract(1, 'days').format('DD/MM/YYYY'), moment().subtract(1, 'days').format('DD/MM/YYYY'));
               // CampaigntableBindRandom(moment().subtract(1, 'days').format('DD/MM/YYYY'), moment().subtract(1, 'days').format('DD/MM/YYYY'));
            } else if (stardate == moment().startOf('week').add(1, 'days').format('DD/MM/YYYY') && enddate == moment().startOf('week').add(7, 'days').format('DD/MM/YYYY')) {
               // BindMapRandom(stardate, enddate);
                BindWeekGraphRandom(moment().startOf('week').add(1, 'days').format('DD/MM/YYYY'), moment().startOf('week').add(7, 'days').format('DD/MM/YYYY'));
                SendertableBindRandom(moment().startOf('week').add(1, 'days').format('DD/MM/YYYY'), moment().startOf('week').add(7, 'days').format('DD/MM/YYYY'));
               // CampaigntableBindRandom(moment().startOf('week').add(1, 'days').format('DD/MM/YYYY'), moment().startOf('week').add(7, 'days').format('DD/MM/YYYY'));
            } else if (stardate == moment().subtract('days', 0 - (1 - moment().isoWeekday()) + 7).format('DD/MM/YYYY') && enddate == moment().subtract('days', 0 - (1 - moment().isoWeekday()) + 7).add(6, 'days').format('DD/MM/YYYY'))
            {
                //BindMapRandom(stardate, enddate);
                BindWeekGraphRandom(moment().subtract('days', 0 - (1 - moment().isoWeekday()) + 7).format('DD/MM/YYYY'), moment().subtract('days', 0 - (1 - moment().isoWeekday()) + 7).add(6, 'days').format('DD/MM/YYYY'));
                SendertableBindRandom(moment().subtract('days', 0 - (1 - moment().isoWeekday()) + 7).format('DD/MM/YYYY'), moment().subtract('days', 0 - (1 - moment().isoWeekday()) + 7).add(6, 'days').format('DD/MM/YYYY'));
               // CampaigntableBindRandom(moment().subtract('days', 0 - (1 - moment().isoWeekday()) + 7).format('DD/MM/YYYY'), moment().subtract('days', 0 - (1 - moment().isoWeekday()) + 7).add(6, 'days').format('DD/MM/YYYY'));
            } else if (stardate == moment().startOf('month').format('DD/MM/YYYY') && enddate == moment().endOf('month').format('DD/MM/YYYY'))
            {
               // BindMapRandom(stardate, enddate);
                BindGraphMonthRandom(moment().startOf('month').format('DD/MM/YYYY'), moment().endOf('month').format('DD/MM/YYYY'));
                SendertableBindRandom(moment().subtract('days', 0 - (1 - moment().isoWeekday()) + 7).format('DD/MM/YYYY'), moment().subtract('days', 0 - (1 - moment().isoWeekday()) + 7).add(6, 'days').format('DD/MM/YYYY'));
               // CampaigntableBindRandom(moment().subtract('days', 0 - (1 - moment().isoWeekday()) + 7).format('DD/MM/YYYY'), moment().subtract('days', 0 - (1 - moment().isoWeekday()) + 7).add(6, 'days').format('DD/MM/YYYY'));
            } else if (stardate == moment().subtract(1, 'month').startOf('month').format('DD/MM/YYYY') && enddate == moment().subtract(1, 'month').endOf('month').format('DD/MM/YYYY'))
            {
               // BindMapRandom(stardate, enddate);
                BindGraphMonthRandom(moment().subtract(1, 'month').startOf('month').format('DD/MM/YYYY'), moment().subtract(1, 'month').endOf('month').format('DD/MM/YYYY'));
                SendertableBindRandom(moment().subtract(1, 'month').startOf('month').format('DD/MM/YYYY'), moment().subtract(1, 'month').endOf('month').format('DD/MM/YYYY'));
                //CampaigntableBindRandom(moment().subtract(1, 'month').startOf('month').format('DD/MM/YYYY'), moment().subtract(1, 'month').endOf('month').format('DD/MM/YYYY'));
            } else
            {
                if (diffDays == 1) {
                    //BindMapRandom(stardate, enddate);
                    RandomGraphBind(stardate, enddate, "Day");
                } else if (diffDays < 8) {
                    //BindMapRandom(stardate, enddate);
                    RandomGraphBind(stardate, enddate, "Week");
                } else if (diffDays < 31) {
                   // BindMapRandom(stardate, enddate);
                    RandomGraphBind(stardate, enddate, "Month");
                } else {
                   // BindMapRandom(stardate, enddate);
                    alert("You can not select more then 30 days");
                }
                
               
            }
            
        });
    }

    function parseDate(input) {
        var parts = input.match(/(\d+)/g);
        // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
    }
    var mystart, myend;
    //This call when date picker call
    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        stardate = start.format('DD/MM/YYYY');
        enddate = end.format('DD/MM/YYYY');
        mystart = start.format('MMMM D, YYYY');
        myend = end.format('MMMM D, YYYY');
    }

    //This the Graph bind-Day wise method where input is distdate and output is list of hours where you get info about delivery,open,read and bounce
    function BindGraphDAY() {
        var totalmessage = new Array;
        var totalcountmessage = 0;
        var totalcountdeliver = 0;
        var totalcountBounce = 0;
        var totalcountRead = 0;
        var hourwisetime = new Array;
        var totaldeilver = new Array;
        var totalbounce = new Array;
        var totalRead = new Array;
        var totalhardbounce = new Array;
        var totalSoftbounce = new Array;
        $.post("DayWiseReport", { "disdate": moment().format('YYYY-MM-DD') }, function (data) {
            DayWisetableday(data);
            for (var i = 0; i < 24; i++) {
                totalmessage.push((data[i].cs_totalmessage));
                hourwisetime.push((data[i].cs_hourwisemsg));
                totaldeilver.push((data[i].cs_totaldelivery));
                totalbounce.push((data[i].cs_totalbounce));
                totalRead.push((data[i].cs_read));
                totalhardbounce.push((data[i].cs_hardbounce));
                totalSoftbounce.push((data[i].cs_softbounce));
                totalcountmessage = parseInt(totalcountmessage) + parseInt(data[i].cs_totalmessage);
                totalcountdeliver = parseInt(totalcountdeliver) + parseInt((data[i].cs_totaldelivery));
                totalcountBounce = parseInt(totalcountBounce) + parseInt(data[i].cs_totalbounce);
                totalcountRead = parseInt(totalcountRead) + parseInt(data[i].cs_read);
            }

            $("#TotalMail").append(formatThousands(totalcountmessage));
            $("#TotalDeliver").append(formatThousands(totalcountdeliver));
            $("#TotalBounce").append(formatThousands(totalcountBounce));
            $("#TotalRead").append(formatThousands(totalcountRead));
            var chart = document.getElementById('chartDay');
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
                    data: ['Sent', 'Deliver', 'Bounce', 'Soft Bounce', 'Hard Bounce', 'Read']
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
                    name: 'Hour',
                    type: 'category',
                    data: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
                }],

                // Vertical axis
                yAxis: [{
                    name:'Mail Count',
                    type: 'value'
                }],

                // Add series
                series: [
                    {
                        name: 'Sent',
                        type: 'bar',
                        data: totalmessage
                    , markLine: {
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
                        name: 'Deliver',
                        type: 'bar',
                        stack: 'Advertising',
                        data: totaldeilver
                    },
                    {
                        name: 'Bounce',
                        type: 'bar',
                        stack: 'Advertising',
                        data: totalbounce
                    },
                    {
                        name: 'Soft Bounce',
                        type: 'bar',
                        stack: 'Advertising',
                        data: totalSoftbounce
                    },
                    {
                        name: 'Hard Bounce',
                        type: 'bar',
                        data: totalhardbounce

                    },
                    {
                        name: 'Read',
                        type: 'bar',
                        barWidth: 10,
                        stack: 'Read',
                        data: totalRead
                    },

                ]
            };
            myChart.setOption(stacked_columns_options);
        });
    }

    //This the Graph bind-Week wise method where input is start date,enddate and output is list of days where you get info about delivery,open,read and bounce--like
    //Monday tuesday 

    function BindWeekGraph() {
        var disdate = new Array;
        var totalmessage = new Array;
        var totalcountmessage = 0;
        var totalcountdeliver = 0;
        var totalcountBounce = 0;
        var totalcountRead = 0;
        var hourwisetime = new Array;
        var totaldeilver = new Array;
        var totalbounce = new Array;
        var totalRead = new Array;
        var totalhardbounce = new Array;
        var totalSoftbounce = new Array;
        $.post("WeekWiseReport", { "campaignfromdate": moment().subtract(6, 'days').format('YYYY-MM-DD'), "campaigntodate": moment().format('YYYY-MM-DD') }, function (data) {
            //DayWisetableWeek(data);
            for (var i = 0; i < 7; i++) {
                disdate.push((data[i].cs_distdate));

                totalmessage.push((data[i].cs_totalmessage));
                hourwisetime.push((data[i].cs_hourwisemsg));
                totaldeilver.push((data[i].cs_totaldelivery));
                totalbounce.push((data[i].cs_totalbounce));
                totalRead.push((data[i].cs_read));
                totalhardbounce.push((data[i].cs_hardbounce));
                totalSoftbounce.push((data[i].cs_softbounce));
                totalcountmessage = parseInt(totalcountmessage) + parseInt(data[i].cs_totalmessage);
                totalcountdeliver = parseInt(totalcountdeliver) + parseInt((data[i].cs_totaldelivery));
                totalcountBounce = parseInt(totalcountBounce) + parseInt(data[i].cs_totalbounce);
                totalcountRead = parseInt(totalcountRead) + parseInt(data[i].cs_read);
            }

            $("#TotalMailWeek").append(formatThousands(totalcountmessage));
            $("#TotalDeliverWeek").append(formatThousands(totalcountdeliver));
            $("#TotalBounceWeek").append(formatThousands(totalcountBounce));
            $("#TotalReadWeek").append(formatThousands(totalcountRead));




            var chart = document.getElementById('chartWeek');
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
                    data: ['Email Sent', 'Email Deliver', 'Email Bounce', 'Hard Bounce', 'Soft Bounce', 'Read']
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
                                pie: 'Switch to pie charts'
                            },
                            type: ['line', 'bar', 'pie']
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
                    name: 'Days',
                    type: 'category',
                    data: disdate
                }],

                // Vertical axis
                yAxis: [{
                    name:'Mail Count',
                    type: 'value'
                }],

                // Add series
                series: [

                    {
                        name: 'Email Sent',
                        type: 'bar',
                        data: totalmessage
                         ,
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
                        name: 'Email Deliver',
                        type: 'bar',
                        stack: 'Advertising',
                        data: totaldeilver
                    },
                    {
                        name: 'Email Bounce',
                        type: 'bar',
                        stack: 'Advertising',
                        data: totalbounce
                    },
                    {
                        name: 'Hard Bounce',
                        type: 'bar',
                        data: totalhardbounce
                    },
                    {
                        name: 'Soft Bounce',
                        type: 'bar',
                        barWidth: 10,
                        stack: 'Television',
                        data: totalSoftbounce
                    },
                    {
                        name: 'Read',
                        type: 'bar',
                        stack: 'Television',
                        data: totalRead
                    }

                ]
            };
            myChart.setOption(stacked_columns_options);
        });
    }
    //This the Graph bind-Month wise method where input is start date,enddate and output is list of days where you get info about delivery,open,read and bounce--like
    //1,2,3,4,..etc 
    function BindGraphMonth() {
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
        var Dates = new Array;
        $.post("MonthWiseReport", { "campaignfromdate": moment().subtract(30, 'days').format('YYYY-MM-DD'), "campaigntodate": moment().format('YYYY-MM-DD') }, function (data) {
            if (data.includes("Error:")) {
                alert(data);
            }
            else {
               // DayWisetableMonth(data);
                for (var i = 0; i < 31; i++) {
                    Dates.push(data[i].cs_distdate);
                    totalmessage.push((data[i].cs_totalmessage));
                    monthwise.push((data[i].cs_distdate));
                    totaldeilver.push((data[i].cs_totaldelivery));
                    totalbounce.push((data[i].cs_totalbounce));
                    totalRead.push((data[i].cs_read));
                    totalhardbounce.push((data[i].cs_hardbounce));
                    totalSoftbounce.push((data[i].cs_softbounce));
                    totalcountmessage = parseInt(totalcountmessage) + parseInt(data[i].cs_totalmessage);
                    totalcountdeliver = parseInt(totalcountdeliver) + parseInt((data[i].cs_totaldelivery));
                    totalcountBounce = parseInt(totalcountBounce) + parseInt(data[i].cs_totalbounce);
                    totalcountRead = parseInt(totalcountRead) + parseInt(data[i].cs_read);
                }
                
                
                $("#TotalMailMonth").append(formatThousands(totalcountmessage));
                $("#TotalDeliverMonth").append(formatThousands(totalcountdeliver));
                $("#TotalBounceMonth").append(formatThousands(totalcountBounce));
                $("#TotalReadMonth").append(formatThousands(totalcountRead));
                var chart = document.getElementById('chartMonth');
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
                        data: ['Sent', 'Deliver', 'Bounce', 'Soft Bounce', 'Hard Bounce', 'Read']
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
                                    pie: 'Switch to Pie Chart'
                                },
                                type: ['line', 'bar', 'pie', 'funnel']
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
                        name:'Days',
                        type: 'category',
                        data: Dates
                    }],

                    // Vertical axis
                    yAxis: [{
                        name:'Mail Count',
                        type: 'value'
                    }],

                    // Add series
                    series: [
                        {
                            name: 'Sent',
                            type: 'bar',
                            data: totalmessage
                            //,
                            //markLine: {
                            //    itemStyle: {
                            //        normal: {
                            //            lineStyle: {
                            //                type: 'dashed'
                            //            }
                            //        }
                            //    },
                            //    data: [
                            //        [{ type: 'min' }, { type: 'max' }]
                            //    ]
                            //}
                        },
                        {
                            name: 'Deliver',
                            type: 'bar',
                            stack: 'Advertising',
                            data: totaldeilver
                        },
                        {
                            name: 'Bounce',
                            type: 'bar',
                            stack: 'Advertising',
                            data: totalbounce
                        },
                        {
                            name: 'Soft Bounce',
                            type: 'bar',
                            stack: 'Advertising',
                            data: totalSoftbounce

                        },
                        {
                            name: 'Hard Bounce',
                            type: 'bar',
                            data: totalhardbounce

                        },
                        {
                            name: 'Read',
                            type: 'bar',
                            barWidth: 10,
                            stack: 'Television',
                            data: totalRead
                        }

                    ]
                };
                myChart.setOption(stacked_columns_options);

            }
        });


    }


    //This method call when when datepicker select some values.
    //Depending upon date selection we call differnt function 
    function BindGraphRandom(startdate,enddate) {
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
        var Dates = new Array;
        $.post("MonthWiseReport", { "campaignfromdate": startdate, "campaigntodate": enddate }, function (data) {
            if (data.includes("Error:")) {
                alert(data);
            }
            else {
                DayWisetableMonth(data);
                for (var i = 0; i < 31; i++) {
                    Dates.push(data[i].cs_distdate);
                    totalmessage.push((data[i].cs_totalmessage));
                    monthwise.push((data[i].cs_distdate));
                    totaldeilver.push((data[i].cs_totaldelivery));
                    totalbounce.push((data[i].cs_totalbounce));
                    totalRead.push((data[i].cs_read));
                    totalhardbounce.push((data[i].cs_hardbounce));
                    totalSoftbounce.push((data[i].cs_softbounce));
                    totalcountmessage = parseInt(totalcountmessage) + parseInt(data[i].cs_totalmessage);
                    totalcountdeliver = parseInt(totalcountdeliver) + parseInt((data[i].cs_totaldelivery));
                    totalcountBounce = parseInt(totalcountBounce) + parseInt(data[i].cs_totalbounce);
                    totalcountRead = parseInt(totalcountRead) + parseInt(data[i].cs_read);
                }

                $("#TotalMailRandom").append(totalcountmessage);
                $("#TotalDeliverRandom").append(totalcountdeliver);
                $("#TotalBounceRandom").append(totalcountBounce);
                $("#TotalReadRandom").append(totalcountRead);
                var chart = document.getElementById('chartRandom');
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
                        data: ['Sent', 'Deliver', 'Bounce', 'Soft Bounce', 'Hard Bounce', 'Read']
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
                                    pie: 'Switch to Pie Chart'
                                },
                                type: ['line', 'bar', 'pie', 'funnel']
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
                        data: Dates
                    }],

                    // Vertical axis
                    yAxis: [{
                        type: 'value'
                    }],

                    // Add series
                    series: [
                        {
                            name: 'Sent',
                            type: 'bar',
                            data: totalmessage
                            //,
                            //markLine: {
                            //    itemStyle: {
                            //        normal: {
                            //            lineStyle: {
                            //                type: 'dashed'
                            //            }
                            //        }
                            //    },
                            //    data: [
                            //        [{ type: 'min' }, { type: 'max' }]
                            //    ]
                            //}
                        },
                        {
                            name: 'Deliver',
                            type: 'bar',
                            stack: 'Advertising',
                            data: totaldeilver
                        },
                        {
                            name: 'Bounce',
                            type: 'bar',
                            stack: 'Advertising',
                            data: totalbounce
                        },
                        {
                            name: 'Soft Bounce',
                            type: 'bar',
                            stack: 'Advertising',
                            data: totalSoftbounce

                        },
                        {
                            name: 'Hard Bounce',
                            type: 'bar',
                            data: totalhardbounce

                        },
                        {
                            name: 'Read',
                            type: 'bar',
                            barWidth: 10,
                            stack: 'Television',
                            data: totalRead
                        }

                    ]
                };
                myChart.setOption(stacked_columns_options);

            }
        });
    }
    //Sender Table Bind Start

    //Input--from date and todate
    //Output is table which contain information based on sender wise
    function SendertableBindDay(Sendertableobj, SenderId) {
        $.post("SenderSummary", { "startdate": moment().format('YYYY-MM-DD'), "enddate": moment().format('YYYY-MM-DD'), "senderID": SenderId, }, function (data) {
            if (data.includes("ERROR:")) {
                alert(data);
            }
            else {

                if (data.length > 10) {
                    var Sendertableobj = $("#senderTableDay").DataTable({
                        "bFilter": false, responsive: true
                    });
                }
                else {
                    var Sendertableobj = $("#senderTableDay").DataTable({
                        "bPaginate": false,
                        "bFilter": false,
                        "bInfo": false,
                        "responsive": true
                    });
                }
                $('#senderTableDay tbody').on('click', 'tr', function () {
                    var data = Sendertableobj.row(this).data();

                    var senderID = data[1];
                    window.location.href = "/report/SenderDetail?senderID=" + encodeURI(senderID) + "&startdate=" + encodeURI(moment().format('YYYY-MM-DD')) + "&enddate=" + encodeURI(moment().format('YYYY-MM-DD'));

                });
                for (var i = 0; i < data.length; i++)
                {

                    Sendertableobj.row.add([
                        i+1,
                        data[i].cs_msgsender,
                        formatThousands(data[i].cs_totalmessage),
                        formatThousands(data[i].cs_totaldelivery),
                        formatThousands(data[i].cs_softbounce),
                        formatThousands(data[i].cs_totalbounce),
                         //'<button type="button" class="btn btn-default" aria-label="my button" style="border: 0px"><span class="icon-stats-dots" style="color:#a0a0a0; font-size: 30px; vertical-align: middle;" aria-hidden="true"></span></button>'
                        '<button type="button" class="btn bg-teal-400" aria-label="my button" style="border: 0px"><i class="icon-statistics position-left"></i> Report</button>'


                    ]).draw(false);
                }
                
            }
        });

    }
    function SendertableBindWeek(SenderId) {

        $.post("SenderSummary", { "startdate": moment().subtract(6, 'Day').format('YYYY-MM-DD'), "enddate": moment().format('YYYY-MM-DD'), "senderID": SenderId, }, function (data) {
            if (data.includes("ERROR:")) {
                alert(data);
            }
            else {

                if (data.length > 10) {
                    var Sendertableobj = $("#senderTableWeek").DataTable({
                        "bFilter": false,
                        "responsive": true
                    });
                }
                else {
                    var Sendertableobj = $("#senderTableWeek").DataTable({
                        "bPaginate": false,
                        "bFilter": false,
                        "bInfo": false,
                        "responsive": true
                    });
                }

                $('#senderTableWeek tbody').on('click', 'tr', function () {
                    var data = Sendertableobj.row(this).data();

                    var senderID = data[1];
                    window.location.href = "/report/SenderDetail?senderID=" + encodeURI(senderID) + "&startdate=" + encodeURI(moment().subtract(6, 'Day').format('YYYY-MM-DD')) + "&enddate=" + encodeURI(moment().format('YYYY-MM-DD'));

                });

                for (var i = 0; i < data.length; i++) {

                    Sendertableobj.row.add([
                        i+1,
                        data[i].cs_msgsender,
                        formatThousands(data[i].cs_totalmessage),
                        formatThousands(data[i].cs_totaldelivery),
                        formatThousands(data[i].cs_softbounce),
                        formatThousands(data[i].cs_totalbounce),
                        '<button type="button" class="btn btn-default" aria-label="my button" style="border: 0px"><span class="icon-stats-dots" style="color:#a0a0a0; font-size: 30px; vertical-align: middle;" aria-hidden="true"></span></button>'
                    ]).draw(false);
                }
               
            }
        });
    }
    function SendertableBindMonth(SenderId) {
        $.post("SenderSummary", { "startdate": moment().subtract(30, 'Day').format('YYYY-MM-DD'), "enddate": moment().format('YYYY-MM-DD'), "senderID": SenderId, }, function (data) {
            if (data.includes("ERROR:")) {
                alert(data);
            }
            else {

                if (data.length > 10) {
                    var Sendertableobj = $("#senderTableMonth").DataTable({
                        "bFilter": false,
                        "responsive": true
                    });
                }
                else {
                    var Sendertableobj = $("#senderTableMonth").DataTable({
                        "bPaginate": false,
                        "bFilter": false,
                        "bInfo": false,
                        "responsive": true
                    });
                }

                $('#senderTableMonth tbody').on('click', 'tr', function () {
                    var data = Sendertableobj.row(this).data();

                    var senderID = data[1];
                    var dis_date = data[3];

                    window.location.href = "/report/SenderDetail?senderID=" + encodeURI(senderID) + "&startdate=" + encodeURI(moment().subtract(30, 'Day').format('YYYY-MM-DD')) + "&enddate=" + encodeURI(moment().format('YYYY-MM-DD'));

                });

                for (var i = 0; i < data.length; i++) {

                    Sendertableobj.row.add([
                        i+1,
                        data[i].cs_msgsender,
                        formatThousands(data[i].cs_totalmessage),
                        formatThousands(data[i].cs_totaldelivery),
                        formatThousands(data[i].cs_softbounce),
                        formatThousands(data[i].cs_totalbounce),
                        '<button type="button" class="btn btn-default" aria-label="my button" style="border: 0px"><span class="icon-stats-dots" style="color:#a0a0a0; font-size: 30px; vertical-align: middle;" aria-hidden="true"></span></button>'

                    ]).draw(false);
                }
               
            }
        });
    }
    //Sender Table Bind End

    //Campaign Table Bind
    //Input parameter are fromdate and todate
    //Output:It return list of array which contain report about campaigns
    function CampaigntableBindDay(SenderId) {
        $.post("AbstractCampiganReport", { "startdate": moment().format('YYYY-MM-DD'), "enddate": moment().format('YYYY-MM-DD'), "senderID": SenderId, }, function (data) {
            if (data.includes("ERROR:")) {
                alert(data);
            }
            else {

                if (data.length > 10) {
                    var campaigntableobj = $('#CampaigntableDay').DataTable({ "responsive": true });
                }
                else {
                    var campaigntableobj = $('#CampaigntableDay').DataTable({
                        "bPaginate": false,
                        "bFilter": false,
                        "bInfo": false,
                        "responsive": true
                    });
                }

                for (var i = 0; i < data.length; i++) {
                    campaigntableobj.row.add([
                     i + 1,
                    data[i].cs_campaignname,
                    data[i].cs_distdate,
                    data[i].cs_msgsender,
                    formatThousands(data[i].cs_totalmessage),
                    formatThousands(data[i].cs_totaldelivery),
                    formatThousands(data[i].cs_totalbounce),
                    '<button type="button" class="btn btn-default" aria-label="my button" style="border: 0px"><span class="icon-stats-dots" style="color:#a0a0a0; font-size: 30px; vertical-align: middle;" aria-hidden="true"></span></button>'


                    ]).draw(false);
                    
                }
                $('#CampaigntableDay tbody').on('click', 'tr', function () {
                    var data = campaigntableobj.row(this).data();
                    var campaigname = data[1];
                    var dis_date = data[2];
                    window.location.href = "/report/CampaignDetail?campaigname=" + encodeURI(campaigname) + "&dis_date=" + encodeURI(dis_date);
                });
                
                
            }
        });


    }
    function CampaigntableBindDayWeek(SenderId) {
        $.post("AbstractCampiganReport", { "startdate": moment().subtract(6, 'days').format('YYYY-MM-DD'), "enddate": moment().format('YYYY-MM-DD'), "senderID": SenderId, }, function (data) {

            if (data.includes("ERROR:")) {
                alert(data);
            }
            else {
                
                if (data.length > 10) {
                    var campaigntableobj = $('#CampaigntableWeek').DataTable({ "responsive": true });
                }
                else {
                    var campaigntableobj = $('#CampaigntableWeek').DataTable({
                        "bPaginate": false,
                        "bFilter": false,
                        "bInfo": false,
                        "responsive": true
                    });
                }
                for (var i = 0; i < data.length; i++) {
                    campaigntableobj.row.add([
                         i + 1,
                         data[i].cs_campaignname,
                         data[i].cs_distdate,
                         data[i].cs_msgsender,
                         formatThousands(data[i].cs_totalmessage),
                         formatThousands(data[i].cs_totaldelivery),
                         formatThousands(data[i].cs_totalbounce),
                         '<button type="button" class="btn btn-default" aria-label="my button" style="border: 0px"><span class="icon-stats-dots" style="color:#a0a0a0; font-size: 30px; vertical-align: middle;" aria-hidden="true"></span></button>'

                    ]).draw(false);
                }
                $('#CampaigntableWeek tbody').on('click', 'tr', function () {
                    var data = campaigntableobj.row(this).data();
                    var campaigname = data[1];
                    var dis_date = data[2];
                    window.location.href = "/report/CampaignDetail?campaigname=" + encodeURI(campaigname) + "&dis_date=" + encodeURI(dis_date);

                });
               
            }
        });
        
    }
    function CampaigntableBindMonth(SenderId) {
        $.post("AbstractCampiganReport", { "startdate": moment().subtract(30, 'days').format('YYYY-MM-DD'), "enddate": moment().format('YYYY-MM-DD'), "senderID": SenderId, }, function (data) {

            if (data.includes("ERROR:")) {
                alert(data);
            }
            else {
                if (data.length > 10) {
                    var campaigntableobj = $('#CampaigntableMonth').DataTable({ "responsive": true });
                }
                else {
                    var campaigntableobj = $('#CampaigntableMonth').DataTable({
                        "bPaginate": false,
                        "bFilter": false,
                        "bInfo": false, "responsive": true
                    });
                }
                for (var i = 0; i < data.length; i++)
                {
                    campaigntableobj.row.add([
                         i + 1,
                         data[i].cs_campaignname,
                         data[i].cs_distdate,
                         data[i].cs_msgsender,
                         formatThousands(data[i].cs_totalmessage),
                         formatThousands(data[i].cs_totaldelivery),
                         formatThousands(data[i].cs_totalbounce),
                         '<button type="button" class="btn btn-default" aria-label="my button" style="border: 0px"><span class="icon-stats-dots" style="color:#a0a0a0; font-size: 30px; vertical-align: middle;" aria-hidden="true"></span></button>'


                    ]).draw(false);
                }
                $('#CampaigntableMonth tbody').on('click', 'tr', function () {
                    var data = campaigntableobj.row(this).data();
                    var campaigname = data[1];
                    var dis_date = data[2];
                    window.location.href = "/report/CampaignDetail?campaigname=" + encodeURI(campaigname) + "&dis_date=" + encodeURI(dis_date);

                });
              
               
            }
        });
        $('#CampaigntableMonth tbody').on('click', 'tr', function () {
            var data = campaigntableobj.row(this).data();
            var campaigname = data[1];
            var dis_date = data[2];
            window.location.href = "/Report/CampaignDetail?campaigname=" + encodeURI(campaigname) + "&dis_date=" + encodeURI(dis_date);

        });
    }

    //This table provide report in terms of table and dataset for this table is corresonding graph like day,week,month
    function DayWisetableday(data) {
        if (data.length > 10) {
            var DayWiseDayTableObj = $("#DayWiseDayTable").DataTable({
                "bFilter": false, "responsive": true
            });
        }
        else {
            var DayWiseDayTableObj = $("#DayWiseDayTable").DataTable({
                "bPaginate": false,
                "bFilter": false,
                "bInfo": false,
                "responsive": true
            });
        }
        for (var i = 0; i < data.length; i++) {
            DayWiseDayTableObj.row.add([
                i+1,
                data[i].cs_hourwisemsg,
                formatThousands(data[i].cs_totalmessage),
                formatThousands(data[i].cs_totaldelivery),
                formatThousands(data[i].cs_totalbounce),
                formatThousands( data[i].cs_read),
                formatThousands(data[i].cs_hardbounce),
                formatThousands(data[i].cs_softbounce),
            ]).draw(false);
        }
        
    }
    function DayWisetableWeek(data) {
        if (data.length > 10) {
            var DayWiseDayTableObj = $("#DayWiseWeekTable").DataTable({
                "bFilter": false, "responsive": true
            });
        }
        else {
            var DayWiseDayTableObj = $("#DayWiseWeekTable").DataTable({
                "bPaginate": false,
                "bFilter": false,
                "bInfo": false,
                "responsive": true
            });
        }
        for (var i = 0; i < data.length; i++) {
            DayWiseDayTableObj.row.add([
                i+1,
                data[i].cs_distdate,
                formatThousands(data[i].cs_totalmessage),
                formatThousands(data[i].cs_totaldelivery),
                formatThousands(data[i].cs_totalbounce),
                formatThousands(data[i].cs_read),
                formatThousands(data[i].cs_hardbounce),
                formatThousands(data[i].cs_softbounce),
            ]).draw(false);
        }
       

    }
    function DayWisetableMonth(data) {
        if (data.length > 10) {
            var DayWiseDayTableObj = $("#DayWiseMonthTable").DataTable({
                "bFilter": false, "responsive": true,
                "order": [[1, "desc"]]
            });
        }
        else {
            var DayWiseDayTableObj = $("#DayWiseMonthTable").DataTable({
                "bPaginate": false,
                "bFilter": false,
                "bInfo": false,
                "responsive": true,
                "order": [[1, "desc"]]
            });
        }
        for (var i = 0; i < data.length; i++) {
            DayWiseDayTableObj.row.add([
                i+1,
                data[i].cs_distdate,
                formatThousands(data[i].cs_totalmessage),
                formatThousands(data[i].cs_totaldelivery),
                formatThousands(data[i].cs_totalbounce),
                formatThousands(data[i].cs_read),
                formatThousands(data[i].cs_hardbounce),
                formatThousands(data[i].cs_softbounce),
            ]).draw(false);
        }
        


    }
    setInterval(function () {
        $("#senderTableDay tbody tr").each(function () {
            // $(this).find('td:eq(1)').addClass('numcol');
            $(this).find('td:eq(2)').addClass('numcol');
            $(this).find('td:eq(3)').addClass('numcol');
            $(this).find('td:eq(4)').addClass('numcol');
            $(this).find('td:eq(5)').addClass('numcol');
        });

        $('#senderTableDay td.numcol').css('text-align', 'right');

        $("#senderTableWeek tbody tr").each(function () {
            //$(this).find('td:eq(1)').addClass('numcol');
            $(this).find('td:eq(2)').addClass('numcol');
            $(this).find('td:eq(3)').addClass('numcol');
            $(this).find('td:eq(4)').addClass('numcol');
            $(this).find('td:eq(5)').addClass('numcol');
        });

        $('#senderTableWeek td.numcol').css('text-align', 'right');
        $("#senderTableMonth tbody tr").each(function () {
            //$(this).find('td:eq(1)').addClass('numcol');
            $(this).find('td:eq(2)').addClass('numcol');
            $(this).find('td:eq(3)').addClass('numcol');
            $(this).find('td:eq(4)').addClass('numcol');
            $(this).find('td:eq(5)').addClass('numcol');
        });

        $('#senderTableMonth td.numcol').css('text-align', 'right');

        $("#CampaigntableDay tbody tr").each(function () {
            $(this).find('td:eq(4)').addClass('numcol');
            $(this).find('td:eq(5)').addClass('numcol');
            $(this).find('td:eq(6)').addClass('numcol');

        });

        $('#CampaigntableDay td.numcol').css('text-align', 'right');

        $("#CampaigntableWeek tbody tr").each(function () {
            $(this).find('td:eq(4)').addClass('numcol');
            $(this).find('td:eq(5)').addClass('numcol');
            $(this).find('td:eq(6)').addClass('numcol');

        });

        $('#CampaigntableWeek td.numcol').css('text-align', 'right');

        $("#CampaigntableMonth tbody tr").each(function () {

            $(this).find('td:eq(4)').addClass('numcol');
            $(this).find('td:eq(5)').addClass('numcol');
            $(this).find('td:eq(6)').addClass('numcol');

        });

        $('#CampaigntableMonth td.numcol').css('text-align', 'right');

        $("#DayWiseDayTable tbody tr").each(function () {

            $(this).find('td:eq(1)').addClass('numcol');
            $(this).find('td:eq(2)').addClass('numcol');
            $(this).find('td:eq(3)').addClass('numcol');
            $(this).find('td:eq(4)').addClass('numcol');
            $(this).find('td:eq(5)').addClass('numcol');
            $(this).find('td:eq(6)').addClass('numcol');
            $(this).find('td:eq(7)').addClass('numcol');
        });

        $('#DayWiseDayTable td.numcol').css('text-align', 'right');

        $("#DayWiseWeekTable tbody tr").each(function () {

            $(this).find('td:eq(1)').addClass('numcol');
            $(this).find('td:eq(2)').addClass('numcol');
            $(this).find('td:eq(3)').addClass('numcol');
            $(this).find('td:eq(4)').addClass('numcol');
            $(this).find('td:eq(5)').addClass('numcol');
            $(this).find('td:eq(6)').addClass('numcol');
        });

        $('#DayWiseDayTable td.numcol').css('text-align', 'right');

        $("#DayWiseMonthTable tbody tr").each(function () {

            $(this).find('td:eq(1)').addClass('numcol');
            $(this).find('td:eq(2)').addClass('numcol');
            $(this).find('td:eq(3)').addClass('numcol');
            $(this).find('td:eq(4)').addClass('numcol');
            $(this).find('td:eq(5)').addClass('numcol');
            $(this).find('td:eq(6)').addClass('numcol');
        });

        $('#DayWiseMonthTable td.numcol').css('text-align', 'right');
    }, 0);
    //Random

    function BindGraphDayRandom(disdate) {
        var totalmessage = new Array;
        var totalcountmessage = 0;
        var totalcountdeliver = 0;
        var totalcountBounce = 0;
        var totalcountRead = 0;
        var hourwisetime = new Array;
        var totaldeilver = new Array;
        var totalbounce = new Array;
        var totalRead = new Array;
        var totalhardbounce = new Array;
        var totalSoftbounce = new Array;
        $.post("DayWiseReport", { "disdate": disdate }, function (data) {
            DayWisetabledayRandom(data);
            for (var i = 0; i < 24; i++) {
                totalmessage.push((data[i].cs_totalmessage));
                hourwisetime.push((data[i].cs_hourwisemsg));
                totaldeilver.push((data[i].cs_totaldelivery));
                totalbounce.push((data[i].cs_totalbounce));
                totalRead.push((data[i].cs_read));
                totalhardbounce.push((data[i].cs_hardbounce));
                totalSoftbounce.push((data[i].cs_softbounce));
                totalcountmessage = parseInt(totalcountmessage) + parseInt(data[i].cs_totalmessage);
                totalcountdeliver = parseInt(totalcountdeliver) + parseInt((data[i].cs_totaldelivery));
                totalcountBounce = parseInt(totalcountBounce) + parseInt(data[i].cs_totalbounce);
                totalcountRead = parseInt(totalcountRead) + parseInt(data[i].cs_read);
            }

            $("#TotalMailRandom").append(formatThousands(totalcountmessage));
            $("#TotalDeliverRandom").append(formatThousands(totalcountdeliver));
            $("#TotalBounceRandom").append(formatThousands(totalcountBounce));
            $("#TotalReadRandom").append(formatThousands(totalcountRead));
            var chart = document.getElementById('chartRandom');
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
                    data: ['Sent', 'Deliver', 'Bounce', 'Soft Bounce', 'Hard Bounce', 'Read']
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
                    name: 'Hour',
                    type: 'category',
                    data: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
                }],

                // Vertical axis
                yAxis: [{
                    name: 'Mail Count',
                    type: 'value'
                }],

                // Add series
                series: [
                    {
                        name: 'Sent',
                        type: 'bar',
                        data: totalmessage
                    , markLine: {
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
                        name: 'Deliver',
                        type: 'bar',
                        stack: 'Advertising',
                        data: totaldeilver
                    },
                    {
                        name: 'Bounce',
                        type: 'bar',
                        stack: 'Advertising',
                        data: totalbounce
                    },
                    {
                        name: 'Soft Bounce',
                        type: 'bar',
                        stack: 'Advertising',
                        data: totalSoftbounce
                    },
                    {
                        name: 'Hard Bounce',
                        type: 'bar',
                        data: totalhardbounce

                    },
                    {
                        name: 'Read',
                        type: 'bar',
                        barWidth: 10,
                        stack: 'Read',
                        data: totalRead
                    },

                ]
            };
            myChart.setOption(stacked_columns_options);
        });
    }
    function DayWisetabledayRandom(data) {
        if (data.length > 10) {
            var DayWiseDayTableObj = $("#DayWiseRandomTable").DataTable({
                "bFilter": false, "responsive": true,
                "destroy": true
            });
        }
        else {
            var DayWiseDayTableObj = $("#DayWiseRandomTable").DataTable({
                "bPaginate": false,
                "bFilter": false,
                "bInfo": false,
                "responsive": true,
                "destroy":true
            });
        }
        for (var i = 0; i < data.length; i++) {
            DayWiseDayTableObj.row.add([
                i + 1,
                data[i].cs_hourwisemsg,
                formatThousands(data[i].cs_totalmessage),
                formatThousands(data[i].cs_totaldelivery),
                formatThousands(data[i].cs_totalbounce),
                formatThousands(data[i].cs_read),
                formatThousands(data[i].cs_hardbounce),
                formatThousands(data[i].cs_softbounce),
            ]).draw(false);
        }
        DayWiseDayTableObj.clear();
        $("#DayWiseRandomTable tbody tr").each(function () {

            $(this).find('td:eq(1)').addClass('numcol');
            $(this).find('td:eq(2)').addClass('numcol');
            $(this).find('td:eq(3)').addClass('numcol');
            $(this).find('td:eq(4)').addClass('numcol');
            $(this).find('td:eq(5)').addClass('numcol');
            $(this).find('td:eq(6)').addClass('numcol');
            $(this).find('td:eq(7)').addClass('numcol');
        });

        $('#DayWiseRandomTable td.numcol').css('text-align', 'right');
    }
    function BindWeekGraphRandom(start_date, end_date) {
      
        var disdate = new Array;
        var totalmessage = new Array;
        var totalcountmessage = 0;
        var totalcountdeliver = 0;
        var totalcountBounce = 0;
        var totalcountRead = 0;
        var hourwisetime = new Array;
        var totaldeilver = new Array;
        var totalbounce = new Array;
        var totalRead = new Array;
        var totalhardbounce = new Array;
        var totalSoftbounce = new Array;
        $.post("WeekWiseReport", { "campaignfromdate": start_date, "campaigntodate": end_date ,"randomflag":"true"}, function (data) {
            DayWisetableWeekRandom(data);
            for (var i = 0; i < 7; i++) {
                disdate.push((data[i].cs_distdate));

                totalmessage.push((data[i].cs_totalmessage));
                hourwisetime.push((data[i].cs_hourwisemsg));
                totaldeilver.push((data[i].cs_totaldelivery));
                totalbounce.push((data[i].cs_totalbounce));
                totalRead.push((data[i].cs_read));
                totalhardbounce.push((data[i].cs_hardbounce));
                totalSoftbounce.push((data[i].cs_softbounce));
                totalcountmessage = parseInt(totalcountmessage) + parseInt(data[i].cs_totalmessage);
                totalcountdeliver = parseInt(totalcountdeliver) + parseInt((data[i].cs_totaldelivery));
                totalcountBounce = parseInt(totalcountBounce) + parseInt(data[i].cs_totalbounce);
                totalcountRead = parseInt(totalcountRead) + parseInt(data[i].cs_read);
            }

            $("#TotalMailRandom").append(formatThousands(totalcountmessage));
            $("#TotalDeliverRandom").append(formatThousands(totalcountdeliver));
            $("#TotalBounceRandom").append(formatThousands(totalcountBounce));
            $("#TotalReadRandom").append(formatThousands(totalcountRead));
            var chart = document.getElementById('chartRandom');
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
                    data: ['Email Sent', 'Email Deliver', 'Email Bounce', 'Hard Bounce', 'Soft Bounce', 'Read']
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
                                pie: 'Switch to pie charts'
                            },
                            type: ['line', 'bar', 'pie']
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
                    name: 'Days',
                    type: 'category',
                    data: disdate
                }],

                // Vertical axis
                yAxis: [{
                    name: 'Mail Count',
                    type: 'value'
                }],

                // Add series
                series: [

                    {
                        name: 'Email Sent',
                        type: 'bar',
                        data: totalmessage
                         ,
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
                        name: 'Email Deliver',
                        type: 'bar',
                        stack: 'Advertising',
                        data: totaldeilver
                    },
                    {
                        name: 'Email Bounce',
                        type: 'bar',
                        stack: 'Advertising',
                        data: totalbounce
                    },
                    {
                        name: 'Hard Bounce',
                        type: 'bar',
                        data: totalhardbounce
                    },
                    {
                        name: 'Soft Bounce',
                        type: 'bar',
                        barWidth: 10,
                        stack: 'Television',
                        data: totalSoftbounce
                    },
                    {
                        name: 'Read',
                        type: 'bar',
                        stack: 'Television',
                        data: totalRead
                    }

                ]
            };
            myChart.setOption(stacked_columns_options);
        });
    }

    //All Function are same only this function called depending upon date factors
    function DayWisetableWeekRandom(data) {
        if (data.length > 10) {
            var DayWiseDayTableObj = $("#DayWiseRandomTable").DataTable({
                "bFilter": false, "responsive": true,
                 "destroy":true
            });
        }
        else {
            var DayWiseDayTableObj = $("#DayWiseRandomTable").DataTable({
                "bPaginate": false,
                "bFilter": false,
                "bInfo": false,
                "responsive": true,
                "destroy": true
            });
        }
        DayWiseDayTableObj.clear();
        for (var i = 0; i < data.length; i++) {
            DayWiseDayTableObj.row.add([
                i + 1,
                data[i].cs_distdate,
                formatThousands(data[i].cs_totalmessage),
                formatThousands(data[i].cs_totaldelivery),
                formatThousands(data[i].cs_totalbounce),
                formatThousands(data[i].cs_read),
                formatThousands(data[i].cs_hardbounce),
                formatThousands(data[i].cs_softbounce),
            ]).draw(false);
        }
        $("#DayWiseRandomTable tbody tr").each(function () {

            $(this).find('td:eq(1)').addClass('numcol');
            $(this).find('td:eq(2)').addClass('numcol');
            $(this).find('td:eq(3)').addClass('numcol');
            $(this).find('td:eq(4)').addClass('numcol');
            $(this).find('td:eq(5)').addClass('numcol');
            $(this).find('td:eq(6)').addClass('numcol');
        });

        $('#DayWiseRandomTable td.numcol').css('text-align', 'right');

    }
    function BindGraphMonthRandom(start_date,end_date) {
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
        var Dates = new Array;
        $.post("MonthWiseReport", { "campaignfromdate": start_date, "campaigntodate": end_date,"randomflag":"true" }, function (data) {
            if (data.includes("Error:")) {
                alert(data);
            }
            else {
                
                DayWisetableMonthRandom(data);
                //Changes required
                var fields = end_date.split('/');
                for (var i = 0; i <fields[0]; i++) {
                    Dates.push(data[i].cs_distdate);
                    totalmessage.push((data[i].cs_totalmessage));
                    monthwise.push((data[i].cs_distdate));
                    totaldeilver.push((data[i].cs_totaldelivery));
                    totalbounce.push((data[i].cs_totalbounce));
                    totalRead.push((data[i].cs_read));
                    totalhardbounce.push((data[i].cs_hardbounce));
                    totalSoftbounce.push((data[i].cs_softbounce));
                    totalcountmessage = parseInt(totalcountmessage) + parseInt(data[i].cs_totalmessage);
                    totalcountdeliver = parseInt(totalcountdeliver) + parseInt((data[i].cs_totaldelivery));
                    totalcountBounce = parseInt(totalcountBounce) + parseInt(data[i].cs_totalbounce);
                    totalcountRead = parseInt(totalcountRead) + parseInt(data[i].cs_read);
                }


                $("#TotalMailRandom").append(formatThousands(totalcountmessage));
                $("#TotalDeliverRandom").append(formatThousands(totalcountdeliver));
                $("#TotalBounceRandom").append(formatThousands(totalcountBounce));
                $("#TotalReadRandom").append(formatThousands(totalcountRead));
                var chart = document.getElementById('chartRandom');
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
                        data: ['Sent', 'Deliver', 'Bounce', 'Soft Bounce', 'Hard Bounce', 'Read']
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
                                    pie: 'Switch to Pie Chart'
                                },
                                type: ['line', 'bar', 'pie', 'funnel']
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
                        name: 'Days',
                        type: 'category',
                        data: Dates
                    }],

                    // Vertical axis
                    yAxis: [{
                        name: 'Mail Count',
                        type: 'value'
                    }],

                    // Add series
                    series: [
                        {
                            name: 'Sent',
                            type: 'bar',
                            data: totalmessage
                            //,
                            //markLine: {
                            //    itemStyle: {
                            //        normal: {
                            //            lineStyle: {
                            //                type: 'dashed'
                            //            }
                            //        }
                            //    },
                            //    data: [
                            //        [{ type: 'min' }, { type: 'max' }]
                            //    ]
                            //}
                        },
                        {
                            name: 'Deliver',
                            type: 'bar',
                            stack: 'Advertising',
                            data: totaldeilver
                        },
                        {
                            name: 'Bounce',
                            type: 'bar',
                            stack: 'Advertising',
                            data: totalbounce
                        },
                        {
                            name: 'Soft Bounce',
                            type: 'bar',
                            stack: 'Advertising',
                            data: totalSoftbounce

                        },
                        {
                            name: 'Hard Bounce',
                            type: 'bar',
                            data: totalhardbounce

                        },
                        {
                            name: 'Read',
                            type: 'bar',
                            barWidth: 10,
                            stack: 'Television',
                            data: totalRead
                        }

                    ]
                };
                myChart.setOption(stacked_columns_options);

            }
        });
    }
    function DayWisetableMonthRandom(data) {
        if (data.length > 10) {
            var DayWiseDayTableObj = $("#DayWiseRandomTable").DataTable({
                "bFilter": false, "responsive": true,"destroy":true
            });
        }
        else {
            var DayWiseDayTableObj = $("#DayWiseRandomTable").DataTable({
                "bPaginate": false,
                "bFilter": false,
                "bInfo": false,
                "responsive": true,
                "destroy": true
            });
        }
        DayWiseDayTableObj.clear();
        for (var i = 0; i < data.length; i++) {
            DayWiseDayTableObj.row.add([
                i + 1,
                data[i].cs_distdate,
                formatThousands(data[i].cs_totalmessage),
                formatThousands(data[i].cs_totaldelivery),
                formatThousands(data[i].cs_totalbounce),
                formatThousands(data[i].cs_read),
                formatThousands(data[i].cs_hardbounce),
                formatThousands(data[i].cs_softbounce),
            ]).draw(false);
        }
        $("#DayWiseRandomTable tbody tr").each(function () {

            $(this).find('td:eq(1)').addClass('numcol');
            $(this).find('td:eq(2)').addClass('numcol');
            $(this).find('td:eq(3)').addClass('numcol');
            $(this).find('td:eq(4)').addClass('numcol');
            $(this).find('td:eq(5)').addClass('numcol');
            $(this).find('td:eq(6)').addClass('numcol');
        });

        $('#DayWiseRandomTable td.numcol').css('text-align', 'right');

    }
    function SendertableBindRandom(start_date,end_date) {
        $.post("SenderSummary", { "startdate": start_date, "enddate": end_date, "senderID": null, }, function (data) {
            if (data.includes("ERROR:")) {
                alert(data);
            }
            else {

                if (data.length > 10) {
                    var Sendertableobj = $("#senderTableRandom").DataTable({
                        "bFilter": false, responsive: true,
                        "destroy":true
                    });
                }
                else {
                    var Sendertableobj = $("#senderTableRandom").DataTable({
                        "bPaginate": false,
                        "bFilter": false,
                        "bInfo": false,
                        "responsive": true,
                        "destroy": true
                    });
                }
                $('#senderTableRandom tbody').on('click', 'tr', function () {
                    var data = Sendertableobj.row(this).data();

                    var senderID = data[1];
                    window.location.href = "/report/SenderDetail?senderID=" + encodeURI(senderID) + "&startdate=" + encodeURI(moment().format('YYYY-MM-DD')) + "&enddate=" + encodeURI(moment().format('YYYY-MM-DD'));

                });
                Sendertableobj.clear();
                for (var i = 0; i < data.length; i++) {

                    Sendertableobj.row.add([
                        i + 1,
                        data[i].cs_msgsender,
                        formatThousands(data[i].cs_totalmessage),
                        formatThousands(data[i].cs_totaldelivery),
                        formatThousands(data[i].cs_softbounce),
                        formatThousands(data[i].cs_totalbounce),
                         '<button type="button" class="btn btn-default" aria-label="my button" style="border: 0px"><span class="icon-stats-dots" style="color:#a0a0a0; font-size: 30px; vertical-align: middle;" aria-hidden="true"></span></button>'


                    ]).draw(false);
                }
                $("#senderTableRandom tbody tr").each(function () {
                    // $(this).find('td:eq(1)').addClass('numcol');
                    $(this).find('td:eq(2)').addClass('numcol');
                    $(this).find('td:eq(3)').addClass('numcol');
                    $(this).find('td:eq(4)').addClass('numcol');
                    $(this).find('td:eq(5)').addClass('numcol');
                });

                $('#senderTableRandom td.numcol').css('text-align', 'right');
            }
        });

    }
    function CampaigntableBindRandom(start_date, end_date) {
        $.post("AbstractCampiganReport", { "startdate": start_date, "enddate": end_date, "senderID": null, }, function (data) {
            if (data.includes("ERROR:")) {
                alert(data);
            }
            else {

                if (data.length > 10) {
                    var campaigntableobj = $('#CampaigntableRandom').DataTable({
                        "responsive": true,
                        "destroy":true
                    });
                }
                else {
                    var campaigntableobj = $('#CampaigntableRandom').DataTable({
                        "bPaginate": false,
                        "bFilter": false,
                        "bInfo": false,
                        "responsive": true,
                        "destroy": true
                    });
                }
                campaigntableobj.clear();
                for (var i = 0; i < data.length; i++) {
                    campaigntableobj.row.add([
                     i + 1,
                    data[i].cs_campaignname,
                    data[i].cs_distdate,
                    data[i].cs_msgsender,
                    formatThousands(data[i].cs_totalmessage),
                    formatThousands(data[i].cs_totaldelivery),
                    formatThousands(data[i].cs_totalbounce),
                    '<button type="button" class="btn btn-default" aria-label="my button" style="border: 0px"><span class="icon-stats-dots" style="color:#a0a0a0; font-size: 30px; vertical-align: middle;" aria-hidden="true"></span></button>'


                    ]).draw(false);
                }
                $('#CampaigntableRandom tbody').on('click', 'tr', function () {
                    var data = campaigntableobj.row(this).data();
                    var campaigname = data[1];
                    var dis_date = data[2];
                    window.location.href = "/report/CampaignDetail?campaigname=" + encodeURI(campaigname) + "&dis_date=" + encodeURI(dis_date);
                });
                $("#CampaigntableRandom tbody tr").each(function () {
                    $(this).find('td:eq(4)').addClass('numcol');
                    $(this).find('td:eq(5)').addClass('numcol');
                    $(this).find('td:eq(6)').addClass('numcol');

                });

                $('#CampaigntableRandom td.numcol').css('text-align', 'right');
            }
        });

    }
    function RandomGraphBind(start_date, end_date,type) {
        if (type == "Day") {
            var totalmessage = new Array;
            var totalcountmessage = 0;
            var totalcountdeliver = 0;
            var totalcountBounce = 0;
            var totalcountRead = 0;
            var hourwisetime = new Array;
            var totaldeilver = new Array;
            var totalbounce = new Array;
            var totalRead = new Array;
            var totalhardbounce = new Array;
            var totalSoftbounce = new Array;
            $.post("CustomReport", { "campaignfromdate": start_date,"campaigntodate":end_date,"type":"Day" }, function (data) {
                DayWisetabledayRandom(data);
                for (var i = 0; i < 24; i++) {
                    totalmessage.push((data[i].cs_totalmessage));
                    hourwisetime.push((data[i].cs_hourwisemsg));
                    totaldeilver.push((data[i].cs_totaldelivery));
                    totalbounce.push((data[i].cs_totalbounce));
                    totalRead.push((data[i].cs_read));
                    totalhardbounce.push((data[i].cs_hardbounce));
                    totalSoftbounce.push((data[i].cs_softbounce));
                    totalcountmessage = parseInt(totalcountmessage) + parseInt(data[i].cs_totalmessage);
                    totalcountdeliver = parseInt(totalcountdeliver) + parseInt((data[i].cs_totaldelivery));
                    totalcountBounce = parseInt(totalcountBounce) + parseInt(data[i].cs_totalbounce);
                    totalcountRead = parseInt(totalcountRead) + parseInt(data[i].cs_read);
                }

                $("#TotalMailRandom").append(formatThousands(totalcountmessage));
                $("#TotalDeliverRandom").append(formatThousands(totalcountdeliver));
                $("#TotalBounceRandom").append(formatThousands(totalcountBounce));
                $("#TotalReadRandom").append(formatThousands(totalcountRead));
                var chart = document.getElementById('chartRandom');
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
                        data: ['Sent', 'Deliver', 'Bounce', 'Soft Bounce', 'Hard Bounce', 'Read']
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
                        name: 'Hour',
                        type: 'category',
                        data: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
                    }],

                    // Vertical axis
                    yAxis: [{
                        name: 'Mail Count',
                        type: 'value'
                    }],

                    // Add series
                    series: [
                        {
                            name: 'Sent',
                            type: 'bar',
                            data: totalmessage
                        , markLine: {
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
                            name: 'Deliver',
                            type: 'bar',
                            stack: 'Advertising',
                            data: totaldeilver
                        },
                        {
                            name: 'Bounce',
                            type: 'bar',
                            stack: 'Advertising',
                            data: totalbounce
                        },
                        {
                            name: 'Soft Bounce',
                            type: 'bar',
                            stack: 'Advertising',
                            data: totalSoftbounce
                        },
                        {
                            name: 'Hard Bounce',
                            type: 'bar',
                            data: totalhardbounce

                        },
                        {
                            name: 'Read',
                            type: 'bar',
                            barWidth: 10,
                            stack: 'Read',
                            data: totalRead
                        },

                    ]
                };
                myChart.setOption(stacked_columns_options);
            });
            SendertableBindRandom(start_date, end_date);
            CampaigntableBindRandom(start_date, end_date);
        } else if (type=="Week") {
            var disdate = new Array;
            var totalmessage = new Array;
            var totalcountmessage = 0;
            var totalcountdeliver = 0;
            var totalcountBounce = 0;
            var totalcountRead = 0;
            var hourwisetime = new Array;
            var totaldeilver = new Array;
            var totalbounce = new Array;
            var totalRead = new Array;
            var totalhardbounce = new Array;
            var totalSoftbounce = new Array;
            $.post("CustomReport", { "campaignfromdate": start_date, "campaigntodate": end_date, "type": "Week" }, function (data) {
                DayWisetableWeekRandom(data);
                for (var i = 0; i < 7; i++) {
                    disdate.push((data[i].cs_distdate));

                    totalmessage.push((data[i].cs_totalmessage));
                    hourwisetime.push((data[i].cs_hourwisemsg));
                    totaldeilver.push((data[i].cs_totaldelivery));
                    totalbounce.push((data[i].cs_totalbounce));
                    totalRead.push((data[i].cs_read));
                    totalhardbounce.push((data[i].cs_hardbounce));
                    totalSoftbounce.push((data[i].cs_softbounce));
                    totalcountmessage = parseInt(totalcountmessage) + parseInt(data[i].cs_totalmessage);
                    totalcountdeliver = parseInt(totalcountdeliver) + parseInt((data[i].cs_totaldelivery));
                    totalcountBounce = parseInt(totalcountBounce) + parseInt(data[i].cs_totalbounce);
                    totalcountRead = parseInt(totalcountRead) + parseInt(data[i].cs_read);
                }

                $("#TotalMailRandom").append(formatThousands(totalcountmessage));
                $("#TotalDeliverRandom").append(formatThousands(totalcountdeliver));
                $("#TotalBounceRandom").append(formatThousands(totalcountBounce));
                $("#TotalReadRandom").append(formatThousands(totalcountRead));
                var chart = document.getElementById('chartRandom');
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
                        data: ['Email Sent', 'Email Deliver', 'Email Bounce', 'Hard Bounce', 'Soft Bounce', 'Read']
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
                                    pie: 'Switch to pie charts'
                                },
                                type: ['line', 'bar', 'pie']
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
                        name: 'Days',
                        type: 'category',
                        data: disdate
                    }],

                    // Vertical axis
                    yAxis: [{
                        name: 'Mail Count',
                        type: 'value'
                    }],

                    // Add series
                    series: [

                        {
                            name: 'Email Sent',
                            type: 'bar',
                            data: totalmessage
                             ,
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
                            name: 'Email Deliver',
                            type: 'bar',
                            stack: 'Advertising',
                            data: totaldeilver
                        },
                        {
                            name: 'Email Bounce',
                            type: 'bar',
                            stack: 'Advertising',
                            data: totalbounce
                        },
                        {
                            name: 'Hard Bounce',
                            type: 'bar',
                            data: totalhardbounce
                        },
                        {
                            name: 'Soft Bounce',
                            type: 'bar',
                            barWidth: 10,
                            stack: 'Television',
                            data: totalSoftbounce
                        },
                        {
                            name: 'Read',
                            type: 'bar',
                            stack: 'Television',
                            data: totalRead
                        }

                    ]
                };
                myChart.setOption(stacked_columns_options);
            });
            SendertableBindRandom(start_date, end_date);
            CampaigntableBindRandom(start_date, end_date);
        } else if (type == "Month") {
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
            var Dates = new Array;
            $.post("CustomReport", { "campaignfromdate": start_date, "campaigntodate": end_date, "tyoe": "Month" }, function (data) {
                if (data.includes("Error:")) {
                    alert(data);
                }
                else {

                    DayWisetableMonthRandom(data);
                    //Changes required
                    var fields = end_date.split('/');
                    for (var i = 0; i < fields[0]; i++) {
                        Dates.push(data[i].cs_distdate);
                        totalmessage.push((data[i].cs_totalmessage));
                        monthwise.push((data[i].cs_distdate));
                        totaldeilver.push((data[i].cs_totaldelivery));
                        totalbounce.push((data[i].cs_totalbounce));
                        totalRead.push((data[i].cs_read));
                        totalhardbounce.push((data[i].cs_hardbounce));
                        totalSoftbounce.push((data[i].cs_softbounce));
                        totalcountmessage = parseInt(totalcountmessage) + parseInt(data[i].cs_totalmessage);
                        totalcountdeliver = parseInt(totalcountdeliver) + parseInt((data[i].cs_totaldelivery));
                        totalcountBounce = parseInt(totalcountBounce) + parseInt(data[i].cs_totalbounce);
                        totalcountRead = parseInt(totalcountRead) + parseInt(data[i].cs_read);
                    }


                    $("#TotalMailRandom").append(formatThousands(totalcountmessage));
                    $("#TotalDeliverRandom").append(formatThousands(totalcountdeliver));
                    $("#TotalBounceRandom").append(formatThousands(totalcountBounce));
                    $("#TotalReadRandom").append(formatThousands(totalcountRead));
                    var chart = document.getElementById('chartRandom');
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
                            data: ['Sent', 'Deliver', 'Bounce', 'Soft Bounce', 'Hard Bounce', 'Read']
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
                                        pie: 'Switch to Pie Chart'
                                    },
                                    type: ['line', 'bar', 'pie', 'funnel']
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
                            name: 'Days',
                            type: 'category',
                            data: Dates
                        }],

                        // Vertical axis
                        yAxis: [{
                            name: 'Mail Count',
                            type: 'value'
                        }],

                        // Add series
                        series: [
                            {
                                name: 'Sent',
                                type: 'bar',
                                data: totalmessage
                                //,
                                //markLine: {
                                //    itemStyle: {
                                //        normal: {
                                //            lineStyle: {
                                //                type: 'dashed'
                                //            }
                                //        }
                                //    },
                                //    data: [
                                //        [{ type: 'min' }, { type: 'max' }]
                                //    ]
                                //}
                            },
                            {
                                name: 'Deliver',
                                type: 'bar',
                                stack: 'Advertising',
                                data: totaldeilver
                            },
                            {
                                name: 'Bounce',
                                type: 'bar',
                                stack: 'Advertising',
                                data: totalbounce
                            },
                            {
                                name: 'Soft Bounce',
                                type: 'bar',
                                stack: 'Advertising',
                                data: totalSoftbounce

                            },
                            {
                                name: 'Hard Bounce',
                                type: 'bar',
                                data: totalhardbounce

                            },
                            {
                                name: 'Read',
                                type: 'bar',
                                barWidth: 10,
                                stack: 'Television',
                                data: totalRead
                            }

                        ]
                    };
                    myChart.setOption(stacked_columns_options);

                }
            });
            SendertableBindRandom(start_date, end_date);
            CampaigntableBindRandom(start_date, end_date);
        }
    }
    //function BindMapRandom(start_date,end_date) {
    //    $.post("MapBindTable", { "startdate": start_date, "enddate": end_date }, function (mydata) {
    //        $("#Random-body").html('');
    //        var addString = "";
    //        var othercountrycount = 0;
    //        for (var i = 0; i < 10; i++) {
    //            addString = addString + "<tr><td>" + mydata.resource[i].ctr_countryname + "</td><td style='text-align:right'>" + formatThousands(mydata.resource[i].ctr_totaldreads) + "</td></tr>";
    //        }
    //        for (var i = 10; i < mydata.resource.length; i++) {
    //            othercountrycount = othercountrycount + mydata.resource[i].ctr_totaldreads;
    //        }
    //        addString = addString + "<tr><td>" + "Other" + "</td><td style='text-align:right'>" + formatThousands(othercountrycount) + "</td></tr>";
    //        $("#Random-body").append(addString);
    //    });
    //    $.post("MapBind", { "startdate": start_date, "enddate": end_date }, function (mydata) {
    //        $('#Random').remove();
    //        $("#Random-MapId").append('<div id="Random" class="map-container map-choropleth"></div>');
    //        var data = mydata;

    //        $('#Random').vectorMap({
    //            map: 'world_mill_en',
    //            backgroundColor: 'transparent',
    //            series: {
    //                regions: [{
    //                    values: data,
    //                    scale: ['#C8EEFF', '#0071A4'],
    //                    normalizeFunction: 'polynomial'
    //                }]
    //            },
    //            onRegionLabelShow: function (e, el, code) {
    //                el.html(el.html() + '<br>' + 'Open - ' + data[code]);
    //            }
    //        });
    //    });
    //}
});