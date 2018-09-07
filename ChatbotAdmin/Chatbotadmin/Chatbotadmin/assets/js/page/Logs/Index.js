$(function () {
    function dropdownSenderBind(multiselectobj, startdate, enddate) {
        //ddlSenderID
        $.post("/Common/NSenderDropdownBind", { "fromdate": startdate, "todate": enddate }, function (data) {
            alert(data.resource[0].cs_msgsender);
            for (var i = 0; i < data.resource.length; i++) {
                alert(data.resource[i].cs_msgsender);
                //alert(data.resource[0].cs_msgsender);
                $("#ddlSenderID").append("<option value=" + data.resource[i].cs_msgsender + ">" + data.resource[i].cs_msgsender + "</option>");

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
        $('#reportrange span').html(start.format('MMMM D, YY') + ' - ' + end.format('MMMM D, YY'));
        stardate = start.format('YYYY/MM/DD');
        enddate = end.format('YYYY/MM/DD');
        mystart = start.format('MMMM D, YYYY');
        myend = end.format('MMMM D, YYYY');
    }
    $(document).ready(function (data) {
        DateRangebind();

        var multiselectobj = $('.multiselect-auto').multiselect({
            buttonWidth: 'auto'
        });
       
        $('.multiselect-auto').change(function () {
           
        });
        dropdownSenderBind(multiselectobj, stardate, enddate);

        $("#Search").click(function () {
            var SenderId = $('#ddlSenderID').val();
            var Status = $("#status").val();
            
            var Subject = $('#txtsubject').val();
           
            debugger
            if (SenderId == null && Status == null) {
                $.post("DetailLogSearch", { "SenderId": SenderId, "Status": Status, "Subject": Subject, "fromdate": stardate, "todate": enddate }, function (data) {

                });
            }
            else if (Status != null && SenderId == null) {
                $.post("DetailLogSearch", { "SenderId": SenderId, "Status": Status.toString(), "Subject": Subject, "fromdate": stardate, "todate": enddate }, function (data) {

                });
            }
            else if (Status == null && SenderId != null) {
                $.post("DetailLogSearch", { "SenderId": SenderId.toString(), "Status": Status, "Subject": Subject, "fromdate": stardate, "todate": enddate }, function (data) {

                });
            }
            else {
                $.post("DetailLogSearch", { "SenderId": SenderId.toString(), "Status": Status.toString(), "Subject": Subject, "fromdate": stardate, "todate": enddate }, function (data) {

                });
            }

        });

    });

});