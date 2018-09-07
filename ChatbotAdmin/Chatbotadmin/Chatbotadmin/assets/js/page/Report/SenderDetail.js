$(function () {
    $(document).ready(function () {
        var Querystring1 = getUrlVars()["senderID"];
        var Querystring2 = getUrlVars()["startdate"];
        var Querystring3 = getUrlVars()["enddate"];
        var startdate = decodeURI(Querystring2);
        var enddate = decodeURI(Querystring3);
       
        senderID = decodeURI(Querystring1);
        //BrowserReadBind(dis_date, senderID, "");
        $("#SenderID").html(senderID);
        $("#SenderIDDelivery").html(senderID);
        $("#SenderIDOpen").html(senderID);
        $("#SenderIDBounce").html(senderID);
       
        var totalcountmessage = 0;
        var totalcountdeliver = 0;
        var totalcountBounce = 0;
        var totalcountRead = 0;
        var totalcountcampaign = 0;

        t = $('#SenderDetailTable').DataTable({ "responsive": true });
        $.post("ReportbySenderID", { "senderID": senderID, "startdate": startdate, "enddate": enddate, "campaignname": null }, function (data) {
            if (data.includes("ERROR:")) {
                alert(data);
            } else {
                totalcountcampaign = data.length;
                for (var i = 0; i < data.length; i++) {
                    totalcountmessage = parseInt(totalcountmessage) + parseInt(data[i].cs_totalmessage);
                    totalcountdeliver = parseInt(totalcountdeliver) + parseInt((data[i].cs_totaldelivery));
                    totalcountBounce = parseInt(totalcountBounce) + parseInt(data[i].cs_totalbounce);
                    totalcountRead = parseInt(totalcountRead) + parseInt(data[i].cs_read);
                    t.row.add([
                        i + 1,
                         data[i].cs_campaignname,
                          data[i].cs_distdate,
                          formatThousands(data[i].cs_totalmessage),
                          formatThousands(data[i].cs_totaldelivery),
                           formatThousands(data[i].cs_totalbounce),
                          formatThousands(data[i].cs_hardbounce),
                           formatThousands(data[i].cs_softbounce),
                         formatThousands( data[i].cs_read),

                    ]).draw(false);
                }
               
            }
            var PerTotalDeliver = (totalcountdeliver / totalcountmessage) * 100;
            $("#TotMsgSent").append(100 + "" + "%");
            $("#TotMsgNote").append("Sent / Receive  " + totalcountmessage + " / " + totalcountmessage);
            $("#TotOpenRate").append(((totalcountRead / totalcountmessage) * 100).toFixed(2) + " %");
            $("#TotOpenNote").append("Opens / Sent  " + totalcountRead + "/" + totalcountmessage);
            $("#TotDeliveryRate").append(((totalcountdeliver / totalcountmessage) * 100).toFixed(2) + " %");
            $("#OpenRate").append(((totalcountRead / totalcountmessage) * 100).toFixed(2) + " %");
            $("#OpenRateNote").append(totalcountRead + "/" + totalcountmessage);
            $("#DeliveryRate").append(((totalcountdeliver / totalcountmessage) * 100).toFixed(2) + " %");
            $("#DeliveryRateNote").append(totalcountdeliver + " / " + totalcountmessage);
            $("#TotDeliveryNote").append("Delivery / Sent  " + totalcountdeliver + " / " + totalcountmessage);
            $("#TotBounceRate").append(((totalcountBounce / totalcountmessage) * 100).toFixed(2) + " %");
            $("#TotBounceNote").append("Bounces / Sent  " + totalcountBounce + " / " + totalcountmessage);
            $("#BounceRate").append(((totalcountBounce / totalcountmessage) * 100).toFixed(2) + " %");
            $("#BounceRateNote").append(totalcountBounce + " / " + totalcountmessage);
            //$("#TotMsgSent").append(totalcountmessage);
           // Bounces / Sent   4 / 38
            $("#TotalDeliver").append(totalcountdeliver);
            $("#TotalBounce").append(totalcountBounce);
            $("#TotalCampaign").append(totalcountcampaign);
            $("#SenderId").append(senderID);
            $("#TotalRead").append(totalcountRead);
            //BindPieChartOverview(totalcountdeliver, totalcountBounce, totalcountRead);
            
            //$('#SenderDetailTable tbody').on('click', 'tr', function () {
              
            //    var data = t.row($(this).parents('tr')).data();
            //    var campaigname = data[1];
            //    var dis_date = data[2];
            //    window.location.href = "/Home/DetailReport?campaigname=" + encodeURI(campaigname) + "&dis_date=" + encodeURI(dis_date);

            //});
            DomainWiseData(senderID, startdate, enddate, totalcountmessage, totalcountdeliver, totalcountBounce, totalcountRead);
        });
        
    });
    function formatThousands(n, dp) {
        var s = '' + (Math.floor(n)), d = n % 1, i = s.length, r = '';
        while ((i -= 3) > 0) { r = ',' + s.substr(i, 3) + r; }
        return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10, dp || 2)) : '');
    }
    function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
    function DomainWiseData(senderID, startdate, enddate, totalcountmessage, totalcountdeliver, totalcountBounce, totalcountRead) {
        DomainReadObj = $('#ReadTableSender').DataTable({ "responsive": true });
        DomainDeliverObj = $('#DeliverTableSender').DataTable({ "responsive": true });
        DomainBounceObj = $('#BounceTableSender').DataTable({ "responsive": true });
        var TotalGmailRead = 0;
        var TotalYahooRead = 0;
        var TotalHotmailRead = 0;
        var TotalRediffmailRead = 0;
        var TotalOtherRead = 0;
        var TotalGmailBounce = 0;
        var TotalYahooBounce = 0;
        var TotalHotmailBounce = 0;
        var TotalRediffmailBounce = 0;
        var TotalOtherBounce = 0;
        var TotalGmailDeliver = 0;
        var TotalYahooDeliver = 0;
        var TotalHotmailDeliver = 0;
        var TotalRediffmailDeliver = 0;
        var TotalOtherDeliver = 0;
        var SenderId;
        var TotalCampaign = 0;

        $.post("GetDomainWiseReport", { "senderID": senderID, "startdate": startdate,"enddate":enddate, "campaignname": null }, function (data) {
            if (data.includes("ERROR:")) {
                alert(data);
            } else {

                for (var i = 0; i < data.length; i++) {
                    TotalGmailRead = parseInt(TotalGmailRead) + parseInt(data[i].gmail_read);
                    TotalYahooRead = parseInt(TotalYahooRead) + parseInt((data[i].yahoo_read));
                    TotalHotmailRead = parseInt(TotalHotmailRead) + parseInt(data[i].hotmail_read);
                    TotalRediffmailRead = parseInt(TotalRediffmailRead) + parseInt(data[i].other_read);
                    TotalOtherRead = parseInt(TotalOtherRead) + parseInt(data[i].rediffmail_read);
                    TotalGmailBounce = parseInt(TotalGmailBounce) + parseInt(data[i].gmail_bounce);
                    TotalYahooBounce = parseInt(TotalYahooBounce) + parseInt((data[i].yahoo_bounce));
                    TotalHotmailBounce = parseInt(TotalHotmailBounce) + parseInt(data[i].hotmail_bounce);
                    TotalRediffmailBounce = parseInt(TotalRediffmailBounce) + parseInt(data[i].rediffmail_bounce);
                    TotalOtherBounce = parseInt(TotalOtherBounce) + parseInt(data[i].other_bounce);
                    TotalGmailDeliver = parseInt(TotalGmailDeliver) + parseInt(data[i].gmail_delivery);
                    TotalYahooDeliver = parseInt(TotalYahooDeliver) + parseInt((data[i].yahoo_delivery));
                    TotalHotmailDeliver = parseInt(TotalHotmailDeliver) + parseInt(data[i].hotmail_delivery);
                    TotalRediffmailDeliver = parseInt(TotalRediffmailDeliver) + parseInt(data[i].rediffmail_delivery);
                    TotalOtherDeliver = parseInt(TotalOtherDeliver) + parseInt(data[i].other_delivery);
                    TotalCampaign = parseInt(TotalCampaign) + parseInt(i);
                   
                    DomainReadObj.row.add([
                       i + 1,
                        data[i].dw_campaignname,
                         formatThousands(data[i].gmail_read),
                         formatThousands(data[i].yahoo_read),
                          formatThousands(data[i].hotmail_read),
                           formatThousands(data[i].rediffmail_read),
                         formatThousands(data[i].other_read),

                    ]).draw(false);
                    DomainDeliverObj.row.add([
                       i + 1,
                        data[i].dw_campaignname,
                         formatThousands(data[i].gmail_delivery),
                         formatThousands(data[i].yahoo_delivery),
                          formatThousands(data[i].hotmail_delivery),
                         formatThousands(data[i].rediffmail_delivery),
                          formatThousands(data[i].other_delivery),
                         formatThousands(data[i].cs_read),
                    ]).draw(false);
                    DomainBounceObj.row.add([
                       i + 1,
                        data[i].dw_campaignname,
                         formatThousands(data[i].gmail_bounce),
                         formatThousands(data[i].yahoo_bounce),
                            formatThousands(data[i].hotmail_bounce),
                          formatThousands(data[i].rediffmail_bounce),
                         formatThousands(data[i].other_bounce),
                    ]).draw(false);
                }
                


            }
            var totalcountdelivery = parseInt(TotalGmailDeliver) + parseInt(TotalYahooDeliver) + parseInt(TotalHotmailDeliver) + parseInt(TotalRediffmailDeliver) + parseInt(TotalOtherDeliver);
            var totalcountBounce = parseInt(TotalGmailBounce) + parseInt(TotalYahooBounce) + parseInt(TotalHotmailBounce) + parseInt(TotalRediffmailBounce) + parseInt(TotalOtherBounce);
            var totalcountRead = parseInt(TotalGmailRead) + parseInt(TotalYahooRead) + parseInt(TotalHotmailRead) + parseInt(TotalRediffmailRead) + parseInt(TotalOtherRead);
            var UniqueRead = parseInt(TotalGmailRead) + parseInt(TotalYahooRead) + parseInt(TotalHotmailRead) + parseInt(TotalRediffmailRead) + parseInt(TotalOtherRead);
            var MultiRead = parseInt(TotalGmailRead) + parseInt(TotalYahooRead) + parseInt(TotalHotmailRead) + parseInt(TotalRediffmailRead) + parseInt(TotalOtherRead);
            var SoftBounce = parseInt(TotalGmailBounce) + parseInt(TotalYahooBounce) + parseInt(TotalHotmailBounce) + parseInt(TotalRediffmailBounce) + parseInt(TotalOtherBounce);
            var HardBounce = parseInt(TotalGmailBounce) + parseInt(TotalYahooBounce) + parseInt(TotalHotmailBounce) + parseInt(TotalRediffmailBounce) + parseInt(TotalOtherBounce);
            var Gmail_Yahoo_delivery = parseInt(TotalGmailDeliver) + parseInt(TotalYahooDeliver);
            var OtherDelivery = parseInt(TotalHotmailDeliver) + parseInt(TotalRediffmailDeliver) + parseInt(TotalOtherDeliver);
            Graphbind(totalcountdelivery, totalcountBounce, totalcountRead, UniqueRead, MultiRead, SoftBounce, HardBounce, Gmail_Yahoo_delivery, OtherDelivery);
            GraphbindDelivery(TotalGmailDeliver, TotalGmailDeliver + TotalGmailBounce, TotalYahooDeliver, TotalYahooDeliver + TotalYahooBounce, TotalRediffmailDeliver, TotalRediffmailBounce + TotalRediffmailDeliver,
            TotalHotmailDeliver, TotalHotmailDeliver+TotalHotmailBounce,TotalOtherDeliver,TotalOtherDeliver+TotalOtherBounce);
            GraphBindRead(TotalGmailRead, TotalYahooRead, TotalHotmailRead, TotalRediffmailRead, TotalOtherRead);
            
            GraphbindBounce(TotalGmailDeliver, TotalYahooDeliver, TotalHotmailDeliver, TotalRediffmailDeliver, TotalOtherDeliver, TotalGmailBounce, TotalYahooBounce, TotalHotmailBounce, TotalRediffmailBounce, TotalOtherBounce)
           // totalcountdeliver, totalcountBounce, totalcountRead
            $("#GmailDelivery").append(((TotalGmailDeliver/totalcountdeliver)*100).toFixed(2)+" %");
            $("#GmailDeliveryNote").append(TotalGmailDeliver + " / " + parseInt(TotalGmailDeliver+TotalGmailBounce));
            $("#YahooDelivery").append(((TotalYahooDeliver / totalcountdeliver) * 100).toFixed(2) + " %");
            $("#YahooDeliveryNote").append(TotalYahooDeliver + " / " + parseInt(TotalYahooDeliver+TotalYahooBounce));
            $("#ReddifDelivery").append(((TotalRediffmailDeliver / totalcountdeliver) * 100).toFixed(2) + " %");
            $("#ReddifDeliveryNote").append(TotalRediffmailDeliver + " / " + parseInt(TotalRediffmailDeliver+TotalRediffmailBounce));
            $("#HotmailDelivery").append(((TotalHotmailDeliver / totalcountdeliver) * 100).toFixed(2) + " %");
            $("#HotmailDeliveryNote").append(TotalHotmailDeliver + " / " + parseInt(TotalHotmailDeliver+TotalHotmailBounce));
            $("#OtherDelivery").append(((TotalOtherDeliver / totalcountdeliver) * 100).toFixed(2) + " %");
            $("#OtherDeliveryNote").append(TotalOtherDeliver + " / " + parseInt(TotalOtherDeliver+TotalOtherBounce));
            var totalGmailMsg= parseInt(TotalGmailDeliver + TotalGmailBounce);
            var totalYahooMsg=parseInt(TotalYahooDeliver+TotalYahooBounce);
            var totalRediffMsg=parseInt(TotalRediffmailDeliver+TotalRediffmailBounce);
            var totalHotmailMsg= parseInt(TotalHotmailDeliver+TotalHotmailBounce);
            var totalOtherMsg=parseInt(TotalOtherDeliver+TotalOtherBounce);
            
            GraphbindDelivery(totalcountdelivery,totalcountmessage,totalGmailMsg, TotalGmailDeliver, totalYahooMsg, TotalYahooDeliver, totalRediffMsg,TotalRediffmailDeliver,totalHotmailMsg,TotalHotmailDeliver,totalOtherMsg,TotalOtherDeliver)
            $("#GmailOpen").append(((TotalGmailRead / totalcountRead) * 100).toFixed(2) + " %");
            $("#GmailOpenNote").append(TotalGmailRead + " / " + totalcountRead);
            $("#YahooOpen").append(((TotalYahooRead / totalcountRead) * 100).toFixed(2) + " %");
            $("#YahooOpenNote").append(TotalYahooRead + " / " + totalcountRead);
            $("#ReddifOpen").append(((TotalRediffmailRead / totalcountRead) * 100).toFixed(2) + " %");
            $("#ReddifOpenNote").append(TotalRediffmailRead + " / " + totalcountRead);
            $("#HotmailOpen").append(((TotalHotmailRead / totalcountRead) * 100).toFixed(2) + " %");
            $("#HotmailOpenNote").append(TotalHotmailRead + " / " + totalcountRead);
            $("#OtherOpen").append(((TotalOtherRead / totalcountRead) * 100).toFixed(2) + " %");
            $("#OtherOpenNote").append(TotalOtherRead + " / " + totalcountRead);


            $("#GmailBounce").append(((TotalGmailBounce / totalcountBounce) * 100).toFixed(2) + " %");
            $("#GmailBounceNote").append(TotalGmailBounce + " / " + parseInt(TotalGmailDeliver + TotalGmailBounce));
            $("#YahooBounce").append(((TotalYahooBounce / totalcountBounce) * 100).toFixed(2) + " %");
            $("#YahooBounceNote").append(TotalYahooBounce + " / " + parseInt(TotalYahooDeliver + TotalYahooBounce));
            $("#ReddifBounce").append(((TotalRediffmailBounce / totalcountBounce) * 100).toFixed(2) + " %");
            $("#ReddifBounceNote").append(TotalRediffmailBounce + " / " + parseInt(TotalRediffmailDeliver + TotalRediffmailBounce));
            $("#HotmailBounce").append(((TotalHotmailBounce / totalcountBounce) * 100).toFixed(2) + " %");
            $("#HotmailBounceNote").append(TotalHotmailBounce + " / " + parseInt(TotalHotmailDeliver + TotalHotmailBounce));
            $("#OtherBounce").append(((TotalOtherBounce / totalcountBounce) * 100).toFixed(2) + " %");
            $("#OtherBounceNote").append(TotalOtherBounce + " / " + parseInt(TotalOtherDeliver + TotalOtherBounce));
            GraphbindBounce(totalcountmessage, totalcountBounce, totalGmailMsg, TotalGmailBounce, totalYahooMsg, TotalYahooBounce, totalRediffMsg, TotalRediffmailBounce, totalHotmailMsg, TotalHotmailBounce, totalOtherMsg, TotalOtherBounce)


           
           
        });
    }
    setInterval(function () {
        $("#ReadTableSender tbody tr").each(function () {


            $(this).find('td:eq(2)').addClass('numcol');
            $(this).find('td:eq(3)').addClass('numcol');
            $(this).find('td:eq(4)').addClass('numcol');
            $(this).find('td:eq(5)').addClass('numcol');
            $(this).find('td:eq(6)').addClass('numcol');
        });
        $('#ReadTableSender td.numcol').css('text-align', 'right');
        $("#DeliverTableSender tbody tr").each(function () {


            $(this).find('td:eq(2)').addClass('numcol');
            $(this).find('td:eq(3)').addClass('numcol');
            $(this).find('td:eq(4)').addClass('numcol');
            $(this).find('td:eq(5)').addClass('numcol');
            $(this).find('td:eq(6)').addClass('numcol');
        });
        $('#DeliverTableSender td.numcol').css('text-align', 'right');
        $("#BounceTableSender tbody tr").each(function () {


            $(this).find('td:eq(2)').addClass('numcol');
            $(this).find('td:eq(3)').addClass('numcol');
            $(this).find('td:eq(4)').addClass('numcol');
            $(this).find('td:eq(5)').addClass('numcol');
            $(this).find('td:eq(6)').addClass('numcol');
        });
        $('#BounceTableSender td.numcol').css('text-align', 'right');
        $("#SenderDetailTable tbody tr").each(function () {



            $(this).find('td:eq(3)').addClass('numcol');
            $(this).find('td:eq(4)').addClass('numcol');
            $(this).find('td:eq(5)').addClass('numcol');
            $(this).find('td:eq(6)').addClass('numcol');
            $(this).find('td:eq(7)').addClass('numcol');
            $(this).find('td:eq(8)').addClass('numcol');
        });
        $('#SenderDetailTable td.numcol').css('text-align', 'right');
    }, 0)
    //Overview
    function Graphbind(Delivery, Bounce, Read, UniqueRead, MultiRead, SoftBounce, HardBounce, Gmail_Yahoo_delivery, OtherDelivery) {
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
                data: ['Gmail,Yahoo Deliver', 'Other Deliver', 'Soft Bounce', 'Hard Bounce', 'Unique Read', 'Total Read', 'Bounce', 'Deliver', 'Read']
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
                data: ['Sent', 'Deliver', 'Bounce', 'Read']
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
    //Delivery
    function GraphbindDelivery(totalcountdelivery, totalcountmessage, totalGmailMsg, TotalGmailDeliver, totalYahooMsg, TotalYahooDeliver, totalRediffMsg, TotalRediffmailDeliver, totalHotmailMsg, TotalHotmailDeliver, totalOtherMsg, TotalOtherDeliver) {
       
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
                data: ['Mail Sent', 'Mail Delivery']
            },

            // Enable drag recalculate
            calculable: true,

            // Horizontal axis
            xAxis: [{
                type: 'category',
                data: ['Total Delivery', 'Gmail', 'Yahoo', 'Reddifmail', 'Hotmail', 'Other']
            }],

            // Vertical axis
            yAxis: [{
                type: 'value',
                boundaryGap: [0, 0.1]
            }],

            // Add series
            series: [
                {
                    name: 'Mail Delivery',
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
                    data: [
                       totalcountdelivery,
                        TotalGmailDeliver,
                        TotalYahooDeliver,
                        TotalRediffmailDeliver,
                        TotalHotmailDeliver,
                        TotalOtherDeliver
                       
                    ]
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
                    data: [
                       totalcountmessage-totalcountdelivery,
                       totalGmailMsg-TotalGmailDeliver,
                        totalYahooMsg-TotalYahooDeliver,
                        totalRediffMsg-TotalRediffmailDeliver,
                        totalHotmailMsg-TotalHotmailDeliver,
                        totalOtherMsg-totalOtherMsg
                    ]
                    //minus bounce
                }
            ]
        };
        myChart.setOption(thermometer_columns_options);

    }
    //Open
    function GraphBindRead(TotamGmailRead,TotalYahooRead,TotalHotmailRead,TotalRediffmailRead,TotalOtherRead) {
        var chart = document.getElementById('stacked_bars_Read');
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
                    data: [TotamGmailRead + TotalYahooRead + TotalRediffmailRead + TotalHotmailRead + TotalOtherRead, TotamGmailRead, TotalYahooRead, TotalRediffmailRead, TotalHotmailRead, TotalOtherRead]
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
                    data: [TotamGmailRead + TotalYahooRead + TotalRediffmailRead + TotalHotmailRead + TotalOtherRead, TotamGmailRead, TotalYahooRead, TotalRediffmailRead, TotalHotmailRead, TotalOtherRead]
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
                    , data: [0,0,0,0,0,0]
                },


            ]
        };

        myChart.setOption(stacked_bars_options);
    }
    //bounce
    function GraphbindBounce(totalcountmessage, totalcountBounce, totalGmailMsg, TotalGmailBounce, totalYahooMsg, TotalYahooBounce, totalRediffMsg, TotalRediffmailBounce, totalHotmailMsg, TotalHotmailBounce, totalOtherMsg, TotalOtherBounce) {
        var chart = document.getElementById('thermometer_columns_Bounce');
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
                    data: [totalcountBounce,
                        TotalGmailBounce,
                        TotalYahooBounce,
                        TotalRediffmailBounce,
                        TotalHotmailBounce,
                        TotalOtherBounce

                    ]
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
                    data: [
                        totalcountmessage-totalcountBounce,
                        totalGmailMsg-TotalGmailBounce,
                        totalYahooMsg-TotalYahooBounce,
                        totalRediffMsg-TotalRediffmailBounce,
                        totalHotmailMsg-TotalHotmailBounce,
                        totalOtherMsg-TotalOtherBounce

                    ]
                    //minus bounce
                }
            ]
        };
        myChart.setOption(thermometer_columns_options);

    }
});
// -