
$(function () {
  //Here we use partial view data to share among page
    $(document).ready(function (data) {
        debugger;
       
        var CampaignNumber = $("#cno").val();
      
        if (CampaignNumber == "0")
        {
            if ($("sender").val() == "T")
            {
                
            }
            else {
              //  var totalmessage = new Array;
                var OtherDelivery = 43;
                var Gmail_Yahoo_delivery = 22;
               // var totalcountBounce = 0;
               // var totalcountRead = 0;
               // var hourwisetime = new Array;
                var Delivery = new Array;
                var Bounce = new Array;
                var UniqueRead = new Array;
                var MultiRead = new Array;
                var HardBounce = new Array;
                var SoftBounce = new Array;
                $.post("DayWiseReport", { "disdate": moment().format('YYYY-MM-DD') }, function (data) {
                    DayWisetableday(data);
                    for (var i = 0; i < 24; i++) {
                      //  totalmessage.push((data[i].cs_totalmessage));
                       // hourwisetime.push((data[i].cs_hourwisemsg));
                        Delivery.push((data[i].cs_totaldelivery));
                        Bounce.push((data[i].cs_totalbounce));
                        UniqueRead.push((data[i].cs_read));
                        MultiRead.push((data[i].cs_read));
                        HardBounce.push((data[i].cs_hardbounce));
                        SoftBounce.push((data[i].cs_softbounce));
                       // totalcountmessage = parseInt(totalcountmessage) + parseInt(data[i].cs_totalmessage);
                       // totalcountdeliver = parseInt(totalcountdeliver) + parseInt((data[i].cs_totaldelivery));
                       // totalcountBounce = parseInt(totalcountBounce) + parseInt(data[i].cs_totalbounce);
                       // totalcountRead = parseInt(totalcountRead) + parseInt(data[i].cs_read);
                    }

                //var Delivery = 10;
                //var Bounce = 2;
                //var UniqueRead = 2;
                //var MultiRead = 8;
                //var SoftBounce = 1;
                //var HardBounce = 1;
                //var Gmail_Yahoo_delivery = 6;
                //var OtherDelivery = 2;
                Graphbind(Delivery, Bounce, MultiRead, UniqueRead, MultiRead, SoftBounce, HardBounce, Gmail_Yahoo_delivery, OtherDelivery);
               // var multiselectobj = $('.multiselect-auto').multiselect({ buttonWidth: 'auto' });
               // dropdownSenderBind(multiselectobj);
                DateRangebind();
            }
        }
        else {
            alert("I am in");
            $.post("/Analytic/OverViewAnalytic", { "sender": $("#sender").val(), "startdate": $("#startdate").val(), "enddate": $("#enddate"), "CampaignNumber": CampaignNumber.toString() }, function (data) {
                alert("data");
            });
        }
        });
        function dropdownSenderBind(multiselectobj) {
        //ddlSenderID
        $.post("/Home/SenderDropdownBind", {}, function (data) {
            for (var i = 0; i < data.length; i++) {

                $("#ddlSenderID").append("<option value=" + data[i].SenderEmail + ">" + data[i].SenderEmail + "</option>");

            }
            multiselectobj.multiselect('rebuild');


        });
    }
    function DateRangebind() {
        var start = moment().subtract(1, 'days');
        var end = moment();
        $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);

        cb(start, end);
        $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
            
            var date1 = Date.parse(mystart);
            var date2 = Date.parse(myend);
            var timeDiff = Math.abs(date2 - date1);
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
            
            $('a[href="#colored-tab4"]').click();
            if (diffDays == 1) {

            }
            else if (diffDays > 1 && diffDays < 8) {
                alert("Week Selected");
            } else if (diffDays > 7 && diffDays < 32) {
                alert("Month Selected");
            }
        });
    }
    function parseDate(input) {
        var parts = input.match(/(\d+)/g);
        // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
    }
    var mystart, myend;
    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        stardate = start.format('DD/MM/YYYY');
        enddate = end.format('DD/MM/YYYY');
        mystart = start.format('MMMM D, YYYY');
        myend = end.format('MMMM D, YYYY');
    }
    function Graphbind(Delivery, Bounce,Read, UniqueRead, MultiRead, SoftBounce, HardBounce, Gmail_Yahoo_delivery, OtherDelivery) {
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
                data: ['Gmail,Yahoo Deliver', 'Other Deliver', 'Soft Bounce', 'Hard Bounce', 'Unique Read','Total Read','Bounce','Deliver','Read']
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
                data: ['Sent','Deliver','Bounce','Read']
            }],

            // Add series
            series: [
                {
                    name: 'Deliver',
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
                    data: [Delivery, , , ]
                },
                {
                    name: 'Bounce',
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
                    data: [Bounce, , , ]
                },
                {
                    name: 'Read',
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
                    , data: [Read, , , ]
                },
                {
                    name: 'Gmail,Yahoo Deliver',
                    type: 'bar',
                    stack: 'Total',
                    itemStyle: {
                        normal: {
                            color: '#42A5F5',
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
                    data: [, Gmail_Yahoo_delivery, , ]
                },
                {
                    name: 'Other Deliver',
                    type: 'bar',
                    stack: 'Total',
                    itemStyle: {
                        normal: {
                            color: '#ef5350',
                            label: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        emphasis: {
                            color: '#ef5350',
                            label: {
                                show: true
                            }
                        }
                    },
                    data: [, OtherDelivery, , ]
                },
                {
                    name: 'Soft Bounce',
                    type: 'bar',
                    stack: 'Total',
                    itemStyle: {
                        normal: {
                            color: '#66bb6a',
                            label: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        emphasis: {
                            color: '#66bb6a',
                            label: {
                                show: true
                            }
                        }
                    },
                    data: [, , SoftBounce, ]
                },
                {
                    name: 'Hard Bounce',
                    type: 'bar',
                    stack: 'Total',
                    itemStyle: {
                        normal: {
                            color: '#ff7043',
                            label: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        emphasis: {
                            color: '#ff7043',
                            label: {
                                show: true
                            }
                        }
                    },
                    data: [, , HardBounce, ]
                },
                {
                    name: 'Unique Read',
                    type: 'bar',
                    stack: 'Total',
                    itemStyle: {
                        normal: {
                            color: '#26a69a',
                            label: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        emphasis: {
                            color: '#26a69a',
                            label: {
                                show: true
                            }
                        }
                    },
                    data: [, , , UniqueRead]
                },
                {
                    name: 'Total Read',
                    type: 'bar',
                    stack: 'Total',
                    itemStyle: {
                        normal: {
                            color: '#dbbcc3',
                            label: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        emphasis: {
                            color: '#dbbcc3',
                            label: {
                                show: true
                            }
                        }
                    },
                    data: [, , , MultiRead]
                }

            ]
        };

        myChart.setOption(stacked_bars_options);

    }

});