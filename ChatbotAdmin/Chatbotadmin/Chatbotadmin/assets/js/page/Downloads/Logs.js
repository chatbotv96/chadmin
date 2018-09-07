$(function () {
    //We provide download option based on campaign and sender wise
    $(document).ready(function (data) {

        CampaigntableBindDayWeek();
        //BindGraphDAY();
        DateRangebind();
        SendertableBindDay();
        CampaigntableBindDay();
        //MapBindDay();
        //BindWeekGraph();
        SendertableBindWeek();

        //MapBindMonth();
        //BindGraphMonth();
        SendertableBindMonth();
        CampaigntableBindMonth();
        //MapBindWeek();

    });
    function SendertableBindDay(Sendertableobj, SenderId) {
        $.post("SenderSummary", { "startdate": moment().format('YYYY-MM-DD'), "enddate": moment().format('YYYY-MM-DD'), "senderID": SenderId, }, function (data) {
            if (data.includes("ERROR:")) {
                alert(data);
            }
            else {

                if (data.length > 10) {
                    var Sendertableobj = $("#senderTableDay").DataTable({
                        "bFilter": false,
                    });
                }
                else {
                    var Sendertableobj = $("#senderTableDay").DataTable({
                        "bPaginate": false,
                        "bFilter": false,
                        "bInfo": false
                    });
                }
                $('#senderTableDay tbody').on('click', 'tr', function () {
                    var data = Sendertableobj.row(this).data();

                    var senderID = data[0];
                    window.location.href = "/report/SenderDetail?senderID=" + encodeURI(senderID) + "&startdate=" + encodeURI(moment().format('YYYY-MM-DD')) + "&enddate=" + encodeURI(moment().format('YYYY-MM-DD'));

                });
                for (var i = 0; i < data.length; i++) {

                    Sendertableobj.row.add([
                        data[i].cs_msgsender,
                        formatThousands(data[i].cs_totalmessage),
                        formatThousands(data[i].cs_totaldelivery),
                        formatThousands(data[i].cs_softbounce),
                        formatThousands(data[i].cs_totalbounce),
                         //'<button type="button" class="btn btn-default" aria-label="my button" style="border: 0px"><span class="icon-stats-dots" style="color:#a0a0a0; font-size: 30px; vertical-align: middle;" aria-hidden="true"></span></button>'
                        '<button type="button" class="btn bg-teal-400" aria-label="my button" style="border: 0px"><i class="icon-statistics position-left"></i> Report</button>'


                    ]).draw(false);
                }
                $("#senderTableDay tbody tr").each(function () {
                    $(this).find('td:eq(1)').addClass('numcol');
                    $(this).find('td:eq(2)').addClass('numcol');
                    $(this).find('td:eq(3)').addClass('numcol');
                    $(this).find('td:eq(4)').addClass('numcol');
                });

                $('#senderTableDay td.numcol').css('text-align', 'right');
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
                    });
                }
                else {
                    var Sendertableobj = $("#senderTableWeek").DataTable({
                        "bPaginate": false,
                        "bFilter": false,
                        "bInfo": false
                    });
                }

                $('#senderTableWeek tbody').on('click', 'tr', function () {
                    var data = Sendertableobj.row(this).data();

                    var senderID = data[0];
                    window.location.href = "/report/SenderDetail?senderID=" + encodeURI(senderID) + "&startdate=" + encodeURI(moment().subtract(6, 'Day').format('YYYY-MM-DD')) + "&enddate=" + encodeURI(moment().format('YYYY-MM-DD'));

                });

                for (var i = 0; i < data.length; i++) {

                    Sendertableobj.row.add([
                        data[i].cs_msgsender,
                        formatThousands(data[i].cs_totalmessage),
                        formatThousands(data[i].cs_totaldelivery),
                        formatThousands(data[i].cs_softbounce),
                        formatThousands(data[i].cs_totalbounce),
                        '<button type="button" class="btn bg-teal-400" aria-label="my button" style="border: 0px"><i class="icon-statistics position-left"></i> Report</button>'
                        //'<button type="button" class="btn btn-default" aria-label="my button" style="border: 0px"><span class="icon-stats-dots" style="color:#a0a0a0; font-size: 30px; vertical-align: middle;" aria-hidden="true"></span></button>'
                    ]).draw(false);
                }
                $("#senderTableWeek tbody tr").each(function () {
                    $(this).find('td:eq(1)').addClass('numcol');
                    $(this).find('td:eq(2)').addClass('numcol');
                    $(this).find('td:eq(3)').addClass('numcol');
                    $(this).find('td:eq(4)').addClass('numcol');
                });

                $('#senderTableWeek td.numcol').css('text-align', 'right');
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
                    });
                }
                else {
                    var Sendertableobj = $("#senderTableMonth").DataTable({
                        "bPaginate": false,
                        "bFilter": false,
                        "bInfo": false
                    });
                }

                $('#senderTableMonth tbody').on('click', 'tr', function () {
                    var data = Sendertableobj.row(this).data();

                    var senderID = data[0];
                    var dis_date = data[3];

                    window.location.href = "/report/SenderDetail?senderID=" + encodeURI(senderID) + "&startdate=" + encodeURI(moment().subtract(30, 'Day').format('YYYY-MM-DD')) + "&enddate=" + encodeURI(moment().format('YYYY-MM-DD'));

                });

                for (var i = 0; i < data.length; i++) {

                    Sendertableobj.row.add([
                        data[i].cs_msgsender,
                        formatThousands(data[i].cs_totalmessage),
                        formatThousands(data[i].cs_totaldelivery),
                        formatThousands(data[i].cs_softbounce),
                        formatThousands(data[i].cs_totalbounce),
                        '<button type="button" class="btn bg-teal-400" aria-label="my button" style="border: 0px"><i class="icon-statistics position-left"></i> Report</button>'
                        //'<button type="button" class="btn btn-default" aria-label="my button" style="border: 0px"><span class="icon-stats-dots" style="color:#a0a0a0; font-size: 30px; vertical-align: middle;" aria-hidden="true"></span></button>'

                    ]).draw(false);
                }
                $("#senderTableMonth tbody tr").each(function () {
                    $(this).find('td:eq(1)').addClass('numcol');
                    $(this).find('td:eq(2)').addClass('numcol');
                    $(this).find('td:eq(3)').addClass('numcol');
                    $(this).find('td:eq(4)').addClass('numcol');
                });

                $('#senderTableMonth td.numcol').css('text-align', 'right');
            }
        });
    }
    //Sender Table Bind End
    function CampaigntableBindDay(SenderId) {
        $.post("AbstractCampiganReport", { "startdate": moment().format('YYYY-MM-DD'), "enddate": moment().format('YYYY-MM-DD'), "senderID": SenderId, }, function (data) {
            if (data.includes("ERROR:")) {
                alert(data);
            }
            else {

                if (data.length > 10) {
                    var campaigntableobj = $('#CampaigntableDay').DataTable();
                }
                else {
                    var campaigntableobj = $('#CampaigntableDay').DataTable({
                        "bPaginate": false,
                        "bFilter": false,
                        "bInfo": false
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
                        '<button type="button" class="btn bg-teal-400" aria-label="my button" style="border: 0px"><i class="icon-statistics position-left"></i> Report</button>'
                    //'<button type="button" class="btn btn-default" aria-label="my button" style="border: 0px"><span class="icon-stats-dots" style="color:#a0a0a0; font-size: 30px; vertical-align: middle;" aria-hidden="true"></span></button>'


                    ]).draw(false);
                }
                $('#CampaigntableDay tbody').on('click', 'tr', function () {
                    var data = campaigntableobj.row(this).data();
                    var campaigname = data[1];
                    var dis_date = data[2];
                    window.location.href = "/report/CampaignDetail?campaigname=" + encodeURI(campaigname) + "&dis_date=" + encodeURI(dis_date);
                });
                $("#CampaigntableDay tbody tr").each(function () {
                    $(this).find('td:eq(4)').addClass('numcol');
                    $(this).find('td:eq(5)').addClass('numcol');
                    $(this).find('td:eq(6)').addClass('numcol');

                });

                $('#CampaigntableDay td.numcol').css('text-align', 'right');
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
                    var campaigntableobj = $('#CampaigntableWeek').DataTable();
                }
                else {
                    var campaigntableobj = $('#CampaigntableWeek').DataTable({
                        "bPaginate": false,
                        "bFilter": false,
                        "bInfo": false
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
                        '<button type="button" class="btn bg-teal-400" aria-label="my button" style="border: 0px"><i class="icon-statistics position-left"></i> Report</button>'
                         //'<button type="button" class="btn btn-default" aria-label="my button" style="border: 0px"><span class="icon-stats-dots" style="color:#a0a0a0; font-size: 30px; vertical-align: middle;" aria-hidden="true"></span></button>'

                    ]).draw(false);
                }
                $('#CampaigntableWeek tbody').on('click', 'tr', function () {
                    var data = campaigntableobj.row(this).data();
                    var campaigname = data[1];
                    var dis_date = data[2];
                    window.location.href = "/report/CampaignDetail?campaigname=" + encodeURI(campaigname) + "&dis_date=" + encodeURI(dis_date);

                });
                $("#CampaigntableWeek tbody tr").each(function () {
                    $(this).find('td:eq(4)').addClass('numcol');
                    $(this).find('td:eq(5)').addClass('numcol');
                    $(this).find('td:eq(6)').addClass('numcol');

                });

                $('#CampaigntableWeek td.numcol').css('text-align', 'right');
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
                    var campaigntableobj = $('#CampaigntableMonth').DataTable();
                }
                else {
                    var campaigntableobj = $('#CampaigntableMonth').DataTable({
                        "bPaginate": false,
                        "bFilter": false,
                        "bInfo": false
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
                         //'<button type="button" class="btn btn-default" aria-label="my button" style="border: 0px"><span class="icon-stats-dots" style="color:#a0a0a0; font-size: 30px; vertical-align: middle;" aria-hidden="true"></span></button>'
                        '<button type="button" class="btn bg-teal-400" aria-label="my button" style="border: 0px"><i class="icon-statistics position-left"></i> Report</button>'


                    ]).draw(false);
                }
                $('#CampaigntableMonth tbody').on('click', 'tr', function () {
                    var data = campaigntableobj.row(this).data();
                    var campaigname = data[1];
                    var dis_date = data[2];
                    window.location.href = "/report/CampaignDetail?campaigname=" + encodeURI(campaigname) + "&dis_date=" + encodeURI(dis_date);

                });
                $("#CampaigntableMonth tbody tr").each(function () {
                    $(this).find('td:eq(2)').addClass('numcol');
                    $(this).find('td:eq(4)').addClass('numcol');
                });

                $("#CampaigntableDay tbody tr").each(function () {

                    $(this).find('td:eq(4)').addClass('numcol');
                    $(this).find('td:eq(5)').addClass('numcol');
                    $(this).find('td:eq(6)').addClass('numcol');
                });

                $('#CampaigntableDay td.numcol').css('text-align', 'right');
            }
        });
        $('#CampaigntableMonth tbody').on('click', 'tr', function () {
            var data = campaigntableobj.row(this).data();
            var campaigname = data[1];
            var dis_date = data[2];
            window.location.href = "/Report/CampaignDetail?campaigname=" + encodeURI(campaigname) + "&dis_date=" + encodeURI(dis_date);

        });
    }
    function formatThousands(n, dp) {
        var s = '' + (Math.floor(n)), d = n % 1, i = s.length, r = '';
        while ((i -= 3) > 0) { r = ',' + s.substr(i, 3) + r; }
        return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10, dp || 2)) : '');
    }
    function DateRangebind() {
        var start = moment().subtract(0, 'days');
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
            alert(start.format('YYYY-MM-DD'));
            

            //BindGraphRandom(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'));

            if (diffDays != 0) {
                alert("Call");
                $('#myTab a[href="#colored-tab4"]').tab('show');
                alert("Done");

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
});